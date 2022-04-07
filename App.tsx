import {
  NavigationContainer,
  DarkTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import RootStackNavigator, {
  RootStackNavigatorParams,
} from './src/navigation/RootStackNavigator';
import {persistor, store} from './src/store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {LogBox} from 'react-native';
import {useBackgroundStateNotificationHandler} from './src/hooks/notifications/useBackgroundStateNotificationHandler';
import {composeDetailedMovie} from './src/utilities/movies';
import {AppRoute} from './src/enums/routes';
import {useBackgroundStateDynamicLinkHandler} from './src/hooks/dynamicLinks/useBackgroundStateDynamicLinkHandler';

const queryClient = new QueryClient();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const navigationRef = useNavigationContainerRef<RootStackNavigatorParams>();

  const goToMovie = async (movieId: number) => {
    const detailedMovie = await composeDetailedMovie(movieId);
    if (detailedMovie) navigationRef.navigate(AppRoute.MOVIE, detailedMovie);
  };

  useBackgroundStateNotificationHandler(remoteMessage => {
    if (!remoteMessage.data || !remoteMessage.data.id) return;

    goToMovie(parseInt(remoteMessage.data.id));
  });

  useBackgroundStateDynamicLinkHandler(dynamicLink => {
    if (!dynamicLink.url) return;

    goToMovie(parseInt(dynamicLink?.url.split('/').slice(-1)[0].split('-')[0]));
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={DarkTheme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootStackNavigator />
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
