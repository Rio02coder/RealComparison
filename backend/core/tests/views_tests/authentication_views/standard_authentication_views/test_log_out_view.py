from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.token_models import RefreshToken
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus


class LogOutViewTest(TestCase):
    """
        Unit tests for the the Log Out view.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(email="ivanwillams@example.org")
        self.auth_token = token_handler.retrieve_access_token(self.user).key
        self.headers = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url = reverse('log_out')
    '''______________________________________________________________________________________'''
    
    ## URL Unit tests.
    def test_log_out_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/logout/')
    '''______________________________________________________________________________________'''

    ## Authentication Unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Log out the user unit tests.
    def test_get_log_out_is_successful(self) -> None:
        response = self.client.get(self.url, **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertEqual(0, Token.objects.filter(user=self.user).count())
        self.assertEqual(0, RefreshToken.objects.filter(user=self.user).count())
'''______________________________________________________________________________________'''