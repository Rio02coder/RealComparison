import {ScreenNames} from '../src/types/ScreenNames';
import mockApp from '../test_utils/MockApp';
import * as LocationHandler from '../src/components/handlers/LocationHandler';
import {fireEvent, waitFor} from '@testing-library/react-native';

const setup = () =>
  mockApp({
    initialScreen: ScreenNames.PropertyAdder,
  });

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing component rendering', () => {
  jest
    .spyOn(LocationHandler, 'getUserCoordinate')
    .mockImplementation(() => new Promise((resolve, reject) => reject(null)));

  test("Loading animation is rendered when origin can't be fetched", async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('loading').length).toBe(1);
    });
  });

  let coord = {latitude: 51.4844219, longitude: -0.1223524};

  jest
    .spyOn(LocationHandler, 'getUserCoordinate')
    .mockImplementation(() => new Promise((resolve, reject) => resolve(coord)));

  test('Loading animation is not rendered because origin is fetched', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('loading').length).toBe(0);
    });
  });
  test('Correct total number of inputs', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('input_view').length).toBe(14);
    });
  });
  test('Correct number of text inputs', async () => {
    const {queryAllByTestId} = setup();
    await waitFor(() => {
      expect(queryAllByTestId('text_input').length).toBe(10);
    });
  });
  test('Correct number of boolean switch inputs', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('switch_input').length).toBe(3);
    });
  });
  test('Correct number of string select inputs', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('picker_input').length).toBe(1);
    });
  });
  test('Submit button is rendered', async () => {
    const {queryByTestId} = setup();

    await waitFor(() => {
      expect(queryByTestId('property_adder_submit')).toBeTruthy();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing error messages', () => {
  test('City Required warning message shown', async () => {
    const {getByTestId, queryByText} = setup();

    await waitFor(() => {
      const submitBtn = getByTestId('property_adder_submit');

      fireEvent.press(submitBtn);

      expect(queryByText('City Required')).toBeTruthy;
    });
  });
  test('Zipcode Required warning message shown', async () => {
    const {getByTestId, queryByText} = setup();

    await waitFor(() => {
      const submitBtn = getByTestId('property_adder_submit');

      fireEvent.press(submitBtn);

      expect(queryByText('Zipcode Required')).toBeTruthy;
    });
  });
  test('Street Address warning message shown', async () => {
    const {getByTestId, queryByText} = setup();

    await waitFor(() => {
      const submitBtn = getByTestId('property_adder_submit');

      fireEvent.press(submitBtn);

      expect(queryByText('Street Address Required')).toBeTruthy;
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
