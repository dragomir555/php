import {AsyncStorage, Image, StyleSheet, Text, TouchableHighlight,Dimensions, TouchableOpacity, View,Button} from "react-native";
import React from "react";

const { width, height } = Dimensions.get('window');

export const HeaderNavigationBar = (props) => {
    return (<View style={styles.container}>
        <TouchableHighlight style={{marginLeft: 10, marginTop: 12}}
                            onPress={() => {
                                props.navigation.openDrawer();
                            }}>
            <Image
                style={{width: 32, height: 32}}
                source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
            />
        </TouchableHighlight>
        <Text style={styles.headerName}>{props.titleName}</Text>
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
                AsyncStorage.clear();
                props.navigation.navigate('Login');
            }}
        >
            <Text style={styles.textStyle}> Logout </Text>
        </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
    container: {
       height:64,
        width:width,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }, titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'red',
    }, textStyle: {
        fontSize:16,
        color: '#ffffff',
        textAlign: 'center'
    },headerName:{
        color: '#202646',
        padding:10,
        fontSize:20,
    },
    buttonStyle: {
        marginRight:10,
        padding:10,
        backgroundColor: '#202646',
        borderRadius:5,
    },
});

export default HeaderNavigationBar;