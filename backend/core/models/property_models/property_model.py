from django.db import models
from django.core.validators import MinValueValidator, RegexValidator, MaxValueValidator
from django.utils import timezone
from django.core.exceptions import ValidationError

from core.models.user_models import User
from core.helpers.general_helpers.computation_helpers import calculateDistance
from core.helpers.validators.date_validators import validate_date, validate_year

from datetime import date, datetime

import json


class Property(models.Model):
    """
        Model used to store information related to a property.
    """
    ## Location related fields.
    city: str = models.CharField(max_length = 50, unique = False, blank = False)
    street_address: str = models.CharField(max_length = 250, unique = False, blank = False)
    zipcode: str = models.CharField(validators=[
            RegexValidator(
                regex = r'^[a-zA-Z0-9]+$',
                message = "Zip code must only contain alphanumerics."
            )
        ], max_length = 10, unique = False, blank = False)
    latitude: float = models.FloatField(validators = [MinValueValidator(-90), MaxValueValidator(90)],  blank = False)
    longitude: float = models.FloatField(validators = [MinValueValidator(-180), MaxValueValidator(180)], blank = False)

    ## Features related fields.
    has_garage: bool = models.BooleanField(default = False)
    has_cooling: bool= models.BooleanField(default = False)
    has_heating: bool = models.BooleanField(default = False)
    has_association: bool= models.BooleanField(default = False)
    num_of_bathrooms: int = models.IntegerField(validators = [MinValueValidator(0)])
    num_of_bedrooms: int = models.IntegerField(validators = [MinValueValidator(0)])
    num_of_stories: int = models.IntegerField(validators = [MinValueValidator(0)])
    type: str = models.CharField(max_length = 50, unique = False, blank = False)
    year_built: int = models.IntegerField(default= timezone.now().date().strftime("%Y"), blank = True, null = True)

    ## Sales related fields.
    latest_sale_price: float = models.FloatField(validators = [MinValueValidator(0)], blank = False)
    latest_sale_year: int = models.PositiveIntegerField(validators = [validate_year], default=datetime.today().year, null = True, blank = True)
    num_price_changes: int = models.IntegerField(validators = [MinValueValidator(0)], null = True, blank = True)
    tax_rate: float = models.FloatField(validators = [MinValueValidator(0)], default = 0.0)

    ## Size related fields.
    lot_size: float = models.FloatField(validators = [MinValueValidator(100)])
    living_area: float = models.FloatField(validators = [MinValueValidator(100)])

    ## Surrounding-schools related fields.
    avg_school_rating: float = models.FloatField(validators = [MinValueValidator(0)], null = True, blank = True)
    avg_school_size: float = models.FloatField(validators = [MinValueValidator(0)], null = True, blank = True)
    avg_school_distance: float = models.FloatField(validators = [MinValueValidator(0)], null = True, blank = True)
    median_students_per_teacher: int = models.IntegerField(validators = [MinValueValidator(0)], null = True, blank = True)
    
    ## User related fields.
    creator: User = models.ForeignKey(User, on_delete=models.SET_NULL, related_name = 'creator', null = True, blank = True, to_field='email')
    owner: User = models.ForeignKey(User, on_delete=models.SET_NULL, related_name = 'owner', default=None, null=True, blank=True, to_field='email')

    ## Predicted price field. (AI)
    predicted_price: float = models.FloatField(validators=[MinValueValidator(0.0)], null = True, blank = True, default = 0.0)

    ## Other fields.
    for_sale: bool = models.BooleanField(default=False)
    added_at: date = models.DateField(null = True, blank = True, validators=[validate_date])
    is_verified: bool = models.BooleanField(default = False)
    image_urls: json = models.JSONField(default = list, blank = True)

    class Meta:
        ordering = ['-latest_sale_price']
        unique_together = ('latitude', 'longitude')
        
    def get_full_address(self) -> str:
        """Return the full address of a property."""
        return f'{self.street_address} {self.city} {self.zipcode}'

    def clean(self):
        super().clean()
        if self.latest_sale_year < self.year_built:
            raise ValidationError("The latest sale year cannot be earlier than the year built.")

    @property
    def age(self) -> int:
        """Calculate the age of the property."""
        return timezone.now().date().year - self.year_built

    @property
    def favorites(self) -> int:
        """Calculate the number of favorites for a specific property."""
        from ..favorite_models import Favorites
        return Favorites.objects.filter(property=self).count()

    @property
    def distance_from_center(self)-> float:
        """Calculate the distance of the property from central Austin."""
        CENTER_LATITUDE:float = 30.266666
        CENTER_LONGITUDE:float = -97.733330
        return calculateDistance(self.latitude,CENTER_LATITUDE,self.longitude,CENTER_LONGITUDE)
    
    @property 
    def percentage_difference(self)-> float:
        """Calculate the percentage difference between the predicted price & actual price."""
        error = abs(float(self.predicted_price)-float(self.latest_sale_price))
        price_percentage_difference = -1*((100*error/float(self.latest_sale_price)))
        return price_percentage_difference

    @property
    def views(self) -> int:
        """Sums the views of each user for a specific property."""
        from .property_view_count_model import UserPropertyViewCounts
        view_counts: UserPropertyViewCounts = UserPropertyViewCounts.objects.filter(property=self)
        total_views: int = 0
        for view_count_obj in view_counts:
            total_views += view_count_obj.view_count
        return total_views
'''______________________________________________________________________________________'''
