import React, {useEffect} from 'react';
import {View} from 'react-native';
import PropertyDescriptionProps from '../../types/components/property/PropertyDescription';
import PropertyCoolingForm from '../forms/prebuilt/screens/Property/Cooling';
import PropertyGarageForm from '../forms/prebuilt/screens/Property/Garage';
import PropertyHeatingForm from '../forms/prebuilt/screens/Property/Heating';
import PropertyBathroomsForm from '../forms/prebuilt/screens/Property/Bathrooms';
import PropertyBedroomsForm from '../forms/prebuilt/screens/Property/Bedrooms';
import PropertyStoriesForm from '../forms/prebuilt/screens/Property/Stories';
import PropertyLotSizeForm from '../forms/prebuilt/screens/Property/LotSize';
import PropertyLatestSaleYearForm from '../forms/prebuilt/screens/Property/LatestSaleYear';
import PropertyLatestSalePriceForm from '../forms/prebuilt/screens/Property/LatestSalePrice';
import PropertyLivingAreaForm from '../forms/prebuilt/screens/Property/LivingArea';
import PropertyTypeForm from '../forms/prebuilt/screens/Property/Type';

export const DescriptionContext =
  React.createContext<PropertyDescriptionProps | null>(null);

const Description: React.FC<PropertyDescriptionProps> = props => {
  return (
    <View testID="property_description_view" style={{marginTop: 8}}>
      <DescriptionContext.Provider value={props}>
        <PropertyCoolingForm />
        <PropertyGarageForm />
        <PropertyHeatingForm />
        <PropertyBathroomsForm />
        <PropertyBedroomsForm />
        <PropertyStoriesForm />
        <PropertyLotSizeForm />
        <PropertyLatestSaleYearForm />
        <PropertyLatestSalePriceForm />
        <PropertyLivingAreaForm />
        <PropertyTypeForm />
      </DescriptionContext.Provider>
    </View>
  );
};

export default Description;
