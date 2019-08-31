import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, TouchableHighlight, Image, ActivityIndicator, FlatList,ScrollView,RefreshControl

} from "react-native";
import React, {Fragment, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import StyleFlexList from "./StyleFlexList";
import styles from './StyleForm';


const Transition = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('Drago');
    const [transition, setTransition] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const _onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };


    const fetchData=async ()=>{
        setLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        const TransitionJson = await fetch(`https://pisio.etfbl.net/~dragov/mojprojekat/rest/transits/${token}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const TransitionObj = await TransitionJson.json();
        setTransition(TransitionObj);
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    //Kako pozvati unutar navigationOPtions
    const logout = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {isLoading ? <View>
                    <ActivityIndicator size='large' color='red'/>
                </View>
                :
                <View style={styles.content}>
                    <Text style={styles.titleText}>

                    </Text>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={_onRefresh}
                            />}
                        contentContainerStyle={{
                            flex: 1
                        }}
                    >
                    <FlatList {...props} data={transition} ItemSeparatorComponent={_renderSeparator}
                              renderItem={({item}) => {
                                  return renderItem(item, props.navigation);
                              }}/>
                    </ScrollView>
                </View>}
        </View>
    );
};

const _renderSeparator = () => {
    return <View
        style={StyleFlexList.separator}
    />
};

const renderItem = (prop, navigation) => {
    return <TouchableOpacity>
        <View style={StyleFlexList.container}>
            <Text style={StyleFlexList.title}>{'Transition code: ' + prop.id}</Text>
            <Text style={StyleFlexList.content}>{'Resource: ' + prop.resourceIdresource.name}</Text>
            <Text style={StyleFlexList.content}>{'Transition time: ' + prop.createdTime}</Text>
            <Text style={StyleFlexList.content}>{'Person from: ' + prop.personIdpersonFrom.name}</Text>
            <Text style={StyleFlexList.content}>{'Person to: ' + prop.personIdpersonTo.name}</Text>
            <Text style={StyleFlexList.content}>{'Location from: ' + (prop.locationIdlocationFrom.roomIdroom.buildingIdbuilding.name+'->'
                +prop.locationIdlocationFrom.roomIdroom.name+'->'+ prop.locationIdlocationFrom.description)}</Text>
            <Text style={StyleFlexList.content}>{'Location to: '+(prop.locationIdlocationTo.roomIdroom.buildingIdbuilding.name+'->'
                +prop.locationIdlocationTo.roomIdroom.name+'->'+ prop.locationIdlocationTo.description)}</Text>
        </View>
    </TouchableOpacity>;
};


Transition.navigationOptions = ({navigation}) => ({
    title: 'Transition',
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
        </TouchableOpacity>), headerLeft: (
        <TouchableHighlight style={{marginLeft: 10, marginTop: 12}}
                            onPress={() => {
                                navigation.openDrawer();
                            }}>
            <Image
                style={{width: 32, height: 32}}
                source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
            />
        </TouchableHighlight>
    ),
});


export default Transition;