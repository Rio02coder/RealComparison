from django.test import TestCase
from django.conf import settings

from rest_framework.authtoken.models import Token

from core.models import Favorites, User, RefreshToken
from core.authentication.tokens.token_handler import TokenHandler
from core.tests.fixtures.fixture_handler import FixtureHandler

from http import HTTPStatus

import json


class GetAuthTokenResponseTest(TestCase, TokenHandler):
    """
        Unit tests for the the get_auth_token_response helper function.
    """
    fixtures = FixtureHandler([(User, True), (User, False)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(email="ivanwillams@example.org")
    '''______________________________________________________________________________________'''

    def test_all_fields_are_returned(self):
        response = self.get_auth_token_response(self.user)
        content = json.loads(response.content)

        self.assertIn("token", content)
        self.assertIn("access", content["token"])
        self.assertIn("refresh", content["token"])
        self.assertIn("expires_in", content["token"])

    def test_default_status_code(self):
        response = self.get_auth_token_response(self.user)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_custom_status_code(self):
        response = self.get_auth_token_response(self.user, http_status=HTTPStatus.CREATED)
        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)

    def test_returned_access_token_is_valid(self):
        response = self.get_auth_token_response(self.user)
        content = json.loads(response.content)
        access_token = content["token"]["access"]

        try:
            token = Token.objects.get(key=access_token)
        except:
            self.fail("Could not retrieve Token object from response's access token...")

        self.assertFalse(self.is_expired(token, settings.ACCESS_TOKEN_EXPIRY_TIME))
        self.assertEqual(self.user, token.user)

    def test_returned_refresh_token_is_valid(self):
        response = self.get_auth_token_response(self.user)
        content = json.loads(response.content)
        refresh_token = content["token"]["refresh"]

        try:
            token = RefreshToken.objects.get(key=refresh_token)
        except:
            self.fail("Could not retrieve RefreshToken object from response's refresh token...")

        self.assertFalse(self.is_expired(token, settings.REFRESH_TOKEN_EXPIRY_TIME))
        self.assertEqual(self.user, token.user)
        self.assertFalse(token.used)

    def test_expires_in_is_valid(self):
        response = self.get_auth_token_response(self.user)
        content = json.loads(response.content)
        expires_in = content["token"]["expires_in"]

        self.assertGreater(expires_in, 0)
        self.assertLessEqual(expires_in, settings.ACCESS_TOKEN_EXPIRY_TIME)

    def test_user_data_is_returned(self):
        response = self.get_auth_token_response(self.user)
        content = json.loads(response.content)

        self.assertIn("user", content)

        user_data = content["user"]
        self.assertIn("favorites", user_data)
        self.assertEqual(len(user_data["favorites"]), Favorites.objects.filter(user=self.user).count())
'''______________________________________________________________________________________'''
