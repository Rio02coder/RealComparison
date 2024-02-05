from django.http import JsonResponse

from http import HTTPStatus


class ResponseGenerator():
    """
        Generate json responses with a message and a description.
    """
    # NOTE: Kwargs can be used to add headers to the JsonResponse.
    def generate_error_response(self, http_status: HTTPStatus, error_message=None, **kwargs) -> JsonResponse:
        """Generates JsonResponse for an error from a given HTTPStatus."""
        error_response = {
            "error": {
                "message": http_status.phrase,
                "description": error_message or http_status.description
            }
        }
        json_response = JsonResponse(error_response, status=http_status.value)
        
        for key, value in kwargs.items():
            json_response[key] = value

        return json_response
'''______________________________________________________________________________________'''

response_generator = ResponseGenerator()