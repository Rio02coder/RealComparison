from django.test import TestCase

from core.models.property_models import Property
from core.models.user_models import User
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.assertion_helpers.assertion_tester import AssertionTester
from core.helpers.validators.price_validators import validate_price

import datetime

class PropertyModelTestCase(TestCase, AssertionTester):
    """
        Unit tests for the Property model.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.property: Property = Property.objects.get(pk=1)
        self.user: User = User.objects.get(pk=1)
    '''______________________________________________________________________________________'''
    
    ## Property unit tests.
    def test_valid_property(self) -> None:
        self._assert_object_is_valid(self.property)
    '''______________________________________________________________________________________'''

    ## City unit tests.
    def test_city_cannot_be_blank(self) -> None:
        self.property.city = ''
        self._assert_object_is_invalid(self.property)

    def test_city_cannot_be_over_50_characters_long(self) -> None:
        self.property.city = 'x' * 51
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Street address unit tests.
    def test_street_address_cannot_be_blank(self) -> None:
        self.property.street_address = ''
        self._assert_object_is_invalid(self.property)

    def test_street_address_can_contain_alphanumerical_characters(self) -> None:
        self.property.street_address = "1094 Banker St"
        self._assert_object_is_valid(self.property)
    '''______________________________________________________________________________________'''

    ## Zipcode unit tests.
    def test_zipcode_cannot_be_blank(self) -> None:
        self.property.zipcode = ''
        self._assert_object_is_invalid(self.property)
    
    def test_zipcode_may_already_exist(self) -> None:
        second_property = self._create_second_property()
        self.property.zipcode = second_property.zipcode
        self._assert_object_is_valid(self.property)

    def test_zip_code_must_only_contain_alphanumeric_string(self)-> None:
        self.property.zipcode = 'SE1 &21'
        self._assert_object_is_invalid(self.property)

    def test_zip_code_must_not_exceed_10_characters_long(self) -> None:
        self.property.zipcode = '907365921023'
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Full address unit tests.
    def test_get_property_full_address(self) -> None:
        street_address = self.property.street_address
        city = self.property.city
        zipcode = self.property.zipcode
        full_adrress = street_address + ' ' + city + ' ' + zipcode
        self.assertEqual(full_adrress , self.property.get_full_address())
    '''______________________________________________________________________________________'''

    ## Latitude and longitude unit tests.
    def test_latitude_cannot_be_out_of_range(self) -> None:
        """latitude should be between -90 to 90"""
        self.property.latitude = -91
        self._assert_object_is_invalid(self.property)
        self.property.latitude = 91
        self._assert_object_is_invalid(self.property)
    
    def test_longitude_cannot_be_out_of_range(self) -> None:
        """longtitude should be between -180 to 180"""
        self.property.longitude = -190
        self._assert_object_is_invalid(self.property)
        self.property.longitude = 181
        self._assert_object_is_invalid(self.property)
    
    def test_latitude_and_longtitude_should_be_unique_together(self) -> None:
        second_property: Property = self._create_second_property()
        second_property.longitude = 30.43
        second_property.latitude = -97.66

        self.property.longitude = 30.43
        self.property.latitude = -97.66
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Number of bedrooms unit tests.
    def test_number_of_bedrooms_cannot_be_negative(self) -> None:
        self.property.num_of_bathrooms = -1
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Number of bathrooms unit tests,
    def test_number_of_bathrooms_cannot_be_negative(self) -> None:
        self.property.num_of_bathrooms = -1
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Number of stories unit tests.
    def test_number_of_stories_cannot_be_negative(self) -> None:
        self.property.num_of_bathrooms = -1
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''
   
    ## Sale year unit tests.
    def test_latest_sale_year_cannot_be_in_the_future(self) -> None:
        current_year = datetime.date.today().year
        future_date = current_year + 1
        self.property.latest_sale_year = future_date
        self._assert_object_is_invalid(self.property)
    
    def test_latest_sale_year_cannot_be_earlier_than_the_year_built(self) -> None:
        current_year = datetime.date.today().year
        old_year = current_year - 1 

        self.property.year_built = current_year
        self.property.latest_sale_year = old_year

        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Sale price unit tests.
    def test_latest_sale_price_cannot_be_negative(self) -> None:
        self.property.latest_sale_price = -90347.44
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Predicted price unit tests.
    def test_predicted_price_cannot_be_negative(self) -> None:
        self.property.predicted_price = -90347.44
        self._assert_object_is_invalid(self.property)
        
    def test_predicted_price_default_is_zero(self) -> None:
        self.assertEqual(Property.objects.get(pk=2).predicted_price,0)
    
    def test_validate_price_returns_zero_when_price_is_negative(self) -> None:
        self.property.predicted_price = -90347.44
        value: int = validate_price(-90347.44)
        self.assertEqual(value, 0)
    '''______________________________________________________________________________________'''

    ## Lot size unit tests.
    def test_lot_size_cannot_be_less_than_100_ft(self) -> None:
        self.property.lot_size = 50
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Living area unit tests.
    def test_living_area_cannot_be_less_than_100_ft(self) -> None:
        self.property.lot_size = 50
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Property type unit tests.
    def test_property_type_may_already_exist(self) -> None:
        second_property: Property = self._create_second_property()
        self.property.type = second_property.type
        self._assert_object_is_valid(self.property)

    def test_property_type_cannot_be_over_50_characters_long(self) -> None:
        self.property.type = 'x' * 51
        self._assert_object_is_invalid(self.property)

    def test_property_type_can_be_50_characters_long(self) -> None:
            self.property.type = 'x' * 50
            self._assert_object_is_valid(self.property)
    '''______________________________________________________________________________________'''

    ## Tax rate unit tests.
    def test_tax_rate_cannot_be_negative(self) -> None:
        self.property.tax_rate = -1.9
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Verified unit tests.
    def test_property_is_not_verified_by_default(self) -> None:
        self.assertFalse(self.property.is_verified)
    '''______________________________________________________________________________________'''

    ## Property age unit tests.
    def test_property_age_cannot_be_negative(self) -> None:
        age = self.property.age
        self.assertFalse(age < 0)
    '''______________________________________________________________________________________'''

    ## Surronding schools related feilds unit tests.
    def test_avg_school_rating_cannot_be_negative(self) -> None:
        self.property.avg_school_rating = -1.2
        self._assert_object_is_invalid(self.property)
    
    def test_avg_school_size_cannot_be_negative(self) -> None:
        self.property.avg_school_size = -1111
        self._assert_object_is_invalid(self.property)
    
    def test_median_students_per_teacher_cannot_be_negative(self) -> None:
        self.property.median_students_per_teacher = -120
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Property creation related fields unit tests.
    def test_creator_can_be_unknown(self) -> None:
        self.property.owner = None
        self._assert_object_is_valid(self.property)
    
    def test_creation_date_cannot_be_in_the_past(self) -> None:
        self.property.added_at = datetime.datetime.now() + datetime.timedelta(days=1)
        self._assert_object_is_invalid(self.property)
    '''______________________________________________________________________________________'''

    ## Owner unit tests.
    def test_owner_is_none_by_default(self) -> None:
        self.assertEqual(self.property.owner, None)

    def test_owner_can_be_a_user_object(self) -> None:
        self.property.owner = self.user
        self.property.save()

        self._assert_object_is_valid(self.property)

    def test_owner_becomes_none_when_user_is_deleted(self) -> None:
        self.property.owner = self.user
        self.property.save()

        property_before_count: int = Property.objects.count()
        self.user.delete()
        property_after_count: int = Property.objects.count()
        self.assertEqual(property_before_count, property_after_count)

        self.property.refresh_from_db()
        self.assertEqual(self.property.owner, None)
    '''______________________________________________________________________________________'''

    ## for_sale unit tests.
    def test_for_sale_is_false_by_default(self) -> None:
        self.assertEqual(self.property.for_sale, False)
    '''______________________________________________________________________________________'''

    ## View count unit tests.
    def test_default_value_of_view_count_is_0(self) -> None:
        default_value: int = self.property.views
        self.assertEqual(default_value, 0)
    '''______________________________________________________________________________________'''

    ## Helper functions.
    def _create_second_property(self) -> Property:
        second_property = Property.objects.get(pk = 2)
        return second_property
'''______________________________________________________________________________________'''
