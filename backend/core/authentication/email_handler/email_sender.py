from django.http import JsonResponse
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail

from .email_token_generator  import user_activation_token

from RealComparison import settings

from http import HTTPStatus


class EmailSender():
    """
        Send a verification email to the user.
    """
    def get_email_verfication_response(self, message: str, http_status: HTTPStatus) -> JsonResponse:
        verfication_response = {
            "verification": {
                "message": message
            }
        }
        return JsonResponse(verfication_response, status=http_status.value)

    def send_verification_email(self, request, user):
        domain = get_current_site(request)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        subject = "Your account needs to be verified"
        body = ""

        html_message = render_to_string('email_verification.html', {
            'domain': domain,
            'uid': uid,
            'token': user_activation_token.make_token(user)
        })

        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        send_mail(subject, body, email_from, recipient_list, html_message=html_message)
'''______________________________________________________________________________________'''

email_sender = EmailSender()