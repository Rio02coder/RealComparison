from abc import ABC, abstractmethod

from typing import Dict


class AbstractOAuthProvider(ABC):
    """
        Abstract class representing an Oauth provider.
    """
    @property
    @abstractmethod
    def api_url(self) -> str:
        pass

    @abstractmethod
    def get_user_data(self, token: str) -> Dict[str, str]:
        pass
'''______________________________________________________________________________________'''
