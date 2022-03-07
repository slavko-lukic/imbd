import React, {FC} from 'react';
import {Text} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import FadeInView from './FadeInView';

const RadioButtonGroupTitle: FC = ({children}) => {
  const {foregroundStyle} = useColorTheme();

  return (
    <FadeInView delay={1100}>
      <Text
        style={[
          {
            fontSize: 14,
            marginHorizontal: 15,
            fontStyle: 'normal',
            marginBottom: 5,
          },
          foregroundStyle,
        ]}>
        {children}
      </Text>
    </FadeInView>
  );
};

export default RadioButtonGroupTitle;
