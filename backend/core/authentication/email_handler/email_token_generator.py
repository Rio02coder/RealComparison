from django.contrib.auth.tokens import PasswordResetTokenGenerator

import six


class TokenGenerator(PasswordResetTokenGenerator): 
    """
        Generate a unique token for a registered user.
    """
    def _make_hash_value(self, user, timestamp) -> str:
        return six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_verified)
'''______________________________________________________________________________________'''

user_activation_token = TokenGenerator()