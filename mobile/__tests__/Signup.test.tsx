import {fireEvent, waitFor} from '@testing-library/react-native';
import {ScreenNames} from '../src/types/ScreenNames';
import {ReactTestInstance} from 'react-test-renderer';
import mockApp from '../test_utils/MockApp';

const setup = () =>
  mockApp({initialScreen: ScreenNames.Signup, user: undefined});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing component rendering', () => {
  test('Sign up screen is rendered', async () => {
    const {getByTestId} = setup();
    await waitFor(() => {
      expect(getByTestId('SignUpHeader')).toBeTruthy();
    });
  });
  test('Renders first name input field with correct placeholder text', async () => {
    const {getByPlaceholderText} = setup();
    const firstNameInput = getByPlaceholderText('First Name');
    await waitFor(() => {
      expect(firstNameInput).toBeTruthy;
    });
  });
  test('Renders last name input field with correct placeholder text', async () => {
    const {getByPlaceholderText} = setup();
    const lastNameInput = getByPlaceholderText('Last Name');
    await waitFor(() => {
      expect(lastNameInput).toBeTruthy;
    });
  });
  test('Renders email input field with correct placeholder text', async () => {
    const {getByPlaceholderText} = setup();
    const emailInput = getByPlaceholderText('Email');
    await waitFor(() => {
      expect(emailInput).toBeTruthy;
    });
  });
  test('Renders phone number input field with correct placeholder text', async () => {
    const {getByPlaceholderText} = setup();
    const phoneInput = getByPlaceholderText('Phone');
    await waitFor(() => {
      expect(phoneInput).toBeTruthy;
    });
  });
  test('Renders password input field with correct placeholder text', async () => {
    const {getByPlaceholderText} = setup();
    const passwordInput = getByPlaceholderText('Password');
    await waitFor(() => {
      expect(passwordInput).toBeTruthy;
    });
  });
  test('Renders confirmation password input field with correct placeholder text', async () => {
    const {getByPlaceholderText} = setup();
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    await waitFor(() => {
      expect(confirmPasswordInput).toBeTruthy;
    });
  });
  test('Renders signup button', async () => {
    const {getByTestId} = setup();
    const signUpButton = getByTestId('submit_signup');
    await waitFor(() => {
      expect(signUpButton).toBeTruthy;
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing missing input error messages', () => {
  test('Shows missing first name message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const firstNameInput = getByPlaceholderText('First Name');
    fireEvent.changeText(firstNameInput, '');
    await waitFor(() => {
      const firstNameError = getByText('First Name Required');
      expect(firstNameError).toBeTruthy;
    });
  });
  test('Shows missing last name message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const lastNameInput = getByPlaceholderText('Last Name');
    fireEvent.changeText(lastNameInput, '');
    await waitFor(() => {
      const lastNameError = getByText('Last Name Required');
      expect(lastNameError).toBeTruthy;
    });
  });
  test('Shows missing email message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, '');
    await waitFor(() => {
      const emailError = getByText('Email Required');
      expect(emailError).toBeTruthy;
    });
  });
  test('Shows missing phone number message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const phoneInput = getByPlaceholderText('Phone');
    fireEvent.changeText(phoneInput, '');
    await waitFor(() => {
      const phoneError = getByText('Phone Required');
      expect(phoneError).toBeTruthy;
    });
  });
  test('Shows missing password message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, '');
    await waitFor(() => {
      const passwordError = getByText('Password Required');
      expect(passwordError).toBeTruthy;
    });
  });
  test('Shows missing confirmation password message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.changeText(confirmPasswordInput, '');
    await waitFor(() => {
      const confirmError = getByText('Confirmation Required');
      expect(confirmError).toBeTruthy;
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing invalid input error messages', () => {
  test('Shows invalid email message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'abc');
    await waitFor(() => {
      const emailError = getByText('Invalid Email');
      expect(emailError).toBeTruthy;
    });
  });
  test('Shows invalid phone number message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const phoneInput = getByPlaceholderText('Phone');
    fireEvent.changeText(phoneInput, '123');
    await waitFor(() => {
      const phoneError = getByText('Phone must be valid');
      expect(phoneError).toBeTruthy;
    });
  });
  test('Shows invalid password message', async () => {
    const {getByText, getByPlaceholderText} = setup();
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'abc');
    await waitFor(() => {
      const passwordError = getByText('Password has at least 6 characters');
      expect(passwordError).toBeTruthy;
    });
  });
  test('Confirmation password does not match', async () => {
    const {getByPlaceholderText, getByText} = setup();
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.changeText(passwordInput, 'abcdef');
    fireEvent.changeText(confirmPasswordInput, '123456');
    await waitFor(() => {
      const confirmationPasswordError = getByText('Passwords do not coincide');
      expect(confirmationPasswordError).toBeTruthy;
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing removing error messages on valid input', () => {
  test('Removes invalid first name error message on valid input', async () => {
    const {getByPlaceholderText, queryAllByText} = setup();
    const firstNameInput = getByPlaceholderText('First Name');
    fireEvent.changeText(firstNameInput, 'a');
    await waitFor(() => {
      expect(queryAllByText('First Name Required').length).toBe(0);
    });
  });
  test('Removes invalid last name error message on valid input', async () => {
    const {getByPlaceholderText, queryAllByText} = setup();
    const lastNameInput = getByPlaceholderText('Last Name');
    fireEvent.changeText(lastNameInput, 'a');
    await waitFor(() => {
      expect(queryAllByText('Last Name Required').length).toBe(0);
    });
  });
  test('Removes invalid email error message on valid input', async () => {
    const {getByPlaceholderText, queryAllByText} = setup();
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'a@b.com');
    await waitFor(() => {
      expect(queryAllByText('Invalid Email').length).toBe(0);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing buttons', () => {
  test('Signup button sends request with correct params', async () => {
    let params = {};

    const onSubmit = jest.fn(data => {
      params = data;
    });

    const {getByText, getByTestId, queryAllByText, getByPlaceholderText} =
      setup();

    const signUpView = getByTestId('form_container');

    const signupForm = signUpView.children[1] as ReactTestInstance;

    signupForm.props.submissionHandler.requester = undefined;

    signupForm.props.submissionHandler.onSubmit = onSubmit;

    const firstNameInput = getByPlaceholderText('First Name');

    const lastNameInput = getByPlaceholderText('Last Name');

    const emailInput = getByPlaceholderText('Email');

    const phoneInput = getByPlaceholderText('Phone');

    const passwordInput = getByPlaceholderText('Password');

    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(firstNameInput, 'John');

    fireEvent.changeText(lastNameInput, 'Doe');

    fireEvent.changeText(emailInput, 'john.doe@example.com');

    fireEvent.changeText(phoneInput, '123456');

    fireEvent.changeText(passwordInput, 'Password123');

    fireEvent.changeText(confirmPasswordInput, 'Password123');

    const submit = getByTestId('submit_signup');

    const touch = submit.children[0] as ReactTestInstance;

    fireEvent.press(touch);

    await waitFor(() => {
      expect(queryAllByText('First Name Required').length).toBe(0);

      expect(queryAllByText('Last Name Required').length).toBe(0);

      expect(queryAllByText('Invalid Email').length).toBe(0);

      expect(params).toEqual({
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'Password123',
        passwordConfirm: 'Password123',
        phone: '+44123456',
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
