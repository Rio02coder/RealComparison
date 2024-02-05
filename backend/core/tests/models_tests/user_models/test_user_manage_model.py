from django.test import TestCase

from core.models.user_models import User


class UserManagerTestCase(TestCase):
    """
        Tests the User Manager Model.
    """
    ## Normal user unit tests.
    def test_create_normal_user(self) -> None:
        user = User.objects.create_user('johndoe@example.com', 'Password123@')
        self.assertIsInstance(user, User)
        self.assertFalse(user.is_staff)
        self.assertTrue(user.email, 'johndoe@example.com')
    '''______________________________________________________________________________________'''

    ## Superuser unit tests.
    def test_create_admin_user(self) -> None:
        user = User.objects.create_superuser('johndoe@example.com', 'Password123@')
        self.assertIsInstance(user, User)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.email, 'johndoe@example.com')

    def test_raises_value_error_when_the_super_user_is_not_part_of_the_staff(self) -> None:
        with self.assertRaises(ValueError):
            User.objects.create_superuser('johndoe@example.com', 'Password123@', **{'is_staff': False, 'is_superuser': True})

    def test_raises_value_error_message_when_the_super_user_is_not_part_of_the_staff(self) -> None:
        with self.assertRaisesMessage(ValueError, 'Superuser must have is_staff = True.'):
            User.objects.create_superuser('johndoe@example.com', 'Password123@', **{'is_staff': False, 'is_superuser': True})

    def test_raises_value_error_when_the_super_user_is_not_a_super_user(self) -> None:
        with self.assertRaises(ValueError):
            User.objects.create_superuser('johndoe@example.com', 'Password123@', **{'is_staff': True, 'is_superuser': False})

    def test_raises_value_error_message_when_the_super_user_is_not_super_user(self) -> None:
        with self.assertRaisesMessage(ValueError, 'Superuser must have is_superuser = True.'):
            User.objects.create_superuser('johndoe@example.com', 'Password123@', **{'is_staff': True, 'is_superuser': False})
    '''______________________________________________________________________________________'''

    ## Required fields unit tests
    def test_raises_value_error_when_no_email_is_entered(self) -> None:
        with self.assertRaises(ValueError):
            User.objects.create_user('', 'Password123@')

    def test_raises_valueError_message_when_no_email_is_entered(self) -> None:
        with self.assertRaisesMessage(ValueError,'The user must provide an email!'):
            User.objects.create_user('', 'Password123@')
'''______________________________________________________________________________________'''
