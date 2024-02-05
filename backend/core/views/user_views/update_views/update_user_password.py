from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.serializers.basic_serializers import ChangePasswordSerializer 
from core.helpers.customs.custom_response_generator import response_generator
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

from typing import Any, Dict


class ChangeUserPasswordView(APIView):
    """
        Class-based generic view for CHANGING the user's password.
    """
    http_method_names = ['patch']

    def patch(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: ChangePasswordSerializer = ChangePasswordSerializer(data=request_data)

        if serializer.is_valid():
            if not check_password(request_data['current_password'], request.user.password):
                return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED)

            request.user.set_password(serializer.data.get("new_password"))  # Takes care of password hashing.
            request.user.save()

            token_handler.regenerate_auth_token(request.user)
            return HttpResponse(status=HTTPStatus.OK.value) 

        return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)   
'''______________________________________________________________________________________'''
