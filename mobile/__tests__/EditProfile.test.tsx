import {ScreenNames} from '../src/types/ScreenNames';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationStackTypes} from '../src/types/NavigationStackTypes';
import mockApp from '../test_utils/MockApp';
import {tags} from '../src/types/redux/Tags';
import mockProperty from '../test_utils/MockProperty';
import PropertiesState from '../src/types/redux/states/PropertiesState';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import mockUser from '../test_utils/MockUser';
import User from '../src/types/User';
import UnsplashAuthenticator from '../src/utilities/authentication/UnsplashAuthenticator';

const setup = () => mockApp({initialScreen: ScreenNames.EditProfile});

const oAuthSetup = () =>
  mockApp({
    initialScreen: ScreenNames.EditProfile,
    user: {...mockUser, service: UnsplashAuthenticator},
  });

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Name form has correct initial values', () => {
  test('Property List is rendered', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();
    const nameForm = getByTestId('name_form_view')
      .children[0] as ReactTestInstance;

    await waitFor(() => {
      expect(nameForm.props.initialValues).toEqual({
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      });
    });
  });
  test('Email form has correct initial values', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();
    const emailForm = getByTestId('email_form_view')
      .children[0] as ReactTestInstance;

    await waitFor(() => {
      expect(emailForm.props.initialValues).toEqual({
        email: mockUser.email,
      });
    });
  });
  test('Phone form has correct initial values', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();
    const phoneForm = getByTestId('phone_form_view')
      .children[0] as ReactTestInstance;

    await waitFor(() => {
      expect(phoneForm.props.initialValues).toEqual({
        phone: mockUser.phone?.slice(3),
      });
    });
  });
  test('Users authenticated with oauth cannot edit their email', async () => {
    const {getByText, getByPlaceholderText, queryByTestId} = oAuthSetup();
    const emailForm = queryByTestId('email_form_view')?.children[0] as
      | ReactTestInstance
      | undefined;
    await waitFor(() => {
      expect(emailForm).toBeFalsy();
    });
  });
  test('Users authenticated with oauth cannot edit their password', async () => {
    const {getByText, getByPlaceholderText, queryByTestId} = oAuthSetup();
    const emailForm = queryByTestId('password_form_view')?.children[0] as
      | ReactTestInstance
      | undefined;
    await waitFor(() => {
      expect(emailForm).toBeFalsy();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
