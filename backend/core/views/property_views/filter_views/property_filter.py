from django.http import JsonResponse, HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.db.models import Q

from rest_framework.views import APIView

from core.models.property_models import Property
from core.filters.basic_filters import PropertyFilter
from core.helpers.customs.custom_http_status import HTTPStatus

import re


class PropertyFilterView(APIView):
    """
        Class-based generic view for filtering a list of properties based on custom user paramaters.
    """
    http_method_names = ['get']

    def get(self, request) -> HttpResponse:
        # Check if the user has specified any search keywords.
        try:
            q = request.GET['q']
        except MultiValueDictKeyError:
            q = ''
        
        # Filter the data based on the user requested paramaters.
        filter = PropertyFilter(request.GET, queryset=Property.objects.filter(is_verified = True))
        filter_queryset = filter.qs

        # Search into the data for the supplied user input.
        search_queryset = Property.objects.filter(is_verified = True)
        find_keywords = re.compile(r'"([^"]+)"|(\S+)').findall
        normalized_keywords= re.compile(r'\s{2,}').sub
        words = [normalized_keywords('',(t[0] or t[1]).strip()) for t in find_keywords(q)]

        for keyword in words:
            query = Property.objects.filter(Q(city__contains=keyword) | Q(street_address__contains=keyword) | Q(zipcode__exact=keyword))
            search_queryset = search_queryset & query

        # Combine the result of the searching & filtering.
        result_query = list((search_queryset&filter_queryset).values())

        return JsonResponse(result_query, safe = False, status=HTTPStatus.OK.value) 
'''______________________________________________________________________________________'''