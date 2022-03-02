import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View} from 'react-native';
import {AppRoute} from '../enums/routes';
import {SettingsStackNavigatorParams} from '../navigation/SettingsNavigator';

type SettingsScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.SETTINGS
>;

const SettingsScreen: FC<SettingsScreenProps> = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      Settings screen
    </View>
  );
};

export default SettingsScreen;
