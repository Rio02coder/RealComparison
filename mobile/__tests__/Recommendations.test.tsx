import {ScreenNames} from '../src/types/ScreenNames';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationStackTypes} from '../src/types/NavigationStackTypes';
import mockApp from '../test_utils/MockApp';
import {tags} from '../src/types/redux/Tags';
import mockProperty from '../test_utils/MockProperty';
import mockProperties from '../test_utils/MockProperties';
import {Property} from '../src/types/Property';
import PropertiesState from '../src/types/redux/states/PropertiesState';
import {ReactTestInstance} from 'react-test-renderer';
import getRecommendations from '../src/service/Contactor/Property/Recommendations';
import mockRecommendations from '../test_utils/MockRecommendations';
import {waitFor} from '@testing-library/react-native';

const setup = (properties: PropertiesState = mockProperties) =>
  mockApp({
    initialScreen: ScreenNames.RecommendationsList,
  });

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing component rendering', () => {
  test('Title renders correctly', async () => {
    const {getByTestId} = setup();
    const title = getByTestId('rec_list_title');
    const text = title.children[0] as ReactTestInstance;
    await waitFor(() => {
      expect(text.props.children).toEqual('Recommendations');
    });
  });
  test('Single property previews render', async () => {
    const {queryAllByTestId} = setup();
    await waitFor(() => {
      const property_elements = queryAllByTestId('property_element');
      expect(property_elements.length).toBe(2);
    });
  });
  test('Property previews render', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      const property_preview = queryAllByTestId('property_preview');
      const title = property_preview[0].children[1] as ReactTestInstance;

      expect(title.props.title).toEqual(
        mockProperty.street_address +
          ', ' +
          mockProperty.city[0].toUpperCase() +
          mockProperty.city.substring(1),
      );
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
