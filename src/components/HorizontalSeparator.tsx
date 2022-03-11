import React, {FC} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

interface HorizontalSeparatorProps extends ViewProps {
  color?: string;
  size?: number;
}

const HorizontalSeparator: FC<HorizontalSeparatorProps> = ({
  color,
  style,
  size = 0.4,
}) => {
  const additionalStyles: ViewStyle = {
    borderBottomWidth: size,
    width: '100%',
    height: 0,
    alignSelf: 'center',
    borderColor: color,
  };

  return <View style={[style, additionalStyles]} />;
};

export default HorizontalSeparator;
