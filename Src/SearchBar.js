import React, {useState} from 'react';
import {useGlobalWeather} from '../Store';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: 4,
    width: '75%',
    marginEnd: 5,
    borderWidth: 1,
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  buttonStyle: {
    width: 'auto',
    padding: 10,
    marginStart: 5,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInputError: {
    marginTop: 5,
    color: 'white',
    fontSize: 18,
  },
});

export default function SearchBar() {
  const {setGlobalWeather} = useGlobalWeather();
  const [city, setCity] = useState('');
  const [searchInputError, setsearchInputError] = useState('');

  // useEffect(() => {
  //   // Perform state update here, triggered by some event or condition
  //   if (globalWeather.loaded === 'false') {
  //   }
  // }, [globalWeather.loaded]);

  function fetchApi(cityToSearchFor) {
    if (cityToSearchFor !== '') {
      let key = 'b7c86efaac7c13373o4d08b12f9t3f33';
      let url = `https://api.shecodes.io/weather/v1/current?query=${cityToSearchFor}&key=${key}&units=metric`;
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setGlobalWeather({
            loaded: true,
            cityName: data.city,
            description: data.condition.description,
            icon_url: data.condition.icon_url,
            temperature: data.temperature.current,
            humidity: data.temperature.humidity,
            wind: data.wind.speed,
            time: data.time,
          });
        });
    } else {
      setsearchInputError('Enter a city');
      setTimeout(() => {
        setsearchInputError('');
      }, 1000);
    }
  }

  return (
    <View>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={text => {
            setCity(text);
          }}
          style={styles.inputStyle}
          placeholder="Type in a City...."
        />

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            fetchApi(city);
          }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.searchInputError}> {searchInputError}</Text>
    </View>
  );
}
