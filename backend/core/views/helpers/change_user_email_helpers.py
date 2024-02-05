from core.models.property_models import Property
from core.models.user_models import User

from django.db import transaction

from typing import List

@transaction.atomic
def update_user_created_properties(property_ids: List[int], user: User):
    """Update the creator of the given properties to the given user"""
    for id in property_ids:
        property = Property.objects.get(pk = id)
        property.creator = user
        property.save()

@transaction.atomic
def update_user_owned_properties(property_ids: List[int], user: User):
    """Update the owner of the given properties to the given user"""
    for id in property_ids:
        property = Property.objects.get(pk = id)
        property.owner = user
        property.save()
