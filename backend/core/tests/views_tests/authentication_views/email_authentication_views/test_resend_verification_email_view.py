from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.email_handler.email_sender import email_sender
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

import json


class SendVerificationEmailTest(TestCase):
    """
        Unit tests for sending verification email view.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(email="ivanwillams@example.org")
        self.request_body: dict[str,str] = {
            "email": "ivanwillams@example.org",
        }
        self.url = reverse('resend_verification_email')
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_send_verification_email_url(self) -> None:
        self.assertEqual(self.url, f'/resend_verification_email/')
    '''______________________________________________________________________________________'''

    ## Send the varification email to the user's email unit tests.
    def test_sending_verification_email_with_non_existent_user_email(self) -> None:
        self.request_body: dict[str,str] = {
            "email": "unknown@example.org",
        }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with email provided does not exist.").content))
        self.assertEqual(response.status_code,HTTPStatus.NOT_FOUND.value)

    def test_sending_verification_email_with_invalid_user_email(self) -> None:
        self.request_body: dict[str,str] = {
                    "email": "invalidemail",
                }
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')

        self.assertEqual(response.status_code,HTTPStatus.BAD_REQUEST.value)

    def test_sending_verification_email_with_valid_user_email(self) -> None:
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code,HTTPStatus.OK.value)
        response_msg = 'Email has been sent.'
        self.assertEqual(json_response_data, json.loads(email_sender.get_email_verfication_response(response_msg,HTTPStatus.OK).content))
    
    def test_sending_verification_email_to_a_deleted_user_account(self) -> None:
        self.user.delete()
        response = self.client.post(self.url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with email provided does not exist.").content))
        self.assertEqual(response.status_code,HTTPStatus.NOT_FOUND.value)
'''______________________________________________________________________________________'''