import React, {Fragment, useState} from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const AuthLoadingScreen = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const checkAuth = async () => {
        const userToken =await AsyncStorage.getItem('userToken');
        props.navigation.navigate(userToken ? 'Building' : 'Login');
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
