from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.models.property_models import Property
from core.models.user_models import User
from core.serializers.basic_serializers import PropertyRequestSerializer, UserEmailSerializer
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.ownership_handler.ownership_helpers import change_property_owner, request_ownership

from http import HTTPStatus

from typing import Dict, Any


class TransferOwnershipView(APIView):
    """
        Class-based generic view for TRANSFERRING ownership of a property.
    """
    http_method_names = ['post']

    def post(self, request) -> JsonResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        property_serializer: PropertyRequestSerializer = PropertyRequestSerializer(data=request_data)
        user_serializer: UserEmailSerializer = UserEmailSerializer(data=request_data)

        if not property_serializer.is_valid():
             return JsonResponse(property_serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
        if not user_serializer.is_valid():
             return JsonResponse(user_serializer.errors, status=HTTPStatus.BAD_REQUEST.value)

        try:
            property: Property = Property.objects.get(id=request_data['property_id'])
            new_owner: User = User.objects.get(email=request_data['email'])

            if property.owner != request.user:
                return response_generator.generate_error_response(HTTPStatus.FORBIDDEN, error_message="Only the owner can transfer ownership to this property.")

            # Ownership is dropped from the current owner.
            change_property_owner(property, None)
            # Ownership request is done on behalf of the next owner.
            request_ownership(property, new_owner)

            return HttpResponse(status=HTTPStatus.OK.value)

        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.")
        # The next potential owner may already claimed ownership for the property.
        except IntegrityError: 
            return response_generator.generate_error_response(HTTPStatus.CONFLICT, error_message="User has already requested ownership for this property.")
'''______________________________________________________________________________________'''
