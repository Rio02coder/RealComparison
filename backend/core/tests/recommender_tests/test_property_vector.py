from django.test import TestCase

from core.recommender.property_vector import Vector


class VectorTestCase(TestCase):
    """
        Tests the Vector class.
    """
    def setUp(self) -> None:
        self.vector: Vector = Vector(1, 2, 3, 4)
    '''______________________________________________________________________________________'''

    ## Unit test on object instantiation.
    def test_object_instance_is_not_none(self) -> None:
        self.assertIsNotNone(self.vector)

    def test_num_of_bathrooms_is_valid(self) -> None:
        self.assertEqual(self.vector.get_num_of_bathrooms(), 1)

    def test_num_of_bedrooms_is_valid(self) -> None:
        self.assertEqual(self.vector.get_num_of_bedrooms(), 2)

    def test_num_of_stories_is_valid(self) -> None:
        self.assertEqual(self.vector.get_num_of_stories(), 3)

    def test_latest_sale_price_is_valid(self) -> None:
        self.assertEqual(self.vector.get_latest_sale_price(), 4)
    '''______________________________________________________________________________________'''

    ## Unit test for method return values.
    def test_get_sum_of_squares_of_attributes_of_vector(self) -> None:
        self.assertEqual(self.vector.get_sum_of_squares_of_attributes_of_vector(), 30)
'''______________________________________________________________________________________'''