import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';

function AddHabitComponent({
  addHabitEventEmitter,
}: {
  addHabitEventEmitter: Function;
}) {
  const [newHabitName, setNewHabitName] = React.useState<string>('');

  const handleAddHabit = () => {
    addHabitEventEmitter(newHabitName);

    setNewHabitName('');
  };

  return (
    <View style={styles.habitWrapper}>
      <TextInput
        style={styles.habitName}
        value={newHabitName}
        placeholder="New Habit"
        onChangeText={setNewHabitName}
      />
      <Button
        title="Add"
        onPress={() => handleAddHabit()}
        disabled={newHabitName.length === 0}
      />
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
