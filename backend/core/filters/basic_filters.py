from django.forms import CharField
from django_filters.filters import OrderingFilter

from core.models.property_models import Property
from .advanced_filters import filter_distance, filter_age

import django_filters


class PropertyFilter(django_filters.FilterSet):
    """
        Filters that can be applied on the Propery List.
    """
    has_garage:bool  = django_filters.BooleanFilter() 
    has_cooling:bool = django_filters.BooleanFilter() 
    has_heating:bool = django_filters.BooleanFilter() 

    type:CharField = django_filters.CharFilter(lookup_expr='iexact')
    
    min_bedrooms:int = django_filters.NumberFilter(field_name='num_of_bedrooms', lookup_expr='gte') 
    max_bedrooms:int = django_filters.NumberFilter(field_name='num_of_bedrooms', lookup_expr='lte') 

    min_bathrooms:int = django_filters.NumberFilter(field_name='num_of_bathrooms', lookup_expr='gte') 
    max_bathrooms:int = django_filters.NumberFilter(field_name='num_of_bathrooms', lookup_expr='lte') 

    min_stories:int = django_filters.NumberFilter(field_name='num_of_stories', lookup_expr='gte') 
    max_stories:int = django_filters.NumberFilter(field_name='num_of_stories', lookup_expr='lte') 

    min_lot_size:float = django_filters.NumberFilter(field_name='lot_size', lookup_expr ='gte')
    max_lot_size:float = django_filters.NumberFilter(field_name='lot_size', lookup_expr ='lte')

    min_living_area:float = django_filters.NumberFilter(field_name='living_area', lookup_expr='gte')
    max_living_area:float = django_filters.NumberFilter(field_name='living_area', lookup_expr='lte')

    distance_from_center:float = django_filters.NumberFilter(method=filter_distance)
    age:int = django_filters.NumberFilter(method=filter_age)

    ## Specify ordering of the properties based on a set of possible fields.
    ordering = OrderingFilter(
        fields=(
            ('lot_size'),
            ('living_area'),
            ('latest_sale_year'),
            ('latest_sale_price'),
            ('year_built')
        )
    )
   
    class Meta:
        model = Property
        fields = [
                    'has_garage',
                    'has_cooling',
                    'has_heating',
                    'type',
                    'num_of_bedrooms',
                    'num_of_bathrooms',
                    'num_of_stories',
                    'lot_size',
                    'living_area',  
                    'distance_from_center',
                    'age', 
                 ]
'''______________________________________________________________________________________'''