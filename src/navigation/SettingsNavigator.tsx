import {createStackNavigator} from '@react-navigation/stack';
import {AppRoute} from '../enums/routes';
import SettingsScreen from '../screens/SettingsScreen';

export type SettingsStackNavigatorParams = {
  [AppRoute.SETTINGS]: {testid: string};
};

const SettingsStack = createStackNavigator<SettingsStackNavigatorParams>();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={AppRoute.SETTINGS}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
