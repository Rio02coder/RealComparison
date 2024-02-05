from django.test import TestCase, override_settings
from django.utils import timezone

from core.models.user_models import User 
from core.models.token_models import RefreshToken
from core.tests.fixtures.fixture_handler import FixtureHandler

from datetime import timedelta


class RefreshTokenTestCase(TestCase):
    """
        Tests the RefreshToken Model.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()
    
    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.refresh_tokens = RefreshToken.objects.filter(user=self.user)
    '''______________________________________________________________________________________'''

    ## Refresh token unit tests.
    def test_user_should_have_an_initial_refresh_token(self) -> None:
        if len(list(self.refresh_tokens)) == 0:
            self.fail("Initial Refresh Token not created for User...")

    def test_default_key_is_not_used(self) -> None:
        self.assertFalse(self.refresh_tokens.first().used)       

    def test_created_timestamp_is_before_now(self) -> None:
        created = self.refresh_tokens.first().created

        self.assertLess(created - timezone.now(), timedelta(seconds = 0))

    @override_settings(MAX_STORED_REFRESH_TOKENS=1)
    def test_there_cannot_be_more_than_the_max_tokens_stored(self) -> None:
        previous_token = self.refresh_tokens.first()
        new_token = RefreshToken.objects.create(user=self.user)

        self.assertEqual(RefreshToken.objects.filter(user=self.user).count(), 1)
        self.assertNotEqual(previous_token, new_token)
'''______________________________________________________________________________________'''