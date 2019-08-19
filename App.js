import React, {Fragment, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    AsyncStorage,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
} from 'react-native';
import Login from './component/Login';
import AuthLoadingScreen from "./component/AuthLoadingScreen";
import Other from "./component/Other";
import Home from "./component/Home";
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createMaterialTopTabNavigator,
    createDrawerNavigator,
} from 'react-navigation';


const AppNavigator = createDrawerNavigator({Home: Home, Other: Other}, {initialRouteName: 'Home'});
//const StackNavigator = createStackNavigator({App: AppNavigator}, {initialRouteName: 'App'});


const MainNavigator = createSwitchNavigator(
    {
        CheckAuth: {screen: AuthLoadingScreen},
        App: {screen: AppNavigator},
        Login: {screen: Login},
    }, {
        initialRouteName: 'CheckAuth',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'blue',
            },
            headerTintColor: 'white',
            headerRight: (
                <Button
                    onPress={() => this.props.navigation.navigate('Login')}
                    title="Login"
                    color="darkorange"
                />),
        },
    }
);


//const App =
export default createAppContainer(MainNavigator);
//export default App;
