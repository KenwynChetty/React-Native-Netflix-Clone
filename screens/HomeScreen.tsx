import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList } from 'react-native';
import HomeScreenCategory from "../components/HomeScreenCategory";
import { Octicons, Ionicons, AntDesign } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';
//import categories from '../assets/data/categories';
import {LinearGradient} from "expo-linear-gradient"
import { DataStore } from "@aws-amplify/datastore";
import { Category } from '../src/models'

const HomeScreen = () => {
  const backgroundImage = require("../assets/images/SicknoteBg.png")
  const logo = require("../assets/images/Logo.png")
  const userImage = require("../assets/images/defaultUser.jpg")
  const tvShowLogo = require("../assets/images/sicknote.png")
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(()=>{
      DataStore.query(Category).then(setCategories);
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={backgroundImage} style={styles.image}/>
        <View style={styles.netflixNavBar} >
          <Image source={logo} style={styles.logo}/>
          <Octicons name="search" size={24} color="white" style={styles.searchIcon}/>
          <Image source={userImage} style={styles.userImage}/>
          <View style={{flexDirection:'row', alignItems: "center", flex:1, justifyContent:"space-evenly", top:60}}>
            <Text style={{color:"white", fontSize:18}}>Series</Text>
            <Text style={{color:"white", fontSize:18}}>Films</Text>
            <Text style={{color:"white", fontSize:18}}>MyList</Text>
          </View>
        </View>
        <View style={{alignItems: "center", flex:1, justifyContent:"space-evenly",zIndex:1,}}>
          <Image source={tvShowLogo} style={styles.tvShowLogo}/>
        </View>
        <View style={{flexDirection:'row', alignItems: "center", flex:1, justifyContent:"space-evenly", top:350, zIndex:1}}>
          <View style={{flexDirection:"column",alignItems: "center",}}>
          <Ionicons name="duplicate-outline" size={24} color="white" />
            <Text style={{color:"white"}}>My List</Text>
          </View>
          <View style={styles.playBtn}>
            <Ionicons name="play" size={24} color="black" />
            <Text style={{color:"black", fontWeight: 'bold', fontSize:18}}>Play</Text>
          </View>
          <View style={{flexDirection:"column",alignItems: "center",zIndex:1,}}>
          <Ionicons name="ios-information-circle-outline" size={24} color="white" />
            <Text style={{color:"white"}}>Info</Text>
          </View>
        </View>
        <LinearGradient colors={["transparent","rgba(0,0,0,0.05)","rgba(0,0,0,0.15)","rgba(0,0,0,0.77)","#000000"]} style={styles.linearGradient}/>
        <View style={{marginTop:475}}>
          <View style={{marginTop:-75,}}>
            <FlatList nestedScrollEnabled={true} showsVerticalScrollIndicator={false} data={categories} renderItem={({item}) =>(<HomeScreenCategory category={item} />)} />
        </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"black",
    marginTop:StatusBar.currentHeight
  },
  linearGradient:{
    width:"100%",
    height: 500,
    position:'absolute'
},
  netflixNavBar: {
    flexDirection: 'row',
    zIndex:1,
  },
  logo:{
    width:50,
    height:50,
    position: "absolute",
    marginTop:5,
    zIndex:1,
  },
  searchIcon:{
    right:80,
    top:20,
    position: 'absolute',
    zIndex:1,
  },
  userImage:{
    position: 'absolute',
    right:20,
    top:20,
    width:30,
    height:30,
    borderRadius:5,
    zIndex:1,
  },

  tvShowLogo:{
    width:150,
    height:100,
    position:'absolute',
    top:220,
    zIndex:1,
  },
  playBtn:{
    flexDirection:'row',
    backgroundColor:"white", 
    width: 62.5, 
    height:28, 
    borderRadius:5,
    zIndex:1,
  },
  image:{
    width:"100%",
    height:500,
    top:0,
    opacity:1,
    position:"absolute"
  },
  text:{
    color:"white",
    fontWeight:"bold",
    fontSize:20,
  },
  thumbnailsRow:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});
