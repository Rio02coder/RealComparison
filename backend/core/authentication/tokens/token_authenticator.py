from django.conf import settings

from rest_framework import authentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

from core.models import User
from .token_handler import TokenHandler

from typing import Tuple


class TokenAuthentication(authentication.TokenAuthentication, TokenHandler):
    """
        Simple class to change the default 'Token' keyword to 'Bearer' 
        in a request's Authorization header.
    """
    authentication.TokenAuthentication.keyword = 'Bearer'

    # If token has expired then it will be removed and new one with different key will be created.
    def authenticate_credentials(self, key: str) -> Tuple[User, Token]:
        try:
            token: Token = Token.objects.get(key = key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid Token")
        
        if not token.user.is_active:
            raise AuthenticationFailed("User is not active")

        has_expired, token = self.token_expire_handler(token, settings.ACCESS_TOKEN_EXPIRY_TIME)
        if has_expired:
            raise AuthenticationFailed("The Token is expired")
        
        return (token.user, token)
'''______________________________________________________________________________________'''