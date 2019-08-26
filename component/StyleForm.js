import {StyleSheet} from 'react-native';

export default  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content:{
        flex: 1,
        backgroundColor: '#4734ac',
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 22,
        color: 'white',
        padding: 10,
    },
    buttonStyle: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#202646',
        borderRadius: 5,
    }, textStyle: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
});