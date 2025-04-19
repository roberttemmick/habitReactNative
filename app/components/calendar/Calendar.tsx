import type {
  CalendarProps,
  CalendarTheme,
} from '@marceloterreiro/flash-calendar';
import {Calendar, useCalendar} from '@marceloterreiro/flash-calendar';
import {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {calendarTokens} from './utils';
import {ChevronButton} from './CalendarButton';

const DAY_HEIGHT = 50;
const MONTH_HEADER_HEIGHT = 40;
const WEEK_DAYS_HEIGHT = 25;
const FOOTER_HEIGHT = 30;

const styles = StyleSheet.create({
  weekDivider: {
    height: 1,
    backgroundColor: 'lightgray',
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 0,
  },
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
  itemDay: {
    display: 'flex',
    flexDirection: 'column',
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
  itemDay: {
    base: () => ({
      container: {
        padding: 0,
        borderRadius: 0,
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

interface CustomCalendarProps extends CalendarProps {
  onPreviousMonthPress: () => void;
  onNextMonthPress: () => void;
}
export const CustomCalendar = memo((props: CustomCalendarProps) => {
  const {calendarRowMonth, weekDaysList, weeksList} = useCalendar(props);

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
                  {day.isDisabled || <Text>Icon</Text>}
                  {/* <Icon iconStyle="solid" name="check" /> */}
                </Calendar.Item.Day>
              </Calendar.Item.Day.Container>
            ))}
          </Calendar.Row.Week>
        ))}

        <View style={styles.calendarFooter}>
          <Text style={styles.calendarFooterText}>... day streak</Text>
        </View>
      </Calendar.VStack>
    </View>
  );
});
