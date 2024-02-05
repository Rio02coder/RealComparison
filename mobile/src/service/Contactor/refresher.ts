/* istanbul ignore file */
import ReduxProps from '../../types/redux/props';
import {tags} from '../../types/redux/Tags';
import {Property} from '../../types/Property';
import tagContactor from '../../utilities/redux/property/Tag';
import PropertyAction from '../../types/redux/actions/property';

const refresher = (props: ReduxProps, tag: tags): Promise<Property[]> => {
  const allProperties = props.properties.get(tag) as Property[];
  const contactor = tagContactor.get(tag)?.updater[0] as (
    props: ReduxProps,
  ) => Promise<Property[]>;
  const cleaner = tagContactor.get(tag)?.updater[1] as (
    props: ReduxProps,
  ) => (properties: Property[]) => PropertyAction<Property[]>;
  cleaner(props)(allProperties);
  return contactor(props);
};

export default refresher;
