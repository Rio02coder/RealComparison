from django.test import TestCase
from django.urls import reverse

from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

import json


class OAuthSignUpViewTestCase(TestCase):
    """
        Tests the OAuth Sign Up View.
    """
    def setUp(self) -> None:
        self.url: str = reverse('oauth_sign_up')
        self.request_body: dict[str,str] = {
            "token": "skdfbkjs3e2398329fhf98dh8f",  # NOTE: Not a real token.
            "provider": 'unsplash',
        }
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_oauth_sign_up_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/signup/oauth/')
    '''______________________________________________________________________________________'''

    ## Sign in the user through the OAuth service.
    def test_post_with_missing_token_field_is_invalid(self) -> None:
        self.request_body = {
            "provider": 'unsplash',
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Request body missing required fields.").content))
        
    def test_post_with_missing_provider_field_is_invalid(self) -> None:
        self.request_body = {
            "token": "skdfbkjs3e2398329fhf98dh8f",
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Request body missing required fields.").content))

    def test_post_with_invalid_provider_value_is_invalid(self) -> None:
        self.request_body = {
            "token": "skdfbkjs3e2398329fhf98dh8f",
            "provider": "tesco"
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Invalid provider in request body.").content))
'''______________________________________________________________________________________'''