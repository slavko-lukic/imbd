import React, {FC} from 'react';
import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {pSBC} from '../utilities/pSBC';

interface NeumorphlingProps extends ViewProps {
  backgroundColor: string;
  distance?: number;
  lightPositionX?: number;
  lightPositionY?: number;
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
  ...otherProps
}) => {
  const outerLayerStyle: ViewStyle = {
    shadowOpacity: 1,
    shadowRadius:
      Math.abs(distance / 1.4) / blurMapper(lightPositionX, lightPositionY),
    shadowOffset: {
      width: distance * -lightPositionX,
      height: distance * -lightPositionY,
    },
    shadowColor: pSBC(-0.3, backgroundColor) || 'black',
  };

  const innerLayerStyle: ViewStyle = {
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: pSBC(-0.1, backgroundColor) || backgroundColor,
    backgroundColor: backgroundColor,

    shadowOpacity: 0.8,
    shadowRadius:
      Math.abs(distance / 1.4) / blurMapper(lightPositionX, lightPositionY),
    shadowOffset: {
      width: distance * lightPositionX,
      height: distance * lightPositionY,
    },
    shadowColor: pSBC(0.2, backgroundColor) || 'white',
  };

  return (
    <View style={outerLayerStyle}>
      <View style={[innerLayerStyle, style]} {...otherProps}>
        {children}
      </View>
    </View>
  );
};

export default Neumorphling;
