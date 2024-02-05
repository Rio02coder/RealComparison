from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.models.property_models import Property, PropertyImages
from core.serializers.basic_serializers import PropertyRequestSerializer
from core.helpers.customs.custom_http_status import HTTPStatus
from core.helpers.image_processor.image_handler import image_handler
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.ownership_handler.ownership_helpers import is_authorized

from typing import Dict, Any


class UploadPropertyImageView(APIView):
    """
        Class-based generic view for UPLOADING images to a property.
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
                return response_generator.generate_error_response(HTTPStatus.FORBIDDEN, error_message="Not authorized to upload images to this property.")

            ## Check if the user has exceeded thier maximum image uploads.
            images_count:int = PropertyImages.objects.filter(property=property).count()
            if images_count >= settings.MAX_STORED_IMAGES:
                return response_generator.generate_error_response(HTTPStatus.UPLOAD_LIMIT_REACHED)
            
            for base64_image in request_data['images'][0:settings.MAX_STORED_IMAGES - images_count]: # Truncates the rest of the images if max storage is exceeded.
                image_handler.uploadImage(property, base64_image)

            return JsonResponse(image_handler.generateImageURLsResponse(property), status=HTTPStatus.CREATED.value)
        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.")
'''______________________________________________________________________________________'''   