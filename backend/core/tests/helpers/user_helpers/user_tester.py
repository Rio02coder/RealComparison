from core.models.user_models import User
from core.helpers.general_helpers.toggler import change_is_verified

from typing import List


class UserTester:
    """
        Helper class for testing operations related to users.
    """
    def mark_users_as_unverified(self, users: List[User]) -> None:
            for user in users:
                change_is_verified(user, False)

    def _create_test_users(self, count=6) -> List[User]:
            users: List[User] = []
            for user_id in range(count):
                user = User.objects.create(
                    first_name= f'test_first_name{user_id}',
                    last_name=f'test_last_name{user_id}',
                    phone_number= "+447851885519",
                    email = f'test_email{user_id}@example.org.',
                    password = "pbkdf2_sha256$320000$ugfyQzdOZqasPOv8vY9lj5$3B7ylrLTeZq5QGaOVp8KdcfClnUITRbjHlCMZTJVy/k=",
                    is_verified = True,
                    is_active = True,
                    )
                
                users.append(user)
            return users
'''______________________________________________________________________________________'''