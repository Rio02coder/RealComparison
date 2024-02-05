from django.http import HttpResponse
from django.http import JsonResponse

from rest_framework.views import APIView

from core.serializers.dynamic_serializers import UserSerializer

from http import HTTPStatus


class GetPersonalUserDetailsViews(APIView):
    """
        Class-based generic view for DISPLAYING the user's personal profile information.
    """
    http_method_names = ['get', 'delete']

    def get(self, request) -> JsonResponse:
        # Get all retrievable fields of the User model for the Personal Profile Page.
        serializer: UserSerializer = UserSerializer(request.user)
        return JsonResponse(serializer.data, status=HTTPStatus.OK.value)

    def delete(self, request) -> HttpResponse:
        request.user.delete()

        return HttpResponse(status=HTTPStatus.OK.value)
'''______________________________________________________________________________________'''   