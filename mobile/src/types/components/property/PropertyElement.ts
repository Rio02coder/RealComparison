import PropertyDescriptionProps from './PropertyDescription';
import ReduxProps from '../../redux/props';

export default interface PropertyElementProps extends PropertyDescriptionProps {
  containerHeight: number | string;
  containerWidth: number | string;
  imageHeight?: number | string;
  imageWidth?: number | string;
  reduxProps: ReduxProps;
}
