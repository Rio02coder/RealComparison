from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

from .user_models import User
from .property_models.property_model import Property
from core.helpers.ownership_handler.verification_code import VERIFICATION_CODE_LOWER_BOUND, VERIFICATION_CODE_UPPER_BOUND, generate_verification_code

from datetime import datetime


class VerificationCode(models.Model):
    """
        Model used to store a verification code associated with a user.
    """
    code: int = models.IntegerField(validators=[
        MinValueValidator(VERIFICATION_CODE_LOWER_BOUND),
        MaxValueValidator(VERIFICATION_CODE_UPPER_BOUND)
    ], unique=True)
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    property: Property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created: datetime = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'property',)

    def save(self, *args, **kwargs) -> None:
        new_code: int = generate_verification_code()

        while (VerificationCode.objects.filter(code=new_code).exists()):
            new_code = generate_verification_code()

        self.code: int = new_code
        super().save(*args, **kwargs)  # Call the "real" save() method.
'''______________________________________________________________________________________'''