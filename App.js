import React, {Fragment, useState} from 'react';
import {
    Dimensions,
    Button,
} from 'react-native';
import Login from './component/Login';
import AuthLoadingScreen from "./component/AuthLoadingScreen";
import Other from "./component/Other";
import Building from "./component/Building";
import Room from "./component/Room";
import Location from "./component/Location";
import Person from "./component/Person";
import Resource from './component/Resource';
import Transition from "./component/Transition";
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createMaterialTopTabNavigator,
    createDrawerNavigator,
} from 'react-navigation';

const BuildingNavigator = createStackNavigator({
    BuildingRoom: Building
    , Room: Room, Location: Location,
}, {
    initialRouteName: 'BuildingRoom',
});
const WIDTH=Dimensions.get('window').width;

const PersonNavigator = createStackNavigator({Person: Person}, {initialRouteName: 'Person'});
const ResourceNavigator=createStackNavigator({Resource:Resource},{initialRouteName: 'Resource'});
const TransitionNavigator=createStackNavigator({Transition:Transition},{initialRouteName:'Transition'});

const AppNavigator = createDrawerNavigator({
    Building: BuildingNavigator,
    Person: PersonNavigator,
    Resource: ResourceNavigator,
    Transition:TransitionNavigator,
}, {initialRouteName: 'Building',
    drawerWidth:WIDTH*0.5,
});


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
