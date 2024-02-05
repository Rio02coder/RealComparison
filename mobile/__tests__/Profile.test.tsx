import {ScreenNames} from '../src/types/ScreenNames';
import mockApp from '../test_utils/MockApp';
import {tags} from '../src/types/redux/Tags';
import mockProperty from '../test_utils/MockProperty';
import PropertiesState from '../src/types/redux/states/PropertiesState';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import mockUser from '../test_utils/MockUser';
import UnsplashAuthenticator from '../src/utilities/authentication/UnsplashAuthenticator';

let properties: PropertiesState = new Map([
  [tags.CREATED, [mockProperty]],
  [tags.FAVORITE, []],
  [tags.OWNED, [mockProperty]],
]);

const setup = () => mockApp({initialScreen: ScreenNames.Profile, properties});

const customSetup = (properties: any) =>
  mockApp({initialScreen: ScreenNames.Profile, properties});

const oAuthSetup = () =>
  mockApp({
    initialScreen: ScreenNames.EditProfile,
    user: {...mockUser, service: UnsplashAuthenticator},
  });

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing component rendering', () => {
  test('Correct name is displayed', () => {
    const {queryByText} = setup();

    const name = queryByText('John');

    expect(name).toBeTruthy();
  });

  test('Name form has correct initial values', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();

    const edit_user = getByText('user');

    fireEvent.press(edit_user);

    await waitFor(() => {
      const nameForm = getByTestId('name_form_view')
        .children[0] as ReactTestInstance;

      expect(nameForm.props.initialValues).toEqual({
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      });
    });
  });
  test('Email form has correct initial values', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();

    const edit_user = getByText('user');

    fireEvent.press(edit_user);

    await waitFor(() => {
      const emailForm = getByTestId('email_form_view')
        .children[0] as ReactTestInstance;

      expect(emailForm.props.initialValues).toEqual({
        email: mockUser.email,
      });
    });
  });
  test('Email form has correct initial values', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();

    const edit_user = getByText('user');

    fireEvent.press(edit_user);

    await waitFor(() => {
      const phoneForm = getByTestId('phone_form_view')
        .children[0] as ReactTestInstance;

      expect(phoneForm.props.initialValues).toEqual({
        phone: mockUser.phone?.slice(3),
      });
    });
  });
  test('Users authenticated manually can change their password', async () => {
    const {queryByText} = setup();

    await waitFor(() => {
      expect(queryByText('Change Password')).toBeTruthy();
    });
  });
  test('Users authenticated with oauth cannot change their password', async () => {
    const {queryByText} = oAuthSetup();

    await waitFor(() => {
      expect(queryByText('Change Password')).toBeFalsy();
    });
  });
  test('Logout button navigates to login page', async () => {
    const {getByTestId, getByText} = setup();

    const profile_exit_view = getByTestId('profile_exit_view');

    const logoutBtn = profile_exit_view.children[0] as ReactTestInstance;

    fireEvent.press(logoutBtn);

    await waitFor(() => {
      const header = getByText('Sign In');

      expect(header).toBeTruthy();
    });
  });
  test('Delete account button renders', async () => {
    const {getByTestId, getByText} = setup();

    const profile_exit_view = getByTestId('profile_exit_view');

    const deleteBtn = profile_exit_view.children[1] as ReactTestInstance;

    await waitFor(() => {
      expect(deleteBtn).toBeTruthy();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Owned and created property tests', () => {
  test('Created property is displayed correctly in the created properties page', async () => {
    let properties: PropertiesState = new Map([
      [tags.CREATED, [mockProperty]],
      [tags.FAVORITE, []],
      [tags.OWNED, []],
    ]);

    const {getByText, getByPlaceholderText, queryAllByTestId} =
      customSetup(properties);

    const createdProperties = getByText('Created');

    fireEvent.press(createdProperties);

    await waitFor(() => {
      const property = getByText('6701 Danwood Dr, Austin');

      expect(property).toBeTruthy();
    });
  });
  test('Created properties are displayed in the created properties page', async () => {
    let properties: PropertiesState = new Map([
      [
        tags.CREATED,
        [mockProperty, {...mockProperty, id: mockProperty.id + 1}],
      ],
      [tags.FAVORITE, []],
      [tags.OWNED, []],
    ]);

    const {getByText, getByPlaceholderText, queryAllByTestId} =
      customSetup(properties);

    const createdProperties = getByText('Created');

    fireEvent.press(createdProperties);

    await waitFor(() => {
      const properties = queryAllByTestId('property_preview');

      expect(properties.length).toBe(2);
    });
  });
  test('Owned property is displayed correctly in the owned properties page', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();

    const ownedProperties = getByText('Owned');

    fireEvent.press(ownedProperties);

    await waitFor(() => {
      const property = getByText('6701 Danwood Dr, Austin');

      expect(property).toBeTruthy();
    });
  });
  test('Multiple owned properties are displayed correctly', async () => {
    let properties: PropertiesState = new Map([
      [tags.CREATED, []],
      [tags.FAVORITE, []],
      [tags.OWNED, [mockProperty, {...mockProperty, id: mockProperty.id + 1}]],
    ]);

    const {getByText, getByPlaceholderText, queryAllByTestId} =
      customSetup(properties);

    const ownedProperties = getByText('Owned');

    fireEvent.press(ownedProperties);

    await waitFor(() => {
      const properties = queryAllByTestId('property_preview');

      expect(properties.length).toBe(2);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
