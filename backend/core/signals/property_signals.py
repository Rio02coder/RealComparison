from django.db.models.signals import post_save
from django.dispatch import receiver

from core.models.property_models import PendingProperty, Property
from core.ML_algorithms.AI_models.AbstractMLRegressionModel import AbstractMLRegressionModel
from core.helpers.validators.price_validators import validate_price
from core.helpers.general_helpers.toggler import change_is_verified
from core.ML_algorithms.helpers.ML_regressors import ML_REGRESSOR_MAP

from RealComparison.settings import CURRENT_ML_REGRESSOR


@receiver(post_save, sender= PendingProperty)
def approve_pending_property(sender, instance=None, **kwargs) -> None:
    """Check the property does not contain null fields before approving it."""
    any_null_fileds = False
    non_required_fields = ['owner', 'predicted_price']
    required_fields = [field.name for field in PendingProperty._meta.fields if field.name not in non_required_fields]

    # Checks if a field is not filled yet.
    for field in required_fields:
        if getattr(instance, field) is None:
            any_null_fileds = True

    if not any_null_fileds:
        approved_prop = Property.objects.get(pk=instance.pk)

        # Remove the property from pending. 
        instance.delete(keep_parents=True)

        # Change the state of the approved property.
        change_is_verified(approved_prop, True)

        # Assign a predicted price when the property is approved.
        ml_regressor:AbstractMLRegressionModel = ML_REGRESSOR_MAP.get(CURRENT_ML_REGRESSOR)
        approved_prop.predicted_price = validate_price(ml_regressor.get_predictions([approved_prop])[0])
        approved_prop.save()
'''______________________________________________________________________________________'''