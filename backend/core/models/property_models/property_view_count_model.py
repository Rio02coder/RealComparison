from django.db import models
from django.core.validators import MinValueValidator

from core.models.user_models import User
from .property_model import Property


class UserPropertyViewCounts(models.Model):
    """
        Model representing the number of times properties are viewed by users.
    """
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    property: Property = models.ForeignKey(Property, on_delete=models.CASCADE)
    view_count: int = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    time_stamp: float = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user', 'property',)
'''______________________________________________________________________________________'''