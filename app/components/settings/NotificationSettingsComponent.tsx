import {useEffect, useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {DefaultTheme, Provider} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';
import {updateNotificationSettings} from '../../api/settings';

interface NotificationSettings {
  enableNotifications: boolean;
  reminderTime: string;
  userId: number;
}

function NotificationSettingsComponent({
  enableNotifications,
  reminderTime,
  userId,
}: NotificationSettings) {
  const [newEnableNotifications, setNewEnableNotifications] =
    useState(enableNotifications);
  const [isChangeTimeButtonVisible, setIsChangeTimeButtonVisible] =
    useState(false);
  const [newReminderTime, setNewReminderTime] = useState(reminderTime);

  useEffect(() => {
    setNewEnableNotifications(enableNotifications);
    setNewReminderTime(reminderTime);
  }, [enableNotifications, reminderTime]);

  const onIsNotificationsEnabledSwitchToggle = async (
    updatedEnabledState: boolean,
  ) => {
    setNewEnableNotifications(updatedEnabledState);
    await updateNotificationSettings(
      userId,
      updatedEnabledState,
      newReminderTime,
    );
  };

  const onReminderTimeChange = async (hour: number, minutes: number) => {
    const hourString = hour < 10 ? `0${hour}` : hour;
    const minuteString = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hourString}:${minuteString}`;
    setNewReminderTime(formattedTime);
    setIsChangeTimeButtonVisible(false);
    await updateNotificationSettings(
      userId,
      newEnableNotifications,
      formattedTime,
    );
  };

  const onModalDismiss = () => {
    setNewReminderTime(reminderTime);
    setIsChangeTimeButtonVisible(false);
  };

  return (
    <View>
      <Text style={styles.sectionHeader}>Notifications</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.buttonLabel}>Enable Notifications</Text>
        <View style={styles.notificationTimeContainer}>
          <Switch
            trackColor={{false: 'darkRed', true: 'green'}}
            onValueChange={onIsNotificationsEnabledSwitchToggle}
            value={newEnableNotifications}
          />

          <TouchableOpacity
            style={styles.iconButton}
            disabled={!newEnableNotifications}
            onPress={() => setIsChangeTimeButtonVisible(true)}>
            <Text style={styles.buttonText}>{`${newReminderTime} >`}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Provider theme={theme}>
        <TimePickerModal
          visible={isChangeTimeButtonVisible}
          onDismiss={() => onModalDismiss()}
          onConfirm={(hoursAndMinutes: {hours: number; minutes: number}) => {
            onReminderTimeChange(
              hoursAndMinutes.hours,
              hoursAndMinutes.minutes,
            );
          }}
        />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    padding: '5%',
  },
  sectionHeader: {
    fontSize: 30,
    fontWeight: 200,
    paddingTop: '5%',
  },
  buttonLabel: {
    fontWeight: 200,
    marginBottom: 4,
  },
  notificationTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 200,
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    primaryContainer: '#007AFF',
    onPrimary: 'white',
    onPrimaryContainer: '#007AFF',
    onSurface: 'rgba(0,0,0,0.3)',
    onSurfaceVariant: 'rgba(0,0,0,0.3)',
    outline: 'rgba(0,0,0,0.3)',
  },
};

export default NotificationSettingsComponent;
