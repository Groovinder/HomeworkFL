import { Text, TextInput, StyleSheet, Pressable, View } from 'react-native'
import { useState, useEffect} from 'react';

export function AuthForm (props: any){
    //initialize getter and setters
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    //validate email input
    useEffect(() => {
        if (email.length > 0 && email.indexOf('@') > 0) {
            setValidEmail(true);
        }
        else {
            setValidEmail(false);
        }
    }, [email]);

    //validate password input
    useEffect(() => {
        if (password.length > 0) {
            setValidPassword(true);
        }
        else {
            setValidPassword(false);
        }
    }, [password]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput 
             style={styles.input}
             value={email}
             onChangeText={(text) => setEmail(text)}
             />
            <Text style={styles.label}>Password</Text>
            <TextInput 
             style={styles.input} 
             value={password} 
             onChangeText={(text) => setPassword(text)} 
             secureTextEntry={true}/>
            <Pressable 
             style={(validEmail && validPassword) ? styles.button : styles.buttonDisabled}
             onPress = {() => props.action(email, password)}
             disabled = {(validEmail && validPassword) ? false : true}>
                <Text style={styles.buttonText}>{props.actionText}</Text>
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        backgroundColor: '#CCCCFF',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#BF40BF',
        textAlign: 'center',
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        color: '#BF40BF',
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: '#FF00FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonDisabled: {
        backgroundColor: '#lightgray',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5,
        marginBottom: 5,
    },
    buttonText: {
        color: 'lightgray',
        fontSize: 20,
    },
})