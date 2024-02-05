from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.models.property_models import Property
from core.models.verification_models import VerificationCode
from core.helpers.customs.custom_http_status import HTTPStatus
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.property_helpers.property_tester import PropertyTester
from core.authentication.tokens.token_handler import token_handler
from core.helpers.ownership_handler.ownership_helpers import request_ownership, change_property_owner

from typing import Dict, Any

import json


class TransferOwnershipView(TestCase, PropertyTester):
    """
        Unit tests for the Transfer Ownership View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True)]).getFixtures()
    
    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.second_user: User = User.objects.get(pk=2)
        self.property: Property = Property.objects.get(pk=1)
        self.auth_token: str = token_handler.retrieve_access_token(self.user).key
        self.headers: Dict[str, Any] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('transfer_ownership')
        self.request_body: Dict[str, Any] = {
            'property_id': self.property.pk,
            'email': self.second_user.email
        }
        # Set the owner of the property.
        change_property_owner(self.property, self.user)
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_transfer_ownership_view_url(self) -> None:
        self.assertEqual(self.url, '/property/transfer_ownership/')
    '''______________________________________________________________________________________'''
    
    ## Authentication Unit tests.
    def test_post_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Transfer Ownership Unit tests.
    def test_post_successful_request(self) -> None:
        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()

        self.property.refresh_from_db()
        
        self.assertEqual(verification_after_count, verification_before_count + 1)
        self.assertEqual(self.property.owner, None)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertTrue(VerificationCode.objects.filter(user=self.second_user).exists())

    def test_post_missing_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'email': self.second_user.email
        }
        self.check_for_missing_fields()

    def test_post_missing_user_emaiL_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'property_id': self.property.pk
        }
        self.check_for_missing_fields()

    def test_post_invalid_property_id_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'email': self.second_user.email,
            'property_id': 123984   
        }
        self.check_for_valid_id()
    
    def test_post_invalid_user_email_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'email': 'abc@org.co.uk',
            'property_id': 1   
        }
        self.check_for_valid_id()
    
    def test_transfer_ownership_from_non_owner_fails(self) -> None:
        self.assign_owner_to_properties([self.property], None)

        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()
        
        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN.value)
        
    def test_transfer_ownership_when_property_already_claimed_by_next_owner_fails(self) -> None:
      request_ownership(self.property, self.second_user)

      response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
      self.assertEqual(response.status_code, HTTPStatus.CONFLICT.value)
    '''______________________________________________________________________________________'''

    ## Checkers 
    def check_for_valid_id(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
    
    def check_for_missing_fields(self) -> None:
        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()
        
        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(self.property.owner, self.user)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
'''______________________________________________________________________________________'''

      
    
