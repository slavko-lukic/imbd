import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../components/MainHeader';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import SettingsGroup from '../../components/SettingsGroup';
import {HEADER_ICON_SIZE} from '../../constants/dimensions';
import {availableColorThemes} from '../../constants/predefinedColorThemes';
import {AppRoute} from '../../enums/routes';
import {useColorTheme} from '../../hooks/styles/useColorTheme';
import {ColorTheme} from '../../models';
import {SettingsStackNavigatorParams} from '../../navigation/SettingsNavigator';
import RadioButton from '../../components/RadioButton';

type ColorThemeScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.COLOR_THEME
>;

const ColorThemeScreen: FC<ColorThemeScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle, setColorTheme} = useColorTheme();

  const goBack = () => {
    navigation.pop();
  };

  const mapDarkThemes = () => {
    return availableColorThemes.map((theme: ColorTheme, index: number) => {
      if (theme.type === 'dark')
        return (
          <RadioButton
            key={theme.themeName}
            text={theme.themeName}
            index={index}
            isCurrentlyActive={theme.themeName === colorTheme.themeName}
            onPressHandler={() => setColorTheme(theme.themeName)}
          />
        );
    });
  };

  const mapLightThemes = () => {
    return availableColorThemes.map((theme: ColorTheme, index: number) => {
      if (theme.type === 'light')
        return (
          <RadioButton
            key={theme.themeName}
            text={theme.themeName}
            index={index}
            isCurrentlyActive={theme.themeName === colorTheme.themeName}
            onPressHandler={() => setColorTheme(theme.themeName)}
          />
        );
    });
  };

  const darkThemesGroup = (
    <RadioButtonGroup key={'dark'} title="Dark:">
      {mapDarkThemes()}
    </RadioButtonGroup>
  );
  const lightThemesGroup = (
    <RadioButtonGroup key={'light'} title="Light:">
      {mapLightThemes()}
    </RadioButtonGroup>
  );

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
      <SettingsGroup
        title="Select color theme"
        items={[darkThemesGroup, lightThemesGroup]}
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
