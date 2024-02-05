import React, {createContext, useLayoutEffect, useRef, useState} from 'react';
import {View, Animated} from 'react-native';
import connector from '../redux/connector';
import {ScreenProps} from '../types/Screen';
import {ScreenNames} from '../types/ScreenNames';
import appStyles from '../styles/screens/Themes';
import {tags} from '../types/redux/Tags';
import {Property, SpecificProperty} from '../types/Property';
import PropertyContext from '../types/components/property/PropertyContext';
import requestSpecificProperty from '../service/Contactor/Property/Property';
import CompletePropertyHeader from '../components/property/CompletePropertyHeader';
import PropertyBody from '../components/property/Body';

export const PropertyScreenContext = createContext<PropertyContext>({
  setProperty: () => {},
  isPropertyOwned: false,
  isWaiting: true,
});

const PropertyScreen: React.FC<ScreenProps<ScreenNames.Property>> = props => {
  const passedProperty = props.route.params.property;
  const ownedProperties = props.properties.get(tags.OWNED) as Property[];
  const ownedPropertyIds = ownedProperties.map(value => value.id);
  const isUserOwnerOfThisProperty = ownedPropertyIds.includes(
    passedProperty.id,
  );
  const scrollY = useRef(new Animated.Value(0)).current;

  const [property, setProperty] = useState<Property>(passedProperty);
  const [waiting, setWaiting] = useState(true);

  const embedPropertySpecificity = async () => {
    const specificProperty = await requestSpecificProperty(props, property.id);
    setProperty(specificProperty);
    setWaiting(false);
  };

  useLayoutEffect(() => {
    embedPropertySpecificity();
  }, []);

  return (
    <PropertyScreenContext.Provider
      value={{
        setProperty: setProperty,
        reduxProps: props,
        isPropertyOwned: isUserOwnerOfThisProperty,
        navigation: props.navigation,
        isWaiting: waiting,
      }}>
      <View testID="property_screen" style={appStyles.mainAppTheme}>
        <CompletePropertyHeader
          {...props}
          specificProperty={property as SpecificProperty}
          scrollY={scrollY}
        />
        <PropertyBody
          {...props}
          isUserOwnerOfThisProperty={isUserOwnerOfThisProperty}
          scrollY={scrollY}
          property={property as SpecificProperty}
        />
      </View>
    </PropertyScreenContext.Provider>
  );
};

export default connector(PropertyScreen);
