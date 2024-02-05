from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver

from rest_framework.authtoken.models import Token

from core.models.token_models import RefreshToken


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs) -> None:
    """Automatically generates auth token for a newly created User object."""
    if created:
        Token.objects.create(user=instance)
'''______________________________________________________________________________________'''

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_refresh_token(sender, instance=None, created=False, **kwargs) -> None:
    """Automatically generates refresh token for a newly created User object."""
    if created:
        RefreshToken.objects.create(user=instance)
'''______________________________________________________________________________________'''