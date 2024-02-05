from django.http import HttpResponse
from django.test import TestCase
from django.utils import timezone
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.property_models import Property, PendingProperty
from core.tests.helpers.property_helpers.property_tester import PropertyTester
from core.tests.fixtures.fixture_handler import FixtureHandler

from http import HTTPStatus

from typing import Any

import json


class AddPropertyViewTestCase(TestCase, PropertyTester):
    """
        Tests the Add Property View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: Token = Token.objects.get(user=self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('add_property')
        self.request_body: dict[str, Any] = {
        "city": "austin",
        "street_address": "12 Liverpool St",
        "zipcode":  "78769",
        "latitude": 34.43,
        "longitude": -97.66,
        "has_garage": True,
        "has_cooling": False,
        "has_heating": True,
        "num_of_bathrooms": 5,
        "num_of_bedrooms": 7,
        "num_of_stories": 2,
        "latest_sale_price": 189222.1,
        "latest_sale_year": 2010,
        "lot_size": 122991.2,
        "living_area": 218728.1,
        "type": "Condo"
        }
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_add_property_view_url(self) -> None:
        self.assertEqual(self.url, f'/property/add/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_post_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Adding Property unit tests.
    def test_add_property_with_missing_fileds_is_unsuccessful(self) -> None:
        self.request_body: dict[str, Any] = {
        "city": "austin",
        "street_address": "12 Liverpool St",
        "zipcode":  "78769"
        }
        before_count: int = PendingProperty.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        after_count: int = PendingProperty.objects.count()

        self.assertEqual(after_count, before_count)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_add_property_with_required_fields_is_successful(self) -> None:
        before_count: int = PendingProperty.objects.count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        after_count: int = PendingProperty.objects.count()

        self.assertEqual(after_count, before_count+1)
        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertTrue(PendingProperty.objects.filter(street_address = '12 Liverpool St', zipcode = '78769').exists())

    def test_added_property_is_removed_from_pending_when_all_fields_are_non_null(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)

        # Null fields are updated.
        pending_property: PendingProperty = PendingProperty.objects.get(latitude = 34.43, longitude = -97.66)
        
        pending_property.num_price_changes = 2
        pending_property.avg_school_rating = 1.2
        pending_property.avg_school_size = 1555
        pending_property.avg_school_distance = 1.5
        pending_property.median_students_per_teacher = 23
        pending_property.save()

        # The property gets removed from the PendingProperty model. 
        self.assertFalse(PendingProperty.objects.filter(pk=pending_property.id).exists())

        # The property is still kept in the Property base model.
        self.assertTrue(Property.objects.filter(pk=pending_property.id).exists())

    def test_creator_can_add_multiple_properties(self) -> None:
        # Attempting to create a property.
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)

        # Attempting to create a second property.
        request_body = self._create_second_property()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(request_body), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertEqual(PendingProperty.objects.filter(creator=self.user).count(), 2)

    def test_creator_and_added_at_fields_content_are_correct_for_added_property(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)

        pending_property: PendingProperty = PendingProperty.objects.get(latitude = 34.43, longitude = -97.66)

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        self.assertEqual(pending_property.creator, self.user)
        self.assertEqual(pending_property.added_at, timezone.now().date())
'''______________________________________________________________________________________'''