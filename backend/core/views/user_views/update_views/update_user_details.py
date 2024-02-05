from django.http import HttpResponse
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.serializers.dynamic_serializers import UserSerializer
from core.serializers.model_serializers import UpdateUserSerializer

from http import HTTPStatus

from typing import Any, Dict


class UpdateUserDetailsView(APIView):
    """
        Class-based generic view for CHANGING the user's information.
    """
    http_method_names = ['patch']

    def patch(self, request) -> HttpResponse:
        data: Dict[str, Any] = JSONParser().parse(request)
        serializer: UpdateUserSerializer = UpdateUserSerializer(request.user, data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(UserSerializer(request.user).data, status=HTTPStatus.OK.value)

        return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
'''______________________________________________________________________________________'''
