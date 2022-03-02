import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import SettingsGroupTitle from './SettingsGroupTitle';

interface SettingsGroupProps {
  title: string;
  items: JSX.Element[];
}

const SettingsGroup: FC<SettingsGroupProps> = ({title, items}) => {
  return (
    <View style={styles.container}>
      <SettingsGroupTitle>{title}</SettingsGroupTitle>
      {items}
    </View>
  );
};

export default SettingsGroup;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 1,
  },
});
