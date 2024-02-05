from django.db import IntegrityError
from django.test import TestCase
from django.core.files.base import ContentFile
from django.core.exceptions import ObjectDoesNotExist

from core.models import User, Property, PropertyImages
from core.helpers.customs.custom_http_status import HTTPStatus
from core.tests.helpers.image_helpers.image_tester import ImageTester
from core.tests.helpers.assertion_helpers.assertion_tester import AssertionTester
from core.tests.fixtures.fixture_handler import FixtureHandler
from core.helpers.image_processor.image_reader import image_reader
from core.helpers.image_processor.image_handler import image_handler

import requests


class PropertyImagesModelTestCase(TestCase,ImageTester,AssertionTester):
    """
        Unit tests for the Property Images model.
    """
    fixtures = FixtureHandler([(User, True), (Property, True)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.property: Property = Property.objects.get(pk=1)
        base64_image: str = image_reader.readImage(self.get_file_path('base64_test1.txt', 'base64_test_strings'))
        self.image: ContentFile = image_reader.decodeBase64Image(base64_image, self.property.pk)
        self.image.name = 'test1.png'
        self.property_image: PropertyImages = PropertyImages.objects.create(property=self.property, image=self.image)
    '''______________________________________________________________________________________'''

    ## Property image model unit tests.
    def test_image_and_property_should_form_unique_combination(self) -> None:
        with self.assertRaises(IntegrityError):
            PropertyImages.objects.create(property=self.property, image=self.image)

    def test_image_cannot_be_blank(self) -> None:
       self.property_image.image = ''
       self._assert_object_is_invalid(self.property_image)

    def test_image_is_deleted_when_property_is_deleted(self) -> None:
        self.property.delete()
        with self.assertRaises(ObjectDoesNotExist):
            PropertyImages.objects.get(property=self.property)

    def test_image_is_removed_from_hosting_server_when_deleted(self) -> None:
        image_url = image_handler.getImageURL(self.property_image.image.name)

        # The URL should be valid.
        response = requests.get(image_url)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)

        self.property_image.delete()
        response = requests.get(image_url)
        
        # The URL should not be valid anymore (image does not exist)
        self.assertEqual(response.status_code, HTTPStatus.FORBIDDEN.value)
'''______________________________________________________________________________________'''