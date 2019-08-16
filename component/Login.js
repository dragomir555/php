import React, {Fragment,useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
} from 'react-native';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin=()=>{
        fetch('https://pisio.etfbl.net/~dejanm/project/rest/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(res=>{
          return  res.json();
        }).then(res=>{
            console.log(res.auth_key,res.id);
        }).catch(err=>{
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
                onChangeText={(value)=>{setUsername(value);}}
            />
                <TextInput
                    placeholder="Password"
                    underlineColorAndroid='transparent'
                    onChangeText={(value)=>{setPassword(value);}}
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
    }, titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
});

export default Login;
