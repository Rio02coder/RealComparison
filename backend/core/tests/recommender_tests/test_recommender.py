from django.test import TestCase, override_settings
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.recommender.property_vector import Vector
from core.recommender.property_recommender import Recommender
from core.models.user_models import User
from core.models.favorite_models import Favorites
from core.models.property_models import Property
from core.tests.fixtures.fixture_handler import FixtureHandler

from typing import Any

import json
import sys


class RecommenderTestCase(TestCase):
    """
        Tests the Recommender class.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.user_add_property_to_favourites()
        self.recommender_obj: Recommender = self.create_recommender_obj()
        self.vector1: Vector = Vector(1,2,3,4)
        self.vector2: Vector = Vector(2,4,6,8)
    '''______________________________________________________________________________________'''
    
    ## Unit test on object instantiation.
    def test_object_instance_is_not_none(self) -> None:
        self.assertIsNotNone(self.recommender_obj)

    def test_favourites_is_not_none(self) -> None:
        self.assertIsNotNone(self.recommender_obj.favorites)

    def test_properties_is_not_none(self) -> None:
        self.assertIsNotNone(self.recommender_obj.properties)
    '''______________________________________________________________________________________'''

    ## Unit test on return values and variable assignment.
    def test_dot_product_of_two_vectors_is_valid(self) -> None:
        dot_product: float = self.recommender_obj.dot_product_of_two_vectors(self.vector1, self.vector2)
        self.assertEqual(dot_product, 1.0)

    def test_division_by_zero_error_exception(self) -> None:
        self.assertRaises(ZeroDivisionError, self.recommender_obj.dot_product_of_two_vectors, Vector(0,0,0,0), self.vector2)

    def test_property_vectors_is_not_none(self):
        self.assertIsNotNone(self.recommender_obj.properties_vectors)

    def test_favourite_vectors_is_not_none(self):
        self.assertIsNotNone(self.recommender_obj.favorites_vectors)

    @override_settings(NUMBER_OF_RECOMMENDATIONS=sys.maxsize)
    def test_number_of_recommendations_less_than_desired_number_of_recommendations_is_valid(self):
        final_number_of_recommendations = len(self.recommender_obj.get_recommended_properties())
        number_of_recommendations = len(self.recommender_obj.recommended_properties)
        # The algorithm should set the number of recommendations to the number existing in the list.
        self.assertEqual(final_number_of_recommendations, number_of_recommendations)

    @override_settings(NUMBER_OF_RECOMMENDATIONS=-sys.maxsize -1)
    def test_number_of_recommendations_greater_than_desired_number_of_recommendations_is_valid(self):
        final_number_of_recommendations = len(self.recommender_obj.get_recommended_properties())
        number_of_recommendations = len(self.recommender_obj.recommended_properties)
        self.assertNotEqual(final_number_of_recommendations, number_of_recommendations)
    '''______________________________________________________________________________________'''

    ## Helper methods
    def user_add_property_to_favourites(self):
        self.auth_token: Token = Token.objects.get(user=self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('add_user_favorites')
        self.request_body: dict[str, Any] = {
            "property_id": 2
        }
        self.client.post(self.url, data=json.dumps(self.request_body), content_type='application/json', **self.headers)
    
    def create_recommender_obj(self):
        recommender_obj: Recommender = Recommender()
        recommender_obj.set_favorites(Favorites.objects.filter(user=self.user))
        recommender_obj.set_properties(Property.objects.all())
        return recommender_obj
'''______________________________________________________________________________________'''