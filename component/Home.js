import {
    AsyncStorage,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, {Fragment, useState} from 'react';
import HeaderNavigationBar from "./HeaderNavigationBar";

const Home = (props) => {
    const [text, setText] = useState('Drago');
    const handleChangeText = (text) => {
        setText(text);
    };
    const checkId = async () => {
        let id = await AsyncStorage.getItem('id');
        let auth_id = await AsyncStorage.getItem('userToken');
        console.log(id, auth_id);
    };

    checkId();
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>
            <HeaderNavigationBar {...props} titleName='Home'/>
            <View style={{
                flex: 1,
                backgroundColor: '#4734ac',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{fontWeight: 'bold', fontSize: 22, color: 'white'}}>
                    This is Info Screen
                </Text>

            </View>
        </View>
    );
};
/*
Home.navigationOptions = ({navigation}) => ({
    title: 'Home',
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

export default Home;