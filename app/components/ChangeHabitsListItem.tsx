import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Habit} from '../types/types';

interface ChangeHabitsListItemProps {
  habit: Habit;
  onDrag: Function;
}

function ChangeHabitsListItem(props: ChangeHabitsListItemProps) {
  const [habitName, setHabitName] = useState<string>(props.habit.name);

  const onUpdateHabitName = (updatedName: string) => {
    // TODO: Update habit name
    console.log('UPDATED NAME', updatedName);
  };

  return (
    <View style={styles.habitWrapper} key={props.habit.id}>
      <TextInput
        style={styles.habitName}
        value={habitName}
        onChangeText={setHabitName}
      />

      <IconButton
        style={styles.icon}
        icon="menu"
        iconColor={'lightgray'}
        size={48}
        onLongPress={props.onDrag()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deleteHabitButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    paddingBottom: '5%',
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

export default ChangeHabitsListItem;
