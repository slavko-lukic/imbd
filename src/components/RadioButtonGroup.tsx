import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useColorTheme} from '../hooks/useColorTheme';

interface RadioButtonGroupProps {
  title: string;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({title, children}) => {
  const {colorThemeOnSurfaceStyle} = useColorTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            fontSize: 14,
            marginHorizontal: 15,
            fontStyle: 'normal',
            marginBottom: 5,
          },
          colorThemeOnSurfaceStyle,
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
