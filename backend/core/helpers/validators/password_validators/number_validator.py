from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

import re


class NumberValidator(object):
    def __init__(self, min_digits: int=1) -> None:
        self.min_digits = min_digits

    def validate(self, password: str, user=None) -> None:
        if not len(re.findall('\d', password)) >= self.min_digits:
            raise ValidationError(
                _("The password must contain at least %(min_digits)d digit(s), 0-9."),
                code='password_no_number',
                params={'min_digits': self.min_digits},
            )
'''______________________________________________________________________________________'''