from rest_framework import serializers

from core.helpers.ownership_handler.verification_code import VERIFICATION_CODE_LOWER_BOUND, VERIFICATION_CODE_UPPER_BOUND


class VerificationCodeSerializer(serializers.Serializer):
    """
        Serializer for passing a verification code.
    """
    verification_code = serializers.IntegerField(required=True, min_value=VERIFICATION_CODE_LOWER_BOUND, max_value=VERIFICATION_CODE_UPPER_BOUND)
'''______________________________________________________________________________________'''