from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.models.property_models import Property
from core.models.favorite_models import Favorites
from core.serializers.basic_serializers import PropertyRequestSerializer
from core.helpers.customs.custom_http_status import HTTPStatus
from core.helpers.customs.custom_response_generator import response_generator

from typing import Dict, Any


class RemoveFavoritePropertyView(APIView):
    """
        Class-based generic view for REMOVING a property from the user's favourite list.
    """
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: PropertyRequestSerializer = PropertyRequestSerializer(data=request_data)

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)

        try:
            property: Property = Property.objects.get(id=request_data['property_id'])
            Favorites.objects.filter(user=request.user, property=property).delete()

            return HttpResponse(status=HTTPStatus.OK.value)
        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.")
'''______________________________________________________________________________________'''