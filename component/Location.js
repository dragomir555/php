import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator, Dimensions, TouchableOpacity, TouchableHighlight, Image
} from "react-native";
import React, {Fragment, useState, useEffect} from 'react';
import StyleFlexList from "./StyleFlexList";
import styles from './StyleForm';
import AsyncStorage from '@react-native-community/async-storage';


const Location = (props) => {
    const [locations, setLocations] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const id = props.navigation.getParam('roomId');
            const token = await AsyncStorage.getItem('userToken');
            const buildings = await fetch(`https://pisio.etfbl.net/~dragov/mojprojekat/rest/locations/room/${id}/${token}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const buildingJson = await buildings.json();
            setLocations(buildingJson);
            setError(false);
            setLoading(false);
        }
        fetchData();
    }, []);//Ako stavimo nesto u zagrade uradice se rerun samo kad se to promjeni


    const _renderSeparator = () => {
        return <View
            style={styles.separator}
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
                        {props.navigation.getParam('buildingName') + '->' + props.navigation.getParam('roomName')}
                    </Text>
                    <FlatList {...props} data={locations} ItemSeparatorComponent={_renderSeparator}
                              renderItem={({item}) => {
                                  return renderItem(item, props.navigation);
                              }}/>
                </View>}
        </View>
    );
};

Location.navigationOptions = ({navigation}) => ({
    title: 'Locations',
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
    return <TouchableOpacity>
        <View style={StyleFlexList.container}>
            <Text style={StyleFlexList.title}>{'Location code: ' + prop.id}</Text>
            <Text style={StyleFlexList.content}>{'description: ' + prop.description}</Text>
            <Text style={StyleFlexList.content}>{'status: ' + (prop.active === '1' ? 'active' : 'inactive')}</Text>
        </View>
    </TouchableOpacity>;
};

export default Location;