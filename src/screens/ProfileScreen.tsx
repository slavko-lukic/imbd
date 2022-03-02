import React, {FC} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import {useSelector} from 'react-redux';
import {RootState} from '../store/storeConfig';

type ProfileScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.PROFILE
>;

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme,
  );

  const goToSettings = () => {
    navigation.navigate(AppRoute.SETTINGS);
  };

  const headerRightButton: JSX.Element = (
    <Ionicons
      name="settings-sharp"
      color={colorTheme.onSurface}
      size={HEADER_ICON_SIZE}
      onPress={goToSettings}
    />
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colorTheme.background, flex: 1, height: '100%'}}>
      <MainHeader rightButton={headerRightButton} />
      <Text style={{color: 'red'}}>Profile Screen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
