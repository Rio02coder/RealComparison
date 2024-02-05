from django.core.files.base import ContentFile

from core.models.property_models import PropertyImages

import re
import base64 
import uuid 


class ImageReader:
    """
        A class that can read and decode base64 image strings.
    """
    def readImage(self, file_path:str) -> str:
        with open(file_path, 'r') as file:
            data = file.read().rstrip()
            return data

    def decodeBase64Image(self, image_base64: str, property_pk: int) -> ContentFile:
        image_data: str = base64.b64decode(re.search(r'base64,(.*)', image_base64).group(1))
        file: ContentFile = ContentFile(image_data, self.generateUniqueFileName(property_pk))
        return file

    def generateUniqueFileName(self, property_id:int) -> str:
        image_name:str =  self.generateName(property_id)
        while (PropertyImages.objects.filter(image = image_name).exists()):
            image_name =  self.generateName(property_id)
        return image_name

    def generateName(self, property_pk: int) -> str:
        return f'{property_pk}-{uuid.uuid4().hex[:10].upper()}.png'
'''______________________________________________________________________________________'''

image_reader = ImageReader()