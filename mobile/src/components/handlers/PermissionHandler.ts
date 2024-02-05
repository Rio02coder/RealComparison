/* istanbul ignore file */
import {Permission} from 'react-native';
import {
  checkMultiple,
  PermissionStatus,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

function getPromiseStatuses(
  permissions: Permission[],
): Promise<Record<Permission, PermissionStatus>> {
  return checkMultiple(permissions);
}

function getNotGrantedPermissions(
  statuses: Record<Permission, PermissionStatus>,
  permissions: Permission[],
): Permission[] {
  return permissions.filter(
    permission => statuses[permission] === RESULTS.DENIED,
  );
}

/*
 * When given an array of permissions this function checks if the app has gathered them.
 * If not then the app asks the user to confirm them.
 */

export const permissionHandler = (permissions: Permission[]): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    const statuses = await getPromiseStatuses(permissions);
    const notGrantedPermissions = getNotGrantedPermissions(
      statuses,
      permissions,
    );

    if (notGrantedPermissions.length === 0) {
      return resolve();
    }

    // Ask the user to grant the permissions for the not granted permissions
    await requestMultiple(notGrantedPermissions);
    resolve(permissionHandler(notGrantedPermissions));
  });
};
