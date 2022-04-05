import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import colors from '../constants/colors';
import SettingsGroupTitle from './SettingsGroupTitle';

interface SettingsGroupProps {
  title: string;
  items: JSX.Element[];
  hasBottomBorder?: boolean;
}

const SettingsGroup: FC<SettingsGroupProps> = ({
  title,
  items,
  hasBottomBorder = true,
}) => {
  const bottomBorderStyle: StyleProp<ViewStyle> = {
    borderBottomColor: colors.GREY_3,
    borderBottomWidth: 0.5,
  };

  return (
    <View
      style={[styles.container, hasBottomBorder ? bottomBorderStyle : null]}>
      <SettingsGroupTitle>{title}</SettingsGroupTitle>
      {items}
    </View>
  );
};

export default SettingsGroup;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
