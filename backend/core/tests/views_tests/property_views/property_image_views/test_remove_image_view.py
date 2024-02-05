from django.test import TestCase
from django.urls import reverse
from django.http import HttpResponse

from core.models.user_models import User
from core.models.property_models import Property, PropertyImages
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.helpers.customs.custom_http_status import HTTPStatus
from core.tests.helpers.image_helpers.image_tester import ImageTester
from core.authentication.tokens.token_handler import token_handler
from core.helpers.ownership_handler.ownership_helpers import change_property_owner

from typing import Dict, Any, List

import json

class RemoveImageView(TestCase, ImageTester):
    """
        Unit tests for the Remove Image View.
    """
    fixtures = FixtureHandler([(User, True),(User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: str = token_handler.retrieve_access_token(self.user).key
        self.headers: Dict[str, Any] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.property: Property = Property.objects.get(pk=1)
        self.url: str = reverse('remove_image')
        self.image_urls: List[str] = self.upload_images(self.property)
        self.request_body: Dict[str, Any] = {
            'property_id': self.property.pk,
            'images': self.image_urls
        }
        # Set the creator to the current user to authorize the user for uploading images.
        self.property.creator = self.user
        self.property.save()    
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_upload_image_url(self) -> None:
        self.assertEqual(self.url, '/property/remove_image/')
        self.delete_uploaded_images(self.property.image_urls, self.property)
    '''______________________________________________________________________________________'''
    
    ## Authentication Unit tests.
    def test_post_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
        
        self.delete_uploaded_images(self.property.image_urls, self.property)
    '''______________________________________________________________________________________'''

    ## Remove Image Unit tests.
    def test_remove_image_with_required_fields_is_successful(self) -> None:
        property_images_before_count: int = PropertyImages.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        property_images_after_count: int = PropertyImages.objects.count()
        content = json.loads(response.content)
        
        self.property.refresh_from_db()

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertEqual(property_images_before_count, property_images_after_count+2)
        self.assertEqual(len(content['image_urls']), 0)

    def test_remove_image_with_missing_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'images': [self.image_urls]
        }
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        
        self.delete_uploaded_images(self.property.image_urls, self.property)

    def test_remove_image_with_invalid_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'property_id': 50000,
            'images':[self.image_urls]
        }
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        
        self.delete_uploaded_images(self.property.image_urls, self.property)

    def test_remove_image_with_invalid_url_fails(self)-> None:
        self.request_body: Dict[str, Any] = {
            'property_id': self.property.pk,
            'images':['https://austin-properties.s3.eu-west-2.amazonaws.com/Test-Image.png']
        }
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        content = json.loads(response.content)

        self.assertEqual(len(content['image_urls']), len(self.property.image_urls))
        self.delete_uploaded_images(self.property.image_urls, self.property)

    def test_property_creator_cannot_remove_images_when_owner_is_assigned(self) -> None:
        second_user = User.objects.get(pk=2)
        change_property_owner(self.property, second_user)
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN.value)
        
        self.delete_uploaded_images(self.property.image_urls, self.property)
'''______________________________________________________________________________________'''
       