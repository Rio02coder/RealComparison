from core.models.user_models import User
from core.models.property_models import Property
from core.models.verification_models import VerificationCode


def change_property_owner(property: Property, new_owner: User) -> None:
    """Change the current owner of the property to a given user."""
    property.owner = new_owner
    property.save()
'''______________________________________________________________________________________'''

def request_ownership(property: Property, new_owner: User) -> None:
    """Make an ownership request for a given user."""
    VerificationCode.objects.create(user=new_owner, property=property)
'''______________________________________________________________________________________'''

def is_authorized(user: User, property:Property) -> bool:
    """Check if the user has the authorization to handle actions for a property."""
    return ((property.owner == None and property.creator == user) or (property.owner == user))
'''______________________________________________________________________________________'''
