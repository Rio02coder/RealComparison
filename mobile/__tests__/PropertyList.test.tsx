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
import {fireEvent} from '@testing-library/react-native';

let propertyListParams = true;

let ownedProperties = (owned_properties: Property[]) => {
  return new Map([
    [tags.FAVORITE, []],
    [tags.OWNED, owned_properties],
    [tags.CREATED, []],
  ]);
};

const setup = (properties: PropertiesState = mockProperties) =>
  mockApp({
    initialScreen: ScreenNames.PropertyList,
    properties,
    propertyListParams,
  });

const ownerSetup = (owned_properties: Property[] = [mockProperty]) =>
  setup(ownedProperties(owned_properties));

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Testing component rendering', () => {
  test('Title renders', () => {
    const {getByTestId} = setup();
    const title = getByTestId('property_list_title');
    const text = title.children[0] as ReactTestInstance;
    expect(text.props.children).toEqual('placeholder title');
  });
  test('Empty list title renders', () => {
    const {getByTestId} = setup();
    const empty_title = getByTestId('property_list_empty_title');
    const text = empty_title.children[0] as ReactTestInstance;
    expect(text.props.children).toEqual('placeholder empty title');
  });
  test('Empty list message renders', () => {
    const {getByTestId} = setup();
    const empty_message = getByTestId('property_list_empty_message');
    expect(empty_message.props.children).toEqual('placeholder empty message');
  });
  test("Empty list title doesn't render when list is not empty", () => {
    const {queryByTestId} = ownerSetup();
    const empty_title = queryByTestId('property_list_empty_title');
    expect(queryByTestId('property_list_empty_title')).toBeFalsy();
  });
  test("Empty list message doesn't render when list is not empty", () => {
    const {queryByTestId} = ownerSetup();
    const empty_message = queryByTestId('property_list_empty_message');
    expect(queryByTestId('property_list_empty_message')).toBeFalsy();
  });
  test('Single property previews render', () => {
    const {queryAllByTestId} = ownerSetup();
    const property_elements = queryAllByTestId('property_element');
    expect(property_elements.length).toBe(1);
  });
  test('Multiple property previews render', () => {
    const {queryAllByTestId} = ownerSetup([
      mockProperty,
      {...mockProperty, id: mockProperty.id + 1},
    ]);
    const property_elements = queryAllByTestId('property_element');
    expect(property_elements.length).toBe(2);
  });
  test('Property previews render', () => {
    const {queryAllByTestId} = ownerSetup();
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

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
