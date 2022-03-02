import React, {FC} from 'react';
import {Text} from 'react-native';
import colors from '../constants/colors';

const SettingsGroupTitle: FC = ({children}) => {
  return (
    <Text
      numberOfLines={1}
      style={{
        color: colors.WHITE,
        fontSize: 22,
        marginHorizontal: 10,
        marginBottom: 10,
      }}>
      {children}
    </Text>
  );
};

export default SettingsGroupTitle;
