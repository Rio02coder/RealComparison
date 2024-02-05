from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

import re


class UpperCaseValidator(object):
    def __init__(self, min_digits: int=1) -> None:
        self.min_digits = min_digits

    def validate(self, password: str, user=None) -> None:
        if not len(re.findall('[A-Z]', password)) >= self.min_digits:
            raise ValidationError(
                _("The password must contain at least 1 uppercase letter, A-Z."),
                code='password_no_upper',
                params={'min_digits': self.min_digits},
            )
'''______________________________________________________________________________________'''