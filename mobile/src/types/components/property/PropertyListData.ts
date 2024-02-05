import {StyleProp, ViewStyle} from 'react-native';

export type PropertyListData = {
  name: string;
  iconName: string;
  iconStyle?: StyleProp<ViewStyle>;
  iconSize: number;
  textStyle?: StyleProp<ViewStyle>;
};
