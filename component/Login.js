import React, {Fragment, useState} from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
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
            setLoading(false);
            if (res.status === 401) {
                throw new Error('Error');
            }
            return res.json();
        }).then(res => {
            // console.log(res.auth_key,res.id)

            // console.log(res);
            if (res.auth_key && res.id) {
                AsyncStorage.setItem("userToken", res.auth_key).then(() => {
                    AsyncStorage.setItem('id', '' + res.id);
                }).then(res => {
                    props.navigation.navigate('Building');
                });
            }
        }).catch(err => {
            setLoading(false);
           Alert.alert('Login error','The username or password is incorrect');
        });

    };
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            {loading ? <View>
                    <Text style={{fontSize: 30, color: 'blue'}}>Loading...</Text>
                    <ActivityIndicator size={'large'} color={'blue'}/>
                </View> :
                <ScrollView>
                    <KeyboardAvoidingView style={styleLogin.containerView} behavior="padding" enabled>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styleLogin.loginScreenContainer}>
                                <Text style={styleLogin.logoText}>UNIBL</Text>
                                <TextInput
                                    placeholder="Username"
                                    style={styleLogin.loginFormTextInput}
                                    placeholderColor="#c4c3cb"
                                    onChangeText={(value) => {
                                        setUsername(value);
                                    }}
                                />
                                <TextInput
                                    placeholder="Password"
                                    style={styleLogin.loginFormTextInput}
                                    placeholderColor="#c4c3cb"
                                    secureTextEntry={true}
                                    onChangeText={(value) => {
                                        setPassword(value);
                                    }}
                                />
                                <View style={{margin: 20, borderRadius: 5, backgroundColor: 'green'}}>
                                    <Button title='Log in'
                                            onPress={handleLogin}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </ScrollView>}
        </SafeAreaView>
    );
};

Login.navigationOptions = {
    title: 'Login',
};

const styleLogin = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
    },
    fbLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
    },
});


export default Login;
