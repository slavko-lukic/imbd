import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import i18next from 'i18next';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../components/MainHeader';
import RadioButton from '../../components/RadioButton';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import SettingsGroup from '../../components/SettingsGroup';
import {HEADER_ICON_SIZE} from '../../constants/dimensions';
import {AppRoute} from '../../enums/routes';
import {useColorTheme} from '../../hooks/styles/useColorTheme';
import {SettingsStackNavigatorParams} from '../../navigation/SettingsNavigator';

type ConfigureLanguageScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.CONFIGURE_LANGUAGE
>;

const ConfigureLanguageScreen: FC<ConfigureLanguageScreenProps> = ({
  navigation,
}) => {
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);

  const languages: Array<string> = ['English', 'Serbian'];

  const {colorTheme, backgroundStyle} = useColorTheme();

  const {t} = useTranslation();

  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    setActiveLanguage(i18next.language);
  }, []);

  const onRadioButtonPress = (language: string) => {
    AsyncStorage.setItem('lang', language).then(() => {
      i18next.changeLanguage(language);
      setActiveLanguage(language);
    });
  };

  const mappedLanguages = languages.map((language, index) => {
    return (
      <RadioButton
        key={language}
        text={language}
        index={index}
        isCurrentlyActive={activeLanguage === language}
        onPressHandler={() => onRadioButtonPress(language)}
      />
    );
  });

  const languagesGroup = (
    <RadioButtonGroup key={'view-type'} title={t('selectLanguage') + ':'}>
      {mappedLanguages}
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
        title={t('configureLanguage')}
        items={[languagesGroup]}
        hasBottomBorder={false}
      />
    </SafeAreaView>
  );
};

export default ConfigureLanguageScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
  },
});
