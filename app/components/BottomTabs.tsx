import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={WelcomeScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
