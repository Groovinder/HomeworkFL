import { Pressable, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '../components/AuthForm'
import { useContext } from 'react'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'


export default function SignUp(props:any){
    const auth = useContext(AuthContext);
    if (!auth){
        console.error("auth context not found")
        return <Text>Auth context not found</Text>
    }
    else{
        console.log("auth is here")
    }
    const signUp = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log("success")
            })
            .catch((error) => {
                console.log(error)
                // ..
            });
            
    }
 /*const signUp2 = (email: string, password: string) => {
        console.log (email)
        console.log (password)
    }*/
   signUp("9478@ait.nsw.edu.au", "testtest")
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