from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

import re


class SymbolValidator(object):
    def __init__(self, min_digits=1) -> None:
        self.min_digits = min_digits

    def validate(self, password, user=None) -> None:
        if not len(re.findall('[@£#&$\_\/\|\.\!\%\?\+\=\-\[\]\{\}\(\)]', password)) >= self.min_digits:
            raise ValidationError(
                _("The password must contain at least 1 special symbol:"),
                code='password_no_symbol',
                params={'min_digits': self.min_digits}
            )
'''______________________________________________________________________________________'''