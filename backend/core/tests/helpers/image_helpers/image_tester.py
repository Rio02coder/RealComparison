from core.models import Property
from core.helpers.image_processor.image_reader import image_reader
from core.helpers.image_processor.image_handler import image_handler

from typing import List,Dict,Any

import os


class ImageTester:
    """
        Helper class for testing operations related to uploading images for a property.
    """
    def delete_uploaded_images(self,image_urls: List[str], property: Property) -> None:
        """Ensures no images are uploaded in the hosting server as a result of running the unit tests"""
        property.refresh_from_db()
        for url in image_urls:
            image_handler.removeImage(url, property)

    def upload_images(self, property: Property) -> List[str]:
        """Ensures there are uploaded images for the tests to be able to remove them."""
        test_files: List[str]= ['base64_test1.txt', 'base64_test2.txt']
        for file in test_files:  
            data: str = image_reader.readImage(self.get_file_path(file, 'base64_test_strings'))  
            image_handler.uploadImage(property, data) 
            
        property.refresh_from_db()

        return property.image_urls

    def get_file_path(self, file_name:str, directory_name:str) -> str:
        current_path = os.path.dirname(__file__)
        file_path = os.path.join(current_path, directory_name)
        return f'{file_path}/{file_name}'

    def get_request_with_multiple_images(self, property_id : int) -> Dict[str, any]:
        request_body: Dict[str, Any] = {
            'property_id': property_id,
            'images':[
               image_reader.readImage(self.get_file_path('base64_test1.txt', 'base64_test_strings')), 
               image_reader.readImage(self.get_file_path('base64_test2.txt', 'base64_test_strings'))]
        }
        return request_body    
'''______________________________________________________________________________________'''
