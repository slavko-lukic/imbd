import React, {FC, useState} from 'react';
import {Pressable, View, ViewProps, ViewStyle} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {shadeColor} from '../utilities/colors';

interface NeumorphlingProps extends ViewProps {
  backgroundColor: string;
  distance?: number;
  lightPositionX?: number;
  lightPositionY?: number;
  onPress?: () => void;
}

const blurMapper = (xOffset: number, yOffset: number) => {
  return -Math.abs(1.5 * xOffset * yOffset) + 4;
};

const Neumorphling: FC<NeumorphlingProps> = ({
  children,
  style,
  backgroundColor,
  distance = 6,
  lightPositionX = -1,
  lightPositionY = -1,
  onPress,
  ...otherProps
}) => {
  const [pressed, setPressed] = useState(false);

  const {colorTheme} = useColorTheme();
  const highlightColorModifier = colorTheme.type === 'dark' ? 30 : 10;
  const shadowColorModifier = colorTheme.type === 'dark' ? 40 : 30;

  const shadowStyle: ViewStyle = {
    shadowRadius:
      Math.abs(distance) / blurMapper(lightPositionX, lightPositionY),
    shadowOffset: {
      width: (distance * -lightPositionX) / 2.1,
      height: (distance * -lightPositionY) / 2.1,
    },
    shadowColor: shadeColor(backgroundColor, -shadowColorModifier),
  };

  const highlightStyle: ViewStyle = {
    borderColor: shadeColor(backgroundColor, -10) || backgroundColor,
    backgroundColor: backgroundColor,

    shadowRadius:
      Math.abs(distance) / blurMapper(lightPositionX, lightPositionY),
    shadowOffset: {
      width: (distance * lightPositionX) / 2.1,
      height: (distance * lightPositionY) / 2.1,
    },
    shadowColor: shadeColor(backgroundColor, highlightColorModifier),
  };

  distance = Math.abs(distance);

  return (
    <View style={[shadowStyle, {shadowOpacity: pressed ? 0 : 1}]}>
      <Pressable
        onPressIn={() => {
          if (onPress) setPressed(true);
        }}
        onPressOut={() => {
          if (onPress) setPressed(false);
        }}
        onPress={onPress}
        style={[
          highlightStyle,
          {shadowOpacity: pressed ? 0 : 0.9, borderWidth: pressed ? 0 : 0.4},
          style,
        ]}
        {...otherProps}>
        {children}
      </Pressable>
    </View>
  );
};

export default Neumorphling;
