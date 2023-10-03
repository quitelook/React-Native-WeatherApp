import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const foreCastColumn = screenWidth / 6;

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    alignItems: 'center',
  },

  Forecasts: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherImage: {
    width: 55,
    height: 55,
    marginLeft: 7,
    resizeMode: 'contain',
  },
  day: {
    width: foreCastColumn,
    borderRadius: 4,
    alignitem: 'center',
  },
  item: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    padding: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  min: {
    fontSize: 17,
    padding: 'auto',
    opacity: 0.5,
  },
});

export default function Forecast(props) {
  useEffect(() => {
    fetchApi(props.data.cityName);
  }, [props.data.cityName]);

  function getShortCurrentDay(timestamp) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const dayOfWeekIndex = currentDate.getDay(); // Get the day of the week (0-6)

    return daysOfWeek[dayOfWeekIndex];
  }
  const [DATA, setData] = useState();
  var FORECAST = [];
  function fetchApi(cityToSearchFor) {
    let key = 'b7c86efaac7c13373o4d08b12f9t3f33';
    let url = `https://api.shecodes.io/weather/v1/forecast?query=${cityToSearchFor}&key=${key}&units=metric`;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        let foreCastData = data.daily.slice(0, 7);
        setData(foreCastData);
      });
  }
  if (DATA) {
    for (let i = 0; i < 7; i++) {
      const currentItem = DATA[i];
      let imageUrl = currentItem.condition.icon_url;
      let secureUrlString = imageUrl.replace('http://', 'https://');
      const newItem = {
        temp: Math.round(currentItem.temperature.day),
        wind: Math.round(currentItem.wind.speed),
        min: Math.round(currentItem.temperature.minimum),
        max: Math.round(currentItem.temperature.maximum),
        humidity: currentItem.temperature.humidity,
        time: currentItem.time,
        icon: secureUrlString,
      };
      FORECAST.push(newItem); // Append newItem to newList
    }
  } else {
    fetchApi(props.data.cityName);
  }
  if (FORECAST) {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={true} // Enable horizontal scrolling
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
          data={FORECAST}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.day}>
              <Text style={styles.item}>{getShortCurrentDay(item.time)}</Text>
              <Image source={{uri: item.icon}} style={styles.weatherImage} />
              <Text style={styles.item}>
                {item.max}° <Text style={styles.min}>{item.min}°</Text>
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}
