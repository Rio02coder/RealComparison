from django.http import HttpResponse

from rest_framework.views import APIView

from .base_sale import BaseSaleView


class MarkPropertyForSaleView(APIView, BaseSaleView):
    """
        Class-based generic view for MARKING properties for sale by owners.
    """
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        response = super().post(request, True)
        return response
'''______________________________________________________________________________________'''