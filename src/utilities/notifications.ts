import messaging from '@react-native-firebase/messaging';

export const FcmRequestUserPermission = async () => {
  try {
    return await messaging().requestPermission();
  } catch (e: any) {
    console.log(e.message);
  }
};
