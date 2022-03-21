import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../components/MainHeader';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import SelectThemeRadioButton from '../../components/SelectThemeRadioButton';
import SettingsGroup from '../../components/SettingsGroup';
import {HEADER_ICON_SIZE} from '../../constants/dimensions';
import {availableColorThemes} from '../../constants/predefinedColorThemes';
import {AppRoute} from '../../enums/routes';
import {useColorTheme} from '../../hooks/styles/useColorTheme';
import {ColorTheme} from '../../models';
import {SettingsStackNavigatorParams} from '../../navigation/SettingsNavigator';

type ConfigureMoviesScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.CONFIGURE_MOVIES
>;

const ConfigureMoviesScreen: FC<ConfigureMoviesScreenProps> = ({
  navigation,
}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const mapDarkThemes = () => {
    return availableColorThemes.map((colorTheme: ColorTheme, index: number) => {
      if (colorTheme.type === 'dark')
        return (
          <SelectThemeRadioButton
            key={colorTheme.themeName}
            colorThemeName={colorTheme.themeName}
            index={index}
          />
        );
    });
  };

  const mapLightThemes = () => {
    return availableColorThemes.map((colorTheme: ColorTheme, index: number) => {
      if (colorTheme.type === 'light')
        return (
          <SelectThemeRadioButton
            key={colorTheme.themeName}
            colorThemeName={colorTheme.themeName}
            index={index}
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
        title="Select view type"
        items={[darkThemesGroup, lightThemesGroup]}
        hasBottomBorder={false}
      />
    </SafeAreaView>
  );
};

export default ConfigureMoviesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
  },
});
