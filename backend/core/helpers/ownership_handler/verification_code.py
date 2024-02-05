from django.conf import settings

from random import randint


VERIFICATION_CODE_LOWER_BOUND = 10 ** (settings.VERIFICATION_CODE_DIGIT_LENGTH - 1)
VERIFICATION_CODE_UPPER_BOUND = (10 ** settings.VERIFICATION_CODE_DIGIT_LENGTH) - 1

# Used for the verification process for approving a property ownership.
def generate_verification_code():
    """
        Generates a random number based on the constraints of the VERIFICATION_CODE_DIGIT_LENGTH in settings.py.
    """
    return randint(VERIFICATION_CODE_LOWER_BOUND, VERIFICATION_CODE_UPPER_BOUND)
'''______________________________________________________________________________________'''