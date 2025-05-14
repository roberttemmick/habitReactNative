import {useState} from 'react';
import {Button, StyleSheet, Switch, Text, View} from 'react-native';
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
          <Button
            title={reminderTime}
            disabled={!isNotificationsEnabled}
            onPress={() => setIsChangeTimeButtonVisible(true)}
          />
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
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
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
});

export default NotificationSettingsComponent;
