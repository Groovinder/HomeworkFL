import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100340',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
        borderRadius : 10,
        borderColor : '#BF40BF',
        borderWidth : 3,
        width : '100%',
        height : '10%',
        paddingTop : '2%',
    },

    label: {
        fontSize: 20,
        marginBottom: 5,
        color: 'white',
    },
    icon: {
        marginBottom: 0,
    },

    button: {
        backgroundColor: '#BF40BF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },

    buttonText: {
        marginBottom: -3,
        color: 'white',
        textAlign: 'center',
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        width: '100%',
        color: 'white',
        backgroundColor: '#CCCCFF'
    },
    listItem : {
        backgroundColor: '#CCCCFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    list : {
        flex : 1,
        width: '90%',
    },

    listTextTitle : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
    listText : {
        fontSize: 25,
        marginBottom: 5,
        color: 'white',
    },
    goalText : {
        fontSize: 20,
        marginBottom: 5,
        color: 'green',
    }
})

export default styles