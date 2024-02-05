from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.user_models import User
from core.models.property_models import Property
from core.models.favorite_models import Favorites
from core.tests.fixtures.fixture_handler import FixtureHandler

from http import HTTPStatus

from typing import Any

import json


class RecommenderPropertyViewTestCase(TestCase):
    """
        Tests the Recommender Property View.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()
    
    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.auth_token: Token = Token.objects.get(user=self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('user_recommendations')
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_get_recommender_property_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/recommendations/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response: HttpResponse = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Recommender unit tests.
    def test_user_without_favourites_has_recommendations(self) -> None:
        response: HttpResponse = self.client.get(self.url, **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content) 

        self.assertIn("recommendations", json_response_data)
        self.assertGreater(len(json_response_data["recommendations"]), 0)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)

    def test_user_with_multiple_favorites_has_recommendations(self) -> None:
        Favorites.objects.create(user=self.user, property=Property.objects.get(pk=1))
        Favorites.objects.create(user=self.user, property=Property.objects.get(pk=2))

        response: HttpResponse = self.client.get(self.url, **self.headers)
        json_response_data: dict[str, Any] = json.loads(response.content) 

        self.assertIn("recommendations", json_response_data)
        self.assertGreater(len(json_response_data["recommendations"]), 0)

        self.assertEqual(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''
