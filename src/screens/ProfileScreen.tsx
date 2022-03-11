import React, {FC, useState} from 'react';
import {Slider, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import Neumorphling from '../components/Neumorphling';
import {solarizedThemeColors} from '../constants/colors';

type ProfileScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.PROFILE
>;

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const [d, setD] = useState(0);

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
      style={[
        styles.screenContaner,
        {backgroundColor: solarizedThemeColors.SURFACE},
      ]}>
      <MainHeader rightButton={headerRightButton} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Slider
          style={{width: 100, top: -30}}
          maximumValue={20}
          minimumValue={0}
          value={d}
          onValueChange={d => setD(d)}
        />
        <View
          style={{
            left: -50,
            flexDirection: 'row',
          }}>
          <Slider
            value={y}
            onValueChange={y => setY(y)}
            style={{width: 100, transform: [{rotateZ: '90deg'}], top: 30}}
            maximumValue={1}
            minimumValue={-1}
          />
          <Neumorphling
            style={{
              width: 250,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            backgroundColor={solarizedThemeColors.SURFACE}
            lightPositionX={x}
            lightPositionY={y}
            distance={d}>
            <Text>Hey</Text>
          </Neumorphling>
        </View>
        <Slider
          value={x}
          onValueChange={x => setX(x)}
          style={{width: 100, top: 30}}
          maximumValue={1}
          minimumValue={-1}
        />
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
