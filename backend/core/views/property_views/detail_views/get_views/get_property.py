from django.http import JsonResponse, HttpResponse
from django.conf import settings

from rest_framework.views import APIView

from core.views.helpers.property_detail_view_helpers import *
from core.models.property_models import Property, UserPropertyViewCounts
from core.serializers.dynamic_serializers import PropertySerializer
from core.helpers.customs.custom_http_status import HTTPStatus
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.dst_helpers import list_of_fields_are_valid

from typing import List

import time


class PropertyDetailView(APIView):
    """
        Class-based generic view that shows individual property details.
    """
    http_method_names = ['get']

    def get(self, request, property_id: int) -> HttpResponse:
        property_values: List[Property] = list(Property.objects.filter(pk=property_id))  # Retrieves all fields of the Property object.

        if not property_values:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"Property with ID {property_id} does not exist.")

        property_fields: List[str] = [field.name for field in Property._meta.get_fields()]

        # Used for only selecting certain fields of the Property object.
        if 'fields' in request.GET:
            selected_fields: List[str] = request.GET.get('fields').split(",")

            # Check all fields are valid.
            if not list_of_fields_are_valid(selected_fields, property_fields):
                return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Invalid field in request.")

            # Make sure that response always returns id.
            selected_fields.insert(0, "id")
            property_serializer: PropertySerializer = PropertySerializer(property_values[0], fields=selected_fields)
        else:
            property_serializer: PropertySerializer = PropertySerializer(property_values[0])

            user_property_view_counts_records: List[Property] = list(UserPropertyViewCounts.objects.filter(user=request.user, property=property_values[0]))
             
            if len(user_property_view_counts_records) != 0: # If current user has seen this property.
                if (time.time() - get_current_user_time_stamp(request, property_values[0])) >= settings.VIEWS_INCREMENT_TIME: # If user has made the request after minimum increment time.
                    update_user_time_stamp(request, property_values[0])
            else: # If current user has NEVER seen this property. 
                UserPropertyViewCounts.objects.create(user=request.user, property=property_values[0], view_count=1, time_stamp=time.time())
            
        return JsonResponse(property_serializer.data, status=HTTPStatus.OK.value)
'''______________________________________________________________________________________'''        