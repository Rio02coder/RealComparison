from django.test import TestCase

from core.helpers.customs.custom_exceptions import InvalidSerializerMethodError
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.models.user_models import User
from core.models.property_models import Property
from core.serializers.model_serializers import UpdatePropertySerializer


class UpdatePropertySerializerTestCase(TestCase):
    """
        Unit tests for the UpdatePropertySerializer.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, False), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.serializer = UpdatePropertySerializer()
    '''______________________________________________________________________________________'''
    
    def test_create_method_raises_InvalidSerializerMethodError(self) -> None:
        with self.assertRaises(InvalidSerializerMethodError):
            self.serializer.create({})
'''______________________________________________________________________________________'''