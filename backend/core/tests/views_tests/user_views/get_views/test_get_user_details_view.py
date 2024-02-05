from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.serializers import UserSerializer
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

from datetime import datetime

import json


class GetUserDetailsViewTestCase(TestCase):
    """
        Tests the Get User Details View.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(email="ivanwillams@example.org")
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('user_details', kwargs={'user_id': self.user.pk})
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_get_user_details_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/profile/{self.user.pk}/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Retrive a user details unti tests.
    def test_get_user_with_valid_id(self) -> None:
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        user_fields = list(UserSerializer().fields.keys())
        user_fields.remove("password")

        for field in user_fields:
            self.assertIn(field, json_response_data)

        self.assertEqual(len(json_response_data.keys()), len(user_fields))
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_get_user_with_valid_id_and_fields(self) -> None:
        self.url = reverse('user_details', kwargs={'user_id': self.user.pk}) + "?fields=first_name"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertIn('first_name', json_response_data)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_get_user_with_invalid_id_fails(self) -> None:
        self.url = reverse('user_details', kwargs={'user_id': 2300})
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with ID 2300 does not exist.").content))

    def test_get_user_with_valid_id_but_invalid_fields_fails(self) -> None:
        self.url = reverse('user_details', kwargs={'user_id': self.user.pk}) + "?fields=notafield"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Invalid field in request.").content))

    def test_get_user_with_invalid_id_and_valid_fields_fails(self) -> None:
        self.url = reverse('user_details', kwargs={'user_id': 2341}) + "?fields=first_name,last_name"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with ID 2341 does not exist.").content))

    def test_get_user_with_invalid_id_and_invalid_fields_fails(self) -> None:
        self.url = reverse('user_details', kwargs={'user_id': 2341}) + "?fields=notafield"
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with ID 2341 does not exist.").content))

    def test_get_user_data_is_successful(self) -> None:
        self.url = reverse('user_details', kwargs={'user_id': self.user.pk})
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        self.assertEqual(json_response_data['id'], self.user.id)
        self.assertEqual(json_response_data['first_name'], self.user.first_name)
        self.assertEqual(json_response_data['last_name'], self.user.last_name)
        self.assertEqual(json_response_data['phone_number'], self.user.phone_number)
        self.assertEqual(json_response_data['service'], self.user.service)
        self.assertEqual(json_response_data['is_active'], self.user.is_active)
        self.assertEqual(json_response_data['is_staff'], self.user.is_staff)
        self.assertEqual(json_response_data['is_verified'], self.user.is_verified)
        self.assertEqual(datetime.strptime(json_response_data['date_joined'], '%Y-%m-%d').date(), self.user.date_joined)
        self.assertEqual(json_response_data['favorites'], self.user.favorites)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''
