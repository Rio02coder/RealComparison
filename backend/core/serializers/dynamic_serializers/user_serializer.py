from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password

from core.models.user_models import User
from core.serializers.model_serializers import DynamicFieldsModelSerializer
from core.serializers.dynamic_serializers.property_serializer import PropertySerializer
from core.helpers.customs.custom_exceptions import InvalidSerializerMethodError


class UserSerializer(DynamicFieldsModelSerializer):
    """
        A DynamicFieldsModelSerializer for the User model.
        Should be used for returning User data and creating new User objects.
        To only return particular fields of the User data, pass the Serializer a fields parameter as a list of field names.
    """
    favorites = PropertySerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'id', 
            'first_name', 
            'last_name', 
            'phone_number', 
            'email',
            'service',
            'is_verified',
            'is_active',
            'is_staff',
            'date_joined',
            'favorites',
            'password'
        ]
        read_only_fields = ('id', 'service', 'is_verified', 'is_active', 'is_staff', 'date_joined')
        extra_kwargs = {
            'password': {'required': True, 'write_only': True},
        } 

    def validate_password(self, value):
        validate_password(value) # Performs validation checks on new_password. Will raise a ValidationError if a validator fails.
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        raise InvalidSerializerMethodError("Do NOT use UserSerializer for updating User objects. Use the UpdateUserSerializer instead.")
'''______________________________________________________________________________________'''