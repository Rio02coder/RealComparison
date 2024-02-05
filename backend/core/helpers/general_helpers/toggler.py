from core.models.property_models import Property


def change_for_sale(property: Property, new_value: bool) -> None:
    """Toggle the 'for sale' flag of a property."""    
    property.for_sale = new_value
    property.save()
'''______________________________________________________________________________________'''

def change_is_verified(object, new_value:bool) -> None:
    """Toggle the 'is verified' flag of a user/property objects."""
    object.is_verified = new_value
    object.save()
'''______________________________________________________________________________________'''