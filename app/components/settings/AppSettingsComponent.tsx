import {Picker} from '@react-native-picker/picker';
import {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {updateAppSettings} from '../../api/settings';
import {SettingsContext} from '../../../App';

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

const colors = [
  {
    label: 'Blush Rose',
    value: '#E2C6C2',
  },
  {
    label: 'Butter Cream',
    value: '#FAF2D3',
  },
  {
    label: 'Champagne Beige',
    value: '#EFE5DA',
  },
  {
    label: 'Deep Forest',
    value: '#3D4A40',
  },
  {
    label: 'Dusty Blue',
    value: '#C9D9DF',
  },
  {
    label: 'Ivory',
    value: '#F8F9F7',
  },
  {
    label: 'Lavender Fog',
    value: '#DCD6E0',
  },
  {
    label: 'Moss Grey',
    value: '#A8B0A2',
  },
  {
    label: 'Muted Clay',
    value: '#C8A89E',
  },
  {
    label: 'Pale Lemon',
    value: '#F5F3CB',
  },
  {
    label: 'Pebble Grey',
    value: '#DADBD6',
  },
  {
    label: 'Sage',
    value: '#CBD5C8',
  },
  {
    label: 'Slate Mist',
    value: '#A0A8AF',
  },
  {
    label: 'Terracotta Dust',
    value: '#D7A894',
  },
  {
    label: 'Warm Taupe',
    value: '#D8CFC4',
  },
  {
    label: 'Willow Green',
    value: '#B6C2AE',
  },
];

interface AppSettings {
  weekStartsOn: 'sunday' | 'monday';
  backgroundColor: string;
  userId: number;
}

function AppSettingsComponent({
  weekStartsOn,
  backgroundColor,
  userId,
}: AppSettings) {
  const [newWeekStarts, setNewWeekStarts] = useState(weekStartsOn);
  const [isWeekStartsOnPickerVisible, setIsWeekStartsOnPickerVisible] =
    useState(false);
  const [selectedBackground, setSelectedBackground] = useState(backgroundColor);
  const [isBackgroundPickerVisible, setIsBackgroundPickerVisible] =
    useState(false);

  const {refreshSettings} = useContext(SettingsContext);

  useEffect(() => {
    setNewWeekStarts(weekStartsOn);
  }, [weekStartsOn]);

  const onWeekStartsSave = async () => {
    await updateAppSettings(userId, newWeekStarts, selectedBackground);
    setIsWeekStartsOnPickerVisible(false);
  };

  const onWeekStartsOnCancel = () => {
    setIsWeekStartsOnPickerVisible(false);
    setNewWeekStarts(weekStartsOn);
  };

  const onSelectBackground = async (value: any) => {
    refreshSettings({backgroundColor: value});
    setSelectedBackground(value);
  };

  const onBackgroundSave = async () => {
    await updateAppSettings(userId, newWeekStarts, selectedBackground);
    setIsBackgroundPickerVisible(false);
  };

  const onBackgroundCancel = () => {
    refreshSettings({backgroundColor});
    setSelectedBackground(backgroundColor);
    setIsBackgroundPickerVisible(false);
  };

  const getBackgroundLabel = (): string => {
    const color = colors.find(c => {
      return c.value === selectedBackground;
    });
    return color ? color.label : '';
  };

  return (
    <View>
      <View>
        <Text style={styles.buttonLabel}>Week Begins On</Text>

        {!isWeekStartsOnPickerVisible && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsWeekStartsOnPickerVisible(true)}>
              <Text style={styles.buttonText}>{`${
                newWeekStarts.charAt(0).toUpperCase() + newWeekStarts.slice(1)
              } >`}</Text>
            </TouchableOpacity>
          </View>
        )}
        {isWeekStartsOnPickerVisible && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={newWeekStarts}
              style={styles.picker}
              onValueChange={value => setNewWeekStarts(value)}>
              {days.map((day, index) => {
                return (
                  <Picker.Item
                    label={day.label}
                    value={day.value}
                    key={index}
                  />
                );
              })}
            </Picker>

            <Button title={'Save'} onPress={() => onWeekStartsSave()} />
            <Button title={'Cancel'} onPress={() => onWeekStartsOnCancel()} />
          </View>
        )}
      </View>

      <View>
        <Text style={styles.buttonLabel}>Background</Text>

        {!isBackgroundPickerVisible && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsBackgroundPickerVisible(true)}>
              <Text
                style={styles.buttonText}>{`${getBackgroundLabel()} >`}</Text>
            </TouchableOpacity>
          </View>
        )}
        {isBackgroundPickerVisible && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedBackground}
              onValueChange={value => onSelectBackground(value)}>
              {colors.map((color, index) => {
                return (
                  <Picker.Item
                    label={color.label}
                    value={color.value}
                    key={index}
                  />
                );
              })}
            </Picker>

            <Button title={'Save'} onPress={() => onBackgroundSave()} />
            <Button title={'Cancel'} onPress={() => onBackgroundCancel()} />
          </View>
        )}
      </View>
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
    marginBottom: 12,
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
