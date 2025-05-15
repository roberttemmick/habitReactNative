import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AccountSettingsComponent from '../components/settings/AccountSettingsComponent';
import AppSettingsComponent from '../components/settings/AppSettingsComponent';
import NotificationSettingsComponent from '../components/settings/NotificationSettingsComponent';
import {getUserId} from '../api/auth';
import {fetchSettings} from '../api/settings';
import {getUser} from '../api/user';

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
          <AccountSettingsComponent email={newEmail} userId={userId} />
          <AppSettingsComponent
            weekStartsOn={newWeekStartsOn}
            userId={userId}
          />
          <NotificationSettingsComponent
            enableNotifications={newEnableNotifications}
            reminderTime={newReminderTime}
            userId={userId}
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
