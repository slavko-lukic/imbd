import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import AnimatedLoadingLogo from './AnimatedLoadingLogo';

const SecureScreenOverlay = () => {
  const {backgroundStyle} = useColorTheme();

  return (
    <View pointerEvents="none" style={[styles.overlay, backgroundStyle]}>
      <AnimatedLoadingLogo />
    </View>
  );
};

export default SecureScreenOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
