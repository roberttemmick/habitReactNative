import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

function HabitComponent({
  name,
  completed,
}: {
  name: string;
  completed: boolean | null;
}): React.JSX.Element {
  const [isComplete, setIsComplete] = React.useState<boolean | null>(completed);

  const handleCompleteStateChange = (completeState: boolean) => {
    setIsComplete(completeState);
    console.log('IS COMPLETE', completeState);
    // TODO
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
