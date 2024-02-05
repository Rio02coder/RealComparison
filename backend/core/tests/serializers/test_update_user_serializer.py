from django.test import TestCase

from core.helpers.customs.custom_exceptions import InvalidSerializerMethodError
from core.serializers.model_serializers import UpdateUserSerializer


class UpdateUserSerializerTestCase(TestCase):
    """
        Unit tests for the UpdateUserSerializer.
    """
    def setUp(self) -> None:
        self.serializer = UpdateUserSerializer()
    '''______________________________________________________________________________________'''

    def test_create_method_raises_InvalidSerializerMethodError(self) -> None:
        with self.assertRaises(InvalidSerializerMethodError):
            self.serializer.create({})
'''______________________________________________________________________________________'''