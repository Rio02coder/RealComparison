from django.core.management.base import BaseCommand
from django.db import IntegrityError
from django.utils import timezone

from core.models.user_models import User

from faker import Faker


class Command(BaseCommand):
    """
        Seed the database with fake users.
    """
    PASSWORD: str = "Password123@"
    USER_COUNT: int = 60
    OAUTH_USER_COUNT: int = 40

    def __init__(self) -> None:
        super().__init__()
        self.faker: Faker = Faker('en_GB')

    def handle(self, *args, **options) -> None:
        start_time = timezone.now()
        users = User.objects.all()

        if len(users) > 0:
            users.delete()

        print(f'Seeding the database',  end='\r')

        self._create_super_user()
        self._create_random_users()
        self._create_random_oauth_users()

        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"Success! The system has been seeded with users. The command took: {(end_time-start_time).total_seconds()} seconds."
            )
        )
    '''______________________________________________________________________________________'''

    ## Private functions.
    def _create_random_users(self) -> None:
        user_count: int = 0
        while user_count < Command.USER_COUNT:
            try:
                self._create_user()
            except IntegrityError:
                continue
            user_count += 1

    def _create_random_oauth_users(self) -> None:
        user_count: int = 0
        while user_count < Command.OAUTH_USER_COUNT:
            try:
                self._create_oauth_user()
            except IntegrityError:
                continue
            user_count += 1

    def _create_user(self, first_name: str = "", last_name: str = "", email: str = "", phone_number: str = "", service: str = "") -> None:
        if(first_name == ""):
            first_name = self.faker.first_name()
        if(last_name == ""):
            last_name = self.faker.last_name()
        if(email == ""):
            email = _create_email(first_name, last_name)
        if(phone_number == ""):
            phone_number = _create_phone_number(self.faker)
        if(service == ""):
            service = "REMOTE"

        User.objects.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            password=Command.PASSWORD,
            service=service,
            is_verified = True
        )

    def _create_super_user(self) -> None:
        User.objects.create_user(
            "admin@admin.org",
            first_name="admin",
            last_name="admin",
            phone_number=_create_phone_number(self.faker),
            password=Command.PASSWORD,
            service="REMOTE",
            is_verified = True,
            is_staff = True,
            is_superuser = True
        )

    def _create_oauth_user(self) -> None:
        first_name = self.faker.first_name()
        last_name = self.faker.last_name()

        User.objects.create_user(
            _create_email(first_name, last_name),
            first_name=first_name,
            last_name=last_name,
            phone_number=_create_phone_number(self.faker),
            password=None,
            service="UNSPLASH",
            is_verified = True,
        )
'''______________________________________________________________________________________'''

## Helper Functions.
def _create_email(first_name: str, last_name: str) -> str:
    return first_name + '.' + last_name + '@example.org'

def _create_phone_number(fake: Faker) -> str:
    return f'+44 {fake.msisdn()[3:]}'
'''______________________________________________________________________________________'''