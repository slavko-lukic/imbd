import React, {FC, useState} from 'react';
import {Pressable, View, ViewProps, ViewStyle} from 'react-native';
import {pSBC} from '../utilities/pSBC';

interface NeumorphlingProps extends ViewProps {
  backgroundColor: string;
  distance?: number;
  lightPositionX?: number;
  lightPositionY?: number;
  onPress?: () => void;
}

const blurMapper = (xOffset: number, yOffset: number) => {
  return -Math.abs(0.8 * xOffset * yOffset) + 2;
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

  const shadowStyle: ViewStyle = {
    shadowRadius:
      Math.abs(distance / 1.4) / blurMapper(lightPositionX, lightPositionY),
    shadowOffset: {
      width: distance * -lightPositionX,
      height: distance * -lightPositionY,
    },
    shadowColor: pSBC(-0.3, backgroundColor) || backgroundColor,
  };

  const highlightStyle: ViewStyle = {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: pSBC(-0.1, backgroundColor) || backgroundColor,
    backgroundColor: backgroundColor,

    shadowRadius:
      Math.abs(distance / 1.4) / blurMapper(lightPositionX, lightPositionY),
    shadowOffset: {
      width: distance * lightPositionX,
      height: distance * lightPositionY,
    },
    shadowColor: pSBC(0.4, backgroundColor) || backgroundColor,
  };

  distance = Math.abs(distance);

  return (
    <View style={[shadowStyle, {shadowOpacity: pressed ? 0 : 1}]}>
      <Pressable
        onPressIn={() => {
          setPressed(true);
        }}
        onPressOut={() => {
          setPressed(false);
        }}
        onPress={onPress}
        style={[highlightStyle, {shadowOpacity: pressed ? 0 : 0.8}, style]}
        {...otherProps}>
        {children}
      </Pressable>
    </View>
  );
};

export default Neumorphling;
