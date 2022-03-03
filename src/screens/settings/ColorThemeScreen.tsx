import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../components/MainHeader';
import {HEADER_ICON_SIZE} from '../../constants/dimensions';
import {AppRoute} from '../../enums/routes';
import {useColorTheme} from '../../hooks/useColorTheme';
import {SettingsStackNavigatorParams} from '../../navigation/SettingsNavigator';

type ColorThemeScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.COLOR_THEME
>;

const ColorThemeScreen: FC<ColorThemeScreenProps> = ({navigation}) => {
  const {colorTheme, colorThemeBackgroundStyle} = useColorTheme();

  const goBack = () => {
    navigation.goBack();
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
    </SafeAreaView>
  );
};

export default ColorThemeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
  },
});
