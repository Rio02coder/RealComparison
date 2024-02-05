

class Vector():
    """
        Contains the attributes of a Vector.
    """
    def __init__(self, num_of_bathrooms, num_of_bedrooms, num_of_stories, latest_sale_price) -> None:
        self.num_of_bathrooms: int = num_of_bathrooms
        self.num_of_bedrooms: int = num_of_bedrooms
        self.num_of_stories: int = num_of_stories
        self.latest_sale_price: float = latest_sale_price

    def get_num_of_bathrooms(self) -> int:
        return self.num_of_bathrooms

    def get_num_of_bedrooms(self) -> int:
        return self.num_of_bedrooms

    def get_num_of_stories(self) -> int:
        return self.num_of_stories

    def get_latest_sale_price(self) -> float:
        return self.latest_sale_price

    def get_sum_of_squares_of_attributes_of_vector(self) -> float:
        return pow(self.get_num_of_bathrooms(), 2) + pow(self.get_num_of_bedrooms(), 2) + pow(self.get_num_of_stories(), 2) + pow(self.get_latest_sale_price(), 2)
'''______________________________________________________________________________________'''