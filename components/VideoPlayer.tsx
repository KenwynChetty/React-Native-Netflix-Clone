import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View,} from 'react-native'
import { Video } from 'expo-av'
import { Episode } from "../src/models"
import * as ScreenOrientation from 'expo-screen-orientation';
import { Playback } from 'expo-av/build/AV'


interface VideoPlayerProps{
    episode:Episode
}


const VideoPlayer = (props:VideoPlayerProps) => {
    const {episode} = props 
    const video = useRef<Video>(null)
    const [status, setStatus] = useState({})
    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);


    useEffect(() => {
        if(!video){
            return;
        }
        (async () =>{
            await video?.current?.unloadAsync()
            await video?.current?.loadAsync(
                {uri: episode.video},
                {},
                true
            )
        })();
    }, [episode])
    
    return (
        <View>
            <Video 
            ref={video}
            style={styles.video}
            source={{uri:episode.video}}
            useNativeControls
            resizeMode="contain"
            posterStyle={{resizeMode:"cover"}}
            isLooping={false}
            posterSource={{uri:episode.poster}}
            usePoster={false}
            shouldPlay={true}
            onPlaybackStatusUpdate={status => setStatus(() => status )}
            onFullscreenUpdate={async () => {
                await ScreenOrientation.lockAsync(
                  orientationIsLandscape ? ScreenOrientation.OrientationLock.PORTRAIT : 
                  ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
              );
              setOrientationIsLandscape(!orientationIsLandscape);
            }}/>
            
        </View>

    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    video:{
        width:"100%",
        aspectRatio:16/9,
    }
})
