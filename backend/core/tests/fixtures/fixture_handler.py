from django.db.models.base import Model

from core.models import *

from typing import Dict, Tuple, List


# @author: Alexandru-Eugen Toma
class FixtureHandler:
    """
        Avoid repeated import statements with fixture import handler.
    """
    model_names: Dict[Model, List[str]] = {
        User: ['users'],
        Property: ['properties']
    }
    common_path = 'core/tests/fixtures/'
    fixture_paths = {
        True: f'{common_path}defaults/',
        False: f'{common_path}others/'
    }

    def __init__(self, queried_models: List[Tuple[Model, bool]]) -> None:
        """
        @param queriedModels A list containing all the models referenced by a fixture import.
        If their associated boolean is true, this is a import must be coming
        from the default fixtures.
        """
        self.queried_models = queried_models

    def getFixtures(self, exceptingFixtures: Dict[Tuple[Model, bool], List[str]] = {}) -> List[str]:
        """
        Get all the associated clear fixtures to the passed in queried models.
        @param exceptingFixtures The fixtures to leave out for a given model.
        In the provided tuple, the bool refers to the type of fixtures to be
        imported (`defaults` or `others`).
        """
        fixtures: List[str] = []
        for (queriedModel, isDefaultFixture) in self.queried_models:
            exceptingFixtureNames: List[str] = []
            try:
                exceptingFixtureNames = exceptingFixtures[(queriedModel, isDefaultFixture)]
            except:
                pass
            fixtures.extend(
                FixtureHandler.getSpecificFixtures(
                    queriedModel,
                    isDefaultFixture,
                    exceptingFixtureNames
                )
            )
        return fixtures

    def getSpecificFixtures(model: Model, isDefault: bool, exceptingFixtures: List[str] = []) -> List[str]:
        """
        Get the specific paths associated to an asked model fixture
        @param exceptingFixtures The fixtures to leave out for this provided model.
        """
        specificFixtures: List[str] = []
        for fixtureModelName in FixtureHandler.model_names[model]:
            if fixtureModelName not in exceptingFixtures:
                specificFixtures.append(f'{FixtureHandler.fixture_paths[isDefault]}{fixtureModelName}.json')
        return specificFixtures
'''______________________________________________________________________________________'''        