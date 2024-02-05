from django.http import HttpResponse,JsonResponse
from django.views import View

from core.authentication.providers.abstract_oauth_provider import AbstractOAuthProvider
from core.helpers.customs.custom_exceptions import InvalidCredentialsError, UnknownOAuthError, MissingOAuthDataError
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.dst_helpers import dict_has_required_fields
from core.authentication.services import is_valid_provider, get_provider

from http import HTTPStatus

from typing import Any, Dict

import json


class OAuthBaseView(View):
    """
        Base view for handling OAuth.
    """
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        user_data: Dict[str, Any] = json.loads(request.body)

        if not dict_has_required_fields(user_data, "token", "provider"):
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Request body missing required fields.") # Some of the required fields are missing.

        if not is_valid_provider(user_data['provider']):
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Invalid provider in request body.") # Some of the required fields are missing.

        oauth_provider: AbstractOAuthProvider = get_provider(user_data['provider'])

        try:
            oauth_user_data: Dict[str, str] = oauth_provider.get_user_data(user_data['token'])

        except InvalidCredentialsError:
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Invalid token passed in request body.")
        except UnknownOAuthError: 
            return response_generator.generate_error_response(HTTPStatus.INTERNAL_SERVER_ERROR, error_message="Something went wrong with the OAuth provider.")
        except MissingOAuthDataError:
            return response_generator.generate_error_response(HTTPStatus.INTERNAL_SERVER_ERROR, error_message="OAuth provider did not return required data.")
        return JsonResponse(oauth_user_data, safe = False, status=HTTPStatus.OK.value) 
'''______________________________________________________________________________________'''