import {ScreenNames} from '../src/types/ScreenNames';
import mockApp from '../test_utils/MockApp';
import {waitFor} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

const setup = () => mockApp({initialScreen: ScreenNames.ChangePassword});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing component rendering', () => {
  test('Form view is rendered', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();
    const formView = getByTestId('base_form_view');
    await waitFor(() => {
      expect(formView).toBeTruthy();
    });
  });
  test('Correct total number of inputs', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('input_view').length).toBe(3);
    });
  });
  test('Correct number of text inputs', async () => {
    const {queryAllByTestId} = setup();
    await waitFor(() => {
      expect(queryAllByTestId('text_input').length).toBe(3);
    });
  });
  test('Correct initial values', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = setup();
    const formContainer = getByTestId('form_container');

    const form = formContainer.children[0] as ReactTestInstance;

    await waitFor(() => {
      expect(form.props.initialValues).toEqual({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
