from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.tests.helpers.auth_helpers.auth_tester import AuthTester
from core.tests.helpers.email_helpers.email_tester import EmailTester
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.email_handler.email_sender import email_sender
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

import json
import sys


class VerifyEmailViewTest(TestCase, AuthTester, EmailTester):
    """
        Unit tests for the verify email view.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(email="ivanwillams@example.org")
        self.request_body: dict[str,str] = {
            "email": "ivanwillams@example.org",
            "password": "Password123@"
        }
        self.url = reverse('verify_email', kwargs={'uid': self.get_user_uid(self.user.pk), 'token': self.get_user_token()})
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_send_verification_email_url(self) -> None:
        self.assertEqual(self.url, f'/verify_email/{self.get_user_uid(self.user.pk)}/{self.get_user_token()}/')
    '''______________________________________________________________________________________'''

    ## Verify the user's email unit tests.
    def test_user_cannot_log_in_without_verifiying_their_email(self) -> None:
        login_url = reverse('user_auth_token')
        response = self.client.post(login_url, json.dumps(self.request_body), content_type='application/json')
        json_response_data = json.loads(response.content)
        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN)
        response_msg = 'Your email has not been verified.'
        self.assertEqual(json_response_data, json.loads(email_sender.get_email_verfication_response(response_msg,HTTPStatus.UNAUTHORIZED).content))

    def test_successful_email_verification(self) -> None:
        result = self.verify_user_email(self.user.pk)
        response = result[0]
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_verified)

    def test_user_can_log_in_after_successful_email_verification(self) -> None:
        result = self.verify_user_email(self.user.pk)
        self.assertEqual(result[0].status_code, HTTPStatus.FOUND)
        self.user.refresh_from_db()
        login_url = reverse('user_auth_token')
        response = self.client.post(login_url, json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertTrue(self.is_auth_response_content_valid(response.content, self.user))

    def test_email_verification_with_invalid_user_id(self) -> None:
        invalid_id = sys.maxsize
        result = self.verify_user_email(invalid_id)
        response = result[0]
        self.assertEqual(response.status_code,HTTPStatus.NOT_FOUND.value)
        json_response_data = json.loads(response.content)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND).content))

    def test_expiry_of_verification_email(self) -> None:
        # First time the user clicks the link it will open verify the user.
        result = self.verify_user_email(self.user.pk)
        response = result[0]
        self.user.refresh_from_db()
        self.assertEqual(result[0].status_code,HTTPStatus.FOUND.value)
        
        # The link should expire after it has been used once.
        url = result[1]
        response = self.client.get(url)
        json_response_data = json.loads(response.content)
        response_msg = 'The link has expired.'
        self.assertEqual(response.status_code,HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(email_sender.get_email_verfication_response(response_msg,HTTPStatus.BAD_REQUEST).content))
'''______________________________________________________________________________________'''






