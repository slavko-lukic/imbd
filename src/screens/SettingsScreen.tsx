import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
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
      <Text style={{color: 'red'}}>Settings Screen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;
