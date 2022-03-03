import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import RadioButtonGroupTitle from './RadioButtonGroupTitle';

interface RadioButtonGroupProps {
  title: string;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({title, children}) => {
  return (
    <View style={styles.container}>
      <RadioButtonGroupTitle>{title}</RadioButtonGroupTitle>
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
