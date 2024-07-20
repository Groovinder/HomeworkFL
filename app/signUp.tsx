import { Pressable, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '../components/AuthForm'
import { useContext } from 'react'
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'

export default function SignUp(props:any){
    const auth = useContext(AuthContext);
    if (!auth){
        console.error("auth context not found")
        return <Text>Auth context not found</Text>
    }
    const signUp = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("success")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("here")
                console.log(errorCode, errorMessage)
                // ..
            });
    }
    return (
        <View>
        <AuthForm title="Sign up" actionText="Sign up" action = {signUp}/>
        <View >
            <Text >Already have an account?<Link href='/'>
                <Text> Sign In</Text>
            </Link></Text>
        </View>
    </View>
    )
}