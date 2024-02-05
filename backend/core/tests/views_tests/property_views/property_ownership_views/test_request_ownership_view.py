from django.http import HttpResponse
from django.test import TransactionTestCase
from django.urls import reverse

from core.models.user_models import User
from core.models.property_models import Property
from core.models.verification_models import VerificationCode
from core.helpers.customs.custom_http_status import HTTPStatus
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from typing import Dict, Any

import json


class RequestOwnershipViewTest(TransactionTestCase):
    """
        Unit tests for the RequestOwnershipView.
    """
    fixtures = FixtureHandler([(User, True), (Property, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: str = token_handler.retrieve_access_token(self.user).key
        self.headers: Dict[str, Any] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.property: Property = Property.objects.get(pk=1)
        self.url: str = reverse('request_ownership')
        self.request_body: Dict[str, Any] = {
            'property_id': self.property.pk
        }
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_request_ownership_view_url(self) -> None:
        self.assertEqual(self.url, '/property/request_ownership/') 
    '''______________________________________________________________________________________'''
    
    ## Authentication Unit tests.
    def test_post_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Request ownership Unit tests.
    def test_post_successful_request(self) -> None:
        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count + 1)
        self.assertGreater(VerificationCode.objects.filter(user=self.user, property=self.property).count(), 0)
        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)

    def test_post_missing_request_fields_fails(self) -> None:
        self.request_body: Dict[str, Any] = {

        }
        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_post_property_id_that_does_not_exists_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'property_id': 123984   
        }
        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)

    def test_post_verification_code_for_the_same_user_and_property_fails(self) -> None:
        VerificationCode.objects.create(user=self.user, property=self.property)

        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(response.status_code, HTTPStatus.CONFLICT.value)

    def test_requesting_ownership_while_already_being_the_owner_fails(self) -> None:
        self.property.owner = self.user
        self.property.save()

        self.property.refresh_from_db()

        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(response.status_code, HTTPStatus.UNNECESSARY_OPERATION.value)
'''______________________________________________________________________________________'''