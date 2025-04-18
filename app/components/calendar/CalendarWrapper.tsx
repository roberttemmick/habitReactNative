import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Calendar,
  CalendarActiveDateRange,
  CalendarOnDayPress,
  fromDateId,
  toDateId,
} from '@marceloterreiro/flash-calendar';
import {CustomCalendar} from './Calendar';
import {sub, add, format} from 'date-fns';

function CalendarComponent() {
  const [activeDateId, setActiveDateId] = useState<string | undefined>();
  // toDateId(addDays(startOfThisMonth, 3)),

  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const onCalendarDayPress = (dateId: string) => {
    setActiveDateId(dateId);
  };

  const [isPickerVisible, setIsPickerVisible] = useState(true);

  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(
    sub(new Date(), {days: 1}),
  );

  const handleOpenPicker = useCallback(() => {
    setIsPickerVisible(p => !p);
  }, []);

  const handleDayPress = useCallback<CalendarOnDayPress>(dateId => {
    setCurrentCalendarMonth(fromDateId(dateId));
    setSelectedDate(fromDateId(dateId));
    setIsPickerVisible(false);
  }, []);

  const calendarActiveDateRanges = useMemo<CalendarActiveDateRange[]>(
    () => [
      {
        startId: toDateId(selectedDate),
        endId: toDateId(selectedDate),
      },
    ],
    [selectedDate],
  );

  const handlePreviousMonth = useCallback(() => {
    setCurrentCalendarMonth(sub(currentCalendarMonth, {months: 1}));
  }, [currentCalendarMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentCalendarMonth(add(currentCalendarMonth, {months: 1}));
  }, [currentCalendarMonth]);

  return (
    <View style={styles.calendarWrapper}>
      <Calendar.VStack justifyContent="flex-start" spacing={12}>
        <CustomCalendar
          calendarActiveDateRanges={calendarActiveDateRanges}
          // calendarMaxDateId="2024-06-31"
          // calendarMinDateId="2024-01-01"
          calendarMonthId={toDateId(currentCalendarMonth)}
          // getCalendarWeekDayFormat={format('E')}
          onCalendarDayPress={handleDayPress}
          onNextMonthPress={handleNextMonth}
          onPreviousMonthPress={handlePreviousMonth}
        />
      </Calendar.VStack>
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
  },
});

export default CalendarComponent;
