from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers


class ChangePasswordSerializer(serializers.Serializer):
    """
        Serializer for password change endpoint.
    """
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value) # Performs validation checks on new_password. Will raise a ValidationError is a validator fails.
        return value
'''______________________________________________________________________________________'''