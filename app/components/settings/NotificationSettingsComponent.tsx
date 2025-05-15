import {useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {TimePickerModal} from 'react-native-paper-dates';

interface NotificationSettings {
  notificationSettings: {
    isEnabled: boolean;
    reminderTime: string;
  };
}

function NotificationSettingsComponent({
  notificationSettings,
}: NotificationSettings) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(
    notificationSettings.isEnabled,
  );
  const [isChangeTimeButtonVisible, setIsChangeTimeButtonVisible] =
    useState(false);
  const [reminderTime, setReminderTime] = useState(
    notificationSettings.reminderTime,
  );

  const onIsNotificationsEnabledSwitchToggle = (
    updatedEnabledState: boolean,
  ) => {
    setIsNotificationsEnabled(updatedEnabledState);
    // TODO: Call API
  };

  const onReminderTimeChange = (hour: number, minutes: number) => {
    const formattedTime = `${hour}:${minutes}`;
    setReminderTime(formattedTime);
    // TODO: Call API
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
            value={isNotificationsEnabled}
          />

          <TouchableOpacity
            style={styles.iconButton}
            disabled={!isNotificationsEnabled}
            onPress={() => setIsChangeTimeButtonVisible(true)}>
            <Text style={styles.buttonText}>{`${reminderTime} >`}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TimePickerModal
        visible={isChangeTimeButtonVisible}
        onDismiss={() => {
          setIsChangeTimeButtonVisible(false);
        }}
        onConfirm={(hoursAndMinutes: {hours: number; minutes: number}) => {
          onReminderTimeChange(hoursAndMinutes.hours, hoursAndMinutes.minutes);
        }}
      />
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

export default NotificationSettingsComponent;
