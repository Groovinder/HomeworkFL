import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '../components/AuthForm'
import { useContext } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useRouter } from 'expo-router'

export default function Login(props:any){
  const router = useRouter();
  const auth = useContext(AuthContext);
  if (!auth){
    console.error("auth context not found")
    return <Text>Auth context not found</Text>
}
else{
    console.log("auth is here")
}
 //Sign in with Firebase
 const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log("success")
            router.replace("/(tabs)")
        })
        .catch((error) => {
            console.log(error)
            // ..
        });
 }
  return (
    <View>
    <AuthForm title="Sign in" actionText="Sign in" action = {signIn} />
    <View style={styles.container}>
      <Text style={styles.text} >Don't have an account?<Link style={styles.link} href='/signUp'>
        <Text style={styles.linkText}> Sign Up Here!</Text>
      </Link></Text>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flexDirection: "row-reverse",
      alignItems: 'flex-end',
  },
  link: {
      marginRight: 30,
  },
  linkText: {
      fontSize: 20,
      color: '#2e78b7',
  },
  text: {
      fontSize: 20,
  },

})