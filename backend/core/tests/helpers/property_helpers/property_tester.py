from django.urls import reverse

from core.models.property_models import Property
from core.models.user_models import User
from core.helpers.general_helpers.toggler import change_is_verified
from core.helpers.ownership_handler.ownership_helpers import change_property_owner

from typing import List, Any, Dict

import json


class PropertyTester:
    """
        Helper class for testing operations related to properties.
    """
    ## Property creators.
    def _create_test_properties(self, count=6) -> List[Property]:
        properties: List[Property] = []
        for property_id in range(1,count):
            property = Property.objects.create(
                city= f'city{property_id}',
                street_address=f'address{property_id}',
                zipcode= property_id * 5,
                latitude = property_id,
                longitude = property_id,
                has_garage = True,
                has_cooling = False,
                has_heating = True,
                num_of_bathrooms = 6,
                num_of_bedrooms = 4,
                num_of_stories = 3,
                latest_sale_price = property_id * 8,
                latest_sale_year = "2020",
                lot_size =  property_id * 10,
                living_area  = property_id * 15,
                type = f'type{property_id}',
                year_built = 2012,
                tax_rate = 1.66,
                is_verified = True
                )
            properties.append(property)
        return properties

    def _create_user_added_property(self, count: int, headers: Dict[str, str]):
        url: str = reverse('add_property')
        for i in range (1,count+1):
            request_body: dict[str, Any] = {
            "city": f"austin{i}",
            "street_address": f"{i} Liverpool St",
            "zipcode":  f"{i}" * 5,
            "latitude": i + 10,
            "longitude": i + 10,
            "has_garage": True,
            "has_cooling": False,
            "has_heating": True,
            "num_of_bathrooms": 5,
            "num_of_bedrooms": 7,
            "num_of_stories": 2,
            "latest_sale_price": i * (i+1),
            "latest_sale_year": "2010",
            "lot_size": 100,
            "living_area": 100,
            "type": "Condo"
            }
            self.client.post(url, data=json.dumps(request_body), content_type='application/json', **headers)

    def _create_second_property(self) -> dict:
        request_body: dict[str, Any] = {
        "city": "austin",
        "street_address": "1408 Cramet St",
        "zipcode":  "12092",
        "latitude": 32.43,
        "longitude": -99.66,
        "has_garage": True,
        "has_cooling": True,
        "has_heating": True,
        "num_of_bathrooms": 2,
        "num_of_bedrooms": 2,
        "num_of_stories": 1,
        "latest_sale_price": 12222.1,
        "latest_sale_year": 2011,
        "lot_size": 12221.2,
        "living_area": 2728.1,
        "type": "Apartment"
        }
        return request_body
    '''______________________________________________________________________________________'''
    
    ## Property marker.
    def mark_properties_as_unverified(self, properties: List[Property]) -> None:
        for property in properties:
            change_is_verified(property, False)
    '''______________________________________________________________________________________'''

    ## Property assigners.
    def assign_creator_to_properties(self, properties: List[Property], user: User) -> None:
        for property in properties:
            property.creator = user
            property.save()
    
    def assign_owner_to_properties(self, properties: List[Property], user: User) -> None:
        for property in properties:
            change_property_owner(property, user)
'''______________________________________________________________________________________'''
