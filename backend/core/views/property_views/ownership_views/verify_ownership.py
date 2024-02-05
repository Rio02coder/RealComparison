from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.models.property_models import Property
from core.models.verification_models import VerificationCode
from core.serializers.basic_serializers import VerificationCodeSerializer
from core.helpers.customs.custom_response_generator import response_generator
from core.authentication.tokens.token_handler import token_handler
from core.helpers.ownership_handler.ownership_helpers import change_property_owner

from http import HTTPStatus

from typing import Dict, Any


class VerifyOwnershipView(APIView):
    """
        Class-based generic view for VERIFYING ownership of a property.
    """
    http_method_names = ['post']

    def post(self, request) -> JsonResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: VerificationCodeSerializer = VerificationCodeSerializer(data=request_data)

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)

        try:
            verification_code_object: VerificationCode = VerificationCode.objects.get(code=request_data['verification_code'])

            if (verification_code_object.user != request.user):
                return response_generator.generate_error_response(HTTPStatus.FORBIDDEN, error_message="Verfication code not linked to requesting user.")
            
            if token_handler.is_expired(verification_code_object, settings.VERIFICATION_CODE_EXPIRY_TIME):
                return response_generator.generate_error_response(HTTPStatus.CONFLICT, error_message="Verfication code has expired.")

            property: Property = verification_code_object.property
            verification_code_object.delete()

            change_property_owner(property, request.user)
            return HttpResponse(status=HTTPStatus.OK.value)

        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Verification code does not exist.")
'''______________________________________________________________________________________'''

