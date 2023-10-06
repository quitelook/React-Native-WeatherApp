import React from 'react';

import {
  // SafeAreaView,
  // ScrollView,
  // StatusBar,
  StyleSheet,
  Text,
  // TouchableOpacity,
  // useColorScheme,
  // Alert,
  View,
  // TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  WeatherInfo: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textLg: {
    paddingHorizontal: 7,
    fontSize: 15,
    color: 'white',
    textTransform: 'capitalize',
  },
  bg: {
    paddingVertical: 9,
    borderRadius: 15,
    backgroundColor: 'rgba(65, 82, 149,0.5)',
  },
});

export default function WeatherDetails(props) {
  const wind = Math.round(props.data.wind);

  return (
    <View style={styles.WeatherInfo}>
      <View style={styles.bg}>
        <Text style={styles.textLg}>Humidity:{props.data.humidity}%</Text>
      </View>
      <View style={styles.bg}>
        <Text style={styles.textLg}>Wind:{wind}Km/h</Text>
      </View>
      <View style={styles.bg}>
        <Text style={styles.textLg}>{props.data.description}</Text>
      </View>
    </View>
  );
}
