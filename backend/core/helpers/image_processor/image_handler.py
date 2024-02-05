from django.core.files.base import ContentFile
from django.core.exceptions import ObjectDoesNotExist

from core.models.property_models import PropertyImages, Property
from .image_reader import image_reader


class ImageHandler():
    """
        A class that is responsible for hanlding the uploading/removing of images.
    """
    def getImageURL(self, file_name: str) -> str:
        return f'https://austin-properties.s3.eu-west-2.amazonaws.com/{file_name}'

    def getDefaultImageURL(self) -> str:
        return 'https://austin-properties.s3.eu-west-2.amazonaws.com/default-image.png'

    def extractImageName(self, url: str) -> str:
        return url[url.rfind('/')+1:]

    def uploadImage(self, property: Property, base_64_image: str) -> None:
        file: ContentFile = image_reader.decodeBase64Image(base_64_image, property.pk)
        PropertyImages.objects.create(property=property, image=file) 

        # Remove the default image URL.
        if self.getDefaultImageURL() in property.image_urls:
            property.image_urls.pop(0)
        
        # Add the URL of this image to the list of URLs.
        property.image_urls.append(self.getImageURL(file.name))
        property.save()

    def removeImage(self, image_url: str, property: Property) -> None:
        file_name:str = self.extractImageName(image_url)
        try:
            PropertyImages.objects.get(image=file_name).delete()
            
            # Remove the URL of this image from the list of URLs.
            property.image_urls.remove(image_url)
            property.save()
            
        except ObjectDoesNotExist:
            return

    def generateImageURLsResponse(self, property: Property):
        response = {
            "image_urls" : property.image_urls
        }
        return response
'''______________________________________________________________________________________'''

image_handler = ImageHandler()