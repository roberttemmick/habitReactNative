import type {
  CalendarDayMetadata,
  CalendarProps,
  CalendarTheme,
} from '@marceloterreiro/flash-calendar';
import {Calendar, toDateId, useCalendar} from '@marceloterreiro/flash-calendar';
import {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {calendarTokens} from './utils';
import {ChevronButton} from './CalendarButton';
import CircularProgress from 'react-native-circular-progress-indicator';
import {DateHabit, HabitEntry} from '../../types/types';

const DAY_HEIGHT = 46;
const MONTH_HEADER_HEIGHT = 40;
const WEEK_DAYS_HEIGHT = 25;
const FOOTER_HEIGHT = 30;

interface CustomCalendarProps extends CalendarProps {
  onCalendarDayPress: (dateId: string) => void;
  onPreviousMonthPress: () => void;
  onNextMonthPress: () => void;
  dateHabits: DateHabit[];
  selectedDateHabit: DateHabit;
  streakCount: number;
}
export const CustomCalendar = memo((props: CustomCalendarProps) => {
  const {calendarRowMonth, weekDaysList, weeksList} = useCalendar(props);

  const getCompletedCount = (dateHabit: DateHabit): number => {
    let counter = 0;

    dateHabit.habitEntries.forEach((habit: HabitEntry) => {
      habit.completed && counter++;
    });

    return counter;
  };

  const getDateCompletedState = (dateHabit: DateHabit): boolean => {
    return getCompletedCount(dateHabit) === dateHabit.habitEntries.length;
  };

  let dateHabitDay: DateHabit;

  const getDateHabitDay = (day: CalendarDayMetadata): DateHabit => {
    dateHabitDay = props.dateHabits.find((dateHabit: DateHabit) => {
      return dateHabit.dateId === day.id;
    }) || {
      dateId: toDateId(new Date(props.selectedDateHabit.dateId)),
      completed: false,
      habitEntries: [],
    };

    return dateHabitDay;
  };

  const getCompletedPercentage = (day: CalendarDayMetadata): number => {
    return (
      (getCompletedCount(getDateHabitDay(day)) /
        getDateHabitDay(day).habitEntries.length) *
        100 || 1
    );
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar.VStack spacing={props.calendarRowVerticalSpacing}>
        <Calendar.HStack
          alignItems="center"
          justifyContent="space-around"
          style={calendarTheme.rowMonth?.container}
          width="100%">
          <ChevronButton
            onPress={props.onPreviousMonthPress}
            size={30}
            type="left"
          />
          <Text style={calendarTheme.rowMonth?.content}>
            {calendarRowMonth}
          </Text>
          <ChevronButton
            onPress={props.onNextMonthPress}
            size={30}
            type="right"
          />
        </Calendar.HStack>

        <Calendar.Row.Week spacing={4}>
          {weekDaysList.map((day, i) => (
            <Calendar.Item.WeekName
              height={WEEK_DAYS_HEIGHT}
              key={i}
              theme={calendarTheme.itemWeekName}>
              {day}
            </Calendar.Item.WeekName>
          ))}
          <View style={styles.weekDivider} />
        </Calendar.Row.Week>

        {weeksList.map((week, i) => (
          <Calendar.Row.Week key={i}>
            {week.map(day => (
              <Calendar.Item.Day.Container
                dayHeight={DAY_HEIGHT}
                daySpacing={4}
                isStartOfWeek={day.isStartOfWeek}
                key={day.id}>
                <Calendar.Item.Day
                  height={DAY_HEIGHT}
                  metadata={day}
                  onPress={props.onCalendarDayPress}
                  theme={calendarTheme.itemDay}>
                  <Text>
                    {day.displayLabel} {'\n'}
                  </Text>
                  {!day.isDisabled &&
                    getDateHabitDay(day).habitEntries.length > 0 && (
                      <View style={styles.dayIconWrapper}>
                        {getDateCompletedState(getDateHabitDay(day)) ? (
                          <Text style={styles.checkIcon}>&#x2713;</Text>
                        ) : (
                          <CircularProgress
                            value={getCompletedPercentage(day)}
                            radius={14}
                            rotation={90}
                            duration={500}
                            activeStrokeWidth={4}
                            inActiveStrokeOpacity={0}
                            activeStrokeColor={
                              getCompletedPercentage(day) < 50
                                ? '#8b0000'
                                : '#ff8c00'
                            }
                            title={`${getCompletedCount(
                              getDateHabitDay(day),
                            )}/${getDateHabitDay(day).habitEntries.length}`}
                            titleStyle={{
                              fontWeight: '300',
                              fontSize: 10,
                              color: 'black',
                            }}
                            showProgressValue={false}
                          />
                        )}
                      </View>
                    )}
                </Calendar.Item.Day>
              </Calendar.Item.Day.Container>
            ))}
          </Calendar.Row.Week>
        ))}

        <View style={styles.calendarFooter}>
          <Text style={styles.calendarFooterText}>
            {props.streakCount} day streak
          </Text>
        </View>
      </Calendar.VStack>
    </View>
  );
});

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  calendarFooter: {
    height: FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarFooterLegend: {
    width: 20,
    height: 20,
    borderColor: calendarTokens.colors.secondary,
    borderWidth: 2,
  },
  calendarFooterText: {
    fontStyle: 'italic',
  },
  checkIcon: {
    color: 'green',
    fontSize: 24,
  },
  dayIconWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDivider: {
    height: 1,
    backgroundColor: 'lightgray',
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 4,
  },
});

const calendarTheme: CalendarTheme = {
  rowMonth: {
    container: {
      height: MONTH_HEADER_HEIGHT,
    },
    content: {
      fontSize: 17,
      fontWeight: 200,
      width: 200,
      textAlign: 'center',
    },
  },
  itemWeekName: {
    container: {
      marginBottom: 4,
    },
  },
  itemDay: {
    base: () => ({
      container: {
        padding: 0,
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    }),
    today: () => ({
      container: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderTopLeftRadius: '5%',
        borderTopRightRadius: '5%',
        borderBottomLeftRadius: '5%',
        borderBottomRightRadius: '5%',
      },
    }),
    idle: ({isDifferentMonth}) => ({
      content: isDifferentMonth
        ? {
            color: calendarTokens.colors.content.disabled,
          }
        : undefined,
    }),
    active: () => ({
      container: {
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderTopLeftRadius: '5%',
        borderTopRightRadius: '5%',
        borderBottomLeftRadius: '5%',
        borderBottomRightRadius: '5%',
      },
      content: {
        color: calendarTokens.colors.content.inverse.primary,
      },
    }),
  },
};
