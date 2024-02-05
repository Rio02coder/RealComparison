from core.models import User
from core.authentication.tokens.token_handler import TokenHandler

from typing import Any, Dict

import json


# NOTE: response_content should be passed request.data, the function will handle the JSON conversion.

class AuthTester(TokenHandler):
    """
        Helper class for testing operations related to authentication.
    """
    def is_auth_response_content_valid(self,response_content, user: User) -> bool:
        """Returns whether or not get_auth_token_response has returned valid data."""
        response_dict: Dict[str, Any] = json.loads(response_content)
        correct_response: Dict[str, Any] = json.loads(self.get_auth_token_response(user).content)

        is_access_token_equal: bool = response_dict["token"]["access"] == correct_response["token"]["access"]
        is_refresh_token_equal: bool = response_dict["token"]["refresh"] == correct_response["token"]["refresh"]

        return (is_access_token_equal and is_refresh_token_equal)
'''______________________________________________________________________________________'''