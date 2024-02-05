from core.models.property_models import Property

from .AbstractMLRegressionModel import AbstractMLRegressionModel

from typing import Dict, List, Any

from xgboost import XGBRegressor

import pandas as pd
import pickle 


class XGBoostModel(AbstractMLRegressionModel):
    # Load the model from disk.
    filename = 'static/XGBoost.sav'
    # Retrieve the model.
    loaded_model:XGBRegressor = pickle.load(open(filename, 'rb'))
    # Set of features used to predict the propery's price.
    features: List[str] = ['numOfBathrooms', 'zipcode', 'latest_sale_year', 'avgSchoolRating', 'livingAreaSqFt', 'lotSizeSqFt', 'latitude', 'longitude', 'yearBuilt', 'avgSchoolSize', 'numPriceChanges']

    def get_predictions(self, properties: List[Property]) -> Dict[str, Any]:
        data = {
            'numOfBathrooms': list(map(lambda property: int(property.num_of_bathrooms), properties)),
            'zipcode': list(map(lambda property: int(property.zipcode), properties)),
            'latest_sale_year': list(map(lambda property: float(property.latest_sale_year), properties)),
            'avgSchoolRating': list(map(lambda property: float(property.avg_school_rating), properties)),
            'livingAreaSqFt': list(map(lambda property: float(property.living_area), properties)),
            'lotSizeSqFt': list(map(lambda property: float(property.lot_size), properties)),
            'latitude': list(map(lambda property: float(property.latitude), properties)),
            'longitude': list(map(lambda property: float(property.longitude), properties)),
            'yearBuilt': list(map(lambda property: int(property.year_built), properties)),
            'avgSchoolSize': list(map(lambda property: int(property.avg_school_size), properties)),
            'numPriceChanges': list(map(lambda property: int(property.num_price_changes), properties)),
        }
        X = pd.DataFrame.from_dict(data)

        predicted_prices = self.loaded_model.predict(X)
        
        return predicted_prices
'''______________________________________________________________________________________'''

xg_boost = XGBoostModel()