import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import Neumorphling from '../components/Neumorphling';

type ProfileScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.PROFILE
>;

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

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
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContaner, {backgroundColor: 'rgb(140,210,210)'}]}>
      <MainHeader rightButton={headerRightButton} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Neumorphling
          style={{
            width: 150,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          backgroundColor="rgb(140,210,210)">
          <Text>Hey</Text>
        </Neumorphling>
      </View>
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
