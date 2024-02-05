from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password


class AssertionTester:
    """
        Class used to assert the validity of an object.
    """
    def _assert_object_is_valid(self, object: object) -> None:
        try:
            object.full_clean()
        except (ValidationError):
            self.fail('Object should be valid.')
    
    def _assert_object_is_invalid(self, object: object) -> None:
        with self.assertRaises(ValidationError):
            object.full_clean()

    def _assert_password_is_valid(self, password: str) -> None:
        try:
            validate_password(password)
        except (ValidationError):
            self.fail('The new password should be valid.')

    def _assert_password_is_invalid(self, password: str) -> None:
        with self.assertRaises(ValidationError):
            validate_password(password)
'''______________________________________________________________________________________'''