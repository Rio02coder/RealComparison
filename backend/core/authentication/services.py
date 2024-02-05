from django.db import models
from django.utils.translation import gettext_lazy as _

from .providers.abstract_oauth_provider import AbstractOAuthProvider
from .providers.unsplash_provider import UnsplashProvider


class Services(models.TextChoices):
    REMOTE = 'REMOTE', _('Remote')
    UNSPLASH = 'UNSPLASH', _('Unsplash')
'''______________________________________________________________________________________'''

ENUM_MAP = {
    "remote": Services.REMOTE,
    "unsplash": Services.UNSPLASH
}

PROVIDER_MAP = {
    "unsplash": UnsplashProvider(),
}
'''______________________________________________________________________________________'''

def is_valid_provider(input_name: str) -> bool:
    """Check whether the provider is a valid service."""
    return (input_name.lower() in PROVIDER_MAP)

def is_valid_service(input_name: str) -> bool:
    """Check whether a service is a valid option."""
    return (input_name.lower() in ENUM_MAP)

def get_service(service_name: str) -> Services:
    """Return the service "value" depending on an input "key"."""
    return ENUM_MAP.get(service_name.lower(), None)

def get_provider(provider_name: str) -> AbstractOAuthProvider:
    """Return the provider "value" depending on an input "key"."""
    return PROVIDER_MAP.get(provider_name, None)
'''______________________________________________________________________________________'''