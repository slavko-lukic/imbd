import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {MovieCast, MovieCrew} from '../models';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import MovieCreditCard from './MovieCreditCard';

type MovieScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.FULL_CREDITS
>;

interface CreditGroupProps {
  groupName: string;
  items: MovieCast[] | MovieCrew[];
  itemsDisplayLimit?: number;
}

const CreditGroup: FC<CreditGroupProps> = ({
  groupName,
  items,
  itemsDisplayLimit,
}) => {
  const navigation = useNavigation<MovieScreenProp>();
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
    useColorTheme();

  const getRole = (credit: MovieCast | MovieCrew): string => {
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
