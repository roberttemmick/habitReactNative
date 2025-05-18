import {Linking, StyleSheet, Text, View} from 'react-native';

function AboutComponent() {
  return (
    <View>
      <Text style={styles.textFont}>Version: 0.0.0</Text>
      <Text style={styles.textFont}>Designed and made by Robert Temmick</Text>
      <Text style={styles.textFont}>
        Follow me on{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/in/roberttemmick/')
          }>
          LinkedIn
        </Text>
      </Text>
      <Text style={styles.textFont}>
        Send feedback to{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('mailto:robert.temmick@gmail.com')}>
          robert.temmick@gmail.com
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textFont: {
    // fontSize: 1,
    // textAlign: 'left',
    fontWeight: 200,
  },
  link: {
    color: 'blue',
  },
  // buttonLabel: {
  //   fontWeight: 200,
  //   marginBottom: 4,
  // },
  // buttonWrapper: {
  //   alignItems: 'flex-start',
  //   marginLeft: -8,
  // },
  // iconButton: {
  //   alignItems: 'center',
  //   paddingHorizontal: 8,
  //   justifyContent: 'flex-start',
  //   flexDirection: 'row',
  // },
});

export default AboutComponent;
