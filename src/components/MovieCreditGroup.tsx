import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Cast, Crew} from '../models';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import MovieCreditCard from './MovieCreditCard';

type MovieScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.FULL_CREDITS
>;

interface MovieCreditGroupProps {
  groupName: string;
  items: Cast[] | Crew[];
  itemsDisplayLimit?: number;
}

const MovieCreditGroup: FC<MovieCreditGroupProps> = ({
  groupName,
  items,
  itemsDisplayLimit,
}) => {
  const navigation = useNavigation<MovieScreenProp>();
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
    useColorTheme();

  const getRole = (credit: Cast | Crew): string => {
    if ('job' in credit) {
      return credit.job;
    }
    return credit.character;
  };

  const goToFullCreditsList = () => {
    navigation.navigate(AppRoute.FULL_CREDITS, {
      items: items,
      groupName: groupName,
    });
  };

  const movieCreditCards = items.slice(0, itemsDisplayLimit).map(credit => {
    return (
      <MovieCreditCard
        key={credit.credit_id}
        name={credit.name}
        picture={credit.profile_path}
        role={getRole(credit)}
      />
    );
  });

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[{fontSize: 16}, foregroundVariantStyle]}>
          {groupName} ({items.length})
        </Text>
        {itemsDisplayLimit ? (
          <Text
            onPress={goToFullCreditsList}
            style={[accentVariantColorForegroundStyle]}>
            View All
          </Text>
        ) : null}
      </View>
      {movieCreditCards}
    </>
  );
};

export default MovieCreditGroup;

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
});
