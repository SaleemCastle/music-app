import React, { useEffect, useState } from 'react'
import { Text, View, Button, Image } from 'react-native'
import LottieView from 'lottie-react-native'
import TrackPlayer from 'react-native-track-player'
import SplashScreen from 'react-native-splash-screen'


import MusicFiles, { Constants} from 'react-native-get-music-files-v3dev-test'


const Home = () => {
    const [tracks, setTracks] = useState([])
    useEffect(() => {
        MusicFiles.getAll({
            cover: false,
            batchSize: 0,
            batchNumber: 0,
            sortBy: Constants.SortBy.Title,
            sortOrder: Constants.SortOrder.Ascending
        }).then(tracks => {
            setTracks(tracks.results)
            console.log(tracks)
        })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    const startTrack = async () => {
        console.log('Init Player')
        console.log(`file://${tracks[0].path}`)
        // Set up the player
        await TrackPlayer.setupPlayer()
        await TrackPlayer.reset()
	
        // Add a track to the queue
        await TrackPlayer.add({
            id: tracks[0].id,
            url: `file://${tracks[0].path}`,
            title: tracks[0].title,
            artist: 'Mike Sabath',
            duration: (+(tracks[0].duration)) / 1000,
            artwork: require('../../assets/goodEnergy.jpg')
        })

        const current = await TrackPlayer.getCurrentTrack()
        console.log('Current Track', current)
        // Start playing it
        TrackPlayer.play()
    }
    const stopTrack = async () => {
        await TrackPlayer.stop()
    }
    return (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: 'rgb(0, 10, 23)'}}>
            <Text>
                {'HomeScreen'}
            </Text>
            <Text style={{color: 'white'}}>Track Details</Text>
            <View style={{position: 'relative'}}>
                <View style={
                    {
                        height: 60, 
                        width: 60, 
                        borderRadius: 35,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        left: 15,
                        top: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }>
                    <Image source = {require('../../assets/play1.png')} style={{width: 25, height: 28}}/>
                </View>
                {
                    // tracks.map( (track, index) => (
                    // 	<View key={index} style={{width: 250, height: 250, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(25,26,46)', marginVertical: 10}}>
                    // 		<Text style={{color: 'white'}}>{`Track Album: ${track.album}`}</Text>
                    // 		<Text style={{color: 'white'}}>{`Artist: ${track.artist}`}</Text>
                    // 		<Text style={{color: 'white'}}>{`Duration: ${track.duration}`}</Text>
                    // 		{/* <Text style={{color: 'white'}}>{`Path: ${track.path}`}</Text> */}
                    // 		<Text style={{color: 'white'}}>{`Title ${track.title}`}</Text>
                    // 	</View>
                    // ))
                }
                <LottieView source={require('../../assets/lottie-animations/10614-loader2.json')} autoPlay loop style={{width: 100, height: 80}} />
            </View>
            <Button onPress={startTrack} title={'Play Track'} />
            <View style={{height: 10}} />
            <Button onPress={stopTrack} title={'Stop Track'} />
        </View>
    )
}

export default Home
