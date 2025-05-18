import {Picker} from '@react-native-picker/picker';
import {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {updateAppSettings} from '../../api/settings';

const days = [
  {
    label: 'Sunday',
    value: 'sunday',
  },
  {
    label: 'Monday',
    value: 'monday',
  },
];

interface AppSettings {
  weekStartsOn: 'sunday' | 'monday';
  userId: number;
}

function AppSettingsComponent({weekStartsOn, userId}: AppSettings) {
  const [newWeekStarts, setNewWeekStarts] = useState(weekStartsOn);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    setNewWeekStarts(weekStartsOn);
  }, [weekStartsOn]);

  const onWeekStartsSave = async () => {
    await updateAppSettings(userId, newWeekStarts);
    setIsPickerVisible(false);
  };

  const onCancel = () => {
    setIsPickerVisible(false);
    setNewWeekStarts(weekStartsOn);
  };

  return (
    <View>
      <Text style={styles.buttonLabel}>Week Begins On</Text>

      {!isPickerVisible && (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsPickerVisible(true)}>
            <Text style={styles.buttonText}>{`${newWeekStarts} >`}</Text>
          </TouchableOpacity>
        </View>
      )}
      {isPickerVisible && (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={newWeekStarts}
            style={styles.picker}
            onValueChange={value => setNewWeekStarts(value)}>
            {days.map((day, index) => {
              return (
                <Picker.Item label={day.label} value={day.value} key={index} />
              );
            })}
          </Picker>

          <Button title={'Save'} onPress={() => onWeekStartsSave()} />
          <Button title={'Cancel'} onPress={() => onCancel()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLabel: {
    fontWeight: 200,
    marginBottom: 4,
  },
  buttonWrapper: {
    alignItems: 'flex-start',
    marginLeft: -8,
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
  pickerWrapper: {
    marginTop: -50,
  },
  picker: {
    height: 160,
  },
});

export default AppSettingsComponent;
