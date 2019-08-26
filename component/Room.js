import {
    Text,
    View,
    FlatList,
    ActivityIndicator, Dimensions, TouchableOpacity, TouchableHighlight, Image
} from "react-native";
import React, {Fragment, useState, useEffect} from 'react';
import StyleFlexList from "./StyleFlexList";
import styles from './StyleForm';
import AsyncStorage from '@react-native-community/async-storage';


const Room = (props) => {
    const [text, setText] = useState('Drago');
    const [rooms, setRooms] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const id = props.navigation.getParam('buildingId', null);

        async function fetchData() {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const roomsApi = await fetch(`https://pisio.etfbl.net/~dragov/mojprojekat/rest/rooms/building/${id}/${token}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const roomsObj = await roomsApi.json();
            setRooms(roomsObj);
            setError(false);
            setLoading(false);
        }

        fetchData();
    }, []);//Ako stavimo nesto u zagrade uradice se rerun samo kad se to promjeni
    useEffect(() => {
        console.log('text');
    }, [text]);


    const handleChangeText = (text) => {
        setText(text);
    };
    const _renderSeparator = () => {
        return <View
            style={StyleFlexList.separator}
        />
    };

    return (
        <View style={styles.container}>
            {isLoading ? <View>
                    <ActivityIndicator size='large' color='red'/>
                </View>
                :
                <View style={styles.content}>
                    <Text style={styles.titleText}>
                        {'Building: ' + props.navigation.getParam('buildingName')}
                    </Text>
                    <FlatList {...props} data={rooms} ItemSeparatorComponent={_renderSeparator}
                              renderItem={({item}) => {
                                  return renderItem(item, props.navigation);
                              }}/>
                </View>}
        </View>
    );
};

Room.navigationOptions = ({navigation}) => ({
    title: 'Rooms',
    headerTitleStyle: {alignSelf: 'center', flex: 1, textAlign: 'center'},
    headerRight: (
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
                AsyncStorage.clear();
                navigation.navigate('Login');
            }}
        >
            <Text style={styles.textStyle}> Logout </Text>
        </TouchableOpacity>),

});


const renderItem = (prop, navigation) => {
    return <TouchableOpacity onPress={() => {
        navigation.navigate('Location',{
            roomId:prop.id,
            roomName:prop.name,
            buildingName:navigation.getParam('buildingName'),
        })
    }}>
        <View style={StyleFlexList.container}>
            <Text style={StyleFlexList.title}>{prop.name}</Text>
            <Text style={StyleFlexList.content}>{'code: ' + prop.code}</Text>
            <Text style={StyleFlexList.content}>{'status: ' + (prop.active === '1' ? 'active' : 'inactive')}</Text>
        </View>
    </TouchableOpacity>;
};

export default Room;