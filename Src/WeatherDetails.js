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
    borderRadius: 15,
    backgroundColor: '#415295',
    paddingVertical: 6,
    paddingHorizontal: 5,
    fontSize: 15,
    color: 'white',
    textTransform: 'capitalize',
  },
});

export default function WeatherDetails(props) {
  const wind = Math.round(props.data.wind);

  return (
    <View style={styles.WeatherInfo}>
      <View style={styles.textLg}>
        <Text style={styles.textLg}>Humidity:{props.data.humidity}%</Text>
      </View>
      <View style={styles.textLg}>
        <Text style={styles.textLg}>Wind:{wind}Km/h</Text>
      </View>
      <View style={styles.textLg}>
        <Text style={styles.textLg}>{props.data.description}</Text>
      </View>
    </View>
  );
}
