import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import {useColorTheme} from '../hooks/styles/useColorTheme';

type ProfileScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.PROFILE
>;

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const {backgroundStyle} = useColorTheme();

  const goToSettings = () => {
    navigation.navigate(AppRoute.SETTINGS);
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContaner, backgroundStyle]}>
      <MainHeader />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    height: '100%',
  },
});
