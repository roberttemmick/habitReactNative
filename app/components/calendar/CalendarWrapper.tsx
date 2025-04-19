import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {
  Calendar,
  CalendarActiveDateRange,
  fromDateId,
  toDateId,
} from '@marceloterreiro/flash-calendar';
import {CustomCalendar} from './Calendar';
import {sub, add} from 'date-fns';
import {DateHabit} from '../../types/types';

function CalendarWrapper({
  emitSelectedDateChangedEvent,
  selectedDateHabit,
}: {
  emitSelectedDateChangedEvent: Function;
  selectedDateHabit: DateHabit | undefined;
}) {
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDayPress = (dateId: string) => {
    setCurrentCalendarMonth(fromDateId(dateId));
    setSelectedDate(fromDateId(dateId));
    emitSelectedDateChangedEvent(dateId);
  };

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
    <View>
      <Calendar.VStack justifyContent="flex-start" spacing={12}>
        <CustomCalendar
          calendarActiveDateRanges={calendarActiveDateRanges}
          calendarMaxDateId={toDateId(new Date())}
          calendarMonthId={toDateId(currentCalendarMonth)}
          onCalendarDayPress={handleDayPress}
          onNextMonthPress={handleNextMonth}
          onPreviousMonthPress={handlePreviousMonth}
        />
      </Calendar.VStack>
    </View>
  );
}

export default CalendarWrapper;
