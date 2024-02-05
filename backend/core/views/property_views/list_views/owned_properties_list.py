from django.http import JsonResponse

from rest_framework.views import APIView

from core.models.property_models import Property
from core.serializers.dynamic_serializers import PropertySerializer

from http import HTTPStatus

from typing import List


class UserOwnedPropertiesView(APIView):
    """
        Class-based generic view for retrieving a list of properties OWNED by the user.
    """
    http_method_names = ['get']

    def get(self, request) -> JsonResponse:
        
        owned_properties: List[Property] = list(Property.objects.filter(owner = request.user))

        property_serializer: PropertySerializer = PropertySerializer(owned_properties, many=True)

        return JsonResponse(property_serializer.data, status=HTTPStatus.OK.value, safe = False)
'''______________________________________________________________________________________'''

