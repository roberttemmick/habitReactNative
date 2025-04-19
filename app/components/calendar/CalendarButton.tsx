import {darken, size} from 'polished';
import {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {calendarTokens} from './utils';

const styles = StyleSheet.create({
  chevronContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    color: calendarTokens.colors.button.content,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  chevronButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Chevron = memo(({type}: {type: 'left' | 'right'}) => {
  return <Text>{type === 'left' ? '<' : '>'}</Text>;
});

export const ChevronButton = memo(
  ({
    type,
    onPress,
    size: sizeProp,
  }: {
    type: 'left' | 'right';
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
