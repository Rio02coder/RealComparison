from django.http import JsonResponse
from django.test import TestCase, override_settings
from django.conf import settings
from django.urls import reverse

from core.models.user_models import User
from core.models.property_models import Property
from core.tests.helpers.property_helpers.property_tester import PropertyTester
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

from typing import List, Any

import json
import time


class PropertyListViewTestCase(TestCase, PropertyTester):
    """
        Unit tests for the property List view.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.url = reverse('properties')
        self.user = User.objects.get(email = 'ivanwillams@example.org')
        self.auth_token = token_handler.retrieve_access_token(self.user).key
        self.headers = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.num_of_test_properties: int = 100
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_properties_list_url(self) -> None:
        self.assertEqual(self.url,'/properties/')
    '''______________________________________________________________________________________'''

    ## Authentication Unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response:JsonResponse = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Retrive a list of all verified properties.
    @override_settings(ACCESS_TOKEN_EXPIRY_TIME=1)
    def test_expired_access_token_fails(self) -> None:
        self.auth_token = token_handler.retrieve_access_token(self.user)
        self.headers = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}

        time.sleep(settings.ACCESS_TOKEN_EXPIRY_TIME + 0.1)
        response: JsonResponse = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
        
    def test_view_with_empty_list_content(self) -> None:
        response: JsonResponse = self.client.get(self.url, **self.headers)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),[])

    def test_view_after_filling_list_with_data(self) -> None:
        self._create_test_properties(self.num_of_test_properties)
        response : JsonResponse = self.client.get(self.url, **self.headers)
        self.assertEqual(response.status_code, 200)
        json_response_data: dict[str, Any] = json.loads(response.content)

        counter = self.num_of_test_properties - 2
        for property_id in range(1,self.num_of_test_properties):
            self.assertEqual(json_response_data[counter]['city'], f'city{property_id}')
            self.assertEqual(json_response_data[counter]['street_address'], f'address{property_id}')
            self.assertEqual(json_response_data[counter]['type'], f'type{property_id}')
            self.assertEqual(json_response_data[counter]['latest_sale_year'], 2020)
            self.assertEqual(json_response_data[counter]['zipcode'],f'{(property_id)* 5}')
            self.assertEqual(json_response_data[counter]['latest_sale_price'],(property_id) * 8)
            self.assertEqual(json_response_data[counter]['living_area'],(property_id) * 15)   
            self.assertEqual(json_response_data[counter]['year_built'],2012)    
            self.assertEqual(json_response_data[counter]['tax_rate'],1.66)   
            counter-=1
'''______________________________________________________________________________________'''
