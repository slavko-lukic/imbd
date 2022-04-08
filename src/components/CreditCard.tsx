import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {IMAGE_BASE_URL} from '../constants/api';
import {cardShadowStyle} from '../constants/styling';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import {composeDetailedMovie} from '../utilities/movies';
import {composePerson} from '../utilities/people';
import LoadingOverlay from './LoadingOverlay';

const placeholderImage = require('../assets/images/profile_placeholder.png');

type RootScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.PERSON
>;
interface CreditCardProps {
  name: string;
  picture: string;
  role: string;
  id: number;
  type: 'movie' | 'person';
}

const CreditCard: FC<CreditCardProps> = ({name, role, picture, id, type}) => {
  const {surfaceVariantStyle, foregroundStyle, accentColorForegroundStyle} =
    useColorTheme();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootScreenProp>();

  const goToPerson = async () => {
    setLoading(true);
    const person = await composePerson(id);
    if (!person) {
      setLoading(false);
      Alert.alert(
        'Network Error',
        'Failed to fetch person details. Check your internet connection.',
      );
      return;
    }
    navigation.navigate(AppRoute.PERSON, person);
    setLoading(false);
  };

  const goToMovie = async () => {
    setLoading(true);
    const detailedMovie = await composeDetailedMovie(id);
    if (!detailedMovie) {
      setLoading(false);
      Alert.alert(
        'Network Error',
        'Failed to fetch movie details. Check your internet connection.',
      );
      return;
    }
    navigation.navigate(AppRoute.MOVIE, detailedMovie);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={type === 'movie' ? () => goToMovie() : () => goToPerson()}
      style={[styles.cardContainer, surfaceVariantStyle, cardShadowStyle]}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={
          picture
            ? {
                uri: IMAGE_BASE_URL + picture,
              }
            : placeholderImage
        }
      />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          style={[accentColorForegroundStyle, {flexWrap: 'wrap'}]}>
          {name}
        </Text>
        <Text
          style={[foregroundStyle, {flexWrap: 'wrap', marginHorizontal: 4}]}>
          -
        </Text>
        <Text
          numberOfLines={1}
          style={[foregroundStyle, {flex: 1, flexWrap: 'wrap'}]}>
          {role}
        </Text>
      </View>
      {loading ? <LoadingOverlay /> : null}
    </TouchableWithoutFeedback>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,

    marginBottom: 10,
    height: 60,
    borderRadius: 5,
  },
  image: {
    width: 40,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
  },
});
