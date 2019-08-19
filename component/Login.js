import React, {Fragment, useState} from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
} from 'react-native';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        fetch('https://pisio.etfbl.net/~dragov/mojprojekat/user-rest/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(res => {
            return res.json();
        }).then(res => {
            // console.log(res.auth_key,res.id)
            if (res.auth_key && res.id) {
                AsyncStorage.setItem("userToken", res.auth_key).then(() => {
                    AsyncStorage.setItem('id', '' + res.id);
                }).then(res => {
                    props.navigation.navigate('Home');
                });
            }
        }).catch(err => {
            console.log(err);
        });

    };
    return (
        <Fragment>
            <View style={styles.container}>
                <Text>- LOGIN -</Text>
                <TextInput
                    placeholder="Username"
                    underlineColorAndroid='transparent'
                    onChangeText={(value) => {
                        setUsername(value);
                    }}
                />
                <TextInput
                    placeholder="Password"
                    underlineColorAndroid='transparent'
                    onChangeText={(value) => {
                        setPassword(value);
                    }}
                />
                <Button title='Log in'
                        onPress={handleLogin}
                />
            </View>
        </Fragment>
    );
};

Login.navigationOptions = {
    title: 'Login',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }, titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
});


export default Login;
