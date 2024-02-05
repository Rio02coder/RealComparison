/* istanbul ignore file */
import {FormikErrors} from 'formik';
import ENDPOINTS from '../../../../service/endpoints';
import Requester from '../../../../service/Requester';
import {backend} from '../../../../service/server';
import GeneralBackendFormErrorHandler from './General';
import ChainErrorHandler from '../ChainErrorHandler';
import {PropertyAdderFormEntity} from '../../../../screens/PropertyAdder';
import ReduxProps from '../../../../types/redux/props';
import getCreated from '../../../../service/Contactor/Property/Created';
import Coordinate from '../../../../types/components/Coordinate';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../types/ScreenNames';
import {PropertyListScreens} from '../../../../types/components/screens/PropertyListScreens';

interface LocatedPropertyAdderFormEntity extends PropertyAdderFormEntity {
  latitude: number;
  longitude: number;
}

export default class BackendPropertyAdderFormErrorHandler extends GeneralBackendFormErrorHandler<
  PropertyAdderFormEntity,
  void,
  void,
  LocatedPropertyAdderFormEntity
> {
  constructor(
    reduxProps: ReduxProps,
    origin: Coordinate,
    navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>,
  ) {
    super(
      new ChainErrorHandler<
        PropertyAdderFormEntity,
        PropertyAdderFormEntity,
        void,
        void,
        LocatedPropertyAdderFormEntity
      >(
        new Requester<
          PropertyAdderFormEntity,
          void,
          void,
          LocatedPropertyAdderFormEntity
        >({
          api: backend(),
          adapter: notLocatedProperty => ({
            ...notLocatedProperty,
            ...origin,
          }),
          responseHandler: () => {
            getCreated(reduxProps).then(() =>
              setTimeout(
                () =>
                  navigation.navigate(
                    ScreenNames.PropertyList,
                    PropertyListScreens[0][2],
                  ),
                1000,
              ),
            );
          },
          config: {
            method: 'POST',
            url: ENDPOINTS.PROPERTY.ADD,
          },
        }),
      ),
    );
  }

  public getMessages(): FormikErrors<PropertyAdderFormEntity> {
    switch (this.getValidError().response.status) {
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
