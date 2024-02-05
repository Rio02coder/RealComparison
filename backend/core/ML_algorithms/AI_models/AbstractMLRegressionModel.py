from core.models.property_models import Property

from abc import ABC, abstractmethod

from typing import Dict, List, Any

import warnings
warnings.filterwarnings('ignore',category=FutureWarning)


class AbstractMLRegressionModel(ABC):
    """
        Abstract class, representing a ML model.
    """
    @property
    @abstractmethod
    def filename(self) -> str:
        pass

    @property
    @abstractmethod
    def loaded_model(self):
        pass

    @property
    @abstractmethod
    def features(self) -> List[str]:
        pass

    @abstractmethod
    def get_predictions(self, properties: List[Property]) -> Dict[str, Any]:
        pass
'''______________________________________________________________________________________'''