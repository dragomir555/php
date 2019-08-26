import {
    Text,
    View,
    FlatList,
    ActivityIndicator, TouchableOpacity, TouchableHighlight, Image
} from "react-native";
import React, {Fragment, useState, useEffect} from 'react';
import StyleFlexList from "./StyleFlexList";
import styles from './StyleForm';
import AsyncStorage from '@react-native-community/async-storage';


const Building = (props) => {
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
                        Buildings
                    </Text>
                    <FlatList {...props} data={buildings} ItemSeparatorComponent={_renderSeparator}
                              renderItem={({item}) => {
                                  return renderItem(item, props.navigation);
                              }}/>
                </View>}
        </View>
    );
};

Building.navigationOptions = ({navigation}) => ({
    title: 'Building',
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
    headerLeft: (
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

const renderItem = (prop, navigation) => {
    return <TouchableOpacity onPress={() => {
        navigation.navigate('Room', {
            buildingId: prop.id,
            buildingName:prop.name,
        });
    }}>
        <View style={StyleFlexList.container}>
            <Text style={StyleFlexList.title}>{prop.name}</Text>
            <Text style={StyleFlexList.content}>{'code: ' + prop.code}</Text>
        </View>
    </TouchableOpacity>;
};


export default Building;