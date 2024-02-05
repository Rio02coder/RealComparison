from django.http import JsonResponse
from django.test import TestCase
from django.urls import reverse

from core.models.user_models import User
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.user_helpers.user_tester import UserTester
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

from typing import List, Any

import json


class GetUserListViewsTestCase(TestCase, UserTester):
    """
        Unit tests for the User List view.
    """
    fixtures = FixtureHandler([(User, True)]).getFixtures()

    def setUp(self) -> None:
        self.url = reverse('users')
        self.user = User.objects.get(email = 'ivanwillams@example.org')
        self.auth_token = token_handler.retrieve_access_token(self.user).key
        self.headers = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.num_of_test_users: int = 100
    '''______________________________________________________________________________________'''

    ## URL Unit tests.
    def test_users_list_url(self) -> None:
        self.assertEqual(self.url,'/users/')
    '''______________________________________________________________________________________'''

    ## Authentication Unit tests.
    def test_get_no_authentication_fails(self) -> None:
        response:JsonResponse = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Retrive a list of all users.
    def test_get_user_list_is_sucessfull(self) -> None:
        self._create_test_users(self.num_of_test_users)
        response : JsonResponse = self.client.get(self.url, **self.headers, content_type='application/json')
        json_response_data: dict[str, Any] = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        
        for user_id in range(self.num_of_test_users):
            self.assertEqual(json_response_data[user_id]['first_name'], f'test_first_name{user_id}')
            self.assertEqual(json_response_data[user_id]['last_name'], f'test_last_name{user_id}')
            self.assertEqual(json_response_data[user_id]['phone_number'],"+447851885519")
            self.assertEqual(json_response_data[user_id]['email'], f'test_email{user_id}@example.org.')
            self.assertEqual(json_response_data[user_id]['is_verified'], True)
            self.assertEqual(json_response_data[user_id]['is_active'], True)
    
    def test_get_user_list_only_shows_verified_users(self) -> None:
        users: List[User] = self._create_test_users()
        self.mark_users_as_unverified(users)
        
        response : JsonResponse = self.client.get(self.url, **self.headers, content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),[])
'''______________________________________________________________________________________'''
  