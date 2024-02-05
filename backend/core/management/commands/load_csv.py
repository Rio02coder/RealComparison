from django.core.management import BaseCommand
from django.db import transaction
from django.utils import timezone
from django.db import transaction

from core.models.property_models import Property, PropertyImages
from core.ML_algorithms.AI_models.AbstractMLRegressionModel import AbstractMLRegressionModel
from core.helpers.validators.price_validators import validate_price
from core.ML_algorithms.helpers.ML_regressors import ML_REGRESSOR_MAP

from RealComparison.settings import CURRENT_ML_REGRESSOR

import csv
import os


class Command(BaseCommand):
    """
        Loads Austin Housing dataset from a CSV file.
    """
    ml_regressor: AbstractMLRegressionModel = ML_REGRESSOR_MAP.get(CURRENT_ML_REGRESSOR)

    def handle(self, *args, **options):
        start_time = timezone.now()
        file_path = os.path.abspath("austinHousingData.csv")

        with open(file_path, encoding="utf8") as csv_file:
            data = list(csv.reader(csv_file, delimiter=","))
            properties = []
            property_images = []
            for row in data[1:]:
                property = Property(
                    city=row[1],
                    street_address=row[2],
                    zipcode=row[3],
                    latitude = row[5],
                    longitude = row[6],
                    has_garage = bool(row[11]),
                    has_cooling = bool(row[10]),
                    has_heating = bool(row [12]),
                    has_association = bool(row[9]),
                    num_of_bathrooms = int(float(row[43])),
                    num_of_bedrooms = int(float(row[44])),
                    num_of_stories = int(float(row[45])),
                    latest_sale_price = float(row[18]),
                    latest_sale_year = row[22],
                    num_price_changes = row[19],
                    lot_size = row[33],
                    living_area = row[34],
                    avg_school_rating = row[40],
                    avg_school_size = row[41],
                    avg_school_distance = row[39],
                    median_students_per_teacher = row[42],
                    type = row[15],
                    year_built = row[17],
                    tax_rate = row[7],
                    added_at = timezone.now().date(),
                    is_verified = True,
                    image_urls = ['https://austin-properties.s3.eu-west-2.amazonaws.com/media/homeImages/' + row[46]]
                )
                
                property_image = PropertyImages(
                    property = property,
                    image = row[46],
                )

                properties.append(property) 
                property_images.append(property_image)    

            self.save_properties(properties)
            PropertyImages.objects.bulk_create(property_images)

            self.populate_price_predictions()

        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"SUCCESS! The properties have been loaded. The command took: {(end_time-start_time).total_seconds()} seconds."
            )
        )
    '''______________________________________________________________________________________'''

    ## Transactions.
    @transaction.atomic
    def populate_price_predictions(self):
        populated_properties = list(Property.objects.all())
        predicted_prices = self.ml_regressor.get_predictions(populated_properties) 
        
        for i in range (len(populated_properties)):
            # Store results from the ML evaluation for each property. (AI)
            populated_properties[i].predicted_price = float(validate_price(predicted_prices[i]))            
            populated_properties[i].save()    

    @transaction.atomic        
    def save_properties(self,properties):
        for property in properties:
            property.save()
'''______________________________________________________________________________________'''
