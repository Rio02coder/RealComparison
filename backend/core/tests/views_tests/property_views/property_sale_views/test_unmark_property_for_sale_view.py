from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.property_models import Property
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.helpers.ownership_handler.ownership_helpers import change_property_owner
from core.helpers.general_helpers.toggler import change_for_sale, change_is_verified

from http import HTTPStatus

from typing import Any

import json


class UnmarkPropertyForSaleViewTestCase(TestCase):
    """
        Tests the UnmarkPropertyForSaleView.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.property: Property = Property.objects.get(pk=1)
        self.auth_token: Token = Token.objects.get(user=self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('unmark_property_for_sale')
        self.request_body: dict[str, Any] = {
            "property_id": self.property.pk
        }
        # Set the property's owner.
        change_property_owner(self.property, self.user)
        # Mark the property as verified.
        change_is_verified(self.property, True)
        # Mark the proeprty for sale.
        change_for_sale(self.property, True)
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_unmark_for_sale_view_url(self) -> None:
        self.assertEqual(self.url, f'/property/unmark_for_sale/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_post_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Unmark for sale unit tests.
    def test_successful_unmark_for_sale(self) -> None:
        for_sale_before: bool = self.property.for_sale
        
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.property.refresh_from_db()
        for_sale_after: bool = self.property.for_sale

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        self.assertEqual(for_sale_before, True)
        self.assertEqual(for_sale_after, False)

    def test_missing_request_fields_fails(self) -> None:
        self.request_body: dict[str, Any] = {
            
        }
        for_sale_before: bool = self.property.for_sale
        
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content)

        self.property.refresh_from_db()
        for_sale_after: bool = self.property.for_sale

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertIn('property_id', json_response_data)
        self.assertEqual(for_sale_before, for_sale_after)

    def test_property_id_that_does_not_exists_fails(self) -> None:
        self.request_body: dict[str, Any] = {
            "property_id": 150000
        }
        for_sale_before: bool = self.property.for_sale
        
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.property.refresh_from_db()
        for_sale_after: bool = self.property.for_sale

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(for_sale_before, for_sale_after)

    def test_unmark_for_sale_when_not_owner_fails(self) -> None:
        second_user: User = User.objects.get(pk=2)
        self.auth_token: Token = Token.objects.get(user=second_user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}

        for_sale_before: bool = self.property.for_sale
        
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        self.property.refresh_from_db()
        for_sale_after: bool = self.property.for_sale

        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN.value)
        self.assertEqual(for_sale_before, for_sale_after)
'''______________________________________________________________________________________'''
