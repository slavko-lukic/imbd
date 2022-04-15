import React, {FC} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {cardShadowStyle} from '../constants/styling';
import {useColorTheme} from '../hooks/styles/useColorTheme';

const ScrollToTopButton: FC<TouchableOpacityProps> = ({style, ...props}) => {
  const {surfaceVariantStyle, colorTheme} = useColorTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.additionalStyles,
        cardShadowStyle,
        surfaceVariantStyle,
        style,
      ]}>
      <Ionicons color={colorTheme.primary} size={30} name="chevron-up-sharp" />
    </TouchableOpacity>
  );
};

export default ScrollToTopButton;

const styles = StyleSheet.create({
  additionalStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
