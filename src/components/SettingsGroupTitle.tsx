import React, {FC} from 'react';
import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDelayedFadeIn} from '../hooks/animations/useDelayedFadeIn';
import {useColorTheme} from '../hooks/styles/useColorTheme';

const SettingsGroupTitle: FC = ({children}) => {
  const {foregroundStyle} = useColorTheme();

  const delayedFadeInStyle = useDelayedFadeIn(900);

  return (
    <Animated.View style={delayedFadeInStyle}>
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
    </Animated.View>
  );
};

export default SettingsGroupTitle;
