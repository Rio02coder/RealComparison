from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from core.authentication.email_handler.email_token_generator import user_activation_token


class EmailTester:
    """
        Helper class for testing operations related to email verification.
    """
    def get_user_token(self) -> str:
        return user_activation_token.make_token(self.user)

    def get_user_uid(self, user_pk: int) -> str:
        return urlsafe_base64_encode(force_bytes(user_pk))

    def verify_user_email(self, user_pk: int) -> list:
        uid = self.get_user_uid(user_pk)
        token = self.get_user_token()
        url = reverse('verify_email', kwargs={'uid': uid, 'token': token})
        response = self.client.get(url)
        return [response,url]
'''______________________________________________________________________________________'''