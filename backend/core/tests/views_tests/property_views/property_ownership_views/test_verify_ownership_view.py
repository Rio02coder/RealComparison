from django.http import HttpResponse
from django.test import TestCase, override_settings
from django.urls import reverse
from django.conf import settings

from core.models.user_models import User
from core.models.property_models import Property
from core.models.verification_models import VerificationCode
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

from typing import Dict, Any

import json
import time


class VerifyOwnershipViewTest(TestCase):
    """
        Unit tests for the VerifyOwnershipView.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(email="ivanwillams@example.org")
        self.auth_token: str = token_handler.retrieve_access_token(self.user).key
        self.headers: Dict[str, Any] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.property: Property = Property.objects.get(pk=1)
        self.verification_code: VerificationCode = VerificationCode.objects.create(user=self.user, property=self.property)
        self.url: str = reverse('verify_ownership')
        self.request_body: Dict[str, Any] = {
            'verification_code': self.verification_code.code
        }
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_verify_ownership_view_url(self) -> None:
        self.assertEqual(self.url, '/property/verify_ownership/')
    '''______________________________________________________________________________________'''
    
    ## Authentication Unit tests.
    def test_post_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Verify ownership Unit tests.
    def test_post_successful_request(self) -> None:
        verification_before_count: int = VerificationCode.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        verification_after_count: int = VerificationCode.objects.count()
        self.property.refresh_from_db()

        self.assertEqual(self.user, self.property.owner)
        self.assertEqual(verification_after_count, verification_before_count - 1)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_post_missing_request_fields_fails(self) -> None:
        self.request_body: Dict[str, Any] = {

        }
        verification_before_count: int = VerificationCode.objects.count()
        previous_owner: User = self.property.owner

        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.property.refresh_from_db()
        new_owner: User = self.property.owner
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(previous_owner, new_owner)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_post_verification_code_that_does_not_exists_fails(self) -> None:
        self.request_body: Dict[str, Any] = {
            'verification_code': 172637
        }
        verification_before_count: int = VerificationCode.objects.count()
        previous_owner: User = self.property.owner

        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        
        self.property.refresh_from_db()
        new_owner: User = self.property.owner
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(previous_owner, new_owner)
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)

    def test_post_verification_code_for_another_user_fails(self) -> None:
        second_user: User = User.objects.get(pk=2)
        second_property: Property = Property.objects.get(pk=2)
        second_verification_code = VerificationCode.objects.create(user=second_user, property=second_property)

        self.request_body: Dict[str, Any] = {
            'verification_code': second_verification_code.code
        }
        verification_before_count: int = VerificationCode.objects.count()
        previous_owner: User = self.property.owner

        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.property.refresh_from_db()
        new_owner: User = self.property.owner
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(previous_owner, new_owner)
        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN.value)

    @override_settings(VERIFICATION_CODE_EXPIRY_TIME=0.1)
    def test_post_expired_verification_code_fails(self) -> None:
        time.sleep(settings.VERIFICATION_CODE_EXPIRY_TIME + 0.1) # Wait so that verification code expires.
        
        verification_before_count: int = VerificationCode.objects.count()
        previous_owner: User = self.property.owner

        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.property.refresh_from_db()
        new_owner: User = self.property.owner
        verification_after_count: int = VerificationCode.objects.count()

        self.assertEqual(verification_after_count, verification_before_count)
        self.assertEqual(previous_owner, new_owner)
        self.assertEqual(response.status_code, HTTPStatus.CONFLICT.value)
'''______________________________________________________________________________________'''