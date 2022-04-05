import React, {FC} from 'react';
import {Text} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import FadeInView from './FadeInView';

const SettingsGroupTitle: FC = ({children}) => {
  const {foregroundStyle} = useColorTheme();

  return (
    <FadeInView delay={900}>
      <Text
        numberOfLines={1}
        style={[
          {
            fontSize: 22,
            marginHorizontal: 10,
            marginBottom: 10,
          },
          foregroundStyle,
        ]}>
        {children}
      </Text>
    </FadeInView>
  );
};

export default SettingsGroupTitle;
