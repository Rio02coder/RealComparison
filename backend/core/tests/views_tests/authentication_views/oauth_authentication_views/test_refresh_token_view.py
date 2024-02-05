from django.test import TestCase, override_settings
from django.conf import settings
from django.urls import reverse

from core.models.user_models import User
from core.models.token_models import RefreshToken
from core.authentication.tokens.token_handler import TokenHandler
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.auth_helpers.auth_tester import AuthTester
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.toggler import change_is_verified

from http import HTTPStatus

import json
import time


class RefreshTokenViewTest(TestCase, AuthTester, TokenHandler):
    """
        Unit tests for the refresh token view.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(email="ivanwillams@example.org")
        self.auth_token = self.retrieve_access_token(self.user).key
        self.request_body: dict[str,str] = {
            "token": self.retrieve_refresh_token(self.user).key
        }
        self.url = reverse('refresh_user_token')
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_refresh_token_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/token/refresh/')
    '''______________________________________________________________________________________'''

    ## Token Unit tests.
    def test_post_successful_refresh_authentication(self) -> None:
        change_is_verified(self.user, True)

        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))
        
    def test_post_successful_even_if_empty_authorization_header_set(self) -> None:
        change_is_verified(self.user, True)

        headers: dict[str, str] = {'HTTP_AUTHORIZATION': f''}
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json', **headers)

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_post_successful_even_if_invalid_authorization_header_set(self) -> None:
        change_is_verified(self.user, True)

        headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer NOTAVALIDTOKEN'}
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json', **headers)

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_post_successful_even_if_valid_authorization_header_set(self) -> None:
        change_is_verified(self.user, True)

        headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json', **headers)

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_post_missing_required_fields_fails(self) -> None:
        self.request_body: dict[str,str] = {}

        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Request body missing required fields.").content))

    def test_post_refresh_token_that_does_not_exist_fails(self) -> None:
        self.request_body = {
            "token": "NOTAREFRESHTOKEN"
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED).content))

    def test_post_refresh_token_that_has_been_used_fails(self) -> None:
        token: RefreshToken = self.retrieve_refresh_token(self.user)
        token.used = True
        token.save()

        self.request_body = {
            "token": token.key
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED).content))

    @override_settings(REFRESH_TOKEN_EXPIRY_TIME=1)
    def test_post_refresh_token_that_has_expired_fails(self) -> None:
        self.request_body: dict[str,str] = {
            "token": self.retrieve_refresh_token(self.user).key
        }
        time.sleep(settings.REFRESH_TOKEN_EXPIRY_TIME + 0.1)

        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED).content))
'''______________________________________________________________________________________'''
    