import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    ActivityIndicator, Dimensions, TouchableOpacity, TouchableHighlight, Image
} from "react-native";
import React, {Fragment, useState, useEffect} from 'react';
import HeaderNavigationBar from "./HeaderNavigationBar";
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

const Building = (props) => {
    const [text, setText] = useState('Drago');
    const [buildings, setBuildings] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const buildings = await fetch('https://pisio.etfbl.net/~dragov/mojprojekat/building-rest/' + token, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const buildingJson = await buildings.json();
            setBuildings(buildingJson);
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
    const checkId = async () => {
        let id = await AsyncStorage.getItem('id');
        let auth_id = await AsyncStorage.getItem('userToken');
        console.log(id, auth_id);
    };

    checkId();
    console.log(buildings);


    const _renderSeparator = () => {
        return <View
            style={styles.separator}
        />
    };

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>
            {isLoading ? <View>
                    <ActivityIndicator size='large' color='red'/>
                </View>
                :
                <View style={{
                    flex: 1,
                    backgroundColor: '#4734ac',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        color: 'white',
                        padding:10
                    }}>
                        Buildings
                    </Text>
                    <FlatList {...props} data={buildings} ItemSeparatorComponent={_renderSeparator}
                              renderItem={({item}) => {
                                  return renderItem(item,props.navigation);
                              }}/>
                </View>}
        </View>
    );
};

Building.navigationOptions = ({ navigation }) => ({
    title: 'Building',
    headerTitleStyle: { alignSelf: 'center',flex:1,textAlign: 'center' },
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
    headerLeft:(
        <TouchableHighlight style={{marginLeft: 10, marginTop: 12}}
                            onPress={() => {
                              navigation.openDrawer();
                            }}>
            <Image
                style={{width: 32, height: 32}}
                source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
            />
        </TouchableHighlight>
    )

});

const renderItem = (prop,navigation) => {
    return <TouchableOpacity onPress={()=>{navigation.navigate('Room')}}>
    <View style={stylesListItem.container}>
        <Text style={stylesListItem.title}>{prop.name}</Text>
        <Text style={stylesListItem.content}>{'code: ' + prop.code}</Text>
        <Text style={stylesListItem.content}>{'code: ' + prop.code}</Text>
    </View>
    </TouchableOpacity>;
};


const stylesListItem = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e6e6ee',
    },
    title: {
        fontSize: 18,
    },content:{
        fontSize:14,
    },
});

const styles = StyleSheet.create({
    container: {
        marginTop: 34,
        flex: 1,
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    }, titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'red',
    },
    separator: {
        height: 5,
        width: '100%',
        backgroundColor: '#4734ac',
    },  buttonStyle: {
        marginRight:10,
        padding:10,
        backgroundColor: '#202646',
        borderRadius:5,
    },textStyle: {
        fontSize:16,
        color: '#ffffff',
        textAlign: 'center',
    }
});

export default Building;