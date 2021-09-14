import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView, FlatList, StatusBar, SafeAreaView, ActivityIndicator} from 'react-native';
import movie from "../assets/data/movie";
import {MaterialIcons, Entypo, AntDesign, Feather} from "@expo/vector-icons";
import EpisodeItem from '../components/EpisodeItem';
import { DataStore } from "@aws-amplify/datastore"
import {Picker} from "@react-native-picker/picker"
import VideoPlayer from '../components/VideoPlayer';
import {Movie, Season, Episode} from '../src/models';
import { useRoute } from '@react-navigation/native';

const firstSeason = movie.seasons.items[0]
const firstEpisode = firstSeason.episodes.items[0]

const MovieDetailScreen = () => {
    const [movie, setMovie] = useState<Movie|undefined>(undefined)
    const [seasons, setSeasons] = useState<Season[]>([])
    const [episodes, setEpisode] = useState<Episode[]>([])
    const [currentSeason, setCurrentSeason] = useState<Season|undefined>(undefined)
    const [currentEpisode, setCurrentEpisode] = useState<Episode|undefined>(undefined)
    const seasonNames = seasons ? seasons.map(season => season.name) : [];
    const route = useRoute();
    const movieId = route.params?.id

    useEffect(() => {
      const fetchMovie = async() => {
        DataStore.query(Movie, movieId).then(setMovie)
      }
      fetchMovie();
    }, [movieId])

    useEffect(() => {
      if(!movie){
          return;
      }  
      const fetchSeason = async () => {
        const movieSeasons = (await DataStore.query(Season)).filter(s =>s.movieID === movieId )
        setSeasons(movieSeasons);
        setCurrentSeason(movieSeasons[0]);
      }
      fetchSeason();
    }, [movie, movieId])

    useEffect(() => {
      if(!currentSeason){
          return;
      }
      const fetchEpisode = async() => {
          const seasonEpisode = (await DataStore.query(Episode)).filter(e =>e.seasonID === currentSeason?.id)
          setEpisode(seasonEpisode)
          setCurrentEpisode(seasonEpisode[0])
      };
      fetchEpisode()
    }, [currentSeason])

    if(!movie){
        return <ActivityIndicator/>
    }

    return (
        <SafeAreaView style={{backgroundColor:"black", flex:1}}>
            <View style={{width:"100%", aspectRatio:16/9, zIndex:1,}}>
               { currentEpisode && <VideoPlayer episode={currentEpisode} />}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{movie.title}</Text>
                <View style={{flexDirection:"row", paddingLeft:10}}>
                    <Text style={styles.match}>98% match</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                    <View style={styles.ageContainer}>
                        <Text style={styles.age}>12+</Text>
                    </View>
                    <Text style={styles.year}>{movie.numberOfSeasons} Seasons</Text>
                    <MaterialIcons name="hd" size={22} color="white" style={{paddingLeft:10,}} />
                </View>
                <Text style={{color:"white", paddingLeft:10, paddingRight:10, marginTop:10,}}>{movie.plot}</Text>
                <Text style={{color:"grey", paddingLeft:10, paddingRight:10, marginTop:10, fontSize:11}}>Cast: {movie.cast}</Text>
                <Text style={{color:"grey", paddingLeft:10, paddingRight:10, marginTop:3, fontSize:11}}>Director: {movie.creator}</Text>
                <View style={{flexDirection:"row", marginTop:10,borderBottomColor:"#424242", borderStyle:'solid',borderWidth:.2,paddingBottom:5,}}>
                    <View style={{alignItems:"center", justifyContent:"center", marginHorizontal:20,}}>
                        <AntDesign name="plus" size={24} color="white"/>
                        <Text style={{color:"grey", fontSize:11, paddingTop:5}}>MyList</Text>    
                    </View>
                    <View style={{alignItems:"center", justifyContent:"center", marginHorizontal:20,}}>
                        <Feather name="thumbs-up" size={24} color="white"/>
                        <Text style={{color:"grey", fontSize:11, paddingTop:5}}>Like</Text>    
                    </View>
                    <View style={{alignItems:"center", justifyContent:"center", marginHorizontal:20,}}>
                        <Feather name="send" size={24} color="white"/>
                        <Text style={{color:"grey", fontSize:11, paddingTop:5}}>Share</Text>    
                    </View>
                </View>
                <View style={{flexDirection:"row", alignItems: 'center',  }}>
                    <View style={{marginTop:5, paddingLeft:10,}}>
                        <View style={{width:130,borderBottomColor:"red", borderStyle:'solid',borderWidth:2, paddingBottom:5}}>
                            { currentSeason && (
                            <Picker 
                            selectedValue={currentSeason.name} 
                            onValueChange={(itemValue, itemIndex) => {
                            setCurrentSeason(seasons[itemIndex]) 
                            }} 
                            itemStyle={{backgroundColor:"black"}}
                            style={{color:"white", width:135, backgroundColor:"black",zIndex:1, }}
                            dropdownIconColor='black'>
                                {seasonNames.map(seasonName => (
                                <Picker.Item style={{backgroundColor:"black"}} label={seasonName} value={seasonName} key={seasonName} />
                                ))}
                            </Picker>
                            )}
                        </View>
                    </View>
                    <View style={{position:"absolute", marginTop:2}}>
                        <View style={{marginLeft:130}}>
                            <AntDesign name="downcircleo" size={13} color="white" />
                        </View>
                    </View>
                </View>
                <View style={{marginTop:5, paddingLeft:10, paddingRight:10,}}>
                    <FlatList
                    nestedScrollEnabled 
                    data={episodes}
                    renderItem={({ item }) =>(<EpisodeItem episode={item} onPress={setCurrentEpisode}/>)}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MovieDetailScreen

const styles = StyleSheet.create({
    image:{
        width:"100%",
        aspectRatio:16/9,
        resizeMode:"cover"
    },
    title:{
        fontWeight:"bold",
        fontSize:30,
        color:"white",
        paddingLeft:10,
        paddingTop:5,
    },
    match:{
        color:"green",
        fontWeight:"500",
        
    },
    ageContainer:{
        backgroundColor:'#e6e229',
        justifyContent:"center",
        alignItems:"center",
        borderRadius:2,
        paddingHorizontal:1,
        paddingVertical:1,
        marginLeft:10,
        marginTop:-5,
    },
    year:{
        color:"grey",
        marginLeft:10,
    },
    age:{
        color:"black",
        fontWeight:"bold"
    },
    playBtn:{
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        padding:5,
        borderRadius:5,
    },
    playTextButton:{
        fontSize:16,
        fontWeight:"bold",
        marginTop:2,
        color:"black"
    },
    downloadBtn:{
        backgroundColor:"#1b1b1b",
        justifyContent:"center",
        alignItems:"center",
        padding:5,
        borderRadius:5,
    },
    downloadTextButton:{
        fontSize:16,
        fontWeight:"bold",
        marginTop:2,
        color:"white",
        marginLeft:5,
    }
})
