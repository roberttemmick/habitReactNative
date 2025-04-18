import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

function Habit({
  name,
  completed,
}: {
  name: string;
  completed: boolean | null;
}): React.JSX.Element {
  const handleComplete = () => {
    // TODO
    console.log('COMPLETE');
    completed = true;
  };

  const handleIncomplete = () => {
    // TODO
    console.log('INCOMPLETE');
    completed = false;
  };

  return (
    <View style={styles.habitWrapper}>
      <Text style={styles.habitName}>{name}</Text>
      <View style={styles.buttonWrapper}>
        <IconButton
          icon="window-close"
          iconColor={completed === false ? 'darkred' : 'gray'}
          size={48}
          onPress={() => handleIncomplete}
        />

        <IconButton
          icon="check"
          iconColor={completed ? 'green' : 'gray'}
          size={48}
          onPress={() => handleComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  habitName: {
    fontSize: 24,
    fontWeight: 200,
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

export default Habit;
