from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.property_models import Property
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.property_helpers.property_tester import PropertyTester

from http import HTTPStatus
from typing import Any

import json


class UserOwnedPropertiesTestCase(TestCase, PropertyTester):
    """
        Tests the User Owned Properties View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.property: Property = Property.objects.get(pk=1)
        self.auth_token: Token = Token.objects.get(user=self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('user_owned_properties')
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_user_added_properties_url(self) -> None:
        self.assertEqual(self.url, '/user/user_owned_properties/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_post_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## User Owned Properteis unit tests.
    def test_get_user_owned_properties_is_successful(self) -> None:
        properties = [self.property, Property.objects.get(pk=2)]
        self.assign_owner_to_properties(properties, self.user)
        
        response: HttpResponse = self.client.get(self.url, content_type='application/json', **self.headers)

        self.assertContains(response, f'"id": 1')
        self.assertContains(response, f'"id": 2')

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertEqual(len(json.loads(response.content)), 2)

    def test_user_with_no_properties_added_is_valid(self) -> None:
        response: HttpResponse = self.client.get(self.url, content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content) 

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertEqual(json_response_data,[])   
'''______________________________________________________________________________________'''