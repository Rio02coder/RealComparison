from django.http import JsonResponse

from rest_framework.views import APIView

from core.serializers.dynamic_serializers import PropertySerializer
from core.helpers.customs.custom_http_status import HTTPStatus

from typing import Dict, Any


class RecommenderPropertyView(APIView):
    """
        Class-based generic view for recommended properties.
    """
    http_method_names = ['get']

    def get(self, request) -> JsonResponse:
        serializer: PropertySerializer = PropertySerializer(request.user.recommendations, many=True)
        
        response_data: Dict[str, Any] = {
            "recommendations": serializer.data
        }
        return JsonResponse(response_data, status=HTTPStatus.OK.value, safe=False)
'''______________________________________________________________________________________'''