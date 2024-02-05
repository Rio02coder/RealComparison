from django.http import JsonResponse

from rest_framework.views import APIView

from core.models.user_models import User
from core.serializers.dynamic_serializers import UserSerializer

from http import HTTPStatus

from typing import List


class GetUserListView(APIView):
    """
        Class-based generic view for DISPLAYING a list of all users.
    """
    http_method_names = ['get']

    def get(self, request) -> JsonResponse:
        user_list: List[User] = list(User.objects.filter(is_verified=True))

        user_serializer: UserSerializer = UserSerializer(user_list, many = True)

        return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value, safe = False)
'''______________________________________________________________________________________'''   
