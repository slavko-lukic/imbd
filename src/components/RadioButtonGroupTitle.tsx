import React, {FC} from 'react';
import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDelayedFadeIn} from '../hooks/animations/useDelayedFadeIn';
import {useColorTheme} from '../hooks/styles/useColorTheme';

const RadioButtonGroupTitle: FC = ({children}) => {
  const {foregroundStyle} = useColorTheme();

  const delayedFadeInStyle = useDelayedFadeIn(900);

  return (
    <Animated.View style={delayedFadeInStyle}>
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
    </Animated.View>
  );
};

export default RadioButtonGroupTitle;
