import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import SettingsGroup from '../components/SettingsGroup';
import SettingsGroupItem from '../components/SettingsGroupItem';
import colors from '../constants/colors';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {SettingsStackNavigatorParams} from '../navigation/SettingsNavigator';

type SettingsScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.SETTINGS_HOME
>;

const SettingsScreen: FC<SettingsScreenProps> = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colors.WHITE}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colors.BACKGROUND, flex: 1, height: '100%'}}>
      <MainHeader leftButton={headerLeftButton} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <SettingsGroup
          title="General Settings"
          items={[
            <SettingsGroupItem
              settingName="Select theme"
              icon="color-palette"
            />,
            <SettingsGroupItem settingName="Configure beer" icon="beer" />,
            <SettingsGroupItem
              settingName="Play basketball"
              icon="basketball"
            />,
            <SettingsGroupItem settingName="Configure pizza" icon="pizza" />,
          ]}
        />
        <SettingsGroup
          title="Some Other Settings"
          items={[
            <SettingsGroupItem settingName="Car upgrade" icon="car-sport" />,
            <SettingsGroupItem settingName="Start water" icon="water" />,
            <SettingsGroupItem
              settingName="Firebase setting"
              icon="logo-firebase"
            />,
            <SettingsGroupItem settingName="Fly" icon="airplane" />,
            <SettingsGroupItem settingName="Go on planet" icon="planet" />,
            <SettingsGroupItem
              settingName="Phone settings"
              icon="phone-portrait"
            />,
            <SettingsGroupItem
              settingName="Megaphone settings"
              icon="megaphone"
            />,
          ]}
        />
        <View style={{height: 60}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
