export enum PropertyUpdaterActions {
  ADD = 'add',
  REMOVE = 'remove',
  REMOVE_ALL = 'remove_all',
  UPDATE = 'update',
}

type PropertyUpdaterAction = {
  action: PropertyUpdaterActions;
};

export default PropertyUpdaterAction;
