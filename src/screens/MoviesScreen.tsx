import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import colors from '../constants/colors';

const MoviesScreen = () => {
  // const queryParams = new URLSearchParams({
  //   api_key: 'e0966f5c25707b5d4f4f5a1670429967',
  //   language: 'en-US',
  //   page: '1',
  // });
  // const {response} = useAxiosFetch('/popular', queryParams);

  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colors.BACKGROUND, flex: 1, height: '100%'}}>
      <MainHeader />
      <Text>This is Movies Screen.</Text>
    </SafeAreaView>
  );
};

export default MoviesScreen;
