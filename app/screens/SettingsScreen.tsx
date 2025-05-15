import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AccountSettingsComponent from '../components/settings/AccountSettingsComponent';
import AppSettingsComponent from '../components/settings/AppSettingsComponent';
import NotificationSettingsComponent from '../components/settings/NotificationSettingsComponent';

function SettingsScreen() {
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
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
  },
});

export default SettingsScreen;
