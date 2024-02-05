import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import appStyles from '../styles/screens/Themes';
import {ScreenProps} from '../types/Screen';
import {FormTypes} from '../types/components/forms/BaseForm';
import Submit from '../components/forms/Submit';
import Form from '../components/forms/Form';
import {boolean, InferType, number, object, string} from 'yup';
import {ScreenNames} from '../types/ScreenNames';
import BackendPropertyAdderFormErrorHandler from '../utilities/errors/backend/forms/PropertyAdder';
import PropertyAdderCityInput from '../components/forms/input/prebuilt/screens/PropertyAdder/City';
import PropertyAdderZipcodeInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Zipcode';
import PropertyAdderAddressInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Address';
import PropertyAdderBedroomsInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Bedrooms';
import PropertyAdderStoriesInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Stories';
import PropertyAdderGarageInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Garage';
import PropertyAdderCoolingInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Cooling';
import PropertyAdderHeatingInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Heating';
import PropertyAdderLivingAreaInput from '../components/forms/input/prebuilt/screens/PropertyAdder/LivingArea';
import PropertyAdderLotSizeInput from '../components/forms/input/prebuilt/screens/PropertyAdder/LotSize';
import PropertyAdderLatestSalePriceInput from '../components/forms/input/prebuilt/screens/PropertyAdder/LatestSalePrice';
import PropertyAdderLatestSaleYearInput from '../components/forms/input/prebuilt/screens/PropertyAdder/LatestSaleYear';
import propertyAdderInitialValues from '../components/forms/input/prebuilt/screens/PropertyAdder/initialValues';
import styles from '../styles/components/forms/isolated/Isolated';
import Coordinate from '../types/components/Coordinate';
import {getUserCoordinate} from '../components/handlers/LocationHandler';
import PropertyAdderBathroomsInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Bathroomns';
import FormContainer from '../components/Container';
import connector from '../redux/connector';
import PropertyAdderTypeInput from '../components/forms/input/prebuilt/screens/PropertyAdder/Type';
import Loading from '../components/Loading';

export const PropertyAdderValidationRules = {
  city: string().required('City Required'),
  zipcode: string().required('Zipcode Required'),
  street_address: string().required('Street Address Required'),
  // latitude: number;
  // longitude: number;
  num_of_bedrooms: number().required('Number of Bedrooms Required!'),
  num_of_bathrooms: number().required('Number of Bathrooms Required!'),
  num_of_stories: number().required('Number of Stories Required!'),
  has_garage: boolean().required('Has Garage Required!'),
  has_cooling: boolean().required('Has Cooling Required!'),
  has_heating: boolean().required('Has Heating Required!'),
  type: string().required('Type Required'),
  living_area: number().required('Living Area Required!'),
  lot_size: number().required('Lot Size Required!'),
  latest_sale_price: number().required('Latest sale Price Required!'),
  latest_sale_year: number().required('Latest sale of Bathrooms Required!'),
};

export const PropertyAdderSchema = object(PropertyAdderValidationRules);

export interface PropertyAdderFormEntity
  extends InferType<typeof PropertyAdderSchema> {}

const PropertyAdder: React.FC<ScreenProps<ScreenNames.Property>> = props => {
  const [origin, setOrigin] = useState<Coordinate | null>(null);
  const fetchOrigin = () => {
    getUserCoordinate().then(fetchedOrigin => setOrigin(fetchedOrigin));
  };

  useEffect(() => {
    fetchOrigin();
  }, []);

  return (
    <SafeAreaView
      testID="PropertyAdderScreen"
      style={[appStyles.mainAppTheme, {justifyContent: 'center'}]}>
      <FormContainer style={[appStyles.mainAppTheme, {marginTop: 10}]}>
        {origin ? (
          <Form
            style={[
              styles.defaultPreviewFormContainer,
              {alignSelf: 'center', width: '90%'},
            ]}
            validationRules={PropertyAdderValidationRules}
            name={FormTypes.ADD_PROPERTY}
            initialValues={propertyAdderInitialValues}
            submissionHandler={{
              requester: {
                handler: new BackendPropertyAdderFormErrorHandler(
                  props,
                  origin,
                  props.navigation,
                ),
              },
            }}>
            <PropertyAdderCityInput />
            <PropertyAdderZipcodeInput />
            <PropertyAdderAddressInput />
            <PropertyAdderBedroomsInput />
            <PropertyAdderBathroomsInput />
            <PropertyAdderStoriesInput />
            <PropertyAdderGarageInput />
            <PropertyAdderCoolingInput />
            <PropertyAdderHeatingInput />
            <PropertyAdderTypeInput />
            <PropertyAdderLivingAreaInput />
            <PropertyAdderLotSizeInput />
            <PropertyAdderLatestSalePriceInput />
            <PropertyAdderLatestSaleYearInput />
            <Submit testID="property_adder_submit" />
          </Form>
        ) : (
          <Loading
            styles={{container: {top: '50%'}}}
            description={
              'The property will be placed at your current location...'
            }
          />
        )}
      </FormContainer>
    </SafeAreaView>
  );
};

export default connector(PropertyAdder);
