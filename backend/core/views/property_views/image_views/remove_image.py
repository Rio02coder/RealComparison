from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.models.property_models import Property
from core.serializers.basic_serializers import PropertyRequestSerializer
from core.helpers.customs.custom_http_status import HTTPStatus
from core.helpers.image_processor.image_handler import image_handler
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.ownership_handler.ownership_helpers import is_authorized

from typing import Dict, Any


class RemovePropertyImageView(APIView):
    """
        Class-based generic view for REMOVING images from a property.
    """
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: PropertyRequestSerializer = PropertyRequestSerializer(data=request_data)
        
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
        
        try:
            property: Property = Property.objects.get(id=request_data['property_id'])

            if not is_authorized(request.user, property):
                return response_generator.generate_error_response(HTTPStatus.FORBIDDEN, error_message="Not authorized to remove images from this property.")
           
            for image_url in request_data['images']:
                image_handler.removeImage(image_url, property)
            
            return JsonResponse(image_handler.generateImageURLsResponse(property), status=HTTPStatus.OK.value)
        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.")
'''______________________________________________________________________________________'''   