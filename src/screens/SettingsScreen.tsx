import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {AppRoute} from '../enums/routes';
import {SettingsStackNavigatorParams} from '../navigation/SettingsNavigator';

type SettingsScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.SETTINGS_HOME
>;

const SettingsScreen: FC<SettingsScreenProps> = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Settings screen</Text>
    </View>
  );
};

export default SettingsScreen;
