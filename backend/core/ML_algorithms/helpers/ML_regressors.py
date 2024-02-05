from core.ML_algorithms.AI_models.LinearRegressionModel import linear_regression
from core.ML_algorithms.AI_models.RandomForestModel import random_forest
from core.ML_algorithms.AI_models.XGBoostModel import xg_boost


ML_REGRESSOR_MAP = {
    "linear_regression": linear_regression,
    "random_forest": random_forest,
    "xg_boost": xg_boost,
}
'''______________________________________________________________________________________'''