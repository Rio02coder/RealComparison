from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.models.property_models import Property
from core.helpers.customs.custom_http_status import HTTPStatus
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.property_helpers.property_tester import PropertyTester
from core.authentication.tokens.token_handler import token_handler
from core.helpers.ownership_handler.ownership_helpers import change_property_owner

from typing import Dict, Any

import json


class DropOwnershipView(TestCase, PropertyTester):
    """
        Unit tests for the Drop Ownership View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: str = token_handler.retrieve_access_token(self.user).key
        self.headers: Dict[str, Any] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.property: Property = Property.objects.get(pk=1)
        self.url: str = reverse('drop_ownership')
        self.request_body: Dict[str, Any] = {
            'property_id': self.property.pk
        }
        # Set the owner of the property.
        change_property_owner(self.property, self.user)
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_drop_ownership_view_url(self) -> None:
        self.assertEqual(self.url, '/property/drop_ownership/')
    '''______________________________________________________________________________________'''
    
    ## Authentication Unit tests.
    def test_post_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Drop Ownership Unit tests.
    def test_post_successful_request(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        
        self.property.refresh_from_db()
        self.assertEqual(self.property.owner, None)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_post_missing_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
        }
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_post_invalid_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'property_id': 123984   
        }
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
    
    def test_drop_ownership_from_non_owner_fails(self) -> None:
        change_property_owner(self.property, None)
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN.value)
'''______________________________________________________________________________________'''
