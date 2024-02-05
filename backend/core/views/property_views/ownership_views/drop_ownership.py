
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse


from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.models.property_models import Property
from core.serializers.basic_serializers import PropertyRequestSerializer
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.ownership_handler.ownership_helpers import change_property_owner

from http import HTTPStatus

from typing import Dict, Any


class DropOwnershipView(APIView):
    """
        Class-based generic view for DROPPING ownership of a property.
    """
    http_method_names = ['post']

    def post(self, request) -> JsonResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: PropertyRequestSerializer = PropertyRequestSerializer(data=request_data)

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)

        try:
            property: Property = Property.objects.get(id=request_data['property_id'])

            if property.owner != request.user:
                return response_generator.generate_error_response(HTTPStatus.FORBIDDEN, error_message="Only the owner can drop ownership to this property.")
            
            change_property_owner(property, None)
                  
            return HttpResponse(status=HTTPStatus.OK.value)

        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.")
'''______________________________________________________________________________________'''