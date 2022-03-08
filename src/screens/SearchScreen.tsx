import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import SearchBar from '../components/SearchBar';
import SpringInView from '../components/SpringInView';
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

  const middlePart: JSX.Element = <SearchBar />;

  const headerRightButton: JSX.Element = (
    <Ionicons
      key="search"
      name="search"
      color={colorTheme.primaryVariant}
      size={HEADER_ICON_SIZE}
      onPress={() => {
        console.log('search');
      }}
    />
  );
  const headerLeftButton: JSX.Element = (
    <SpringInView
      delay={700}
      offsetX={-100}
      springAnimationConfig={{damping: 12}}>
      <Ionicons
        key="close-circle-sharp"
        name="close-circle-sharp"
        color={colorTheme.foreground}
        size={HEADER_ICON_SIZE}
        onPress={() => navigation.pop()}
      />
    </SpringInView>
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContaner, backgroundStyle]}>
      <MainHeader
        leftButton={headerLeftButton}
        middleElement={middlePart}
        rightButtons={headerRightButton}
      />
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
