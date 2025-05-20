import {Alert, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserId, login, logout, signup} from './app/api/auth';
import HomeScreen from './app/screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './app/screens/SettingsScreen';
import ChangeHabitsScreen from './app/screens/ChangeHabitsScreen';
import LoginScreen from './app/screens/LoginScreen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {fetchSettings} from './app/api/settings';

export const AuthContext = createContext({
  signOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: ({email, password}: {email: string; password: string}) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp: ({email, password}: {email: string; password: string}) => {},
});

const SignInContext = createContext(false);

export const SettingsContext = createContext({
  settings: {backgroundColor: '#F8F9F7'},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refreshSettings: async (newSettings: any) => {
  },
});

function useIsSignedIn(): boolean {
  const isSignedIn = useContext(SignInContext);
  return isSignedIn;
}

function useIsSignedOut() {
  return !useIsSignedIn();
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const RootStack = createBottomTabNavigator({
  screenOptions: ({route}) => ({
    tabBarIcon: () => {
      let iconName: any = '';

      if (route.name === 'Home') {
        iconName = 'calendar-outline';
      } else if (route.name === 'Change Habits') {
        iconName = 'list-status';
      } else if (route.name === 'Settings') {
        iconName = 'cog-outline';
      }

      return <IconButton icon={iconName} size={28} />;
    },
    tabBarActiveTintColor: 'darkred',
    tabBarInactiveTintColor: 'gray',
  }),
  screens: {
    Home: {
      if: useIsSignedIn,
      screen: HomeScreen,
    },
    Login: {
      if: useIsSignedOut,
      screen: LoginScreen,
      options: {
        title: '',
      },
    },
    'Change Habits': {
      if: useIsSignedIn,
      screen: ChangeHabitsScreen,
    },
  },
});

function RootTabs() {
  const isSignedIn = useIsSignedIn();

  return (
    <RootStack.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'darkred',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      {isSignedIn && (
        <>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => (
                <IconButton icon="calendar-outline" size={28} />
              ),
            }}
          />
          <RootStack.Screen
            name="Change Habits"
            component={ChangeHabitsScreen}
            options={{
              tabBarIcon: () => {
                return <IconButton icon="list-status" size={28} />;
              },
            }}
          />
          <RootStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => {
                return <IconButton icon="cog-outline" size={28} />;
              },
            }}
          />
        </>
      )}
      {!isSignedIn && (
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: ''}}
        />
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            authToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            authToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            authToken: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            authToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      authToken: null,
    },
  );

  const [settings, setSettings] = useState({backgroundColor: '#F8F9F7'});

  const refreshSettings = useCallback(async (newSettings: any) => {
    setSettings(newSettings);
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let authToken;

      try {
        authToken = await AsyncStorage.getItem('authToken');
      } catch (e) {
        console.log('Auth Token restoration failed: ', e);
      }

      dispatch({type: 'RESTORE_TOKEN', token: authToken});
    };

    const getSettings = async () => {
      try {
        const userId = await getUserId();
        if (userId) {
          const newSettings = await fetchSettings(userId);
          refreshSettings(newSettings);
        }
      } catch (e) {
        console.log('Failed to fetch settings: ', e);
      }
    };

    bootstrapAsync();
    getSettings();
  }, [refreshSettings]);

  const authContext = useMemo(
    () => ({
      signIn: async ({email, password}: {email: string; password: string}) => {
        try {
          const token = await login(email, password);
          dispatch({type: 'SIGN_IN', token});
        } catch (err: any) {
          if (err.status === 401) {
            Alert.alert('Email or password is incorrect');
          }
          console.log('Log in error: ', err.status);
        }
      },
      signOut: async () => {
        try {
          await logout();
          dispatch({type: 'SIGN_OUT'});
        } catch (err) {
          console.log('Logout error: ', err);
        }
      },
      signUp: async ({email, password}: {email: string; password: string}) => {
        try {
          const token = await signup(email, password);
          dispatch({type: 'SIGN_UP', token});
        } catch (err) {
          console.log('Signup error: ', err);
        }
      },
    }),
    [],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  const isSignedIn = state.authToken != null;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: settings?.backgroundColor,
      primary: 'darkred',
    },
  };

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <SignInContext.Provider value={isSignedIn}>
          <SettingsContext value={{settings, refreshSettings}}>
            <NavigationContainer theme={MyTheme}>
              <SafeAreaContainer backgroundColor={settings?.backgroundColor} />
            </NavigationContainer>
          </SettingsContext>
        </SignInContext.Provider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

function SafeAreaContainer({backgroundColor}: {backgroundColor: string}) {
  const inset = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      paddingTop: inset.top,
      backgroundColor: backgroundColor,
    },
  });

  return (
    <View style={styles.container}>
      <RootTabs />
    </View>
  );
}
