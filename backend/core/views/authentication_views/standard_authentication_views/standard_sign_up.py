from django.http import HttpResponse, JsonResponse

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from core.models.user_models import User
from core.serializers.dynamic_serializers import UserSerializer
from core.authentication.email_handler.email_sender import email_sender
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

from typing import Any, Dict


class SignUpView(APIView): 
    """
        View that signs up user.
    """
    authentication_classes = []
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: UserSerializer = UserSerializer(data=request_data)

        if not "email" in request_data:
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="User cannot sign up without an email.")

        if User.objects.filter(email=request_data['email']).exists():
            return response_generator.generate_error_response(HTTPStatus.CONFLICT, error_message="User with that email already exists.")

        if serializer.is_valid():
            serializer.save()
            created_user: User = User.objects.get(email=request_data['email'])
            email_sender.send_verification_email(request, created_user)
            
            return JsonResponse(serializer.data, status=HTTPStatus.CREATED.value)

        return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
'''______________________________________________________________________________________'''