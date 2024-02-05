from django.test import TestCase, override_settings
from django.conf import settings

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.token_models import RefreshToken
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import TokenHandler

import time


class TokenHandlerTestCase(TestCase):
    """
        Unit tests for the TokenHandler.
    """
    fixtures = FixtureHandler([(User, True), (User, False)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(pk=1)
        self.handler = TokenHandler()
    '''______________________________________________________________________________________'''

    ## Token handler unit tests.
    @override_settings(ACCESS_TOKEN_EXPIRY_TIME=1)
    def test_token_expire_handler_has_expired(self) -> None:
        token = Token.objects.get(user=self.user)
        time.sleep(1.1)

        token_before_count = Token.objects.count()
        self.handler.token_expire_handler(token, settings.ACCESS_TOKEN_EXPIRY_TIME)
        token_after_count = Token.objects.count()

        self.assertEqual(token_before_count, token_after_count)
        self.assertNotEqual(token, Token.objects.get(user=self.user))

    def test_retrieve_access_token_with_no_tokens(self) -> None:
        Token.objects.filter(user=self.user).delete()

        token_before_count = Token.objects.count()
        self.handler.retrieve_access_token(self.user)
        token_after_count = Token.objects.count()

        self.assertEqual(token_before_count+1, token_after_count)

    def test_retrieve_refresh_token_with_no_tokens(self) -> None:
        RefreshToken.objects.filter(user=self.user).delete()

        token_before_count = RefreshToken.objects.count()
        self.handler.retrieve_refresh_token(self.user)
        token_after_count = RefreshToken.objects.count()

        self.assertEqual(token_before_count+1, token_after_count)
'''______________________________________________________________________________________'''