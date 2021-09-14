import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { AntDesign } from "@expo/vector-icons"
import { Episode } from "../src/models"

interface EpisodeItemProps {
    episode: Episode;
    onPress: (episode:Episode) => {}
}

const EpisodeItem = (props:EpisodeItemProps) => {
    const {episode, onPress} = props
    return (
        <Pressable style={{marginTop:10,}} onPress={() =>onPress(episode)}>
            <View style={styles.row}>
                <Image style={styles.image} source={{uri: episode.poster}} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{episode.title}</Text>
                    <Text style={styles.duration}>{episode.duration}</Text>
                </View>
                <AntDesign name="download" size={24} color="grey" />
            </View>
            <Text style={styles.plot}>{episode.plot}</Text>
        </Pressable>
    )
}

export default EpisodeItem

const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: 'center',
    },
    image:{
        height:75,
        width:125,
        resizeMode:"cover",
        borderRadius:5,
    },
    titleContainer:{
        flex:1,
        padding:5,
        justifyContent:'center', 
    },
    title:{
        color:"white"
    },
    duration:{
        color:"grey"
    },
    plot:{
        color:"grey",
        marginTop:5,
        fontSize:12,
    },

})
