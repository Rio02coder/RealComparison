from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.contrib.auth.hashers import check_password

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser

from core.serializers.basic_serializers import AuthSerializer
from core.models.user_models import User
from core.authentication.services import Services
from core.authentication.tokens.token_handler import token_handler
from core.authentication.email_handler.email_sender import email_sender
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

from typing import Any, Dict


class UserAuthTokenView(APIView):
    """
        View for retrieving a user's auth token.
    """
    authentication_classes = []
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: AuthSerializer = AuthSerializer(data=request_data)

        if not serializer.is_valid():
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Request body missing required fields.")

        try:
            retrieved_user: User = User.objects.get(email=request_data['email'])
            
            if not retrieved_user.service == Services.REMOTE:
                return response_generator.generate_error_response(HTTPStatus.CONFLICT)

            if not check_password(request_data['password'], retrieved_user.password):
                return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED, **{'WWW-Authenticate': 'Bearer'})
                
            if not retrieved_user.is_verified:
                return email_sender.get_email_verfication_response("Your email has not been verified.", HTTPStatus.FORBIDDEN)

            return token_handler.get_auth_token_response(retrieved_user)
        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND)
'''______________________________________________________________________________________'''