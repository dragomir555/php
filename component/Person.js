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


const Person = (props) => {
    const[isLoading,setLoading]=useState(false);
    const [text, setText] = useState('Drago');
    const [people, setPeople] = useState([]);
    const handleChangeText = (text) => {
        setText(text);
    };
    const [refreshing, setRefreshing] = useState(false);

    const _onRefresh = async () => {
        setRefreshing(true);
        await fetchData(false);
        setRefreshing(false);
    };


    const fetchData=async(spinner)=>{
        setLoading(spinner);
        const token = await AsyncStorage.getItem('userToken');
        console.log('Dragomirrr');
        const personJson = await fetch(`https://pisio.etfbl.net/~dragov/mojprojekat/rest/people/${token}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const PersonObj = await personJson.json();
        setPeople(PersonObj);
        setLoading(false);
    }
    useEffect(() => {
        fetchData(true);
    }, []);

    //Kako pozvati unutar navigationOPtions
    const logout = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
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
            {isLoading ? <View>
                    <ActivityIndicator size='large' color='red'/>
                </View>
                :
                <View style={styles.content}>
                    <Text style={styles.titleText}>
                        {}
                    </Text>
                    <FlatList {...props} data={people} ItemSeparatorComponent={_renderSeparator}
                              renderItem={({item}) => {
                                  return renderItem(item, props.navigation);
                              }}/>
                </View>}
            </ScrollView>
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
            <Text style={StyleFlexList.title}>{ prop.name}</Text>
            <Text style={StyleFlexList.content}>{'contact: ' + prop.contact}</Text>
            <Text style={StyleFlexList.content}>{'title: ' + prop.title}</Text>
        </View>
    </TouchableOpacity>;
};



Person.navigationOptions = ({navigation}) => ({
    title: 'Persons',
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


export default Person;