from django.test import TestCase
from django.utils import timezone

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.token_models import RefreshToken
from core.tests.helpers.assertion_helpers.assertion_tester import AssertionTester
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.services import is_valid_service

from datetime import timedelta


class UserModelTestCase(TestCase, AssertionTester):
    """
        Tests the User Model.
    """
    fixtures = FixtureHandler([(User, True), (User, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
    '''______________________________________________________________________________________'''

    ## User unit tests.
    def test_valid_user(self) -> None:
        self._assert_object_is_valid(self.user)
    '''______________________________________________________________________________________'''

    ## First name unit tests.
    def test_first_name_cannot_be_blank(self) -> None:
        self.user.first_name = ''
        self._assert_object_is_invalid(self.user)

    def test_first_name_is_not_unique(self) -> None:
        second_user: User = self._create_second_user()
        self.user.first_name = second_user.first_name
        self._assert_object_is_valid(self.user)

    def test_first_name_can_have_less_than_1000_characters(self) -> None:
        self.user.first_name = 'x' * 1000
        self._assert_object_is_valid(self.user)

    def test_first_name_cannot_have_more_than_1000_characters(self) -> None:
        self.user.first_name = 'x' * 1001
        self._assert_object_is_invalid(self.user)

    def test_first_name_should_not_contain_numbers(self) -> None:
        self.user.first_name = 'Ivan7'
        self._assert_object_is_invalid(self.user)

    def test_first_name_can_be_hyphenated(self) -> None:
        self.user.first_name = 'Ivan-Asen'
        self._assert_object_is_valid(self.user)
    '''______________________________________________________________________________________'''

    ## Last name unit tests.
    def test_last_name_must_not_be_blank(self) -> None:
        self.user.last_name =  ''
        self._assert_object_is_invalid(self.user)

    def test_last_name_need_not_be_unique(self) -> None:
        second_user: User = self._create_second_user()
        self.user.last_name = second_user.last_name
        self._assert_object_is_valid(self.user)

    def test_last_name_may_contain_1000_characters(self) -> None:
        self.user.last_name = 'x' * 1000
        self._assert_object_is_valid(self.user)

    def test_last_name_must_not_contain_more_than_1000_characters(self) -> None:
        self.user.last_name = 'x' * 1001
        self._assert_object_is_invalid(self.user)

    def test_last_name_must_not_contain_numbers(self) -> None:
        self.user.last_name = 'willam1'
        self._assert_object_is_invalid(self.user)
    
    def test_last_name_can_be_hyphenated(self) -> None:
        self.user.last_name = 'Arabadzhieva-Pisova'
        self._assert_object_is_valid(self.user)
    '''______________________________________________________________________________________'''

    ## Phone number unit tests.
    def test_phone_number_may_be_blank(self) -> None:
        self.user.phone_number = ''
        self._assert_object_is_valid(self.user)

    def test_phone_number_must_not_contain_letters(self) -> None:
        self.user.phone_number = '+447L51b85519'
        self._assert_object_is_invalid(self.user)

    def test_phone_number_must_not_be_too_short(self) -> None:
        self.user.phone_number = 'x' * 3
        self._assert_object_is_invalid(self.user)

    def test_phone_number_must_not_be_too_beyond_15_numbers_long(self) -> None:
        self.user.phone_number = 'x' * 16
        self._assert_object_is_invalid(self.user)

    def test_phone_number_starting_with_the_plus_sign_is_valid_option(self) -> None:
        self.user.phone_number = '+447851885519'
        self._assert_object_is_valid(self.user)

    def test_phone_number_starting_without_the_plus_sign_is_invalid_option(self) -> None:
        self.user.phone_number = '07851885519'
        self._assert_object_is_invalid(self.user)

    def test_phone_number_must_be_valid(self) -> None:
        self.user.phone_number = '+447851885519'
        self._assert_object_is_valid(self.user)
    '''______________________________________________________________________________________'''

    ## Email unit tests.
    def test_email_must_not_be_blank(self) -> None:
        self.user.email = ''
        self._assert_object_is_invalid(self.user)

    def test_email_is_valid(self) -> None:
        self.user.email = 'ivanwillams@example.org'
        self._assert_object_is_valid(self.user)

    def test_email_must_be_unique(self) -> None:
        second_user: User = self._create_second_user()
        self.user.email = second_user.email
        self._assert_object_is_invalid(self.user)

    def test_email_must_contain_username(self) -> None:
        self.user.email = '@example.org'
        self._assert_object_is_invalid(self.user)

    def test_email_must_contain_at_symbol(self) -> None:
        self.user.email = 'johndoe.example.org'
        self._assert_object_is_invalid(self.user)

    def test_email_must_contain_domain_name(self) -> None:
        self.user.email = 'johndoe@.org'
        self._assert_object_is_invalid(self.user)

    def test_email_must_contain_domain(self) -> None:
        self.user.email = 'johndoe@example'
        self._assert_object_is_invalid(self.user)

    def test_email_must_not_contain_more_than_one_at(self) -> None:
        self.user.email = 'johndoe@@example.org'
        self._assert_object_is_invalid(self.user)
    '''______________________________________________________________________________________'''

    ## Services unit tests.
    def test_remote_service_is_a_valid_option(self) -> None:
        self.user.service = 'REMOTE'
        self._assert_object_is_valid(self.user)

    def test_unsplash_service_is_a_valid_option(self) -> None:
        self.user.service = 'UNSPLASH'
        self._assert_object_is_valid(self.user)

    def test_an_unkown_input_for_the_service_is_invalid_option(self) -> None:
        input_name: str = self.user.service
        if not is_valid_service(input_name):
            self._assert_object_is_invalid(self.user)
    '''______________________________________________________________________________________'''

    ## Unit tests - "The user should be active."
    def test_user_can_be_inactive(self) -> None:
        self.user.is_active = False
        self._assert_object_is_valid(self.user)

    def test_user_should_be_active(self) -> None:
        self.user.is_active = True
        self._assert_object_is_valid(self.user)
    '''______________________________________________________________________________________'''

    ## Unit tests - "The user is part of the staff."
    def test_user_being_part_of_the_staff_is_valid(self) -> None:
        self.user.is_staff = True
        self._assert_object_is_valid(self.user)

    def test_user_not_being_part_of_the_staff_is_valid(self) -> None:
        self.user.is_staff = False
        self._assert_object_is_valid(self.user)
    '''______________________________________________________________________________________'''

    ## Unit tests - "The user is a superuser."
    def test_user_being_a_super_user_is_valid(self) -> None:
        self.user.is_superuser = True
        self._assert_object_is_valid(self.user)

    def test_user_not_being_a_super_user_is_valid(self) -> None:
        self.user.is_superuser = False
        self._assert_object_is_valid(self.user)
    '''______________________________________________________________________________________'''

    ## Date of joining unit tests.
    def test_date_of_joining_cannot_be_in_the_future(self) -> None:
         current_date = timezone.now().date()
         future_date = current_date + timedelta(days=1)
         self.user.date_joined = current_date
         self.assertNotEquals(self.user.date_joined, future_date)

    def test_date_of_joining_cannot_be_prior_to_the_original_joining_date(self) -> None:
        current_date = timezone.now().date()
        past_date = current_date - timedelta(days=1)
        self.user.date_joined = current_date
        self.assertNotEquals(self.user.date_joined, past_date)

    def test_date_of_joining_must_be_the_as_the_joining_date(self) -> None:
        current_date = timezone.now().date()
        self.user.date_joined = timezone.now().date()
        self.assertEquals(self.user.date_joined, current_date)
    '''______________________________________________________________________________________'''

    ## Model's functions unit tests.
    def test_get_the_full_name_of_a_user(self) -> None:
        first_name = self.user.first_name
        last_name = self.user.last_name
        full_name = first_name + ' ' + last_name

        self.assertEquals(full_name, self.user.get_full_name())
    '''______________________________________________________________________________________'''

    ## Access token unit tests.
    def test_access_token_is_generated_for_new_user(self) -> None:
        tokens = Token.objects.filter(user=self.user)
        self.assertGreater(tokens.count(), 0)
    '''______________________________________________________________________________________'''

    ## Refresh token unit tests.
    def test_refresh_token_is_generated_for_new_user(self) -> None:
        tokens = RefreshToken.objects.filter(user=self.user)
        self.assertGreater(tokens.count(), 0)
    '''______________________________________________________________________________________'''

    ## Helper functions.
    def _create_second_user(self) -> User:
        second_user: User = User.objects.get(pk = 2)
        return second_user
'''______________________________________________________________________________________'''