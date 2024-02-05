from core.models import User
from core.serializers.model_serializers import ReadOnlyModelSerializer 

''''
    Add comment here
'''
class BasicUserSerializer(ReadOnlyModelSerializer):
    """
        A DynamicFieldsModelSerializer for the User model.
        hould be used for returning User data and creating new User objects.
        To only return particular fields of the User data, pass the Serializer a fields parameter as a list of field names.
    """
    class Meta:
        model = User
        fields = [
            'id', 
            'first_name', 
            'last_name', 
            'phone_number', 
            'email',
            'service', 
            'is_verified',
            'is_active',
            'is_staff',
            'date_joined',
        ]
'''______________________________________________________________________________________'''