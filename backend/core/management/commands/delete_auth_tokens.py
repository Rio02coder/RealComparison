from django.core.management import BaseCommand
from django.utils import timezone

from rest_framework.authtoken.models import Token

from core.models.token_models import RefreshToken


class Command(BaseCommand):
    """
        Deletes auth tokens for all User objects.
    """
    def handle(self, *args, **options) -> None:
        start_time = timezone.now()
        Token.objects.all().delete()
        RefreshToken.objects.all().delete()

        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"SUCCESS! Deleted all user auth tokens. The command took: {(end_time-start_time).total_seconds()} seconds."
            )
        )
'''______________________________________________________________________________________'''