from django.http import JsonResponse
from django.conf import settings
from django.utils import timezone

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.token_models import RefreshToken
from core.helpers.customs.custom_exceptions import ExpiredTokenError
from core.serializers.dynamic_serializers.user_serializer import UserSerializer

from http import HTTPStatus

from datetime import datetime, timedelta

from typing import Tuple


class TokenHandler:
    """
        Handles the operations related to a user's token.
    """ 
    # Erkebulan Duisebay (2018) Django Rest Framework DRF token authentication with expires in (Version unknown) [Source code]. https://medium.com/@yerkebulan199/django-rest-framework-drf-token-authentication-with-expires-in-a05c1d2b7e05
    def expires_in(self,object, expiry_time: float) -> datetime: 
        """Retrun time left before token's expiry."""
        time_elapsed: datetime = timezone.now() - object.created
        left_time: datetime = timedelta(seconds = expiry_time) - time_elapsed
        return left_time

    def is_expired(self,object, expiry_time: float) -> bool:
        """Check of the token has expried or not."""
        return self.expires_in(object, expiry_time) < timedelta(seconds = 0)

    # If token has expired new token will be established.
    # If token has expired then it will be removed
    # and new one with different key will be created.
    def token_expire_handler(self,token: Token, expiry_time: float) -> Tuple[bool, Token]: 
        has_expired: bool = self.is_expired(token, expiry_time)
        if has_expired:
            token.delete()
            token: Token = Token.objects.create(user = token.user)
        return has_expired, token
    '''______________________________________________________________________________________'''

    def regenerate_auth_token(self,user: User) -> None:
        """Regenerate the auth token for a user."""
        Token.objects.filter(user=user).delete()
        Token.objects.create(user=user)
    '''______________________________________________________________________________________'''

    def retrieve_access_token(self,user: User) -> Token:
        """Retrieve access token for a user. If the token has expired, a new one will be created."""
        try:
            token: Token = Token.objects.get(user=user)

            if self.is_expired(token, settings.ACCESS_TOKEN_EXPIRY_TIME):
                token.delete()
                raise ExpiredTokenError

            return token
        except:
            return Token.objects.create(user=user)

    def retrieve_refresh_token(self,user: User) -> RefreshToken:
        """Retrieve refresh token for a user. If the token has expired or there are none, a new one will be created."""
        tokens: list[RefreshToken] = list(RefreshToken.objects.filter(user=user).order_by('-created'))

        if len(tokens) == 0 or self.is_expired(tokens[0], settings.REFRESH_TOKEN_EXPIRY_TIME):
            return RefreshToken.objects.create(user=user)
        
        return tokens[0]
    '''______________________________________________________________________________________'''

    def get_auth_token_response(self,user: User, http_status: HTTPStatus =HTTPStatus.OK) -> JsonResponse:
        """Return a JSON response containing the user's auth token."""
        user_token: Token = self.retrieve_access_token(user)
        refresh_token: RefreshToken = self.retrieve_refresh_token(user)
        serializer = UserSerializer(user)

        token_response = {
            "token": {
                "access": user_token.key,
                "refresh": refresh_token.key,
                "expires_in": self.expires_in(user_token, settings.ACCESS_TOKEN_EXPIRY_TIME).total_seconds()
            },
            "user": serializer.data
        }
        return JsonResponse(token_response, status=http_status.value)
    '''______________________________________________________________________________________'''

    def delete_user_tokens(self, user: User) -> None:
        """Delete all tokens and refresh tokens associated with a user."""
        Token.objects.filter(user=user).delete()
        RefreshToken.objects.filter(user=user).delete()
'''______________________________________________________________________________________'''

token_handler = TokenHandler()