import {tags} from '../../../types/redux/Tags';
import ReduxProps from '../../../types/redux/props';
import {Property} from '../../../types/Property';
import PropertyAction from '../../../types/redux/actions/property';

const reduxTagCleaner = (
  tag: tags,
  props: ReduxProps,
): ((properties: Property[]) => PropertyAction<Property[]>) => {
  switch (tag) {
    case tags.FAVORITE:
      return props.removeFavourite;
    default:
      return props.clearPropertyState;
  }
};

export default reduxTagCleaner;
