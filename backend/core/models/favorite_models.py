from django.db import models

from .user_models import User
from .property_models.property_model import Property


class Favorites(models.Model):
    """
        Model represting the properties that are favorited by a user.
    """
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    property: Property = models.ForeignKey(Property, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'property',)
'''______________________________________________________________________________________'''