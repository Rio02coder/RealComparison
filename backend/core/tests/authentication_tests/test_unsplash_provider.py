from django.test import TestCase

from core.authentication.providers.unsplash_provider import UnsplashProvider
from core.helpers.customs.custom_exceptions import InvalidCredentialsError


class UnsplashProviderTestCase(TestCase):
    """
        Unit tests for the Unsplash Provider.
    """
    def setUp(self) -> None:
        self.unsplash_provider = UnsplashProvider()
    '''______________________________________________________________________________________'''

    ## Unsplash provider unit tests.
    def test_api_url(self) -> None:
        self.assertEqual(self.unsplash_provider.api_url, "https://api.unsplash.com")

    def test_invalid_token_raises_InvalidCredentialsError(self) -> None:
        with self.assertRaises(InvalidCredentialsError):
            self.unsplash_provider.get_user_data("INVALID_TOKEN")
'''______________________________________________________________________________________'''