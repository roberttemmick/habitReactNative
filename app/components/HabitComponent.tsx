import {JSX, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {updateHabitEntry} from '../api/habitEntries';

function HabitComponent({
  id,
  name,
  completed,
  emitCompletedStateChangeEvent,
}: {
  id: number;
  name: string;
  completed: boolean | null;
  emitCompletedStateChangeEvent: Function;
}): JSX.Element {
  const [isComplete, setIsComplete] = useState<boolean | null>(completed);

  useEffect(() => {
    setIsComplete(completed);
  }, [completed]);

  const handleCompleteStateChange = async (completeState: boolean) => {
    setIsComplete(completeState);

    try {
      await updateHabitEntry(id, completeState);
    } catch (err) {
      console.log(err);
    }

    emitCompletedStateChangeEvent(id, completeState);
  };

  return (
    <View style={styles.habitWrapper}>
      <Text style={styles.habitName} numberOfLines={2}>
        {name}
      </Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={
            isComplete === false
              ? [styles.completeStateButton, styles.activeCloseButton]
              : styles.completeStateButton
          }
          onPress={() => handleCompleteStateChange(false)}>
          <IconButton
            style={styles.icon}
            icon="window-close"
            iconColor={isComplete === false ? 'white' : 'gray'}
            size={48}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={
            isComplete
              ? [styles.completeStateButton, styles.activeCheckButton]
              : styles.completeStateButton
          }
          onPress={() => handleCompleteStateChange(true)}>
          <IconButton
            style={styles.icon}
            icon="check"
            iconColor={isComplete ? 'white' : 'gray'}
            size={48}
          />
        </TouchableOpacity>
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
  completeStateButton: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCloseButton: {
    backgroundColor: 'darkred',
  },
  activeCheckButton: {
    backgroundColor: 'green',
  },
  habitWrapper: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 16,
    paddingLeft: 16,
    marginBottom: 16,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  icon: {
    margin: 0,
  },
});

export default HabitComponent;
