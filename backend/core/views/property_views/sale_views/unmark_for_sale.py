from django.http import HttpResponse

from rest_framework.views import APIView

from .base_sale import BaseSaleView


class UnmarkPropertyForSaleView(APIView, BaseSaleView):
    """
        Class-based generic view for UNMARKING properties for sale by owners.
    """
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        response = super().post(request, False)
        return response
'''______________________________________________________________________________________'''