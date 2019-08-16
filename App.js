import React, {Fragment, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
} from 'react-native';
import Login from './component/Login';
import {createStackNavigator, createAppContainer} from 'react-navigation'



const Home = (props) => {
    const [text, setText] = useState('Drago');
    const handleChangeText = (text) => {
        setText(text);
    };
    return (
        <Fragment>
                    <View style={styles.container}>
                        <Text style={styles.titleText}>Ovo je moja aplikacija</Text>
                        <TextInput value={text} onChangeText={handleChangeText}/>
                    </View>
        </Fragment>
    );
};

Home.navigationOptions =  ({ navigation }) => ({
    title: 'Home',
    headerRight: (
        <Button
            onPress={() => navigation.navigate('Login')}
            title="Login"
            color="darkorange"
        />),
});

const styles = StyleSheet.create({
    container: {
        marginTop:34,
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


const MainNavigator = createStackNavigator(
    {
        Home: {screen: Home},
        Login:{screen:Login},
    }, {
        initialRouteName: "Home",
        defaultNavigationOptions:{
            headerStyle:{
            backgroundColor:'blue',
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
