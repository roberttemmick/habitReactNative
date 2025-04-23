import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Habit} from '../types/types';
import {IconButton} from 'react-native-paper';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SwipeableItem from 'react-native-swipeable-item';

function ChangeHabitsList(props: {habits: Habit[]}) {
  const [habits, setHabits] = useState<Habit[]>(props.habits);

  const handleDelete = (habit: Habit) => {
    console.log('DELETE', habit);
    // TODO: Delete habit
  };

  const onUpdateHabitName = (updatedName: string) => {
    // TODO: Update habit name
    console.log('UPDATED NAME', updatedName);
  };

  const renderItem = useCallback(({item, drag}: RenderItemParams<Habit>) => {
    return (
      <SwipeableItem
        key={item.id}
        item={item}
        snapPointsLeft={[68]}
        swipeDamping={1}
        renderUnderlayLeft={() => (
          <View style={styles.deleteHabitButtonWrapper}>
            <IconButton
              style={styles.icon}
              icon="delete-outline"
              iconColor={'darkred'}
              size={48}
              onPress={() => handleDelete(item)}
            />
          </View>
        )}>
        <View style={styles.habitWrapper} key={item.id}>
          <TextInput
            style={styles.habitName}
            value={item.name}
            // placeholder="New Habit"
            onChangeText={onUpdateHabitName}
          />

          <IconButton
            style={styles.icon}
            icon="menu"
            iconColor={'lightgray'}
            size={48}
            onLongPress={drag}
          />
        </View>
      </SwipeableItem>
    );
  }, []);

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        data={habits}
        renderItem={renderItem}
        keyExtractor={item => `draggable-item-${item.id}`}
        onDragEnd={({data}) => setHabits(data)}
      />
    </GestureHandlerRootView>
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

export default ChangeHabitsList;
