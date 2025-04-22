import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

function AddHabitComponent() {
  const handleAddHabit = () => {};

  return (
    <View style={styles.habitWrapper}>
      <Text style={styles.habitName} numberOfLines={2}>
        New Habit
      </Text>
      <View style={styles.buttonWrapper}>
        <Button title="Add" onPress={() => handleAddHabit()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitName: {
    fontSize: 24,
    fontWeight: 200,
    width: '60%',
  },
  habitWrapper: {
    borderRadius: 16,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 16,
    marginBottom: 16,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 0,
  },
});

export default AddHabitComponent;
