from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.token_models import RefreshToken
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus


class DeleteUserAccountViewTestCase(TestCase):
    """
        Tests the Delete User Account View.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(email="ivanwillams@example.org")
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('user_personal_profile')
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_delete_user_account_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/profile/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Delete user account unit tests.
    def test_user_account_is_deleted_successfully(self) -> None:
        response = self.client.delete(self.url, **self.headers)

        self.assertEqual(0, User.objects.filter(pk=self.user.pk).count())
        self.assertEqual(0, Token.objects.filter(user=self.user).count())
        self.assertEqual(0, RefreshToken.objects.filter(user=self.user).count())

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''