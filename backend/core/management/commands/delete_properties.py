from time import time
from django.core.management import BaseCommand
from django.utils import timezone

from core.models.property_models import Property


class Command(BaseCommand):
    """
        Generates auth tokens for all User objects.
    """
    def handle(self, *args, **options) -> None:
        start_time = timezone.now()
        Property.objects.all().delete()

        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"SUCCESS! All properties have been deleted. The command took: {(end_time-start_time).total_seconds()} seconds."
            )
        )
'''______________________________________________________________________________________'''