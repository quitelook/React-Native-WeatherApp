import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  tempStyle: {
    // marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tempUnit: {
    fontSize: 25,
  },
  weatherImage: {
    width: 100,
  },
  temp: {
    color: 'white',
    fontSize: 68,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeLink: {
    fontSize: 20,
    color: 'black',
  },
  inactiveLink: {
    fontSize: 20,
    color: 'blue',
  },
});

export default function Temperature(props) {
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const celsiusTemp = Math.round(props.data.temperature);
  const FahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  const [tempValue, setTempValue] = useState(
    Math.round(props.data.temperature),
  );
  useEffect(() => {
    setTempValue(Math.round(props.data.temperature));
  }, [props.data.temperature]);
  let imageUrl = props.data.icon_url;

  function forFahrenheit() {
    setTempValue(FahrenheitTemp);
    setIsFahrenheit(true);
    setIsCelsius(false);
  }
  function forCelsius() {
    setTempValue(celsiusTemp);
    setIsCelsius(true);
    setIsFahrenheit(false);
  }

  let secureUrlString = imageUrl.replace('http://', 'https://');
  return (
    <View style={styles.tempStyle}>
      <Image
        source={{
          url: secureUrlString,
        }}
        style={styles.weatherImage}
      />
      <Text style={styles.temp}>{tempValue}</Text>
      <Text style={styles.tempUnit}>
        <TouchableOpacity onPress={forCelsius} disabled={isCelsius}>
          <Text style={isCelsius ? styles.activeLink : styles.inactiveLink}>
            °C
          </Text>
        </TouchableOpacity>
        <Text> | </Text>
        <TouchableOpacity onPress={forFahrenheit} disabled={isFahrenheit}>
          <Text style={isFahrenheit ? styles.activeLink : styles.inactiveLink}>
            °F
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
