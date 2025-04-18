import type {
  CalendarProps,
  CalendarTheme,
} from '@marceloterreiro/flash-calendar';
import {Calendar, useCalendar} from '@marceloterreiro/flash-calendar';
import {format} from 'date-fns';
import {memo, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {calendarTokens} from './utils';
import {ChevronButton} from './CalendarButton';

const DAY_HEIGHT = 25;
const MONTH_HEADER_HEIGHT = 40;
const WEEK_DAYS_HEIGHT = 25;
const FOOTER_HEIGHT = 30;
const BORDER_WIDTH = 1;

const styles = StyleSheet.create({
  weekDivider: {
    height: 1,
    backgroundColor: calendarTokens.colors.content.primary,
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 0,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: BORDER_WIDTH,
    borderColor: calendarTokens.colors.accent,
  },
  calendarFooter: {
    height: FOOTER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
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
});

const calendarTheme: CalendarTheme = {
  rowMonth: {
    container: {
      backgroundColor: calendarTokens.colors.accent,
      height: MONTH_HEADER_HEIGHT,
    },
    content: {
      color: calendarTokens.colors.content.inverse.primary,
      fontSize: 17,
      width: 200,
      textAlign: 'center',
    },
  },
  itemWeekName: {content: {color: calendarTokens.colors.accent}},
  itemDay: {
    base: () => ({
      container: {
        padding: 0,
        borderRadius: 0,
      },
    }),
    today: () => ({
      container: {
        borderWidth: 2,
        borderColor: calendarTokens.colors.secondary,
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
        backgroundColor: calendarTokens.colors.accent,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      content: {
        color: calendarTokens.colors.content.inverse.primary,
      },
    }),
  },
};

interface CustomCalendarProps extends CalendarProps {
  onPreviousMonthPress: () => void;
  onNextMonthPress: () => void;
}
export const CustomCalendar = memo((props: CustomCalendarProps) => {
  const {calendarRowMonth, weekDaysList, weeksList} = useCalendar(props);

  const today = useMemo(() => {
    return weeksList.flatMap(week => week).find(day => day.isToday);
  }, [weeksList]);

  return (
    <View style={styles.calendarContainer}>
      <Calendar.VStack spacing={props.calendarRowVerticalSpacing}>
        {/* Replaces `Calendar.Row.Month` with a custom implementation */}
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
                  {day.displayLabel}
                </Calendar.Item.Day>
              </Calendar.Item.Day.Container>
            ))}
          </Calendar.Row.Week>
        ))}

        <View style={styles.calendarFooter}>
          <Text style={styles.calendarFooterText}>Streak: ... days</Text>
        </View>
      </Calendar.VStack>
    </View>
  );
});
