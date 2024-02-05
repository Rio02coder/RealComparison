from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from core.models.user_models import User
from core.models.token_models import RefreshToken
from core.authentication.tokens.token_handler import token_handler
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.dst_helpers import dict_has_required_fields

from http import HTTPStatus

from typing import Any, Dict

import json


class RefreshTokenView(APIView):
    """
        View for renewing access and refresh token for a user using a refresh token.
    """
    http_method_names = ['post']
    authentication_classes = []
    permission_classes = (AllowAny,)

    def post(self, request) -> HttpResponse:
        user_data: Dict[str, Any] = json.loads(request.body)

        if not dict_has_required_fields(user_data, "token"):
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Request body missing required fields.")

        try:
            refresh_token_objects = RefreshToken.objects.filter(key=user_data["token"])
            
            if refresh_token_objects.count() == 0:
                raise ObjectDoesNotExist

            refresh_token_object: RefreshToken = refresh_token_objects.first()
            retrieved_user: User = refresh_token_object.user
            # If token has already been used, delete all tokens for that user.
            if refresh_token_object.used:
                token_handler.delete_user_tokens(retrieved_user)
                return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED)

            if token_handler.is_expired(refresh_token_object, settings.REFRESH_TOKEN_EXPIRY_TIME):
                return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED)

            token_handler.regenerate_auth_token(retrieved_user)
            refresh_token_objects.update(used=True)
            RefreshToken.objects.create(user=retrieved_user)

            return token_handler.get_auth_token_response(retrieved_user, http_status=HTTPStatus.CREATED)
        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED)
'''______________________________________________________________________________________'''