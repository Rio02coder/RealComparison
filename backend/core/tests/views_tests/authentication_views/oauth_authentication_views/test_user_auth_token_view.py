from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.authentication.services import Services
from core.authentication.tokens.token_handler import TokenHandler
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.auth_helpers.auth_tester import AuthTester
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.toggler import change_is_verified

from http import HTTPStatus

from typing import Any

import json


class UserAuthTokenViewTest(TestCase, AuthTester, TokenHandler):
    """
        Unit tests for the user auth token view.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(email="ivanwillams@example.org")
        self.auth_token = self.retrieve_access_token(self.user).key
        self.url = reverse('user_auth_token')
        
        self.request_body: dict[str,str] = {
            "email": "ivanwillams@example.org",
            "password": "Password123@"
        }
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_user_auth_token_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/token/standard/')
    '''______________________________________________________________________________________'''

    ## Log in the user unit tests. 
    def test_post_successful_authentication(self) -> None:
        change_is_verified(self.user, True)
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_post_successful_even_if_empty_authorization_header_set(self) -> None:
        change_is_verified(self.user, True)

        headers: dict[str, str] = {'HTTP_AUTHORIZATION': f''}
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json', **headers)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_post_successful_even_if_invalid_authorization_header_set(self) -> None:
        change_is_verified(self.user, True)

        headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer NOTAVALIDTOKEN'}
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json', **headers)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_post_successful_even_if_valid_authorization_header_set(self) -> None:
        change_is_verified(self.user, True)

        headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json', **headers)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_post_missing_required_fields_fails(self) -> None:
        self.request_body: dict[str,str] = {
            "email": "ivanwillams@example.org"
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Request body missing required fields.").content))

    def test_post_incorrect_password_fails(self) -> None:
        self.request_body: dict[str,str] = {
            "email": "ivanwillams@example.org",
            "password": "NOTTHECORRECTPASSWORD"
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED, **{'WWW-Authenticate': 'Bearer'}).content))

    def test_post_user_with_email_does_not_exist_fails(self) -> None:
        self.request_body: dict[str,str] = {
            "email": "DOESNOTEXIST@example.org",
            "password": "Password123@"
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND).content))

    def test_should_not_be_able_to_get_token_if_user_service_is_not_remote(self):
        self.user.service = Services.UNSPLASH
        self.user.save()
        self.user.refresh_from_db()

        response: HttpResponse = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data: dict[str, Any] = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.CONFLICT.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.CONFLICT).content))
'''______________________________________________________________________________________'''

