from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse
from django.views import View

from rest_framework.parsers import JSONParser

from core.models.property_models import Property
from core.serializers.basic_serializers import PropertyRequestSerializer
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.toggler import change_for_sale

from http import HTTPStatus

from typing import Dict, Any


class BaseSaleView(View):
    """
        Base view for HANDLING property sale.
    """
    http_method_names = ['post']

    def post(self, request, sale_flag: bool) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: PropertyRequestSerializer = PropertyRequestSerializer(data=request_data)

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)

        try:
            property: Property = Property.objects.get(pk=request_data['property_id'])

            if property.owner != request.user:
                return response_generator.generate_error_response(HTTPStatus.FORBIDDEN, error_message="Only the owner can mark/unmark this property as for sale.")

            if not property.is_verified:
                return response_generator.generate_error_response(HTTPStatus.UNVERIFIED_PROPERTY)
                
            change_for_sale(property, sale_flag)

            return HttpResponse(status=HTTPStatus.OK.value)
        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.")
'''______________________________________________________________________________________'''