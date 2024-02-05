from core.helpers.customs.custom_exceptions import InvalidCredentialsError, MissingOAuthDataError, UnknownOAuthError
from .abstract_oauth_provider import AbstractOAuthProvider

from http import HTTPStatus

from typing import Any, Dict

import requests
import json


class UnsplashProvider(AbstractOAuthProvider):
    """
        Unsplash OAuth Provider class.
    """
    def __init__(self):
        pass

    @property
    def api_url(self) -> str:
        return "https://api.unsplash.com"

    def get_user_data(self, token: str) -> Dict[str, str]:
        endpoint: str = f"/me"
        headers: Dict[str, str] = {
            "Authorization": f"Bearer {token}",
            "Accept-Version": "v1",
        }
        response = requests.get(f"{self.api_url}{endpoint}", headers=headers)

        if response.status_code == HTTPStatus.UNAUTHORIZED.value:
            raise InvalidCredentialsError

        if response.status_code != HTTPStatus.OK.value:
            raise UnknownOAuthError

        user_data: Dict[str, Any] = json.loads(response.text)

        try:
            result_data: Dict[str, str] = {
                "email": user_data["email"],
                "first_name": user_data["first_name"],
                "last_name": user_data["last_name"]
            }

            return result_data
        except KeyError:
            raise MissingOAuthDataError
'''______________________________________________________________________________________'''