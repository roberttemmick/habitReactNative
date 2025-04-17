import React from 'react';
import {Text, View} from 'react-native';

function Habit({
  name,
  completed,
}: {
  name: string;
  completed: boolean;
}): React.JSX.Element {
  return (
    <View>
      <Text>
        {name} {completed ? 'true' : 'false'}
      </Text>
    </View>
  );
}

export default Habit;
