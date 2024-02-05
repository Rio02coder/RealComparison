from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.models.property_models import Property
from core.tests.helpers.filter_helpers.filter_tester import FilterTester
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

import json


class TestPropertyFilterView(TestCase, FilterTester):
    """
        Unit tests for the the Property Filter view.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.url = reverse('custom_filter')
        self.user = User.objects.get(email = 'ivanwillams@example.org')
        self.auth_token = token_handler.retrieve_access_token(self.user).key
        self.headers = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_properties_custom_filter_url(self) -> None:
        self.assertEqual(self.url,'/custom_filter/')
    '''______________________________________________________________________________________'''

    ## Authentication Unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Propery list filters unit tests.
    def test_filter_by_number_of_bedrooms(self) -> None:
        request_url = self.customize_filter_url({'min_bedrooms=1':False, 'max_bedrooms=2':False})
        self.validate_range_filter(request_url, 'num_of_bedrooms', 1,3)

    def test_filter_by_number_of_bathrooms(self) -> None:
        request_url = self.customize_filter_url({'min_bathrooms=13':False, 'max_bathrooms=14':False})
        self.validate_range_filter(request_url, 'num_of_bathrooms', 13,15)

    def test_filter_by_number_of_stories(self) -> None:
        request_url = self.customize_filter_url({'min_stories=3':False, 'max_stories=3':False})
        self.validate_range_filter(request_url, 'num_of_stories', 3,4)

    def test_filter_by_range_of_lot_size(self) -> None:
        request_url = self.customize_filter_url({'min_lot_size=700':False, 'max_lot_size=1000':False})
        self.validate_range_filter(request_url, 'lot_size', 700,1000)
        
    def test_filter_by_range_of_living_area(self) -> None:
        request_url = self.customize_filter_url({'min_living_area=3':False, 'max_living_area=3':False})
        self.validate_range_filter(request_url, 'living_area', 2000,3000)

    def test_filter_by_garage_feature(self) -> None:
        request_url = self.customize_filter_url({'has_garage=false':False})
        self.validate_boolean_filter(request_url, 'has_garage', False)

    def test_filter_by_cooling_feature(self) -> None:
        request_url = self.customize_filter_url({'has_cooling=true':False})
        self.validate_boolean_filter(request_url, 'has_cooling', True)

    def test_filter_by_heating_feature(self) -> None:
        request_url = self.customize_filter_url({'has_heating=true':False})
        self.validate_boolean_filter(request_url, 'has_heating', True)

    def test_filter_by_distance_from_center(self) -> None:
        miles = 2
        request_url = self.customize_filter_url({f'distance_from_center=' + str(miles):False})
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        for property in json.loads(response.content):
            distance = Property.objects.get(id = property['id']).distance_from_center
            self.assertTrue(distance <= miles) 

    def test_filter_by_property_age(self) -> None:
        property_age = 20
        request_url = self.customize_filter_url({f'age= {str(property_age)}':False})
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        for property in json.loads(response.content):
            age = Property.objects.get(id = property['id']).age
            self.assertTrue(age <= property_age) 
    
    def test_filter_by_type(self) -> None:
        home_type = 'Single Family'
        request_url = self.customize_filter_url({f'type={home_type}':False})
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        
        for property in json.loads(response.content):
            self.assertTrue(property['type'] == home_type) 

    def test_filter_with_no_matching_results(self) -> None:
        request_url = self.customize_filter_url({'max_bedrooms=0':False, 'distance_from_center=0': False, 'age=0': False})
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),[])
    '''______________________________________________________________________________________'''

    ## Property ordering unit test cases.
    def test_ordering_by_latest_sale_price(self) -> None:
        request_url = self.customize_filter_url({'ordering=latest_sale_price':False})
        self.validate_ordering_filter(request_url,'latest_sale_price')

    def test_ordering_by_year_built(self) -> None:
        request_url = self.customize_filter_url({'ordering=-year_built':False})
        self.validate_ordering_filter(request_url,'year_built')

    def test_ordering_by_latest_sale_year(self) -> None:
        request_url = self.customize_filter_url({'ordering=-latest_sale_year':False})
        self.validate_ordering_filter(request_url,'latest_sale_year')
    '''______________________________________________________________________________________'''

    ## Property search unit test cases.
    def test_search_by_zip_code(self) -> None:
        zip_code = '78733'
        request_url = self.customize_filter_url({f'{zip_code}':True})
        self.validate_string_matching_search(request_url, 'zipcode', zip_code, 'exact')

    def test_search_by_city(self) -> None:
        city = 'del'
        request_url = self.customize_filter_url({f'{city}':True})
        self.validate_string_matching_search(request_url, 'city', city, 'contains')

    def test_search_by_street_address(self) -> None:
        street_address = 'Bluegrass'
        request_url = self.customize_filter_url({f'{street_address}':True})
        self.validate_string_matching_search(request_url, 'street_address', street_address, 'contains')

    def test_combined_search_and_filter(self) -> None:
        city = 'austin'
        request_url = self.customize_filter_url({f'{city}':True, 'min_bedrooms=1':False, 'max_bedrooms=2':False, 'has_garage=true': False})
        self.validate_range_filter(request_url, 'num_of_bedrooms', 1,3)
        self.validate_boolean_filter(request_url, 'has_garage', True)
        self.validate_string_matching_search(request_url, 'city', city, 'contains')

    def test_search_with_no_matching_results(self) ->  None:
        request_url = self.customize_filter_url({'jdf.jj.ds':True})
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),[])
'''______________________________________________________________________________________'''