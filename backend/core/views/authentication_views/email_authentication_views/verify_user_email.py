from django.http import HttpResponse
from django.shortcuts import redirect
from django.views import View
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from core.models.user_models import User
from core.authentication.email_handler.email_sender import email_sender
from core.authentication.email_handler.email_token_generator import user_activation_token
from core.helpers.customs.custom_response_generator import response_generator
from core.helpers.general_helpers.toggler import change_is_verified

from http import HTTPStatus


class VerifyUserEmail(View):
    """
        View that VERIFIES the user email address.
    """
    http_method_names = ['get']

    def get(self, request, uid , token) -> HttpResponse:    
        try:
            # Decode the id and retireve its respected user object.
            id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=id)
        except(User.DoesNotExist):
             return response_generator.generate_error_response(HTTPStatus.NOT_FOUND)
        
        if user_activation_token.check_token(user, token): 
            # Update the user status to verified. 
            change_is_verified(user, True)
            
            return redirect("http://realcomparison.co.uk")

        # The link has expired. (Either was clicked before OR expiration date has passed)
        return email_sender.get_email_verfication_response("The link has expired.", HTTPStatus.BAD_REQUEST)
'''______________________________________________________________________________________'''