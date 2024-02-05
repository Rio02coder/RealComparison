from django.forms import EmailField

from rest_framework import serializers


class UserEmailSerializer(serializers.Serializer):
    """
        Serializer for validating a user's email address in a request.
    """
    email: EmailField = serializers.EmailField(required=True)
'''______________________________________________________________________________________'''