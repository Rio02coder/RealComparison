from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.tests.helpers.auth_helpers.auth_tester import AuthTester
from core.tests.helpers.assertion_helpers.assertion_tester import AssertionTester
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.helpers.customs.custom_response_generator import response_generator
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

import json


class SignUpViewTestCase(TestCase, AuthTester, AssertionTester):
    """
        Tests the Sign Up View.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token = token_handler.retrieve_access_token(self.user).key
        self.url: str = reverse('sign_up')
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": 'Password123@',
        }
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_sign_up_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/signup/standard/')
    '''______________________________________________________________________________________'''

    ## Password validation unit tests.
    def test_password_is_valid(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": 'Password123@',
        }
        self._assert_password_is_valid(self.form_input['password'])
    
    def test_password_cannot_be_valid_without_at_least_1_upper_case_letter(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": 'password123@',
        }  
        self._assert_password_is_invalid(self.form_input['password'])

    def test_password_cannot_be_valid_without_at_least_1_lower_case_letter(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": 'PASSWORD123@',
        }   
        self._assert_password_is_invalid(self.form_input['password'])

    def  test_password_cannot_be_valid_without_at_least_1_special_symbol(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": 'Password123',
        }
        self._assert_password_is_invalid(self.form_input['password'])

    def test_password_cannot_be_valid_without_at_least_1_numerics(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": 'Password@',
        }
        self._assert_password_is_invalid(self.form_input['password'])

    def test_password_cannot_be_valid_with_only_numerics(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": '094681237',
        }
        self._assert_password_is_invalid(self.form_input['password'])

    def test_password_cannot_be_valid_with_only_numerics(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": '',
        }
        self._assert_password_is_invalid(self.form_input['password'])
    '''______________________________________________________________________________________'''

    ## Sign up the user unit tests.
    def test_post_user_with_missing_fields_fails(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": 'Leon',
            "phone_number": '+447413718684',
            "email": 'jebronleon@example.org',
            "password": 'Password123@',
        }
        response = self.client.post(self.url, json.dumps(self.form_input), content_type='application/json')
        json_response_data = json.loads(response.content)
        
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertIn("last_name", json_response_data)

    def test_user_cannot_sign_up_with_the_same_email_twice(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": "Leon",
            "last_name": "Jebron",
            "phone_number": "+447413718684",
            "email": "ivanwillams@example.org",
            "password": "Password123@",
        }
        response = self.client.post(self.url, json.dumps(self.form_input), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.CONFLICT.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.CONFLICT, error_message="User with that email already exists.").content))

    def test_user_cannot_sign_up_without_email(self) -> None:
        self.form_input: dict[str,str] = {
            "first_name": "Leon",
            "last_name": "Jebron",
            "phone_number": "+447413718684",
            "password": "Password123@",
        }
        response = self.client.post(self.url, json.dumps(self.form_input), content_type='application/json')
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="User cannot sign up without an email.").content))

    def test_user_is_successfully_created(self) -> None:
        response = self.client.post(self.url, json.dumps(self.form_input), content_type='application/json')

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
'''______________________________________________________________________________________'''
