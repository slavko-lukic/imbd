import MaskedView from '@react-native-community/masked-view';
import React, {FC} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ReflectionImageProps {
  /**
   * Image source
   */
  source: ImageSourcePropType;

  /**
   * Blur radius. Defaults to 10.
   */
  blurRadius?: number;

  /**
   * Determines how smooth transition from non blurred area to
   * blurred area is.
   * 0 is maximum smoothness, 1 is no blur at all.
   * Numbers outside of [0,1] range will cause whole image to be blurred.
   * Defaults to 0.7.
   */
  smoothness?: number;

  style?: ViewStyle;
}

const ReflectionImage: FC<ReflectionImageProps> = ({
  source,
  blurRadius = 10,
  smoothness = 0.7,
  style,
}) => {
  return (
    <>
      {/* Blured image underneath main image */}
      <ImageBackground
        blurRadius={blurRadius}
        style={[styles.image, styles.absolute, style]}
        source={source}
      />

      {/* Gradual fading main image without blur */}
      <MaskedView
        maskElement={
          <LinearGradient
            locations={[smoothness, 1]}
            style={[styles.image, style]}
            colors={['black', 'transparent']}
          />
        }>
        <ImageBackground style={[styles.image, style]} source={source} />
      </MaskedView>

      {/* Reversed blured image */}
      <ImageBackground
        blurRadius={blurRadius}
        style={[styles.image, styles.reflect, style]}
        source={source}
      />
    </>
  );
};

export default ReflectionImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reflect: {
    transform: [{rotateZ: '180deg'}, {rotateY: '180deg'}],
  },
});
