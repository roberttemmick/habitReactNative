import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Habit} from '../types/types';
import {IconButton} from 'react-native-paper';

function ChangeHabitsList({habits}: {habits: Habit[]}) {
  const handleMenuPress = () => {
    // TODO: Open menu
  };

  return (
    <View>
      {habits.map(item => {
        return (
          <View style={styles.habitWrapper} key={item.id}>
            <Text style={styles.habitName} numberOfLines={2}>
              {item.name}
            </Text>

            <IconButton
              style={styles.icon}
              icon='menu'
              iconColor={'lightgray'}
              size={48}
              onPress={() => handleMenuPress()}
            />
          </View>
        );
      })}
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
  icon: {
    margin: 0,
  },
});

export default ChangeHabitsList;
