import {darken, size} from 'polished';
import {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {calendarTokens} from './utils';

const styles = StyleSheet.create({
  chevronContainer: {
    backgroundColor: calendarTokens.colors.button.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: calendarTokens.colors.accent,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  chevronText: {
    color: calendarTokens.colors.button.content,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  chevronButtonContainer: {
    borderColor: calendarTokens.colors.accent,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
});

const BASE_CHEVRON = '▼';

const Chevron = memo(
  ({type}: {type: 'left' | 'bottom' | 'top' | 'right'}) => {
    return (
      <Text
        style={[
          styles.chevronText,
          {
            transform: [
              type === 'left' ? {rotate: '90deg'} : {rotate: '0deg'},
              type === 'top' ? {rotate: '180deg'} : {rotate: '0deg'},
              type === 'right' ? {rotate: '-90deg'} : {rotate: '0deg'},
            ],
          },
        ]}>
        {BASE_CHEVRON}
      </Text>
    );
  },
);

export const ChevronButton = memo(
  ({
    type,
    onPress,
    size: sizeProp,
  }: {
    type: 'left' | 'bottom' | 'top' | 'right';
    size: number;
    onPress: () => void;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => ({
          ...styles.chevronButtonContainer,
          ...size(sizeProp),
          backgroundColor: pressed
            ? darken(0.1, calendarTokens.colors.button.primaryBackground)
            : calendarTokens.colors.button.primaryBackground,
        })}>
        <View style={{...styles.chevronContainer, ...size(sizeProp - 8)}}>
          <Chevron type={type} />
        </View>
      </Pressable>
    );
  },
);
