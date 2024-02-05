from django.test import TestCase

from core.authentication.services import Services, get_service, get_provider
from core.authentication.providers.unsplash_provider import UnsplashProvider


class ServicesTestCase(TestCase):
    """
        Unit tests for services.py.
    """
    def test_get_service_with_remote(self) -> None:
        self.assertEqual(get_service("remote"), Services.REMOTE)

    def test_get_service_with_unsplash(self) -> None:
        self.assertEqual(get_service("unsplash"), Services.UNSPLASH)

    def test_get_service_with_invalid_service(self) -> None:
        self.assertEqual(get_service("invalid_service"), None)

    def test_get_provider_with_unsplash(self) -> None:
        # Uses api_url to test correct type of object is returned.
        self.assertEqual(get_provider("unsplash").api_url, UnsplashProvider().api_url)

    def test_get_provider_with_invalid_service(self) -> None:
        self.assertEqual(get_provider("invalid_service"), None)
'''______________________________________________________________________________________'''