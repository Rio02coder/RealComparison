from django.test import TestCase, override_settings

from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_authenticator import TokenAuthentication

import time


class TokenAuthenticatorTestCase(TestCase):
    """
        Unit tests for the TokenAuthenticator.
    """
    fixtures = FixtureHandler([(User, True), (User, False)]).getFixtures()

    def setUp(self) -> None:
        self.authenticator = TokenAuthentication()
    '''______________________________________________________________________________________'''

    ## Token authenticator unit tests.
    def test_invalid_token_raises_AuthenticationFailed(self) -> None:
        with self.assertRaises(AuthenticationFailed):
            self.authenticator.authenticate_credentials("NOTAVALIDTOKEN")

    def test_inactive_user_raises_AuthenticationFailed(self) -> None:
        user = User.objects.get(pk=1)
        user.is_active = False
        user.save()

        with self.assertRaises(AuthenticationFailed):
            self.authenticator.authenticate_credentials(Token.objects.get(user=user))

    @override_settings(ACCESS_TOKEN_EXPIRY_TIME=1)
    def test_expired_token_raises_AuthenticationFailed(self) -> None:
        user = User.objects.get(pk=1)
        user.is_active = True
        user.save()

        time.sleep(1.1)
        with self.assertRaises(AuthenticationFailed):
            self.authenticator.authenticate_credentials(Token.objects.get(user=user))
'''______________________________________________________________________________________'''