import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import AppleWatchBreathing from '../components/AppleWatchBreathing';

type ProfileScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.PROFILE
>;

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const {colorTheme} = useColorTheme();

  const goToSettings = () => {
    navigation.navigate(AppRoute.SETTINGS);
  };

  const headerRightButton: JSX.Element = (
    <Ionicons
      name="settings-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goToSettings}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.screenContaner]}>
      <MainHeader rightButtons={headerRightButton} />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <AppleWatchBreathing />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.BLACK,
  },
});
