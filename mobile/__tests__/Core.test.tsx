import {fireEvent, waitFor} from '@testing-library/react-native';
import {ScreenNames} from '../src/types/ScreenNames';
import mockApp from '../test_utils/MockApp';

const setup = () => mockApp({initialScreen: ScreenNames.Core});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing navigation component rendering', () => {
  test('List button is rendered', async () => {
    const {getByText} = setup();
    const listBtn = getByText('List');
    await waitFor(() => {
      expect(listBtn).toBeTruthy;
    });
  });
  test('Map button is rendered', async () => {
    const {getByText} = setup();
    const mapBtn = getByText('Map');
    await waitFor(() => {
      expect(mapBtn).toBeTruthy;
    });
  });
  test('Map of properties is rendered', async () => {
    const {getByTestId} = setup();
    const map = getByTestId('PropertyMap');
    await waitFor(() => {
      expect(map).toBeTruthy;
    });
  });
  test('Search button is rendered', async () => {
    const {getByText} = setup();
    const searchBtn = getByText('Search');
    expect(searchBtn).toBeTruthy();
  });
  test('Navigation drawer contains the correct amount of links', async () => {
    const {getByTestId} = setup();
    const navigationDrawer = getByTestId('Navigation');
    await waitFor(() => {
      expect(navigationDrawer).toBeTruthy;
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing navigation', () => {
  // test('List button navigates to PropertyList screen', async () => {
  //   const {getByTestId, getByText} = setup();
  //   const ListBtn = getByText('List');
  //   fireEvent.press(ListBtn);
  //   await waitFor(() => {
  //     expect(getByTestId('PropertyScreen')).toBeTruthy();
  //   });
  // });
  test('Navigation drawer contains the correct amount of links', async () => {
    const {getByTestId, queryAllByTestId} = setup();
    const navigationDrawer = getByTestId('Navigation');
    fireEvent.press(navigationDrawer);
    await waitFor(() => {
      const ScreenLinks = queryAllByTestId('Link');
      expect(ScreenLinks.length).toBe(4);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
