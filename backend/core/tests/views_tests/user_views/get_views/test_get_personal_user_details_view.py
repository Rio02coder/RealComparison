from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.serializers import UserSerializer
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

import json


class GetPersonalUserDetailsViewTestCase(TestCase):
    """
        Tests the Get Personal User Details View.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(email="ivanwillams@example.org")
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('user_personal_profile')
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_get_user_details_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/profile/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Retrive the user details unit tests.
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
        self.url = reverse('user_personal_profile')
        response = self.client.get(self.url, **self.headers)
        json_response_data = json.loads(response.content) 

        user_fields = list(UserSerializer().fields.keys())
        user_fields.remove("password")

        for field in user_fields:
            self.assertIn(field, json_response_data)

        self.assertEqual(len(json_response_data.keys()), len(user_fields))
        self.assertEqual(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''