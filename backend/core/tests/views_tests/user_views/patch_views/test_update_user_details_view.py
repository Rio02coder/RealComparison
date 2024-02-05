from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

from typing import Dict

import json


class UpdateUserDetailsViewTestCase(TestCase):
    """
        Tests the Update User Details View.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()
    
    def setUp(self) -> None:
        self.user: User = User.objects.get(email="ivanwillams@example.org")
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('update_user_details')
        self.form_input: dict[str,str] = {
            "first_name": "Ivan",
            "last_name": 'Jebron',
            "phone_number": '+447413718684',
        }
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_get_user_details_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/profile/update/details/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Update user details view unit tests.
    def test_update_user_details_without_providing_any_details_fails(self) -> None:
        self.form_input: Dict[str, str] = {
            "first_name": "",
            "last_name": "",
            "phone_number": "",
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEquals(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_update_user_details_with_a_invalid_first_name_fails(self) -> None:
        self.form_input: Dict[str, str] = {
            "first_name": "Ivan7",
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
    
    def test_update_user_details_with_a_invalid_phone_number_fails(self) -> None:
        self.form_input: Dict[str, str] = {
            "phone_number": "354363",
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_update_user_details_with_a_invalid_last_name_fails(self) -> None:
        self.form_input: Dict[str, str] = {
            "last_name": "Dope23",
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_update_user_details_with_only_one_of_the_details_passes(self) -> None:
        self.form_input: Dict[str, str] = {
            "first_name": "George",
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        json_response_data = json.loads(response.content)
        self.user.refresh_from_db()

        self.assertEqual(json_response_data['id'], self.user.id)
        self.assertEqual(json_response_data['first_name'], self.user.first_name)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_update_user_details_was_successful(self) -> None:
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        json_response_data = json.loads(response.content)
        self.user.refresh_from_db()

        self.assertEqual(json_response_data['id'], self.user.id)
        self.assertEqual(json_response_data['first_name'], self.user.first_name)
        self.assertEqual(json_response_data['last_name'], self.user.last_name)
        self.assertEqual(json_response_data['phone_number'], self.user.phone_number)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''