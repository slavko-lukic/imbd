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

export const cardOnlyTopShadow: StyleProp<ViewStyle> = {
  shadowRadius: 2,
  shadowOpacity: 0.3,
  shadowOffset: {
    width: 0,
    height: -6,
  },
  shadowColor: colors.BLACK,
  elevation: 4,
};
