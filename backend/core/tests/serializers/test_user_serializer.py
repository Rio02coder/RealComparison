from django.test import TestCase

from core.helpers.customs.custom_exceptions import InvalidSerializerMethodError
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.models.user_models import User
from core.models.property_models import Property
from core.serializers.dynamic_serializers import UserSerializer


class UserSerializerTestCase(TestCase):
    """
        Unit tests for the UserSerializer.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, False), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user = User.objects.get(pk=1)
        self.serializer = UserSerializer()
    '''______________________________________________________________________________________'''

    def test_update_method_raises_InvalidSerializerMethodError(self) -> None:
        with self.assertRaises(InvalidSerializerMethodError):
            self.serializer.update(self.user, {})
'''______________________________________________________________________________________'''