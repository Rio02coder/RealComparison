from django.core.management import BaseCommand
from django.utils import timezone

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.token_models import RefreshToken


class Command(BaseCommand):
    """
        Generates auth tokens for all User objects.
    """
    def handle(self, *args, **options):
        start_time = timezone.now()
        for user in User.objects.all():
            Token.objects.get_or_create(user=user)
            RefreshToken.objects.get_or_create(user=user)
            
        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"SUCCESS! All user auth & refresh tokens have been generated. The command took: {(end_time-start_time).total_seconds()} seconds."
            )
        )
'''______________________________________________________________________________________'''       