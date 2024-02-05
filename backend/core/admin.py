from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from core.models.user_models import User
from core.models.property_models import Property, PropertyImages, PendingProperty, UserPropertyViewCounts
from core.models.verification_models import VerificationCode
from core.models.token_models import RefreshToken
from core.models.favorite_models import Favorites


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for users."""
    list_display = [
        'pk', 'first_name', 'last_name', 'email', 'phone_number', 'is_active', 'is_staff', 'is_superuser'
    ]
'''______________________________________________________________________________________'''

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for properties."""
    list_display = [
        'street_address', 'city', 'zipcode'
    ]
'''______________________________________________________________________________________'''

@admin.register(RefreshToken)
class RefreshTokenAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for refresh tokens."""
    list_display = [
        'key', 'user', 'used'
    ]
'''______________________________________________________________________________________'''

@admin.register(Favorites)
class FavoritesAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for favorites."""
    list_display = [
        'user', 'property'
    ]
'''______________________________________________________________________________________'''

@admin.register(VerificationCode)
class VerificationCodeAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for verification codes."""
    list_display = [
        'code', 'user', 'property'
    ]
'''______________________________________________________________________________________'''

@admin.register(PendingProperty)
class PendingPropertyAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for the pending properties."""
    list_display = [
        'street_address', 'city', 'zipcode'
    ]
'''______________________________________________________________________________________'''

@admin.register(PropertyImages)
class PropertyImagesAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for the property images."""
    list_display = [
        'property', 'image'
    ]
'''______________________________________________________________________________________'''

@admin.register(UserPropertyViewCounts)
class UserPropertyViewCountsAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for the user-property view counts."""
    list_display = [
        'user', 'property', 'view_count'
    ]
'''______________________________________________________________________________________'''
