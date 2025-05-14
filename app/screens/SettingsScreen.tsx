import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContext} from '../../App';
import AccountSettingsComponent from '../components/settings/AccountSettingsComponent';
import AppSettingsComponent from '../components/settings/AppSettingsComponent';
import NotificationSettingsComponent from '../components/settings/NotificationSettingsComponent';

function SettingsScreen() {
  const {signOut} = useContext(AuthContext);
  const accountSettings = {
    email: 'Robert@gmail.com',
  };
  const appSettings = {
    weekStartsOn: 'Monday',
  };
  const notificationSettings = {
    isEnabled: true,
    reminderTime: '21:00',
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <AccountSettingsComponent accountSettings={accountSettings} />
          <AppSettingsComponent appSettings={appSettings} />
          <NotificationSettingsComponent
            notificationSettings={notificationSettings}
          />
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    padding: 24,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 200,
  },
});

export default SettingsScreen;
