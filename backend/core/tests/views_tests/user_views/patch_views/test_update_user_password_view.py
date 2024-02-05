from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from django.contrib.auth.hashers import check_password

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.assertion_helpers.assertion_tester import AssertionTester
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

import json


class ChangeUserPasswordViewTestCase(TestCase, AssertionTester):
    """
        Tests the Change User Details View.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(email="ivanwillams@example.org")
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('change_user_password')
        self.form_input: dict[str,str] = {
            "current_password": 'Password123@',
            "new_password": 'NewPassword123@',
        }
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_change_user_password_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/profile/change/password/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## New password validation unit tests.
    def test_new_password_is_valid(self) -> None:
        self.form_input: dict[str, str] = {
            "current_password": 'Password123@',
            "new_password": 'NewPassword123@',
        }
        self._assert_password_is_valid(self.form_input['new_password'])
    
    def test_new_password_cannot_be_valid_without_at_least_1_upper_case_letter(self) -> None:
        self.form_input: dict[str, str] = {
            "current_password": 'Password123@',
            "new_password": 'newpassword123@',
        }   
        self._assert_password_is_invalid(self.form_input['new_password'])

    def test_new_password_cannot_be_valid_without_at_least_1_lower_case_letter(self) -> None:
        self.form_input: dict[str, str] = {
            "current_password": 'Password123@',
            "new_password": 'NEWPASSWORD123@',
        } 
        self._assert_password_is_invalid(self.form_input['new_password'])

    def  test_new_password_cannot_be_valid_without_at_least_1_special_symbol(self) -> None:
        self.form_input: dict[str, str] = {
            "current_password": 'Password123@',
            "new_password": 'NewPassword123',
        }
        self._assert_password_is_invalid(self.form_input["new_password"])

    def test_new_password_cannot_be_valid_without_at_least_1_numerics(self) -> None:
        self.form_input: dict[str, str] = {
            "current_password": 'Password123@',
            "new_password": 'NewPassword@',
        }
        self._assert_password_is_invalid(self.form_input['new_password'])

    def test_new_password_cannot_be_valid_with_only_numerics(self) -> None:
        self.form_input: dict[str, str] = {
            "current_password": 'Password123@',
            "new_password": '094681237',
        }
        self._assert_password_is_invalid(self.form_input['new_password'])

    def test_new_password_cannot_be_null(self) -> None:
        self.form_input: dict[str, str] = {
            "current_password": 'Password123@',
            "new_password": '',
        }
        self._assert_password_is_invalid(self.form_input['new_password'])
    '''______________________________________________________________________________________'''

    ## Change the user password.
    def test_change_password_without_required_fields_fails(self) -> None:
        self.form_input: dict[str,str] = {
            "new_password": 'NewPassword123@',
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        json_response_data = json.loads(response.content)

        self.assertIn("current_password", json_response_data)
        self.assertEqual(response.status_code,  HTTPStatus.BAD_REQUEST.value)

    def test_change_password_with_wrong_authorization_password_fails(self) -> None:
        self.form_input: dict[str,str] = {
            "current_password": 'WrongPassword123@',
            "new_password": 'NewPassword123@',
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)

    def test_change_user_password_was_successful(self) -> None:
        try:
            old_token = Token.objects.get(user=self.user)
            response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
            self.user.refresh_from_db()
            new_token = Token.objects.get(user=self.user)
        except ObjectDoesNotExist:
            self.fail("Could not retrieve the user token.")

        self.assertTrue(check_password(self.form_input['new_password'], self.user.password))
        self.assertNotEqual(old_token, new_token)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''