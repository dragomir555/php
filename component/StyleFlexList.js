import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        margin:5,
        borderRadius:5,
        flexDirection: 'column',
        backgroundColor: '#e6e6ee',
        padding:10,
        elevation:5,
    },
    title: {
        fontSize: 20,
    }, content: {
        fontSize: 16,
    },
    separator: {
        height: 7,
        width: '100%',
        backgroundColor: '#4734ac',
    },
});