from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator, MinLengthValidator
from django.utils.translation import gettext_lazy as _

from core.authentication.services import Services
from core.recommender.property_recommender import recommender_obj

from datetime import datetime

from phonenumber_field.modelfields import PhoneNumberField

from typing import Union


class UserManager(BaseUserManager):
    """
        User Manger Model.
    """
    use_in_migrations = True

    def _create_user(self, email: str, password: str, **extra_fields) -> 'User':
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The user must provide an email!')
        email = self.normalize_email(email)
        user = self.model(email = email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_user(self, email: str, password: Union[str, None], **extra_fields) -> 'User':
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email: str, password: str, **extra_fields) -> 'User':
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff = True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser = True.")

        return self._create_user(email, password, **extra_fields)
'''______________________________________________________________________________________'''

class User(AbstractBaseUser, PermissionsMixin):
    """
        Model used to store information about the user.
    """
    first_name: str = models.CharField(
        _('First name'),
        max_length=1000,
        blank = False,
        validators=[
            RegexValidator(
                regex = r'^[-a-zA-Z]+$',
                message = "Your first name must contain only letters!"
            )
        ],
    )
    last_name: str = models.CharField(
        _('Last name'),
        max_length=1000,
        blank = False,
        validators=[
            RegexValidator(
                regex = r'^[-a-zA-Z]+$',
                message = "Your last name must contain only letters!"
            )
        ],
    )
    phone_number: PhoneNumberField = PhoneNumberField(_('Phone number'), blank=True, validators=[MinLengthValidator(4)])
    email: str = models.EmailField(_('Email address'), blank=False, unique=True)

    service: Services = models.CharField(max_length=100, choices=Services.choices, default=Services.REMOTE)

    date_joined: datetime = models.DateField(auto_now_add=True)

    is_verified: bool = models.BooleanField(default=False)
    is_active: bool = models.BooleanField(default=True)
    is_staff: bool = models.BooleanField(default=False)
    is_superuser: bool = models.BooleanField(default=False)

    objects: UserManager = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self) -> str:
        """Return the full name of the user."""
        return f'{self.first_name} {self.last_name}'

    @property
    def favorites(self):
        """Return all properties favorited by a user."""
        from .favorite_models import Favorites
        return list(map(lambda x: x.property, Favorites.objects.select_related().filter(user=self)))

    @property
    def recommendations(self):
        """Return all properties recommended to a user. """
        from .favorite_models import Favorites
        from .property_models.property_model import Property
        recommender_obj.set_favorites(Favorites.objects.filter(user=self))
        recommender_obj.set_properties(Property.objects.all())
        return recommender_obj.get_recommended_properties() 
'''______________________________________________________________________________________'''