from rest_framework import serializers

from core.models.property_models import Property
from core.helpers.customs.custom_exceptions import InvalidSerializerMethodError


# NOTE: Should be used for updating Property data.

class UpdatePropertySerializer(serializers.ModelSerializer):
    """
        A ModelSerializer for the Property model.
    """
    class Meta:
        model = Property
        fields = [
            'has_garage',
            'has_cooling',
            'has_heating',
            'num_of_bathrooms',
            'num_of_bedrooms',
            'num_of_stories',
            'type',
            'latest_sale_price',
            'latest_sale_year',
            'num_price_changes',
            'tax_rate',
            'lot_size',
            'living_area',
            'avg_school_rating',
            'avg_school_size',
            'avg_school_distance',
            'median_students_per_teacher',
        ]
        extra_kwargs = {
            "has_garage": {"required": False},
            "has_cooling": {"required": False},
            "has_heating": {"required": False},
            "num_of_bathrooms": {"required": False},
            "num_of_bedrooms": {"required": False},
            "num_of_stories": {"required": False},
            "type": {"required": False},
            "latest_sale_price": {"required": False},
            "latest_sale_year": {"required": False},
            "num_price_changes": {"required": False},
            "tax_rate": {"required": False},
            "lot_size": {"required": False},
            "living_area": {"required": False},
            "avg_school_rating": {"required": False},
            "avg_school_size": {"required": False},
            "avg_school_distance": {"required": False},
            "median_students_per_teacher": {"required": False},
        }

    def create(self, validated_data):
        raise InvalidSerializerMethodError("Do NOT use UpdatePropertySerializer for adding Property objects. Use the PropertySerializer instead.")
'''______________________________________________________________________________________'''