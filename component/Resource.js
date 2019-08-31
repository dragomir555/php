import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    FlatList,
    LayoutAnimation,
    Button,
    RefreshControl,
    ScrollView
} from "react-native";
import Modal from "react-native-modal";
import React, {Fragment, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import StyleFlexList from "./StyleFlexList";
import styles from './StyleForm';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';


const Resource = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('Drago');
    const [resource, setResource] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [person, setPerson] = useState(null);
    const [building, setBuilding] = useState(null);
    const [expandRes, setexpandRes] = useState(null);
    const [internLoading, setInternLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleChangeText = (text) => {
        setText(text);
    };

    const _onRefresh = async () => {
        setRefreshing(true);
       await fetchData(false);
        setRefreshing(false);
    };


    const changeLayout = async (k) => {
        let per;
        let loc;

        setexpandRes(k);

        async function fetchPerson() {
            const token = await AsyncStorage.getItem('userToken');
            const PersonJson = await fetch(`https://pisio.etfbl.net/~dragov/mojprojekat/rest/resources/${k.id}/person/${token}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const PersoneObj = await PersonJson.json();
            setPerson(PersoneObj);
            per = PersoneObj;
        }

        async function fetchLocation() {
            const token = await AsyncStorage.getItem('userToken');
            const LocationJson = await fetch(`https://pisio.etfbl.net/~dragov/mojprojekat/rest/resources/${k.id}/location/${token}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const LocationObj = await LocationJson.json();
            setBuilding(LocationObj);
            loc = LocationObj;
        }

        setInternLoading(true);
        await fetchPerson();
        await fetchLocation();
        console.log(per, building);
        setInternLoading(false);

        setExpanded(true);
    };

    const fetchData=async(spinner) =>{
        setLoading(spinner);
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
            {isLoading ? <View>
                    <ActivityIndicator size='large' color='red'/>
                </View>
                :
                <View style={styles.content}>
                    <Modal
                        style={{margin: 50, backgroundColor: '#4734ac', color: 'white'}}
                        backdropOpacity={0.8}
                        isVisible={expanded}
                    >
                        {(person !== null && building !== null) ?
                            <View style={{flex: 1, padding: 5}}>
                                <Text style={modal.title}>{expandRes.name}</Text>
                                <Text style={modal.text}>{'Inventory number: ' + expandRes.inv_number}</Text>
                                <Text style={modal.text}>{'Type: ' + expandRes.type}</Text>
                                <Text style={modal.text}>{'Description: ' + expandRes.description}</Text>
                                <Text style={modal.text}>{'Purchase Date: ' + expandRes.purchase_date}</Text>
                                <Text style={modal.text}>{'Purchase Price: ' + expandRes.purchase_price}</Text>
                                <Text style={modal.text}>{'Amortization: ' + expandRes.amortization}</Text>
                                <Text
                                    style={modal.text}>{'Responsible Person: ' + (person.id != null ? person.name : '')}</Text>
                                <Text
                                    style={modal.text}>{'Current Location: ' + (building.roomIdroom != null ? (building.roomIdroom.buildingIdbuilding.name + '->'
                                    + building.roomIdroom.name + '->' + building.description) : '')}</Text>
                            </View> : null}
                        <Button title="Hide modal" onPress={() => {
                            setExpanded(false)
                        }}/>
                    </Modal>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={_onRefresh}
                            />}
                    >
                        <Text style={styles.titleText}>
                        </Text>
                        <FlatList
                            {...props} data={resource} ItemSeparatorComponent={_renderSeparator}
                                  renderItem={({item}) => {
                                      return renderItem(item, props.navigation, changeLayout);
                                  }}/></ScrollView>
                </View>}
        </View>
    );
};

const _renderSeparator = () => {
    return <View
        style={StyleFlexList.separator}
    />
};

const renderItem = (prop, navigation, changeLayout) => {
    const k = 10;
    return <TouchableOpacity onPress={() => {
        changeLayout(prop);
    }}>
        <View style={StyleFlexList.container}>
            <Text style={StyleFlexList.title}>{prop.name}</Text>
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

const modal = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 18
    },
    text: {
        color: 'white',
        fontSize: 14
    }

});

export default Resource;