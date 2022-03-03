import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../components/MainHeader';
import SelectThemeRadioButton from '../../components/SelectThemeRadioButton';
import SettingsGroup from '../../components/SettingsGroup';
import {HEADER_ICON_SIZE} from '../../constants/dimensions';
import {AppRoute} from '../../enums/routes';
import {useColorTheme} from '../../hooks/useColorTheme';
import {ColorTheme} from '../../models/ColorTheme';
import {SettingsStackNavigatorParams} from '../../navigation/SettingsNavigator';
import {availableColorThemes} from '../../store/reducers/settingsReducer';

type ColorThemeScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.COLOR_THEME
>;

const ColorThemeScreen: FC<ColorThemeScreenProps> = ({navigation}) => {
  const {colorTheme, colorThemeBackgroundStyle} = useColorTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const mapThemes = () => {
    return availableColorThemes.map((colorTheme: ColorTheme, index: number) => (
      <SelectThemeRadioButton
        key={colorTheme.themeName}
        colorThemeName={colorTheme.themeName}
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
      <SettingsGroup
        title="Select color theme"
        items={mapThemes()}
        hasBottomBorder={false}
      />
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
