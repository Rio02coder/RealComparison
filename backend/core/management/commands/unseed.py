from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models.user_models import User


class Command(BaseCommand):
    """
        The database unseeder removing all fake uesrs.
    """
    def handle(self, *args, **options):
        start_time = timezone.now()
        User.objects.all().delete()

        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"Success! All users have been deleted from the system. The command took: {(end_time-start_time).total_seconds()} seconds."
            )
        )
'''______________________________________________________________________________________'''