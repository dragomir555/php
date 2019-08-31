import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator, TouchableOpacity, TouchableHighlight, Image, ScrollView, RefreshControl
} from "react-native";
import React, {Fragment, useState, useEffect} from 'react';
import StyleFlexList from "./StyleFlexList";
import styles from './StyleForm';
import AsyncStorage from '@react-native-community/async-storage';


const Building = (props) => {
    const [buildings, setBuildings] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const _onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const fetchData = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        const buildings = await fetch('https://pisio.etfbl.net/~dragov/mojprojekat/rest/buildings/' + token, {
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


    useEffect(() => {
        fetchData();
    }, []);//Ako stavimo nesto u zagrade uradice se rerun samo kad se to promjeni

    const _renderSeparator = () => {
        return <View
            style={StyleFlexList.separator}
        />
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
                }}>
                {isLoading ? <View>
                        <ActivityIndicator size='large' color='red'/>
                    </View>
                    :
                    <View style={styles.content}>
                        <Text style={styles.titleText}>
                            {}
                        </Text>
                        <View style={{marginBottom: 20}}>
                            <FlatList  {...props} data={buildings} ItemSeparatorComponent={_renderSeparator}
                                       renderItem={({item}) => {
                                           return renderItem(item, props.navigation);
                                       }}/>
                        </View>
                    </View>}
            </ScrollView>
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
            buildingName: prop.name,
            coordinate: {
                longitude: prop.longitude,
                latitude: prop.latitude,
            },
            longitude: prop.longitude,
            latitude: prop.latitude,
        });
    }}>
        <View style={StyleFlexList.container}>
            <Text style={StyleFlexList.title}>{prop.name}</Text>
            <Text style={StyleFlexList.content}>{'code: ' + prop.code}</Text>
        </View>
    </TouchableOpacity>;
};

export default Building;