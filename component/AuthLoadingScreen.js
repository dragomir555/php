import React, {Fragment, useState} from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    ActivityIndicator,
    StatusBar,
} from 'react-native';


const AuthLoadingScreen = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const checkAuth = async () => {
        const userToken =await AsyncStorage.getItem('userToken');
        props.navigation.navigate(userToken ? 'Home' : 'Login');
    };
    checkAuth();
    return (
        <View>
            <ActivityIndicator/>
            <StatusBar barStyle="default"/>
        </View>
    );
};

AuthLoadingScreen.navigationOptions = {
    title: 'Login',
};
const styles = StyleSheet.create({});

export default AuthLoadingScreen;
