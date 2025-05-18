import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AccountSettingsComponent from '../components/settings/AccountSettingsComponent';
import AppSettingsComponent from '../components/settings/AppSettingsComponent';
import NotificationSettingsComponent from '../components/settings/NotificationSettingsComponent';
import {getUserId} from '../api/auth';
import {fetchSettings} from '../api/settings';
import {getUser} from '../api/user';
import AboutComponent from '../components/settings/About';

function SettingsScreen() {
  const [userId, setUserId] = useState(0);
  const [newEmail, setNewEmail] = useState('');
  const [newWeekStartsOn, setNewWeekStartsOn] = useState('');
  const [newEnableNotifications, setNewEnableNotifications] = useState(false);
  const [newReminderTime, setNewReminderTime] = useState('21:00');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getUserId();
        if (id) {
          setUserId(id);
        }

        if (userId) {
          const {weekStartsOn, enableNotifications, reminderTime} =
            await fetchSettings(userId);
          const {email} = await getUser(userId);

          setNewEmail(email);
          setNewWeekStartsOn(weekStartsOn);
          setNewEnableNotifications(enableNotifications);
          setNewReminderTime(reminderTime);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Account</Text>
            <View style={styles.sectionContent}>
              <AccountSettingsComponent email={newEmail} userId={userId} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Application</Text>
            <View style={styles.sectionContent}>
              <AppSettingsComponent
                weekStartsOn={newWeekStartsOn}
                userId={userId}
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Notifications</Text>
            <View style={styles.sectionContent}>
              <NotificationSettingsComponent
                enableNotifications={newEnableNotifications}
                reminderTime={newReminderTime}
                userId={userId}
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>About</Text>
            <View style={styles.sectionContent}>
              <AboutComponent />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
  },
  card: {
    borderRadius: 16,
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  sectionContent: {
    padding: '5%',
  },
  sectionHeader: {
    fontSize: 30,
    fontWeight: 200,
    paddingTop: '5%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

export default SettingsScreen;
