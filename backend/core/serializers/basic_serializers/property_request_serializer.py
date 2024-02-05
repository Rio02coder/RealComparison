from rest_framework import serializers


class PropertyRequestSerializer(serializers.Serializer):
    """
        Serializer for requesting a property.
    """
    property_id = serializers.IntegerField(required=True, min_value=0)
'''______________________________________________________________________________________'''