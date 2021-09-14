import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

interface UpcomingItemsProps{
    upcoming:{
        id: string,
        title: string,
        imageLogo: string,
        plot: string,
        videoUrl: string,
        season:string,
        date:string,
    }
}

const UpcomingItems = (props: UpcomingItemsProps) => {
    const {upcoming} = props
    return (
        <View>
            <View style={styles.container}>
            <YoutubePlayer height={240} play={false} videoId={upcoming.videoUrl}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <View>
                    <Image style={styles.logo} source={{uri:upcoming.imageLogo}} />
                </View>
                <View style={{flexDirection:"column",alignItems: "center", marginTop:3,}}>
                    <FontAwesome name="bell" size={21} color="white" />
                    <Text style={{color:"white", marginTop:2,}}>Remind Me</Text>
                </View>
                <View style={{flexDirection:"column",alignItems: "center"}}>
                    <Ionicons name="ios-information-circle-outline" size={24} color="white" />
                    <Text style={{color:"white"}}>Info</Text>
                </View>
            </View>
            <View style={{paddingLeft:10, paddingRight:10, paddingTop: 5, paddingBottom:10,}}>
            <Text style={styles.plot}>{upcoming.season} coming on {upcoming.date}</Text>
            <Text style={styles.title}>{upcoming.title}</Text>
            <Text style={styles.plot}>{upcoming.plot}</Text>
            </View>
        </View>
    )
}

export default UpcomingItems

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%'
      },
      title:{
        fontSize:25,
        fontWeight:'bold',
        color:'white',
      },
      plot:{
        color: 'grey',
        paddingTop: 5,
      },
      logo:{
          height:60,
          width:175,
          resizeMode:'stretch',
          marginLeft:-10,
          marginTop:-20,
      }
})
