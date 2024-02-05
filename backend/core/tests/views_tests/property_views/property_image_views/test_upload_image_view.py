from django.test import TestCase, override_settings
from django.http import HttpResponse
from django.urls import reverse

from core.models.user_models import User
from core.models.property_models import Property, PropertyImages
from core.helpers.customs.custom_http_status import HTTPStatus
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.image_helpers.image_tester import ImageTester
from core.helpers.image_processor.image_reader import image_reader
from core.helpers.image_processor.image_handler import image_handler
from core.authentication.tokens.token_handler import token_handler
from core.helpers.ownership_handler.ownership_helpers import change_property_owner

from typing import Dict, Any

import json


class UploadImageView(TestCase, ImageTester):
    """
        Unit tests for the Upload Image View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: str = token_handler.retrieve_access_token(self.user).key
        self.headers: Dict[str, Any] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.property: Property = Property.objects.get(pk=1)
        self.url: str = reverse('upload_image')
        self.request_body: Dict[str, Any] = {
            'property_id': self.property.pk,
            'images':[image_reader.readImage(self.get_file_path('base64_test1.txt', 'base64_test_strings'))]
        }
        # Set the creator to the current user to authorize the user for uploading images.
        self.property.creator = self.user
        self.property.save()    
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_upload_image_url(self) -> None:
        self.assertEqual(self.url, '/property/upload_image/')
    '''______________________________________________________________________________________'''
    
    ## Authentication Unit tests.
    def test_post_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Upload Image Unit tests.
    def test_upload_image_with_required_fields_is_successful(self) -> None:
        property_images_before_count: int = PropertyImages.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        property_images_after_count: int = PropertyImages.objects.count()
        content = json.loads(response.content)
        
        self.property.refresh_from_db()

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertEqual(property_images_before_count + 1, property_images_after_count)
        self.assertGreater(len(content['image_urls']), 0)
        
        self.delete_uploaded_images(content['image_urls'], self.property)
    
    def test_user_can_upload_multiple_images(self) -> None:
        property_images_before_count: int = PropertyImages.objects.count()
        request_body = self.get_request_with_multiple_images(self.property.pk)
        response: HttpResponse = self.client.post(self.url, data=json.dumps(request_body), content_type='application/json', **self.headers)
        content = json.loads(response.content)
        property_images_after_count: int = PropertyImages.objects.count()

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertEqual(property_images_before_count + 2, property_images_after_count)
        self.assertEqual(len(content['image_urls']), len(request_body['images']))
        
        self.delete_uploaded_images(content['image_urls'], self.property)
        
    def test_generated_image_file_names_are_unique(self) -> None:
        request_body = self.get_request_with_multiple_images(self.property.pk)
        response: HttpResponse = self.client.post(self.url, data=json.dumps(request_body), content_type='application/json', **self.headers)
        content = json.loads(response.content)
        image_files = [property_image.image for property_image in PropertyImages.objects.filter(property = self.property)]

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertNotEqual(image_files[0].name, image_files[1].name)

        self.delete_uploaded_images(content['image_urls'], self.property)
    
    def test_default_image_url_is_replaced_with_new_uploaded_image_url(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        content = json.loads(response.content)

        self.assertFalse(image_handler.getDefaultImageURL() in content['image_urls'])
        self.assertEqual(len(content['image_urls']), len(self.request_body['images']))
        
        self.delete_uploaded_images(content['image_urls'], self.property)

    def test_upload_image_with_missing_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'images':[image_reader.readImage(self.get_file_path('base64_test1.txt', 'base64_test_strings'))]
        }
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
    
    def test_upload_image_with_invalid_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'property_id': 50000,
            'images':[image_reader.readImage(self.get_file_path('base64_test1.txt', 'base64_test_strings'))]
        }
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        
    @override_settings(MAX_STORED_IMAGES=1)
    def test_user_cannot_upload_more_than_max_stored_images(self) -> None:
        # Upload the first image.
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        content = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertEqual(len(content['image_urls']), 1)

        # Upload the second image.
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        
        self.assertEqual(response.status_code,  HTTPStatus.UPLOAD_LIMIT_REACHED.value)

        self.delete_uploaded_images(content['image_urls'], self.property)

    def test_property_creator_cannot_upload_images_when_owner_is_assigned(self) -> None:
        second_user = User.objects.get(pk=2)
        change_property_owner(self.property, second_user)
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN.value)
'''______________________________________________________________________________________'''
    


    




    