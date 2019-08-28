import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, TouchableHighlight, Image, ActivityIndicator, FlatList,
} from "react-native";
import React, {Fragment, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import StyleFlexList from "./StyleFlexList";
import styles from './StyleForm';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';


const Resource = (props) => {
    const[isLoading,setLoading]=useState(false);
    const [text, setText] = useState('Drago');
    const [resource, setResource] = useState([]);
    const handleChangeText = (text) => {
        setText(text);
    };

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const ResourceJson = await fetch(`https://pisio.etfbl.net/~dragov/mojprojekat/rest/resources/${token}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const ResourceObj = await ResourceJson.json();
            setResource(ResourceObj);
            setLoading(false);
        }
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
                    <FlatList {...props} data={resource} ItemSeparatorComponent={_renderSeparator}
                              renderItem={({item}) => {
                                  return renderItem(item, props.navigation);
                              }}/>
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
            <Text style={StyleFlexList.title}>{ prop.name}</Text>
            <Text style={StyleFlexList.content}>{'Inventory number: ' + prop.inv_number}</Text>
            <Text style={StyleFlexList.content}>{'Type: ' + prop.type}</Text>
            <Text style={StyleFlexList.content}>{'Description: ' + prop.description}</Text>
            <Text style={StyleFlexList.content}>{'Purchase Date: ' + prop.purchase_date}</Text>
            <Text style={StyleFlexList.content}>{'Purchase Price: ' + prop.purchase_price}</Text>
            <Text style={StyleFlexList.content}>{'Amortization: ' + prop.amortization}</Text>
        </View>
    </TouchableOpacity>;
};



Resource.navigationOptions = ({navigation}) => ({
    title: 'Resource',
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


export default Resource;