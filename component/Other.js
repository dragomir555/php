import {AsyncStorage, Button, StyleSheet, Text, TextInput, View,StatusBar} from "react-native";
import React, {Fragment, useState} from 'react';
import HeaderNavigationBar from "./HeaderNavigationBar";




const Other = (props) => {
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
            <HeaderNavigationBar {...props} titleName='Other'/>
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

/*
Other.navigationOptions = ({navigation}) => ({
    title: 'Other',
    headerRight: (
        <Button
            onPress={() => {
                AsyncStorage.clear();
                navigation.navigate('Login');
            }}
            title="Logout"
            color="darkorange"
        />),
});*/

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
});

export default Other;