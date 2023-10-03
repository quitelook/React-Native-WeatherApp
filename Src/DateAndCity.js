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
} from 'react-native';

const styles = StyleSheet.create({
  Content: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  textLg: {
    fontSize: 25,
    color: 'white',
  },
});

export default function DateAndCity(props) {
  const currentDate = new Date(props.data.time * 1000);
  const options = {weekday: 'long', weekdayLang: 'en', hour12: false};
  const currentDayOfWeek = currentDate.toLocaleTimeString('en-US', options);
  // const [city, setCity] = useState('Paris, FR');
  if (props.data.loaded === true) {
    return (
      <View style={styles.Content}>
        <View>
          <Text style={styles.textLg}>{props.data.cityName}</Text>
        </View>
        <View>
          <Text style={styles.textLg}>{currentDayOfWeek}</Text>
        </View>
      </View>
    );
  }
}
