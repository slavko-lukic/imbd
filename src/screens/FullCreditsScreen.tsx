import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useCallback} from 'react';
import {StyleSheet, ListRenderItem, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MiniHeader from '../components/MiniHeader';
import CreditCard from '../components/CreditCard';
import VerticalSpacing from '../components/VerticalSpacing';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {cardOnlyTopShadow} from '../constants/styling';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {MovieCast, MovieCrew, PersonCast, PersonCrew} from '../models';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';

type FullCreditsScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.FULL_CREDITS
>;

const FullCreditsScreen: FC<FullCreditsScreenProps> = ({route, navigation}) => {
  const items = route.params.items;
  const groupName = route.params.groupName;

  const {surfaceStyle, colorTheme, primaryVariantColorForegroundStyle} =
    useColorTheme();

  const getRole = (
    credit: MovieCast | MovieCrew | PersonCast | PersonCrew,
  ): string => {
    if ('job' in credit) {
      return credit.job;
    }
    return credit.character;
  };

  const getType = (
    credit: MovieCast | MovieCrew | PersonCast | PersonCrew,
  ): 'person' | 'movie' => {
    if ('name' in credit) {
      return 'person';
    }
    return 'movie';
  };

  const getName = (
    credit: MovieCast | MovieCrew | PersonCast | PersonCrew,
  ): string => {
    if ('name' in credit) {
      return credit.name;
    }
    return credit.title;
  };

  const getPicture = (
    credit: MovieCast | MovieCrew | PersonCast | PersonCrew,
  ): string => {
    if ('profile_path' in credit) {
      return credit.profile_path;
    }
    return credit.poster_path;
  };

  const goBack = () => {
    navigation.pop();
  };

  const renderItem: ListRenderItem<
    MovieCast | MovieCrew | PersonCast | PersonCrew
  > = useCallback(
    ({item}) => (
      <CreditCard
        key={item.credit_id}
        id={item.id}
        type={getType(item)}
        name={getName(item)}
        picture={getPicture(item)}
        role={getRole(item)}
      />
    ),
    [items],
  );

  const keyExtractor = (item: MovieCast | MovieCrew) => {
    return item.credit_id + getRole(item);
  };

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="close"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );

  const headerMiddleElement: JSX.Element = (
    <Text
      numberOfLines={1}
      style={[{fontSize: 17}, primaryVariantColorForegroundStyle]}>
      All {groupName} ({items.length})
    </Text>
  );

  return (
    <View style={[styles.container, cardOnlyTopShadow, surfaceStyle]}>
      <MiniHeader
        middleElement={headerMiddleElement}
        leftButton={headerLeftButton}
      />
      <FlatList
        initialNumToRender={20}
        maxToRenderPerBatch={50}
        style={styles.list}
        data={items as Array<MovieCast | MovieCrew>}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={<VerticalSpacing spacing={60} />}
        ListHeaderComponent={<VerticalSpacing spacing={20} />}
      />
    </View>
  );
};

export default FullCreditsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',

    marginTop: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  list: {
    paddingHorizontal: 20,
  },
});
