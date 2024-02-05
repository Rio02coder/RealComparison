import {fireEvent, waitFor} from '@testing-library/react-native';
import {ScreenNames} from '../src/types/ScreenNames';
import {ReactTestInstance} from 'react-test-renderer';
import mockApp from '../test_utils/MockApp';
import {TouchableHighlightComponent} from 'react-native';

const setup = () =>
  mockApp({initialScreen: ScreenNames.Login, user: undefined});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing component rendering', () => {
  test('Renders correct initial page', async () => {
    const {findByText} = setup();

    const header = await findByText('Sign In');

    expect(header).toBeTruthy();
  });
  test('Renders form input fields with correct placeholder texts', async () => {
    const {getAllByPlaceholderText} = setup();

    const emailInput = getAllByPlaceholderText('Email')[0];

    await waitFor(() => {
      expect(emailInput).toBeTruthy();
    });
  });
  test('Renders form input fields with correct placeholder texts', async () => {
    const {getByPlaceholderText} = setup();

    const passwordInput = getByPlaceholderText('Password');

    await waitFor(() => {
      expect(passwordInput).toBeTruthy();
    });
  });

  test('Renders ouath providers', async () => {
    const {getByTestId} = setup();

    const ouathBtn = await getByTestId('oauth_provider');

    expect(ouathBtn).toBeTruthy();
  });
  test('Renders login button', async () => {
    const {findByText} = setup();

    const loginButton = await findByText('Login');

    expect(loginButton).toBeTruthy();
  });
  test('Renders signup button', async () => {
    const {findByText} = setup();

    const signupButton = await findByText('Sign Up');

    expect(signupButton).toBeTruthy();
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing missing input error messages', () => {
  test('Shows missing email input message', async () => {
    const {getByText, getAllByPlaceholderText} = setup();

    const emailInput = getAllByPlaceholderText('Email')[0];

    fireEvent.changeText(emailInput, '');

    await waitFor(() => {
      expect(getByText('Email Required')).toBeTruthy();
    });
  });
  test('Shows missing password message', async () => {
    const {getByText, getByPlaceholderText} = setup();

    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, '');

    await waitFor(() => {
      expect(getByText('Password Required')).toBeTruthy();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing invalid input error messages', () => {
  test('Shows invalid email message', async () => {
    const {getByText, getAllByPlaceholderText} = setup();

    const emailInput = getAllByPlaceholderText('Email')[0];

    fireEvent.changeText(emailInput, 'abc');

    await waitFor(() => {
      expect(getByText('Invalid Email')).toBeTruthy();
    });
  });
  test('Shows invalid password message', async () => {
    const {getByText, getByPlaceholderText} = setup();

    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'abc');

    await waitFor(() => {
      expect(getByText('Password has at least 6 characters')).toBeTruthy();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing removing error messages on valid input', () => {
  test('Removes invalid email error message on valid input', async () => {
    const {queryAllByText, getAllByPlaceholderText} = setup();

    const emailInput = getAllByPlaceholderText('Email')[0];

    fireEvent.changeText(emailInput, 'email@test.com');

    await waitFor(() => {
      expect(queryAllByText('Invalid Email').length).toBe(0);
    });
  });
  test('Removes invalid password error message on valid input', async () => {
    const {queryAllByText, getByPlaceholderText} = setup();

    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'abcdef');

    await waitFor(() => {
      expect(queryAllByText('Password has at least 6 characters').length).toBe(
        0,
      );
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing buttons', () => {
  test('SignUp button navigates to the signup page', async () => {
    const {getByText, getByTestId} = setup();

    const signupButton = getByText('Sign Up');

    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByTestId('SignUpHeader')).toBeTruthy();
    });
  });
  test('Login button sends request with correct params', async () => {
    let params = {};

    const onSubmit = jest.fn(data => {
      params = data;
    });

    const {
      getByText,
      getByTestId,
      getByPlaceholderText,
      getAllByPlaceholderText,
    } = setup();

    const loginFormParent = getByTestId('login_form_parent');

    const loginForm = loginFormParent.children[0] as ReactTestInstance;

    const submit = getByTestId('submit_1');

    const touch = submit.children[0] as ReactTestInstance;

    fireEvent.press(touch);

    loginForm.props.submissionHandler.requester = undefined;

    loginForm.props.submissionHandler.onSubmit = onSubmit;

    const emailInput = getAllByPlaceholderText('Email')[0];

    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'email@test.com');

    fireEvent.changeText(passwordInput, 'abcdef');

    fireEvent.press(touch);

    await waitFor(() => {
      expect(params).toEqual({email: 'email@test.com', password: 'abcdef'});
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
  test('Login button sends request with correct params', async () => {
    const {getByTestId} = setup();

    let params = {};

    const onPress = jest.fn(data => {
      params = data;
    });

    const ouathParent = getByTestId('oauth_parent');

    const ouathBtn = ouathParent.children[0] as ReactTestInstance;

    ouathBtn.props.onPress = onPress;

    fireEvent.press(ouathBtn);

    await waitFor(() => {
      expect(params).toEqual({});
      expect(onPress).toHaveBeenCalledTimes(0);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
