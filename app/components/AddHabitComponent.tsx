import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

function AddHabitComponent({
  addHabitEventEmitter,
}: {
  addHabitEventEmitter: Function;
}) {
  const handleAddHabit = () => {
    // TODO: create form

    const newHabit = {
      id: Math.random(),
      name: 'new habit',
    };

    addHabitEventEmitter(newHabit);
  };

  return (
    <View style={styles.habitWrapper}>
      <Text style={styles.habitName} numberOfLines={2}>
        New Habit
      </Text>
      <Button title="Add" onPress={() => handleAddHabit()} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default AddHabitComponent;
