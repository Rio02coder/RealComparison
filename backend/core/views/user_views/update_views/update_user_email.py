from django.http import HttpResponse, JsonResponse
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from core.serializers.basic_serializers import UserEmailSerializer
from core.models.property_models.property_model import Property
from core.authentication.tokens.token_handler import token_handler
from core.helpers.general_helpers.toggler import change_is_verified
from core.authentication.email_handler.email_sender import email_sender
from core.views.helpers.change_user_email_helpers import update_user_created_properties, update_user_owned_properties

from http import HTTPStatus

from typing import Any, Dict, List

from django.utils import timezone


class ChangeUserEmailView(APIView):
    """
        Class-based generic view for CHANGING the user's email.
    """
    http_method_name = ['patch']

    def patch(self, request) -> JsonResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: UserEmailSerializer = UserEmailSerializer(data=request_data)

        if serializer.is_valid():
            created_properties: List[int] = [property.pk for property in Property.objects.filter(creator=request.user)]
            owned_properties: List[int] = [property.pk for property in Property.objects.filter(owner=request.user)]
        
            #Clear out the foreign key constraints on the properties associated with the user to be updated.
            Property.objects.filter(owner = request.user).update(owner = None)
            Property.objects.filter(creator = request.user).update(creator = None)
            #Change the user email.
            request.user.email = serializer.data.get('email')
            request.user.save()
            #New email needs to be verified again as the user changed their email. 
            change_is_verified(request.user, False)
            email_sender.send_verification_email(request, request.user)
            #Update the user instance on their owned/created properties. 
            update_user_created_properties(created_properties, request.user)
            update_user_owned_properties(owned_properties, request.user)

            token_handler.regenerate_auth_token(request.user)
            return HttpResponse(status=HTTPStatus.OK.value)

        return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
'''______________________________________________________________________________________'''
