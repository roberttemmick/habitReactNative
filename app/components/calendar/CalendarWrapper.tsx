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
import {fetchSettings} from '../../api/settings';
import {getUserId} from '../../api/auth';
import {useFocusEffect} from '@react-navigation/native';

function CalendarWrapper({
  calendarMinDateId,
  dateHabits,
  emitSelectedDateChangedEvent,
  selectedDateHabit,
  streakCount,
}: {
  dateHabits: DateHabit[];
  calendarMinDateId: string;
  emitSelectedDateChangedEvent: Function;
  selectedDateHabit: DateHabit;
  streakCount: number;
}) {
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekStartsOn, setWeekStartsOn] = useState('sunday');

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

  useFocusEffect(
    React.useCallback(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let isActive = true;

      const getSettings = async () => {
        const userId = await getUserId();
        if (userId) {
          const settings = await fetchSettings(userId);
          setWeekStartsOn(settings.weekStartsOn.toLowerCase());
        }
      };
      getSettings();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View>
      <Calendar.VStack justifyContent="flex-start" spacing={12}>
        <CustomCalendar
          calendarActiveDateRanges={calendarActiveDateRanges}
          calendarMinDateId={calendarMinDateId}
          calendarMaxDateId={toDateId(new Date())}
          calendarMonthId={toDateId(currentCalendarMonth)}
          dateHabits={dateHabits}
          onCalendarDayPress={handleDayPress}
          onNextMonthPress={handleNextMonth}
          onPreviousMonthPress={handlePreviousMonth}
          selectedDateHabit={selectedDateHabit}
          streakCount={streakCount}
          calendarFirstDayOfWeek={weekStartsOn}
        />
      </Calendar.VStack>
    </View>
  );
}

export default CalendarWrapper;
