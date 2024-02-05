from core.models.property_models import Property

from .AbstractMLRegressionModel import AbstractMLRegressionModel

from typing import Dict, List, Any

import pandas as pd
import pickle 


class LinearRegressionModel(AbstractMLRegressionModel):
    # Load the model from disk.
    filename: str = 'static/LinearRegressor.sav'
    # Retrieve the model.
    loaded_model = pickle.load(open(filename, 'rb'))
    # Set of features used to predict the propery's price.
    features: List[str] = ['latitude','longitude','lotSizeSqFt','livingAreaSqFt']

    def get_predictions(self, properties: List[Property]) -> Dict[str, Any]:
        data = {
            'latitude': list(map(lambda property: float(property.latitude), properties)),
            'longitude': list(map(lambda property: float(property.longitude), properties)),
            'lotSizeSqFt': list(map(lambda property: float(property.lot_size), properties)),
            'livingAreaSqFt': list(map(lambda property: float(property.living_area), properties)),
        }
        X = pd.DataFrame.from_dict(data)

        predicted_prices = self.loaded_model.predict(X)

        return predicted_prices
'''______________________________________________________________________________________'''

linear_regression = LinearRegressionModel()
