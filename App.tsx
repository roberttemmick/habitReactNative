import React from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import {useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomTabs from './app/components/BottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const safePadding = '5%';

  return (
    <NavigationContainer>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          paddingHorizontal: safePadding,
          paddingBottom: safePadding,
        }}>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        <BottomTabs />
      </View>
    </NavigationContainer>
  );
}

export default App;
