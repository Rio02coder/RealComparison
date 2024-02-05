from django.db import IntegrityError
from django.test import TestCase
from django.utils import timezone

from core.models.property_models import Property
from core.models.user_models import User
from core.models.verification_models import VerificationCode
from core.tests.helpers.assertion_helpers.assertion_tester import AssertionTester
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.helpers.ownership_handler.verification_code import VERIFICATION_CODE_LOWER_BOUND, VERIFICATION_CODE_UPPER_BOUND

from datetime import datetime, timedelta

import time


class VerificationCodeModelTestCase(TestCase, AssertionTester):
    """
        Unit tests for the VerificationCode model.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.property: Property = Property.objects.get(pk=1)
        self.verification_code: VerificationCode = VerificationCode.objects.create(user=self.user, property=self.property)
    '''______________________________________________________________________________________'''

    ## Code field unit tests.
    def test_code_should_be_same_length_as_settings_constant(self) -> None:
        self.assertGreaterEqual(self.verification_code.code, VERIFICATION_CODE_LOWER_BOUND)
        self.assertLessEqual(self.verification_code.code, VERIFICATION_CODE_UPPER_BOUND)
        self._assert_object_is_valid(self.verification_code)

    def test_code_less_than_length_of_settings_constant_is_invalid(self) -> None:
        self.verification_code.code = 12345
        self._assert_object_is_invalid(self.verification_code)

    def test_code_more_than_length_of_settings_constant_is_invalid(self) -> None:
        self.verification_code.code = 1234523
        self._assert_object_is_invalid(self.verification_code)
    '''______________________________________________________________________________________'''

    ## User field unit tests.
    def test_user_cannot_be_none(self) -> None:
        self.verification_code.user = None
        self._assert_object_is_invalid(self.verification_code)

    def test_verification_code_is_deleted_when_user_is_deleted(self) -> None:
        self.user.delete()
        self.assertEqual(VerificationCode.objects.filter(user=self.user).count(), 0)
    '''______________________________________________________________________________________'''

    ## Property field unit tests.
    def test_property_cannot_be_none(self) -> None:
        self.verification_code.property = None
        self._assert_object_is_invalid(self.verification_code)

    def test_verification_code_is_deleted_when_property_is_deleted(self) -> None:
        self.property.delete()
        self.assertEqual(VerificationCode.objects.filter(property=self.property).count(), 0)
    '''______________________________________________________________________________________'''

    ## Created field unit tests.
    def test_created_timestamp_is_before_now(self) -> None:
        created: datetime = self.verification_code.created
        time.sleep(0.1)
        self.assertLess(created - timezone.now(), timedelta(seconds = 0))
    '''______________________________________________________________________________________'''

    ## Unique together unit tests.
    def test_user_cannot_have_verification_code_for_same_property_twice(self) -> None:
        with self.assertRaises(IntegrityError):
            VerificationCode.objects.create(user=self.user, property=self.property)
'''______________________________________________________________________________________'''

