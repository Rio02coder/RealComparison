from django.http import JsonResponse, HttpResponse

from rest_framework.views import APIView

from core.serializers.dynamic_serializers import PendingPropertySerializer
from core.helpers.customs.custom_http_status import HTTPStatus

from http import HTTPStatus


class AddPropertyView(APIView):
    """
        Class-based generic view for REQUESTING a property to be added in the app.
    """
    http_method_names = ['post']

    def post(self, request) -> HttpResponse:
        serializer: PendingPropertySerializer = PendingPropertySerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=HTTPStatus.CREATED.value)

        return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
'''______________________________________________________________________________________'''