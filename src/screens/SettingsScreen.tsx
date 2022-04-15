import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import SettingsGroup from '../components/SettingsGroup';
import SettingsGroupItem from '../components/SettingsGroupItem';
import VerticalSpacing from '../components/VerticalSpacing';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {SettingsItem} from '../models';
import {SettingsStackNavigatorParams} from '../navigation/SettingsNavigator';

type SettingsScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.SETTINGS_HOME
>;

const SettingsScreen: FC<SettingsScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();
  const {t} = useTranslation();

  const goBack = () => {
    navigation.pop();
  };

  const onSelectThemePressHandler = () => {
    navigation.push(AppRoute.COLOR_THEME);
  };

  const onConfigureMoviesPressHandler = () => {
    navigation.push(AppRoute.CONFIGURE_MOVIES);
  };

  const onConfigureLanguagePressHandler = () => {
    navigation.push(AppRoute.CONFIGURE_LANGUAGE);
  };

  const generalSettingsItems: SettingsItem[] = [
    {
      settingName: t('selectColorTheme'),
      icon: 'color-palette',
      onPress: onSelectThemePressHandler,
    },
    {
      settingName: t('configureMovies'),
      icon: 'videocam',
      onPress: onConfigureMoviesPressHandler,
    },
    {
      settingName: t('configureLanguage'),
      icon: 'language',
      onPress: onConfigureLanguagePressHandler,
    },
    {settingName: 'Saturn options', icon: 'planet'},
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
        onPress={settingsItem.onPress}
      />
    ));
  };

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContainer, backgroundStyle]}>
      <MainHeader leftButton={headerLeftButton} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <SettingsGroup
          title={t('generalSettings')}
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
