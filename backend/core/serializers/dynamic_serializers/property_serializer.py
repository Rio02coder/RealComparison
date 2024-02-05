from rest_framework import serializers

from core.models.property_models import Property
from core.serializers.model_serializers import DynamicFieldsModelSerializer
from core.serializers.read_only_serializers import BasicUserSerializer


class PropertySerializer(DynamicFieldsModelSerializer):
    """
        A DynamicFieldsModelSerializer for the Property model.
        To only return particular fields of the Property data, pass the Serializer a fields parameter as a list of field names.
    """
    owner = BasicUserSerializer(read_only=True)
    creator = BasicUserSerializer(read_only=True)
    favorites = serializers.IntegerField()
    views = serializers.IntegerField()
    distance_from_center = serializers.FloatField()
    age = serializers.IntegerField()
    percentage_difference = serializers.FloatField()

    class Meta:
        model = Property
        fields = '__all__'
'''______________________________________________________________________________________'''