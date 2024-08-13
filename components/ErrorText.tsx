import { View, Text, StyleSheet } from 'react-native'
import {useEffect, useState} from 'react'

export default function ErrorText(props:any) {
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        if (props.errorText) {
            const message: string = props.errorText
            const slashIndex: number = props.errorText.indexOf('/')
            setErrorText(message.slice(slashIndex + 1, message.length).replaceAll('-', ' '))
        }
        else {
            setErrorText('')
        }
    }, [props.errorText])

    if (errorText) {
        return (
            <View style={styles.background}>
            <Text style={styles.text}>{errorText}</Text>
            </View>
            )}
            else {
                return null
            }
}
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20,
    },
    background: {
        backgroundColor: '#CCCCFF',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        width: 250,
    }
})
