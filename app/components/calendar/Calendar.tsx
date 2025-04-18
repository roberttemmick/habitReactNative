import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Calendar, toDateId} from '@marceloterreiro/flash-calendar';

function CalendarComponent() {
  const [activeDateId, setActiveDateId] = useState<string | undefined>();
  // toDateId(addDays(startOfThisMonth, 3)),

  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const onCalendarDayPress = (dateId: string) => {
    setActiveDateId(dateId);
  };

  return (
    <View style={styles.calendarWrapper}>
      <Calendar.List
        calendarActiveDateRanges={[
          {startId: activeDateId, endId: activeDateId},
        ]}
        calendarDayHeight={48}
        calendarInitialMonthId={toDateId(startOfMonth(new Date()))}
        calendarSpacing={20}
        onCalendarDayPress={onCalendarDayPress}
        // renderItem={({item}) => (
        //   <View>
        //     <Text>{item.id}</Text>
        //   </View>
        // )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    borderRadius: 16,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default CalendarComponent;
