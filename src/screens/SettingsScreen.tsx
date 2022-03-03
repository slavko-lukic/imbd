import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import SettingsGroup from '../components/SettingsGroup';
import SettingsGroupItem from '../components/SettingsGroupItem';
import VerticalSpacing from '../components/VerticalSpacing';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/useColorTheme';
import {SettingsItem} from '../models/SettingsItem';
import {SettingsStackNavigatorParams} from '../navigation/SettingsNavigator';

type SettingsScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.SETTINGS_HOME
>;

const SettingsScreen: FC<SettingsScreenProps> = ({navigation}) => {
  const {colorTheme, colorThemeBackgroundStyle} = useColorTheme();

  const generalSettingsItems: SettingsItem[] = [
    {settingName: 'Select theme', icon: 'color-palette'},
    {settingName: 'Configure beer', icon: 'beer'},
    {settingName: 'Saturn options', icon: 'planet'},
    {settingName: 'Pizza setup', icon: 'pizza'},
  ];

  const someOtherSettingsItems: SettingsItem[] = [
    {settingName: 'Upgrade car', icon: 'car-sport'},
    {settingName: 'Water setup', icon: 'water'},
    {settingName: 'Firebase setup', icon: 'logo-firebase'},
    {settingName: 'Play basketball', icon: 'basketball'},
    {settingName: 'Fly', icon: 'airplane'},
    {settingName: 'Phone settings', icon: 'phone-portrait'},
    {settingName: 'Megaphone settings', icon: 'megaphone'},
  ];

  const goBack = () => {
    navigation.goBack();
  };

  /**
   *
   * setting names are used as key in list so they should be unique
   */
  const mapSettingsListToUI = (settingsList: SettingsItem[]) => {
    return settingsList.map((settingsItem: SettingsItem, index: number) => (
      <SettingsGroupItem
        key={settingsItem.settingName}
        settingName={settingsItem.settingName}
        icon={settingsItem.icon}
        index={index}
      />
    ));
  };

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colorTheme.onSurface}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContainer, colorThemeBackgroundStyle]}>
      <MainHeader leftButton={headerLeftButton} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <SettingsGroup
          title="General Settings"
          items={mapSettingsListToUI(generalSettingsItems)}
        />
        <SettingsGroup
          title="Some Other Settings"
          items={mapSettingsListToUI(someOtherSettingsItems)}
        />
        <VerticalSpacing spacing={60} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
  },
});
