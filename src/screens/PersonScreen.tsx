import {StackScreenProps} from '@react-navigation/stack';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreditGroup from '../components/CreditGroup';
import MainHeader from '../components/MainHeader';
import {IMAGE_BASE_URL} from '../constants/api';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {cardShadowStyle} from '../constants/styling';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';

type PersonScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.PERSON
>;

const placeholderImage = require('../assets/images/profile_placeholder.png');

const PersonScreen: FC<PersonScreenProps> = ({route, navigation}) => {
  const person = route.params;

  const {
    surfaceStyle,
    primaryVariantColorForegroundStyle,
    colorTheme,
    accentVariantColorForegroundStyle,
    foregroundStyle,
    foregroundVariantStyle,
    primaryColorForegroundStyle,
  } = useColorTheme();

  const [isHeaderTitleShown, setIsHeaderTitleShown] = useState(false);
  const [isFullBio, setIsFullBio] = useState(false);

  const headerTitleOpacity = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    headerTitleOpacity.value = isHeaderTitleShown
      ? withTiming(1)
      : withTiming(0);
  }, [isHeaderTitleShown]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;

      e.contentOffset.y > 40
        ? runOnJS(setIsHeaderTitleShown)(true)
        : runOnJS(setIsHeaderTitleShown)(false);
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {opacity: headerTitleOpacity.value};
  }, []);

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );

  const headerMiddleElement: JSX.Element = (
    <Animated.Text
      numberOfLines={1}
      style={[
        {fontSize: 17},
        primaryVariantColorForegroundStyle,
        headerAnimatedStyle,
      ]}>
      {person.name}
    </Animated.Text>
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.screenContaner, surfaceStyle]}>
      <MainHeader
        middleElement={headerMiddleElement}
        leftButton={headerLeftButton}
      />
      <Animated.ScrollView
        contentContainerStyle={{padding: 20}}
        scrollEventThrottle={10}
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.basicInfoContainer}>
          <View style={cardShadowStyle}>
            <Image
              style={[styles.image]}
              source={
                person.profile_path
                  ? {
                      uri: IMAGE_BASE_URL + person.profile_path,
                    }
                  : placeholderImage
              }
            />
          </View>

          <View style={styles.detailsContainer}>
            <Text style={[{fontSize: 24}, primaryVariantColorForegroundStyle]}>
              {person.name}
            </Text>

            <Text style={[{marginTop: 5}, foregroundVariantStyle]}>
              <Text style={[accentVariantColorForegroundStyle]}>
                Birthday:{' '}
              </Text>
              {moment(person.birthday).format('LL')}
            </Text>

            <Text style={[{marginTop: 5}, foregroundVariantStyle]}>
              <Text style={[accentVariantColorForegroundStyle]}>
                Birthplace:{' '}
              </Text>
              {person.place_of_birth}
            </Text>

            <Text style={[{marginTop: 5}, foregroundVariantStyle]}>
              <Text style={[accentVariantColorForegroundStyle]}>
                Best known for:{' '}
              </Text>
              {person.known_for_department}
            </Text>

            <Text
              numberOfLines={isFullBio ? undefined : 5}
              style={[{marginTop: 5}, foregroundStyle]}>
              <Text style={[accentVariantColorForegroundStyle]}>Bio: </Text>
              {person.biography}
            </Text>

            <Text
              onPress={() => setIsFullBio(prev => !prev)}
              style={[{marginTop: 10}, primaryColorForegroundStyle]}>
              {isFullBio ? 'Read less...' : 'Read more...'}
            </Text>
          </View>
        </View>

        {/* cast */}
        <View style={styles.castMembersContainer}>
          <CreditGroup
            itemsDisplayLimit={8}
            groupName="Cast"
            items={person.cast}
          />
        </View>

        {/* crew */}
        <View style={styles.crewMembersContainer}>
          <CreditGroup
            itemsDisplayLimit={6}
            groupName="Crew"
            items={person.crew}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  basicInfoContainer: {
    flexDirection: 'row',
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  image: {
    width: undefined,
    height: 200,
    aspectRatio: 0.67 / 1,
    borderRadius: 10,
  },
  castMembersContainer: {
    marginTop: 20,
  },
  crewMembersContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});
