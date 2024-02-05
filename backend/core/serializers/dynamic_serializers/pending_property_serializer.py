from django.utils import timezone

from core.models.property_models import PendingProperty
from core.serializers.model_serializers import DynamicFieldsModelSerializer
from core.helpers.image_processor.image_handler import image_handler


class PendingPropertySerializer(DynamicFieldsModelSerializer):
    """
        A DynamicFieldsModelSerializer for the Pending Property model.
        Should be used for returning Pending Properties data and creating new Pending Properties objects.
        To only return particular fields of the Pending Property data, pass the Serializer a fields parameter as a list of field names.
    """
    class Meta:
        model = PendingProperty
        fields = '__all__'

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        validated_data['added_at'] = timezone.now().date()
        validated_data['image_urls'] = [image_handler.getDefaultImageURL()]
        return super(PendingPropertySerializer, self).create(validated_data)
'''______________________________________________________________________________________'''
