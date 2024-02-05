from django.http import HttpResponse
from django.test import TransactionTestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.property_models import Property
from core.models.favorite_models import Favorites
from core.helpers.customs.custom_http_status import HTTPStatus
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.toggler import change_is_verified

from http import HTTPStatus

from typing import Any

import json


class AddFavoritePropertyViewTestCase(TransactionTestCase):
    """
        Tests the Add Favorite Property View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.property: Property = Property.objects.get(pk=1)
        self.auth_token: Token = Token.objects.get(user=self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('add_user_favorites')
        self.request_body: dict[str, Any] = {
            "property_id": self.property.pk
        }
        # Mark the property as verified.
        change_is_verified(self.property, True)
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_add_favorite_property_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/favorites/add/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_post_authentication_fails(self) -> None:
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''
    
    ## Add favorite unit tests.
    def test_add_favorite_that_is_not_already_favorite_is_successful(self) -> None:
        before_count: int = Favorites.objects.filter(user=self.user).count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        after_count: int = Favorites.objects.filter(user=self.user).count()

        self.assertEqual(after_count, before_count+1)

        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)

    def test_add_favorite_property_that_does_not_exist_fails(self) -> None:
        self.request_body: dict[str, Any] = {
            "property_id": 5000000
        }
        before_count: int = Favorites.objects.filter(user=self.user).count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content)
        after_count: int = Favorites.objects.filter(user=self.user).count()

        self.assertEqual(after_count, before_count)

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message="Invalid property_id in request.").content))

    def test_add_favorite_property_that_is_already_favorite_fails(self) -> None:
        Favorites.objects.create(user=self.user, property=Property.objects.get(pk=1))

        before_count: int = Favorites.objects.filter(user=self.user).count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content)
        after_count: int = Favorites.objects.filter(user=self.user).count()

        self.assertEqual(after_count, before_count)

        self.assertEqual(response.status_code, HTTPStatus.CONFLICT.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.CONFLICT, error_message="User already has this property as a favorite.").content))

    def test_post_with_missing_property_id_field_fails(self) -> None:
        self.request_body: dict[str, Any] = {}

        before_count: int = Favorites.objects.filter(user=self.user).count()
        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content)
        after_count: int = Favorites.objects.filter(user=self.user).count()

        self.assertEqual(after_count, before_count)

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
        self.assertIn("property_id", json_response_data)

    def test_cannot_favorite_an_unverified_property(self) -> None:
        change_is_verified(self.property, False)

        response: HttpResponse = self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content)

        self.assertEqual(response.status_code, HTTPStatus.UNVERIFIED_PROPERTY.value)
        self.assertEqual(json_response_data, json.loads(response_generator.generate_error_response(HTTPStatus.UNVERIFIED_PROPERTY).content))
'''______________________________________________________________________________________'''
