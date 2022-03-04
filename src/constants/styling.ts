import {StyleProp, ViewStyle} from 'react-native';
import colors from './colors';

export const cardShadowStyle: StyleProp<ViewStyle> = {
  shadowColor: colors.BLACK,

  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowOpacity: 0.4,
  shadowRadius: 4.0,

  elevation: 7,
};
