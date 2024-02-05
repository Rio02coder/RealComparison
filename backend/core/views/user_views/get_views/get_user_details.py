from django.http import JsonResponse

from rest_framework.views import APIView

from core.models.user_models import User
from core.serializers.dynamic_serializers import UserSerializer
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.dst_helpers import list_of_fields_are_valid

from http import HTTPStatus

from typing import List


class GetUserDetailsView(APIView):
    """
        Class-based generic view for DISPLAYING user's profile information.
    """
    http_method_names = ['get']
    
    def get(self, request, user_id: int) -> JsonResponse:
        user_list: List[User] = list(User.objects.filter(pk=user_id))
        user_fields: List[str] = [field.name for field in User._meta.get_fields()]

        # Check if the user exists.
        if not user_list:
            return response_generator.generate_error_response(HTTPStatus.NOT_FOUND, error_message=f"User with ID {user_id} does not exist.")

        # Used for only selecting certain fields of the User object.
        if 'fields' in request.GET:
            selected_fields: List[str] = request.GET.get('fields').split(",")

            # Check all fields are valid.
            if not list_of_fields_are_valid(selected_fields, user_fields, "password"):
                return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST, error_message="Invalid field in request.")

            # Make sure that response always returns id.
            selected_fields.insert(0, "id")

            user_serializer: UserSerializer = UserSerializer(user_list[0], fields=selected_fields)
        else:
            # Get all retrievable fields of the User model for a User's Profile Page.
            user_serializer: UserSerializer = UserSerializer(user_list[0])

        return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value)
'''______________________________________________________________________________________'''
