import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '../components/AuthForm'
import { useContext } from 'react'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext'
import { doc, setDoc } from "firebase/firestore";


export default function SignUp(props:any){

    const router = useRouter();
    const auth = useContext(AuthContext);
    const FBdb = useContext(FirebaseDbContext);
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
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          //console.log("signed in")
          //create user in firestore
          setDoc(doc(FBdb, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            firstName: "",
            lastName: "",
            motto: "",
          })
          router.replace("/(tabs)")
          // ...
        } else {
          // User is signed out
          // ...
          console.log("signed out")
        }
    })
    return (
        <View>
        <AuthForm title="Sign up" actionText="Sign up" action = {signUp}/>
        <View style={styles.container} >
            <Text  style={styles.text}>Already have an account?<Link style={styles.link} href='/'>
                <Text style={styles.linkText}> Sign In Here!</Text>
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