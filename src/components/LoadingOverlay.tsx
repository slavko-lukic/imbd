import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import {useColorTheme} from '../hooks/styles/useColorTheme';

const LoadingOverlay = () => {
  const {colorTheme} = useColorTheme();

  return (
    <ActivityIndicator
      color={colorTheme.primary}
      size={'large'}
      style={styles.loadingOverlay}
    />
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GREY_1_60,
  },
});
