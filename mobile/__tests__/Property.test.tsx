import {ScreenNames} from '../src/types/ScreenNames';
import {ReactTestInstance} from 'react-test-renderer';
import PropertiesState from '../src/types/redux/states/PropertiesState';
import {tags} from '../src/types/redux/Tags';
import mockProperty from '../test_utils/MockProperty';
import mockApp from '../test_utils/MockApp';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {Property, SpecificProperty} from '../src/types/Property';
import mockUser from '../test_utils/MockUser';
import mockProperties from '../test_utils/MockProperties';
import {formatPrice} from '../src/utilities/property/PriceFormatter';

let ownedProperties: PropertiesState = new Map([
  [tags.FAVORITE, []],
  [tags.OWNED, [mockProperty]],
  [tags.CREATED, []],
]);

let favoriteProperties: PropertiesState = new Map([
  [tags.FAVORITE, [mockProperty]],
  [tags.OWNED, []],
  [tags.CREATED, []],
]);

const setup = (
  properties: PropertiesState = mockProperties,
  property: Property = mockProperty,
) =>
  mockApp({
    initialScreen: ScreenNames.Property,
    property,
    properties,
  });

const ownerSetup = (property?: Property) => setup(ownedProperties, property);

const favoriteSetup = () => setup(favoriteProperties);

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Property header tests', () => {
  test('Correct sell icon if property is not for sale', async () => {
    const {getByTestId, queryByTestId} = ownerSetup();

    const not_for_sale = getByTestId('not_for_sale_icon');
    await waitFor(() => {
      expect(not_for_sale).toBeTruthy();
    });
  });
  test('Correct sell icon if property is for sale', async () => {
    const {getByTestId, queryByTestId} = ownerSetup({
      ...mockProperty,
      for_sale: true,
    });

    const for_sale = getByTestId('for_sale_icon');
    await waitFor(() => {
      expect(for_sale).toBeTruthy();
    });
  });
  test('Correct fav icon shown if property is favorite', async () => {
    const {getByTestId} = favoriteSetup();

    const favoriteButton = getByTestId('fav_selected');

    await waitFor(() => {
      expect(favoriteButton).toBeTruthy();
    });
  });
  test('Correct fav icon shown if property is not favorite', async () => {
    const {getByTestId} = setup();

    const favoriteButton = getByTestId('fav_unselected');

    await waitFor(() => {
      expect(favoriteButton).toBeTruthy();
    });
  });
  test('Favourite button press functionality', async () => {
    const {getByTestId} = setup();

    const onPress = jest.fn();

    const favoriteButton = getByTestId('favorite_btn');

    fireEvent.press(favoriteButton);

    favoriteButton.props.onPress = onPress();

    await waitFor(() => {
      expect(onPress).toBeCalledTimes(1);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Property profile tests', () => {
  test('Add images button renders for owners', async () => {
    const {queryByTestId} = ownerSetup();
    const addImagesButton = queryByTestId('addImagesButton');
    await waitFor(() => {
      expect(addImagesButton).toBeTruthy();
    });
  });
  test("Add images button doesn't render for non-owners", async () => {
    const {queryByTestId} = setup();
    await waitFor(() => {
      expect(queryByTestId('addImagesButton')).toBeFalsy();
    });
  });
  test('Correct property name', async () => {
    const {getByText} = setup();

    const propertyName =
      mockProperty.street_address +
      ', ' +
      mockProperty.city.charAt(0).toUpperCase() +
      mockProperty.city.slice(1);
    await waitFor(() => {
      expect(getByText(propertyName)).toBeTruthy();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Property description tests', () => {
  test('Correct total number of inputs', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('input_view').length).toBe(23);
    });
  });
  test('Correct number of text inputs', async () => {
    const {queryAllByTestId} = setup();
    await waitFor(() => {
      expect(queryAllByTestId('text_input').length).toBe(14);
    });
  });
  test('Correct number of boolean switch inputs', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('switch_input').length).toBe(6);
    });
  });
  test('Correct number of string select inputs', async () => {
    const {queryAllByTestId} = setup();

    await waitFor(() => {
      expect(queryAllByTestId('picker_input').length).toBe(2);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Owner details tests', () => {
  test('Correct owner name shown', async () => {
    const {getByTestId} = setup();

    await waitFor(() => {
      const ownerDetails = getByTestId('owner_details_name');
      const ownerName = ownerDetails.children[1] as ReactTestInstance;
      expect(ownerName.props.children).toBe(
        mockUser.firstName + ' ' + mockUser.lastName,
      );
    });
  });

  test("Show owner's email if property is for sale", async () => {
    const {getByTestId, queryByTestId} = setup(undefined, {
      ...mockProperty,
      for_sale: true,
    });

    await waitFor(() => {
      const ownerDetails = getByTestId('owner_details_email');
      const ownerName = ownerDetails.children[1] as ReactTestInstance;
      expect(ownerName.props.children).toBe(mockUser.email);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Property statistics tests', () => {
  test('Number of views is fetched and rendered', async () => {
    const {getByTestId} = setup();
    await waitFor(() => {
      expect(getByTestId('number_of_views')).toBeTruthy();
    });
  });
  test('Number of favorites is fetched and rendered', async () => {
    const {getByTestId} = setup();
    await waitFor(() => {
      expect(getByTestId('number_of_favorites')).toBeTruthy();
    });
  });

  test('number_of_views correct number', async () => {
    const {getByTestId} = setup();

    await waitFor(() => {
      const num_of_views = getByTestId('number_of_views');

      const text = num_of_views.children[1] as ReactTestInstance;

      expect(text.props.children).toBe(54);
    });
  });

  test('number_of_favorites correct number', async () => {
    const {getByTestId} = setup();

    await waitFor(() => {
      const num_of_favs = getByTestId('number_of_favorites');

      const text = num_of_favs.children[1] as ReactTestInstance;

      expect(text.props.children).toBe(2);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Property ownership details tests', () => {
  test('Request ownership renders for non-owners', async () => {
    const {getByTestId, queryByTestId} = setup();
    const expandable_list = getByTestId('expandable_list');
    fireEvent.press(expandable_list);
    await waitFor(() => {
      const ownershipView = queryByTestId('request_ownership');
      expect(ownershipView).toBeTruthy();
    });
  });
  test("Request ownership doesn't render for owners", async () => {
    const {queryByTestId, getByTestId} = ownerSetup();
    const expandable_list = getByTestId('expandable_list');
    fireEvent.press(expandable_list);
    await waitFor(() => {
      expect(queryByTestId('request_ownership')).toBeFalsy();
    });
  });
  test('Drop ownership renders for owners', async () => {
    const {queryByTestId, getByTestId} = ownerSetup();
    const expandable_list = getByTestId('expandable_list');
    fireEvent.press(expandable_list);
    await waitFor(() => {
      const ownershipView = queryByTestId('drop_ownership');
      expect(ownershipView).toBeTruthy();
    });
  });
  test("Drop ownership doesn't render for non-owners", async () => {
    const {queryByTestId, getByTestId} = setup();
    const expandable_list = getByTestId('expandable_list');
    fireEvent.press(expandable_list);
    await waitFor(() => {
      expect(queryByTestId('drop_ownership')).toBeFalsy();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Property selling info tests', () => {
  test('Correct price', async () => {
    const {getByTestId} = setup(undefined, {
      ...mockProperty,
      for_sale: true,
    });

    const header = getByTestId('selling_info_header');

    const priceInfo = header.children[0] as ReactTestInstance;

    await waitFor(() => {
      expect(priceInfo.props.percentageDifference).toEqual(
        mockProperty.percentage_difference,
      );
    });
  });

  test('Correct price', async () => {
    const {getByTestId} = setup();

    const priceField = getByTestId('property_price');

    const price = priceField.children[1] as ReactTestInstance;

    await waitFor(() => {
      expect(price.props.children).toEqual(
        '$ ' + formatPrice(mockProperty.predicted_price),
      );
    });
  });

  test('For sale tag is shown when property is for sale', async () => {
    const {getByTestId} = setup(undefined, {
      ...mockProperty,
      for_sale: true,
    });
    const for_sale = getByTestId('sell_status_icon');

    const for_sale_tag = for_sale.children[0] as ReactTestInstance;

    await waitFor(() => {
      expect(for_sale_tag.props.style.textDecorationLine).toBe('underline');
    });
  });

  test('For sale tag is crossed out when property is not for sale', async () => {
    const {getByTestId} = setup(undefined, {
      ...mockProperty,
      for_sale: false,
    });
    const for_sale = getByTestId('sell_status_icon');

    const for_sale_tag = for_sale.children[0] as ReactTestInstance;

    await waitFor(() => {
      expect(for_sale_tag.props.style.textDecorationLine).toBe(
        'underline line-through',
      );
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

describe('Prop state consistency', () => {
  test('Property body prop as an owner', async () => {
    const {getByTestId} = ownerSetup();
    const propertyScreen = getByTestId('property_screen');
    const propertyBody = propertyScreen.children[1] as ReactTestInstance;
    await waitFor(() => {
      expect(propertyBody.props.isUserOwnerOfThisProperty).toBe(true);
    });
  });
  test('Property body prop as an non-owner', async () => {
    const {getByTestId} = setup();
    const propertyScreen = getByTestId('property_screen');
    const propertyBody = propertyScreen.children[1] as ReactTestInstance;
    await waitFor(() => {
      expect(propertyBody.props.isUserOwnerOfThisProperty).toBe(false);
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
