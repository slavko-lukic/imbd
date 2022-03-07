import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';

type SearchScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.SEARCH
>;

const SearchScreen: FC<SearchScreenProps> = ({navigation}) => {
  const {backgroundStyle, colorTheme} = useColorTheme();

  const headerRightButtons: JSX.Element[] = [
    <Ionicons
      key="search"
      name="search"
      style={{marginLeft: 10}}
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={() => {
        navigation.navigate(AppRoute.SEARCH);
      }}
    />,
  ];
  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContaner, backgroundStyle]}>
      <MainHeader rightButtons={headerRightButtons} />
    </SafeAreaView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    height: '100%',
  },
});
