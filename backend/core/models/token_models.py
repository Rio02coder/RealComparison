from django.db import models
from django.utils import timezone
from django.conf import settings

from .user_models import User

from datetime import datetime

import hashlib


class RefreshToken(models.Model):
    """
        Model used to store the refresh token of the user.
    """
    key: str = models.CharField(primary_key=True, max_length=500)
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    used: bool = models.BooleanField(default=False)
    created: datetime = models.DateTimeField(default=timezone.now)

    # Generates a token using the user's email, hashed password and the current datetime.
    def save(self, *args, **kwargs) -> None:
        user_tokens: list[RefreshToken] = list(RefreshToken.objects.filter(user=self.user).order_by('created'))

        # Delete oldest refresh token if max number of stored token is reached.
        if len(user_tokens) == settings.MAX_STORED_REFRESH_TOKENS:
            user_tokens[0].delete()

        self.key: str = hashlib.sha224(f"{self.user.email}{self.user.password}{datetime.now()}".encode()).hexdigest()
        super().save(*args, **kwargs)  # Call the "real" save() method.
'''______________________________________________________________________________________'''