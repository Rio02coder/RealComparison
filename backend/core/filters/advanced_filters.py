from core.models.property_models import Property


## Additional advanced filters from **calculated** attributes of a property.     
def filter_distance(queryset, name,  value):
    properties_ids = [x.pk for x in Property.objects.all() if x.distance_from_center <= value]
    if properties_ids:
        queryset = queryset.filter(pk__in=properties_ids)
    else:
        queryset = Property.objects.none()
    return queryset
'''______________________________________________________________________________________'''

def filter_age(queryset, name, value):
    properties_ids = [x.pk for x in Property.objects.all() if x.age <= value]
    if properties_ids:
        queryset = queryset.filter(pk__in=properties_ids)
    else:
        queryset = Property.objects.none()
    return queryset
'''______________________________________________________________________________________'''