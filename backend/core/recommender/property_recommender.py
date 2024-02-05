from django.conf import settings

from .property_vector import Vector

from math import sqrt

import random


class Recommender:
    """
        Calculates a list of recommendations based on favorites.
    """
    def __init__(self) -> None:
        self.favorites_vectors = {}
        self.properties_vectors = {}
        self.recommended_properties = []

    def set_properties(self, properties):
        self.properties = list(properties)
        self.set_all_property_vectors()
    
    def set_favorites(self, favorites):
        self.favorites = list(favorites)
        self.set_favorites_vectors()
    
    def get_num_of_bathrooms(self, property) -> int:
        return property.num_of_bathrooms

    def get_num_of_bedrooms(self, property) -> int:
        return property.num_of_bedrooms

    def get_num_of_stories(self, property) -> int:
        return property.num_of_stories

    def get_latest_sale_price(self, property) -> float:
        return property.latest_sale_price

    def set_favorites_vectors(self) -> None:
        """Set all the vectors associated with each favorite property."""
        for favorite in self.favorites:
            self.favorites_vectors[favorite] = Vector(self.get_num_of_bathrooms(favorite.property), 
                                                        self.get_num_of_bedrooms(favorite.property), 
                                                        self.get_num_of_stories(favorite.property), 
                                                        self.get_latest_sale_price(favorite.property))

    def set_all_property_vectors(self) -> None:
        """Set all the vectors associated with each property."""
        for property in self.properties:
            self.properties_vectors[property] = Vector(self.get_num_of_bathrooms(property), 
                                                        self.get_num_of_bedrooms(property), 
                                                        self.get_num_of_stories(property), 
                                                        self.get_latest_sale_price(property))

    def dot_product_of_two_vectors(self, vector1: Vector, vector2: Vector) -> float:
        """Calculate and return the dot product of the two given vectors."""

        numerator: int = (vector1.get_num_of_bathrooms() * vector2.get_num_of_bathrooms()) + (vector1.get_num_of_bedrooms() * vector2.get_num_of_bedrooms()) + (vector1.get_num_of_stories() * vector2.get_num_of_stories()) + (vector1.get_latest_sale_price() * vector2.get_latest_sale_price())

        denominator: float = sqrt(vector1.get_sum_of_squares_of_attributes_of_vector()) * sqrt(vector2.get_sum_of_squares_of_attributes_of_vector())

        if denominator == 0:
            raise ZeroDivisionError("Division by zero is not allowed")

        return float(numerator)/denominator

    # Algorithm checks each favorite property, and compares each favouite with all the properties.
    # Calculates the dot product of the favorite property with every properties.
    # Dot products with results with a certain limit are added to the list of recommended properties.
    # Returns a random set of recommendations from the list.
    # If there is no favorites, returns a random list of properties as recommendations.
    def get_recommended_properties(self) -> list:
        if self.favorites == None or len(self.favorites) == 0:
            random.shuffle(self.properties)
            return self.properties[0:settings.NUMBER_OF_RECOMMENDATIONS]

        for favorite in self.favorites:
            favoriteVector: Vector = self.favorites_vectors.get(favorite)
            for property in self.properties:
                if self.dot_product_of_two_vectors(favoriteVector, self.properties_vectors.get(property)) >= 0.9999999999:
                    self.recommended_properties.append(property)          
        
        random.shuffle(self.recommended_properties)

        if len(self.recommended_properties) >= settings.NUMBER_OF_RECOMMENDATIONS:
            return self.recommended_properties[0:settings.NUMBER_OF_RECOMMENDATIONS]
        else:
            return self.recommended_properties
'''______________________________________________________________________________________'''

recommender_obj: Recommender = Recommender()