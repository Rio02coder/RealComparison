from django.test import TestCase, override_settings
from django.urls import reverse

from core.models.user_models import User
from core.models.property_models import Property
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.helpers.customs.custom_response_generator import response_generator
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

import json
import time


class PropertyDetailViewTest(TestCase):
    """
        Unit tests for the the Property List view.
    """
    fixtures = FixtureHandler([(User, True), (Property, True)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(email="ivanwillams@example.org")
        self.auth_token = token_handler.retrieve_access_token(self.user).key
        self.headers = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.property = Property.objects.get(pk=1)
        self.url = reverse('property', kwargs={'property_id': self.property.pk})
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_property_detail_view_url(self) -> None:
        self.assertEqual(self.url, f'/property/{self.property.pk}/')
    '''______________________________________________________________________________________'''
    
    ## Authentication Unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Retrieve the property's details Unit tests.
    def test_get_property_with_valid_id(self) -> None:
        response = self.client.get(self.url, **self.headers)
        non_testable_fields = ['verificationcode', 'pendingproperty', 'propertyimages', 'userpropertyviewcounts']
        property_fields = [field.name for field in Property._meta.get_fields() if field.name not in non_testable_fields] # Gets all Property model field names in a list.

        json_response_data = json.loads(response.content) 
        
        for field in property_fields:
            self.assertIn(field, json_response_data)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_get_property_with_valid_id_and_fields(self) -> None:
        self.url = reverse('property', kwargs={'property_id': self.property.pk}) + "?fields=city,zipcode"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertIn("id", json_response_data)
        self.assertIn("city", json_response_data)
        self.assertIn("zipcode", json_response_data)

        self.assertEqual(len(json_response_data.keys()), 3) # 3 since id is also returned.
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_get_property_with_invalid_id_fails(self) -> None:
        self.url = reverse('property', kwargs={'property_id': 2300})
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"Property with ID 2300 does not exist.").content))

    def test_get_property_with_valid_id_but_invalid_fields_fails(self) -> None:
        self.url = reverse('property', kwargs={'property_id': self.property.pk}) + "?fields=notafield"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Invalid field in request.").content))

    def test_get_property_with_invalid_id_and_valid_fields_fails(self) -> None:
        self.url = reverse('property', kwargs={'property_id': 2341}) + "?fields=city"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"Property with ID 2341 does not exist.").content))

    def test_get_property_with_invalid_id_and_invalid_fields_fails(self) -> None:
        self.url = reverse('property', kwargs={'property_id': 2341}) + "?fields=notafield"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"Property with ID 2341 does not exist.").content))
    '''______________________________________________________________________________________'''

    def test_view_count_increments_by_one_after_get_response(self) -> None:
        view_count_before: int = self.property.views
        response = self.client.get(self.url, **self.headers)
        self.property.refresh_from_db()
        view_count_after: int = self.property.views

        self.assertEqual(view_count_after, view_count_before + 1)

        json_response_data = json.loads(response.content) 
        self.assertIn("views", json_response_data)

        self.assertEqual(json_response_data["views"], view_count_after)
    '''______________________________________________________________________________________'''

    @override_settings(VIEWS_INCREMENT_TIME=1)
    def test_view_count_increments_when_minimum_time_is_reached(self) -> None:
        view_count_before: int = self.property.views
        self.client.get(self.url, **self.headers)

        time.sleep(1)

        self.client.get(self.url, **self.headers)
        view_count_after: int = self.property.views

        self.assertEqual(view_count_after, view_count_before + 2)
    '''______________________________________________________________________________________'''

    @override_settings(VIEWS_INCREMENT_TIME=1)
    def test_view_count_does_not_increment_when_minimum_time_is_not_reached(self) -> None:
        view_count_before: int = self.property.views
        self.client.get(self.url, **self.headers)

        time.sleep(0.5)

        self.client.get(self.url, **self.headers)
        view_count_after: int = self.property.views
        self.assertNotEqual(view_count_after, view_count_before + 2)
'''______________________________________________________________________________________'''
