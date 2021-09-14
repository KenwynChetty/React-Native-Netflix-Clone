import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import upcoming from '../assets/data/upcoming';
import UpcomingItems from '../components/UpcomingItems';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
      data={upcoming.items}
      renderItem={({item}) =><UpcomingItems upcoming={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
