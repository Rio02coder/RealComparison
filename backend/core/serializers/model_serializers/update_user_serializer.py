from rest_framework import serializers

from core.models.user_models import User
from core.helpers.customs.custom_exceptions import InvalidSerializerMethodError


# NOTE: Should be used for updating User data.

class UpdateUserSerializer(serializers.ModelSerializer):
    """
        A ModelSerializer for the User model.
    """
    class Meta:
        model = User
        fields = [
            'first_name', 
            'last_name', 
            'phone_number', 
        ]
        extra_kwargs = {
            "first_name": {"required": False},
            "last_name": {"required": False},
            "phone_number": {"required": False},
        }

    def create(self, validated_data):
        raise InvalidSerializerMethodError("Do NOT use UpdateUserSerializer for creating User objects. Use the UserSerializer instead.")
'''______________________________________________________________________________________'''