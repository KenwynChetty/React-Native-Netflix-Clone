import React, {useState, useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Category, Movie } from "../src/models"
import {DataStore} from '@aws-amplify/datastore'


interface HomeScreenCategoryProps{
    category: Category, 
}

const HomeScreenCategory = (props:HomeScreenCategoryProps) => {
    const {category} =props;
    const [movies, setMovies] = useState<Movie[]>([])

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const AVATAR_SIZE = 135;
    const ITEM_SIZE = AVATAR_SIZE
    const navigation = useNavigation()
    const onMoviePress = (movie: Movie) =>{
        navigation.navigate('MovieDetailScreen', {id: movie.id})
    }

    useEffect(() =>{
        const fetchMovies = async () =>{
            const result = (await DataStore.query(Movie)).filter((movie) => movie.categoryID === category.id )
            setMovies(result)
        };
        fetchMovies();
    },[])

    return (
        <View>
            <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginLeft:5,}}>{category.title}</Text>
            <Animated.FlatList horizontal={true}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{useNativeDriver:true})} 
            showsHorizontalScrollIndicator={false} 
            
            data={movies} 
            renderItem={({item, index}) =>{
                const inputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 2)
                ]
                const opacityInputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 1)
                ]
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange:[1,1,1,0]
                })
                const opacity = scrollX.interpolate({
                    inputRange:opacityInputRange,
                    outputRange:[1,1,1,0]
                })
            return  <Animated.View style={{transform:[{scale}],opacity}}>
                        <TouchableOpacity style={{width:140}} onPress={() => onMoviePress(item)}>
                            <Image style={styles.image} source={{uri:item.poster}}/>
                        </TouchableOpacity>
                    </Animated.View>
            }}/>
        </View>
    )
}

export default HomeScreenCategory

const styles = StyleSheet.create({
    image:{
        width:135,
        height:175,
        resizeMode:"cover",
        margin:5,
        borderRadius:10,
    },
    
})