from http import HTTPStatus
from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.property_models import Property, UserPropertyViewCounts
from core.models.user_models import User
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler


class UserPropertyViewCountsModelTestCase(TestCase):
    """
        Unit tests for the UserPropertyViewCounts model.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('user_personal_profile')

        self.property: Property = Property.objects.get(pk=1)
        self.user_property_view_counts: UserPropertyViewCounts = UserPropertyViewCounts.objects.create(user=self.user, property=self.property) 
    '''______________________________________________________________________________________'''

    ## Unit tests for fields.
    def test_default_value_of_view_count_is_0(self) -> None:
        default_value: int = self.user_property_view_counts.view_count
        self.assertEqual(default_value, 0)

    def test_default_value_of_time_stamp_is_current_time(self) -> None:
        default_value: int = self.user_property_view_counts.time_stamp
        self.assertEqual(default_value, 0.0)
    '''______________________________________________________________________________________'''

    ## Foreign key cascade unit tests.
    def test_user_property_view_counts_record_is_deleted_successfully_when_user_deleted(self):
        response = self.client.delete(self.url, **self.headers)

        self.assertEqual(0, User.objects.filter(pk=self.user.pk).count())
        self.assertEqual(0, UserPropertyViewCounts.objects.filter(pk=self.user.pk).count())

        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_user_property_view_counts_record_is_deleted_successfully_when_property_deleted(self):
        second_property: Property = Property.objects.get(pk=2)
        UserPropertyViewCounts.objects.create(user=self.user, property=second_property)

        second_property.delete()

        self.assertEqual(0, Property.objects.filter(pk=second_property.pk).count())
        self.assertEqual(0, UserPropertyViewCounts.objects.filter(pk=second_property.pk).count())
'''______________________________________________________________________________________'''
