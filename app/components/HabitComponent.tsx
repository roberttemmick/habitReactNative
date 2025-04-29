import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
}): React.JSX.Element {
  const [isComplete, setIsComplete] = React.useState<boolean | null>(completed);

  React.useEffect(() => {
    setIsComplete(completed);
  }, [completed]);

  const handleCompleteStateChange = async (completeState: boolean) => {
    setIsComplete(completeState);

    try {
      await updateHabitEntry(id, completeState);
    } catch (err) {
      console.log('ERROR', err);
      // TODO: Handle error
    }

    emitCompletedStateChangeEvent(id, completeState);
  };

  return (
    <View style={styles.habitWrapper}>
      <Text style={styles.habitName} numberOfLines={2}>
        {name}
      </Text>
      <View style={styles.buttonWrapper}>
        <IconButton
          style={styles.icon}
          icon="window-close"
          iconColor={isComplete === false ? 'darkred' : 'gray'}
          size={48}
          onPress={() => handleCompleteStateChange(false)}
        />

        <IconButton
          style={styles.icon}
          icon="check"
          iconColor={isComplete ? 'green' : 'gray'}
          size={48}
          onPress={() => handleCompleteStateChange(true)}
        />
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

export default HabitComponent;
