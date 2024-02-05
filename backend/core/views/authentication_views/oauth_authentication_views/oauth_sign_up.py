from django.db.utils import IntegrityError
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from core.models.user_models import User
from .oauth_base import OAuthBaseView
from core.authentication.tokens.token_handler import token_handler
from core.helpers.customs.custom_response_generator import response_generator
from core.authentication.services import get_service

from http import HTTPStatus

from typing import Any, Dict

import json


class OAuthSignUpView(APIView, OAuthBaseView):
    """
        View that signs up user using an OAuth provider.
    """
    authentication_classes = []
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        user_data: Dict[str, Any] = json.loads(request.body)
        response = super().post(request)
        oauth_user_data = json.loads(response.content)

        if response.status_code == HTTPStatus.OK.value:
            try:
                User.objects.create_user(
                        oauth_user_data['email'],
                        first_name=oauth_user_data['first_name'],
                        last_name=oauth_user_data['last_name'],
                        phone_number=oauth_user_data.get("phone_number", User._meta.get_field('phone_number').get_default()), 
                        service=get_service(user_data['provider']),
                        password=None)
            except IntegrityError:
                return response_generator.generate_error_response(HTTPStatus.CONFLICT, error_message="User with that email already exists.") # There is already an user with the seleceted email.
            return token_handler.get_auth_token_response(User.objects.get(email=oauth_user_data['email']), http_status=HTTPStatus.CREATED)
        
        return response
'''______________________________________________________________________________________'''