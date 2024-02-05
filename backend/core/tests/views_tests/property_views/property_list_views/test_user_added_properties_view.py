from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.property_models import PendingProperty
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.property_helpers.property_tester import PropertyTester

from http import HTTPStatus

from typing import Any

import json


class UserAddedPropertiesTestCase(TestCase, PropertyTester):
    """
        Tests the User Added Properties View.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: Token = Token.objects.get(user=self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.NUM_OF_PROPERTIES = 5
        self.url: str = reverse('user_added_properties')
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_user_added_properties_url(self) -> None:
        self.assertEqual(self.url, '/user/user_added_properties/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_post_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, content_type='application/json')

        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''
    
    ## User Added Properteis unit tests.
    def test_get_user_added_properties_is_successful(self) -> None:
        self._create_user_added_property(self.NUM_OF_PROPERTIES, self.headers)

        response: HttpResponse = self.client.get(self.url, content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content)

        counter = self.NUM_OF_PROPERTIES - 1
        for i in range(1,self.NUM_OF_PROPERTIES+1):
            self.assertEqual(json_response_data[counter]['city'],  f'austin{i}')
            self.assertEqual(json_response_data[counter]['zipcode'],  f"{i}" * 5)
            self.assertEqual(json_response_data[counter]['street_address'], f'{i} Liverpool St')
            self.assertEqual(json_response_data[counter]['type'], 'Condo')
            self.assertEqual(json_response_data[counter]['latitude'], i + 10)
            self.assertEqual(json_response_data[counter]['longitude'], i + 10)
            self.assertEqual(json_response_data[counter]['has_garage'], True)
            self.assertEqual(json_response_data[counter]['has_cooling'], False)
            self.assertEqual(json_response_data[counter]['has_heating'], True)
            self.assertEqual(json_response_data[counter]['num_of_stories'],2)   
            self.assertEqual(json_response_data[counter]['latest_sale_price'], i * (i+1))    
            self.assertEqual(json_response_data[counter]['lot_size'],100)   
            self.assertEqual(json_response_data[counter]['living_area'],100)   
            counter-=1

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertEqual(len(json.loads(response.content)), self.NUM_OF_PROPERTIES)

    def test_user_with_no_properties_added_is_valid(self) -> None:
        response: HttpResponse = self.client.get(self.url, content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertEqual(json_response_data,[])        

    def test_user_added_properties_are_pending(self) -> None:
        self._create_user_added_property(self.NUM_OF_PROPERTIES, self.headers)

        response: HttpResponse = self.client.get(self.url, content_type='application/json', **self.headers)
        properties_count: int = PendingProperty.objects.filter(creator = self.user).count()

        self.assertEqual(len(json.loads(response.content)),properties_count)    
'''______________________________________________________________________________________'''