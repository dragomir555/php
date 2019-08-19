import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, TouchableHighlight, Image,

} from "react-native";
import React, {Fragment, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';





const Person = (props) => {
    const [text, setText] = useState('Drago');
    const handleChangeText = (text) => {
        setText(text);
    };
    const checkId = async () => {
        let id = await AsyncStorage.getItem('id');
        let auth_id = await AsyncStorage.getItem('userToken');
        console.log(id, auth_id);
    };

    //Kako pozvati unutar navigationOPtions
    const logout = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    };
    checkId();
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>
            <View style={{
                flex: 1,
                backgroundColor: '#4734ac',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    Ovo su zgrade
                </Text>

            </View>
        </View>
    );
};

Person.navigationOptions = ({ navigation }) => ({
    title: 'Persons',
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
        </TouchableOpacity>),  headerLeft:(
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

export default Person;