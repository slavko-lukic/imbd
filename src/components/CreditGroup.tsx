import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {MovieCast, MovieCrew, PersonCast, PersonCrew} from '../models';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import CreditCard from './CreditCard';

type RootScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.FULL_CREDITS
>;

interface CreditGroupProps {
  groupName: string;
  items: MovieCast[] | MovieCrew[] | PersonCast[] | PersonCrew[];
  itemsDisplayLimit?: number;
}

const CreditGroup: FC<CreditGroupProps> = ({
  groupName,
  items,
  itemsDisplayLimit,
}) => {
  const navigation = useNavigation<RootScreenProp>();
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
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

  const goToFullCreditsList = () => {
    navigation.push(AppRoute.FULL_CREDITS, {
      items: items,
      groupName: groupName,
    });
  };

  const movieCreditCards = items.slice(0, itemsDisplayLimit).map(credit => {
    return (
      <CreditCard
        key={credit.credit_id}
        id={credit.id}
        type={getType(credit)}
        name={getName(credit)}
        picture={getPicture(credit)}
        role={getRole(credit)}
      />
    );
  });

  if (items.length <= 0) return null;

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

export default CreditGroup;

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
});
