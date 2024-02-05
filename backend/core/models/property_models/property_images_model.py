from django.db import models
from django.forms import ImageField

from .property_model import Property


class PropertyImages(models.Model):
    """
        Model represting the property images.
    """
    property: Property = models.ForeignKey(Property, on_delete=models.CASCADE)
    image: ImageField = models.ImageField(blank = False)

    class Meta:
        unique_together = ('property', 'image')
    
    def delete(self):
        """Ensure the image file gets deleted from the Amazon s3 endpoint."""
        self.image.delete(save=False)
        super().delete()
'''______________________________________________________________________________________'''