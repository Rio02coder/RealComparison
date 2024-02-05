/* istanbul ignore file */
import GeneralBackendFormErrorHandler from '../General';
import User from '../../../../../types/User';
import {
  PasswordlessUserBackend,
  UserBackend,
} from '../../../../../types/service/server';
import ReduxProps from '../../../../../types/redux/props';
import SessionChainErrorHandler from '../../SessionChainErrorHandler';
import getUserUpdatingSlice from '../../../../storage/ReduxTokenizer';
import {backend} from '../../../../../service/server';
import {convertToFrontendUserFormat} from '../../../../adapters/User';
import Requester from '../../../../../service/Requester';
import ENDPOINTS from '../../../../../service/endpoints';
import ChainErrorHandler from '../../ChainErrorHandler';
import {Asserts} from 'yup';
import RequireAtLeastOne from '../../../../../types/RequireAtLeastOne';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../../types/ScreenNames';
import fullyLogout from '../../../../../types/utilities/fullyLogout';

type EditProfileBackendPayload = RequireAtLeastOne<
  PasswordlessUserBackend['user']
>;

export default abstract class BackendEditProfileFormErrorHandler<
  ValidationEntity extends Asserts<any>,
> extends GeneralBackendFormErrorHandler<
  ValidationEntity,
  User,
  UserBackend,
  EditProfileBackendPayload
> {
  /**
   * @param reduxProps
   * @param completeEditProfile
   * @param partialAdapter
   * @param navigation If passed, this specific update must perform a logout if successful.
   * @param specificChangeEndpoint If explicitly passed, the endpoint for which the change is made will be different.
   */
  public constructor(
    reduxProps: ReduxProps,
    completeEditProfile: (updatedUser: User) => void,
    partialAdapter: (
      subUserData: ValidationEntity,
    ) => EditProfileBackendPayload,
    navigation?: StackNavigationProp<NavigationStackTypes, ScreenNames>,
    specificChangeEndpoint: string = ENDPOINTS.USER.EDIT_PROFILE,
  ) {
    super(
      new SessionChainErrorHandler<
        ValidationEntity,
        ValidationEntity,
        UserBackend,
        User,
        EditProfileBackendPayload
      >(
        getUserUpdatingSlice(reduxProps),
        new Requester({
          api: backend(),
          responseHandler: user => {
            const updatedUser = convertToFrontendUserFormat(user);
            const updatedLoggedUser: User = {
              ...updatedUser,
              token: reduxProps.user.token,
            };
            if (navigation) {
              fullyLogout(reduxProps, navigation);
              return updatedUser;
            }
            completeEditProfile(updatedLoggedUser);
            return updatedLoggedUser;
          },
          adapter: partialAdapter,
          config: {
            method: 'PATCH',
            url: specificChangeEndpoint,
          },
        }),
      ) as unknown as ChainErrorHandler<
        ValidationEntity,
        ValidationEntity,
        UserBackend,
        User,
        EditProfileBackendPayload
      >,
    );
  }
}
