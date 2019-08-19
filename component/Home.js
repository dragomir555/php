import {
    AsyncStorage,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from "react-native";
import React, {Fragment, useState} from 'react';


export const HeaderNavigationBar = (props) => {
    return (<View style={{
        height: 70,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }}>
        <TouchableHighlight style={{marginLeft: 10, marginTop: 12}}
                            onPress={() => {
                                props.navigation.openDrawer();
                            }}>
            <Image
                style={{width: 32, height: 32}}
                source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
            />
        </TouchableHighlight>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                AsyncStorage.clear();
                props.navigation.navigate('Login');
            }}
        >
            <Text> Touch Here </Text>
        </TouchableOpacity>

    </View>);
};


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
            <HeaderNavigationBar {...props} />
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