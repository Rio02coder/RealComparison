from django.http import JsonResponse, HttpResponse

from rest_framework.views import APIView

from core.models.property_models import Property
from core.serializers.dynamic_serializers import PropertySerializer
from core.helpers.customs.custom_http_status import HTTPStatus

from typing import List, Dict, Any


class UserFavoritesView(APIView):
    """
        Class-based generic view for RETRIEVING the user's favorite properties.
    """
    http_method_names = ['get']

    def get(self, request) -> HttpResponse:
        favorite_properties: List[Property] = request.user.favorites
        serializer: PropertySerializer = PropertySerializer(favorite_properties, many=True)

        response_data: Dict[str, Any] = {
            "favorites": serializer.data
        }
        return JsonResponse(response_data, status=HTTPStatus.OK.value)
'''______________________________________________________________________________________'''