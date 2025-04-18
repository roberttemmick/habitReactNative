import {memo} from 'react';
import type {TextStyle} from 'react-native';
import {Text, StyleSheet} from 'react-native';

export const textStyles = StyleSheet.create({
  calendarText: {
    color: '#ffffff',
    width: '100%',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
});

export const CalendarText = memo(
  ({children, style}: {children: string; style?: TextStyle}) => {
    return <Text style={[textStyles.calendarText, style]}>{children}</Text>;
  },
);
