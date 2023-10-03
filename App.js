/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import WeatherDetails from './Src/WeatherDetails';
import DateAndCity from './Src/DateAndCity';
import {GlobalStateProvider} from './Store';
import {useGlobalWeather} from './Store';
import SearchBar from './Src/SearchBar';
import Temperature from './Src/Temperature';
import Forecast from './Src/Forecast';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  // StatusBar,
  StyleSheet,
  // Text,
  Dimensions,
  // Image,
  // TouchableOpacity,
  useColorScheme,
  // Alert,
  View,
} from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const screenWidth = Dimensions.get('window').width;
const foreCastColumn = screenWidth / 6;

const App = () => {
  const colorScheme = useColorScheme();

  const skeletonStyles = colorScheme === 'dark' ? '#282C34' : 'lightgray';
  const {globalWeather, setGlobalWeather} = useGlobalWeather();

  function fetchApi(cityToSearchFor) {
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
  }
  if (globalWeather.loaded === true) {
    return (
      // <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={require('./weatherappBg.jpeg')}
        // Replace with the path to your image
        style={styles.backgroundImage}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
              <SearchBar />
              <DateAndCity data={globalWeather} />
              <WeatherDetails data={globalWeather} />
              <Temperature data={globalWeather} />

              <View>
                <Forecast data={globalWeather} />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
      // </SafeAreaView>
    );
  } else {
    fetchApi('paris');
    return (
      <SafeAreaView>
        <SkeletonPlaceholder backgroundColor={skeletonStyles}>
          <View style={styles.skeletonContainer}>
            <ScrollView contentContainerStyle={styles.skeletonContainer}>
              <View style={styles.SearchBarSkeleton}>
                <View style={styles.searchInput} />
                <View style={styles.searchButton} />
              </View>

              <View style={styles.DateAndCitySkeleton}>
                <View style={styles.DateandCityText} />
                <View style={styles.DateandCityText} />
              </View>

              <View style={styles.WeatherDetailsSkeleton}>
                <View style={styles.WeatherDeatailText} />
                <View style={styles.WeatherDeatailText} />
                <View style={styles.WeatherDeatailText} />
              </View>
              <View style={styles.forCastSkeleton}>
                <View style={styles.avatar} />
              </View>

              <View style={styles.forCastSkeleton}>
                <View style={styles.ForecastText} />
                <View style={styles.ForecastText} />
                <View style={styles.ForecastText} />
                <View style={styles.ForecastText} />
                <View style={styles.ForecastText} />
                <View style={styles.ForecastText} />
              </View>
            </ScrollView>
          </View>
        </SkeletonPlaceholder>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  backgroundImage: {
    paddingTop: 25,
    paddingBottom: 20,
    flex: 1,
    resizeMode: 'cover', // You can adjust the resizeMode as needed (cover, contain, stretch, etc.)
    justifyContent: 'center', // You can adjust the alignment as needed
  },
  avatar: {
    width: 80,
    height: 80,
    marginHorizontal: '40%',
    borderRadius: 40,
  },
  skeletonContainer: {
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchInput: {
    width: '72%',
    height: 40,
    borderRadius: 4,
    marginBottom: 8,
  },
  searchButton: {
    width: '23%',
    height: 40,
    borderRadius: 4,
  },
  DateandCityText: {
    borderRadius: 4,
    // marginTop: 10,
    width: '35%',
    height: 30,
  },
  WeatherDeatailText: {
    borderRadius: 7,
    // marginTop: 10,
    width: '25%',
    height: 40,
  },

  ForecastText: {
    width: foreCastColumn,
    height: 120,
  },
  SearchBarSkeleton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DateAndCitySkeleton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  WeatherDetailsSkeleton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forCastSkeleton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default () => (
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>
);
