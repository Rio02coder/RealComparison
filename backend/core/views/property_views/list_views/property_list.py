from django.http import JsonResponse, HttpResponse

from rest_framework.views import APIView

from core.models.property_models import Property

from http import HTTPStatus

from typing import List


class PropertyListView(APIView): 
    """
        Class-based generic view for displaying a list of all properties.
    """
    http_method_names = ['get']

    def get(self, request) -> HttpResponse:

        properties: List[Property]  = list(Property.objects.values())
        
        return JsonResponse(properties, safe = False, status=HTTPStatus.OK.value) 
'''______________________________________________________________________________________'''