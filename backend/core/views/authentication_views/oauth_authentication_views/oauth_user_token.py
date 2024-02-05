from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from core.models.user_models import User
from .oauth_base import OAuthBaseView
from core.authentication.tokens.token_handler import token_handler
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

import json


class OAuthUserTokenView(APIView, OAuthBaseView):
    """
        A view for retrieving an OAuth user's access token, refresh token
        and user information.
    """
    authentication_classes = []
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        response = super().post(request)
        oauth_user_data = json.loads(response.content)
        
        if response.status_code == HTTPStatus.OK.value:
            try:
                user: User = User.objects.get(email=oauth_user_data["email"])
                return token_handler.get_auth_token_response(user)
            except ObjectDoesNotExist:
                return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with email address {oauth_user_data['email']} could not be found.")
        
        return response
'''_______________________________________________________________________'''