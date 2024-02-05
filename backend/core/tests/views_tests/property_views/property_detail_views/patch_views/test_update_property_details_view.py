from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User 
from core.models.property_models import Property
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.authentication.tokens.token_handler import token_handler
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.ownership_handler.ownership_helpers import is_authorized

from http import HTTPStatus

from decimal import Decimal

from typing import Dict, Any

import json


class UpdatePropertyDetailsViewTestCase(TestCase):
    """
        Tests the Update Property Details View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.property: Property = Property.objects.get(pk=1)
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('update_property_details', kwargs={'property_id': self.property.pk})
        self.form_input: dict[str,str] = {
            "has_garage": True, 
            "has_cooling": False,
            "has_heating": True,
            "num_of_bathrooms": 4,
            "num_of_bedrooms": 5,
            "num_of_stories": 3,
            "type": "Single",
            "latest_sale_price": 1000,
            "latest_sale_year": 2010,
            "num_price_changes": 1234,
            "tax_rate": 0.06,
            "lot_size": 1000,
            "living_area": 600,
            "avg_school_rating": 5,
            "avg_school_size": 5000,
            "avg_school_distance": 500,
            "median_students_per_teacher": 6,
        }
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_update_property_details_view_url(self) -> None:
        self.assertEqual(self.url, f'/property/update/details/{self.property.pk}')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Update property details view unit tests.
    def test_update_property_details_of_a_property_that_does_not_exit_fails(self) -> None:
        self.url: str = reverse('update_property_details', kwargs={'property_id': 3242})
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        json_response_data = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.").content))

    def test_update_property_details_as_non_owner_and_non_creator_fails(self) -> None:
        self.property.owner = None
        self.property.creator = None
        self.property.save()
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.user.refresh_from_db()

        self.assertFalse(is_authorized(self.user, self.property))
        self.assertEquals(response.status_code, HTTPStatus.FORBIDDEN.value)

    def test_update_property_details_as_creator_when_there_is_owner_fails(self) -> None:
        second_user = User.objects.get(pk=2)
        self.property.owner = second_user
        self.property.creator = self.user
        self.property.save()
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.user.refresh_from_db()

        self.assertFalse(is_authorized(self.user, self.property))
        self.assertEquals(response.status_code, HTTPStatus.FORBIDDEN.value)

    def test_update_property_details_as_owner_when_there_is_creator_succeeds(self) -> None:
        second_user = User.objects.get(pk=2)
        self.property.owner = self.user
        self.property.creator = second_user
        self.property.save()
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.user.refresh_from_db()

        self.assertTrue(is_authorized(self.user, self.property))
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_update_property_details_as_creator_when_there_is_no_owner_succeeds(self) -> None:
        self.property.owner = None
        self.property.creator = self.user
        self.property.save()
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.user.refresh_from_db()  

        self.assertTrue(is_authorized(self.user, self.property))
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_update_property_details_as_owner_succeeds(self) -> None:
        self.property.owner = self.user
        self.property.creator = None
        self.property.save()
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.user.refresh_from_db()  

        self.assertTrue(is_authorized(self.user, self.property))
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_update_property_details_without_providing_any_details_fails(self) -> None:
        self.form_input: Dict[str, str] = {
            "has_garage": None, 
            "has_cooling": None,
            "has_heating": None,
        }
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_update_property_details_with_missing_fields_does_not_fail(self) -> None:
        self.form_input: Dict[str, str] = {
            "has_garage": True, 
            "has_cooling": False,
            "has_heating": True,
        }
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        json_response_data: Dict[str, Any] = json.loads(response.content)
        self.property.refresh_from_db()

        self.assertEqual(json_response_data['has_garage'], self.property.has_garage)
        self.assertEqual(json_response_data['has_cooling'], self.property.has_cooling)
        self.assertEqual(json_response_data['has_heating'], self.property.has_heating)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_update_property_details_was_successful(self) -> None:
        response: HttpResponse = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        json_response_data: Dict[str, Any] = json.loads(response.content)
        self.property.refresh_from_db()

        self.assertEqual(json_response_data['has_garage'], self.property.has_garage)
        self.assertEqual(json_response_data['has_cooling'], self.property.has_cooling)
        self.assertEqual(json_response_data['has_heating'], self.property.has_heating)
        self.assertEqual(json_response_data['num_of_bathrooms'], self.property.num_of_bathrooms)
        self.assertEqual(json_response_data['num_of_bedrooms'], self.property.num_of_bedrooms)
        self.assertEqual(json_response_data['num_of_stories'], self.property.num_of_stories)
        self.assertEqual(json_response_data['type'], self.property.type)
        self.assertAlmostEqual(float(json_response_data['latest_sale_price']), self.property.latest_sale_price)
        self.assertEqual(json_response_data['latest_sale_year'], self.property.latest_sale_year)
        self.assertEqual(json_response_data['num_price_changes'], self.property.num_price_changes)
        self.assertAlmostEqual(Decimal(json_response_data['tax_rate']), self.property.tax_rate)
        self.assertAlmostEqual(float(json_response_data['lot_size']), self.property.lot_size)
        self.assertAlmostEqual(float(json_response_data['living_area']), self.property.living_area)
        self.assertAlmostEqual(float(json_response_data['avg_school_rating']), self.property.avg_school_rating)
        self.assertAlmostEqual(float(json_response_data['avg_school_size']), self.property.avg_school_size)
        self.assertAlmostEqual(float(json_response_data['avg_school_distance']), self.property.avg_school_distance)
        self.assertAlmostEqual(float(json_response_data['median_students_per_teacher']), self.property.median_students_per_teacher)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''