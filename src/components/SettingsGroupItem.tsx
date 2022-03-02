import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';

interface SettingsGroupItemProps {
  settingName: string;
  icon: string;
}

const SettingsGroupItem: FC<SettingsGroupItemProps> = ({settingName, icon}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={SETTINGS_ITEM_ICON_SIZE}
        color={colors.WHITE}
      />
      <Text
        numberOfLines={1}
        style={{color: colors.WHITE, fontSize: 16, marginHorizontal: 10}}>
        {settingName}
      </Text>
    </View>
  );
};

export default SettingsGroupItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SURFACE,
    height: 60,

    borderTopWidth: 0.5,
    borderTopColor: colors.GREY,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
});
