from rest_framework import serializers


class AuthSerializer(serializers.Serializer):
    """
        Serializer for authenticating the user.
    """
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
'''______________________________________________________________________________________'''
