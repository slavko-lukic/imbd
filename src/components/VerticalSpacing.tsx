import React, {FC} from 'react';
import {View} from 'react-native';

interface VerticalSpacingProps {
  spacing: number;
}

const VerticalSpacing: FC<VerticalSpacingProps> = ({spacing}) => {
  return <View style={{height: spacing}} />;
};

export default VerticalSpacing;
