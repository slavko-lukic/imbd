import {useNavigation} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {IMAGE_BASE_URL} from '../constants/api';
import {cardShadowStyle} from '../constants/styling';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Person} from '../models';
import {axiosGet} from '../utilities/api';
import LoadingOverlay from './LoadingOverlay';

const placeholderImage = require('../assets/images/profile_placeholder.png');
interface MovieCreditCardProps {
  name: string;
  picture: string;
  role: string;
}

const MovieCreditCard: FC<MovieCreditCardProps> = ({name, role, picture}) => {
  const {surfaceVariantStyle, foregroundStyle, accentColorForegroundStyle} =
    useColorTheme();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const n = async () => {
    setLoading(true);
    const params = {
      api_key: 'e0966f5c25707b5d4f4f5a1670429967',
    };
    const personResponse = await axiosGet(`/person/${25072}`, params);
    const person: Person = personResponse.data;

    if (!person) {
      setLoading(false);
      Alert.alert(
        'Network Error',
        'Failed to fetch movied details. Check your internet connection.',
      );
      return;
    }

    navigation.navigate(AppRoute.PERSON, person);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={n}
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

export default MovieCreditCard;

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
