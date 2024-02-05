from django.db.models import F

from core.models.property_models import Property, UserPropertyViewCounts

import time


'''
    Helpers for the property detail view.
'''
def get_current_user_time_stamp(request, property: Property) -> float:
    return UserPropertyViewCounts._meta.get_field(
                    'time_stamp'
                    ).value_from_object(
                    UserPropertyViewCounts.objects.get(user=request.user, property=property)
                    )
'''______________________________________________________________________________________'''

def update_user_time_stamp(request, property: Property):
    UserPropertyViewCounts.objects.filter(
                user=request.user, 
                property=property
                ).update(view_count=F('view_count')+1, time_stamp=time.time())
'''______________________________________________________________________________________'''