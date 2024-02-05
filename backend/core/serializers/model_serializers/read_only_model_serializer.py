from rest_framework import serializers


# LukasKlement (2020) Django Rest Framework Read Only Model Serializer (Version unknown) [Source code]. https://stackoverflow.com/questions/38319856/django-rest-framework-read-only-model-serializer/41599266
class ReadOnlyModelSerializer(serializers.ModelSerializer):
    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields
'''______________________________________________________________________________________'''