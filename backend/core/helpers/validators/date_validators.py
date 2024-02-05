from django.utils import timezone
from django.core.exceptions import ValidationError

from datetime import datetime


def validate_date(value) -> None:
    """Validate dates that are required to be in the past/present."""
    if value > timezone.now().date():
        raise ValidationError("The date cannot be in the future.")
'''______________________________________________________________________________________'''

def validate_year(value) -> None:
    """Validate years that are required to be in the past/present."""
    if value > datetime.today().year:
        raise ValidationError("The year cannot be in the future.")
'''______________________________________________________________________________________'''