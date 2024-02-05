from django.http import HttpResponse, JsonResponse

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from core.models.user_models import User
from core.serializers.basic_serializers import UserEmailSerializer
from core.authentication.email_handler.email_sender import email_sender
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus


class ResendVerificationEmail(APIView):
    """
        View that SENDS a verification email to the user email address.
    """
    authentication_classes = []
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def post(self, request) -> HttpResponse: 
        serializer: UserEmailSerializer = UserEmailSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = User.objects.get(email = serializer.data.get('email'))
            except: 
                return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with email provided does not exist.")
        
            email_sender.send_verification_email(request,user)
            return email_sender.get_email_verfication_response("Email has been sent.", HTTPStatus.OK)

        return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
'''______________________________________________________________________________________'''