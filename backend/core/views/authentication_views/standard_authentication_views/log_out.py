from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from core.models.token_models import RefreshToken

from http import HTTPStatus


class LogOutView(APIView):
    """
        A view that delete the user's access and refresh tokens.
        Meaning the user will have to re-authenticate to log in again.
    """
    http_method_names = ['get']

    def get(self, request) -> HttpResponse:
        Token.objects.filter(user=request.user).delete()
        RefreshToken.objects.filter(user=request.user).delete()
        return HttpResponse(status=HTTPStatus.OK.value)
'''______________________________________________________________________________________'''