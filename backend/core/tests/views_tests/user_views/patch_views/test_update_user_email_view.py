from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse

from rest_framework.authtoken.models import Token

from core.models.property_models.property_model import Property
from core.models.user_models import User
from core.models.property_models import Property
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.tests.helpers.email_helpers.email_tester import EmailTester
from core.authentication.tokens.token_handler import token_handler
from core.helpers.ownership_handler.ownership_helpers import change_property_owner

from http import HTTPStatus

from typing import Dict

import json


class UpdateUserEmailViewTestCase(TestCase, EmailTester):
    """
        Tests the Update User Email View.
    """
    fixtures = FixtureHandler([(User, True), (Property, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(email="ivanwillams@example.org")
        self.property: Property = Property.objects.get(pk=1)
        self.auth_token: Token = token_handler.retrieve_access_token(self.user).key
        self.headers: dict[str, str] = {'HTTP_AUTHORIZATION': f'Bearer {self.auth_token}'}
        self.url: str = reverse('change_user_email')
        self.form_input: Dict[str, str] = {
            "email": "newemail@gmail.com",
        }
    '''______________________________________________________________________________________'''

    ## URL unit tests.
    def test_change_user_password_view_url(self) -> None:
        self.assertEqual(self.url, f'/user/profile/change/email/')
    '''______________________________________________________________________________________'''

    ## Authentication unit tests.
    def test_no_authentication_fails(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
    '''______________________________________________________________________________________'''

    ## Change the user's email unit tests.
    def test_change_user_email_without_providing_new_email_fails(self) -> None:
        self.form_input: Dict[str, str] = {
            "email": "",
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEquals(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_change_user_email_with_invalid_email_fails(self) -> None:
        self.form_input: Dict[str, str] = {
            "email": "johndoe@example",
        }
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)

        self.assertEquals(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_change_user_email_was_successful(self) -> None:
        try:
            old_token: Token = Token.objects.get(user=self.user)
            response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
            self.user.refresh_from_db()
            new_token: Token = Token.objects.get(user=self.user)
        except ObjectDoesNotExist:
            self.fail("Could not retrieve the user token.")

        self.assertEquals(self.form_input['email'], self.user.email)
        self.assertNotEquals(old_token, new_token)
        self.assertEqual(self.user.is_verified, False)
        self.assertEquals(response.status_code, HTTPStatus.OK.value)

    def test_change_user_email_is_successful_when_owner(self) -> None:
        self.property.owner = self.user
        self.property.save()

        try:
            old_token: Token = Token.objects.get(user=self.user)
            response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
            self.user.refresh_from_db()
            new_token: Token = Token.objects.get(user=self.user)
        except ObjectDoesNotExist:
            self.fail("Could not retrieve the user token.")

        self.assertEquals(self.form_input['email'], self.user.email)
        self.assertNotEquals(old_token, new_token)
        self.assertEquals(response.status_code, HTTPStatus.OK.value)

    def test_change_user_email_is_successful_when_creator(self) -> None:
        self.property.creator = self.user
        self.property.save()

        try:
            old_token: Token = Token.objects.get(user=self.user)
            response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
            self.user.refresh_from_db()
            new_token: Token = Token.objects.get(user=self.user)
        except ObjectDoesNotExist:
            self.fail("Could not retrieve the user token.")

        self.assertEquals(self.form_input['email'], self.user.email)
        self.assertNotEquals(old_token, new_token)
        self.assertEquals(response.status_code, HTTPStatus.OK.value)

    def test_user_is_verified_when_new_email_is_verified(self) -> None:
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.assertEquals(response.status_code, HTTPStatus.OK.value)

        self.user.refresh_from_db()
        # User has not yet verified their email.
        self.assertFalse(self.user.is_verified)

        #User has verified their email.
        self.verify_user_email(self.user.pk)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_verified)
    
    def test_creator_field_is_updated_when_user_email_is_changed(self) -> None:
        self.property.creator = self.user
        self.property.save()
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.property.refresh_from_db()
        self.user.refresh_from_db()

        self.assertEqual(self.property.creator.email, self.user.email)
        self.assertEquals(response.status_code, HTTPStatus.OK.value)

    def test_owner_field_is_updated_when_user_email_is_changed(self) -> None:
        change_property_owner(self.property, self.user)
        response = self.client.patch(self.url, json.dumps(self.form_input), content_type='application/json', **self.headers)
        self.property.refresh_from_db()
        self.user.refresh_from_db()

        self.assertEqual(self.property.owner.email, self.user.email)
        self.assertEquals(response.status_code, HTTPStatus.OK.value)
'''______________________________________________________________________________________'''