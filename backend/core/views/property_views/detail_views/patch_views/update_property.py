from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.views.helpers.property_detail_view_helpers import *
from core.models.property_models import Property
from core.serializers.dynamic_serializers import PropertySerializer
from core.serializers.model_serializers import UpdatePropertySerializer
from core.helpers.customs.custom_http_status import HTTPStatus
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.ownership_handler.ownership_helpers import is_authorized

from typing import Dict, Any


class UpdatePropertyDetailsView(APIView):
    """
        Class-based generic view for CHANGING the property's information.
    """
    http_method_names = ['patch']

    def patch(self, request, property_id: int) -> HttpResponse:
        try:
            request_data: Dict[str, Any] = JSONParser().parse(request)
            property: Property = Property.objects.get(id=property_id)
            serializer: UpdatePropertySerializer = UpdatePropertySerializer(property, data=request_data)
            
            if serializer.is_valid():
                if not is_authorized(request.user, property):
                    return response_generator.generate_error_response(HTTPStatus.FORBIDDEN, error_message="The property's owner is not the requesting user!")

                serializer.save()
                return JsonResponse(PropertySerializer(property).data, status=HTTPStatus.OK.value)

            return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.")
'''______________________________________________________________________________________'''