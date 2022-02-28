import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>This is Profile Screen.</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
