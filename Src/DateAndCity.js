import React from 'react';

import {
  // FlatList,
  // SafeAreaView,
  // ScrollView,
  // StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  // TouchableOpacity,
  // useColorScheme,
  // Alert,
  View,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Content: {
    maxWidth: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  textLg: {
    flex: 1,
    fontSize: 25,
    color: 'white',
  },
  rowWidth: {
    width: '50%',
  },
});

export default function DateAndCity(props) {
  const currentDate = new Date(props.data.time * 1000);
  const options = {weekday: 'long', weekdayLang: 'en', hour12: false};
  const currentDayOfWeek = currentDate.toLocaleTimeString('en-US', options);
  // const [city, setCity] = useState('Paris, FR');
  if (props.data.loaded === true) {
    return (
      <View>
        <View style={styles.Content}>
          {/* <FlatList
            data={data}
            numColumns={2}
            renderItem={({item}) => (
            )}
          /> */}
          <View style={styles.rowWidth}>
            <Text style={styles.textLg}>{props.data.cityName}</Text>
          </View>

          <View>
            <Text style={styles.textLg}>{currentDayOfWeek}</Text>
          </View>
        </View>
      </View>
    );
  }
}
