from django.db import IntegrityError
from django.test import TestCase

from core.models.user_models import User
from core.models.property_models import Property
from core.models.favorite_models import Favorites
from core.tests.fixtures.fixture_handler import FixtureHandler


class FavoritesModelTestCase(TestCase):
    """
        Unit tests for the Favorites model.
    """
    fixtures = FixtureHandler([(User, True), (User, False), (Property, True), (Property, False)]).getFixtures()

    def setUp(self) -> None:
        self.user: User = User.objects.get(pk=1)
        self.property: Property = Property.objects.get(pk=1)
        self.favorite: Favorites = Favorites.objects.create(user=self.user, property=self.property)
    '''______________________________________________________________________________________'''

    ## Favorite model unit tests.
    def test_user_cannot_favorite_same_property_twice(self) -> None:
        with self.assertRaises(IntegrityError):
            Favorites.objects.create(user=self.user, property=self.property)

    def test_user_can_have_multiple_favorites(self) -> None:
        second_property: Property = Property.objects.get(pk=2)
        
        before_count: int = Favorites.objects.filter(user=self.user).count()
        Favorites.objects.create(user=self.user, property=second_property)
        after_count: int = Favorites.objects.filter(user=self.user).count()

        self.assertEqual(after_count, before_count+1)

    def test_two_users_can_have_the_same_favorite(self) -> None:
        second_user: User = User.objects.get(pk=2)
        try:
            Favorites.objects.create(user=second_user, property=self.property)
        except:
            self.fail("Two users should be able to have the same favorite property. However, an exception has been raised.")
'''______________________________________________________________________________________'''