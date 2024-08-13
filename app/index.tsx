import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '../components/AuthForm'
import { useContext, useEffect, useState } from 'react'
import {sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import ErrorText from '@/components/ErrorText'

export default function Login(props:any){
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState('')
  const [tryPassword, setTryPassword] = useState(3)
  const [errorText, setErrorText] = useState('')
  const [showForgetPassword, setShowForgetPassword] = useState(false)

 
 //Sign in with Firebase
 const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log("success")
            router.replace("/(tabs)/home/home")
        })
        .catch((error) => {
            console.log(error)
            setTryPassword(tryPassword - 1)
        });
 }

 const forgetPassword = async() => {
  try {
    await sendPasswordResetEmail(auth, email)
    setErrorText("Email sent!")
    setShowForgetPassword(true)
  }
  catch (e) {
    console.log(e)
  }
}
useEffect(() => {
  if (tryPassword === 0) {
    setErrorText("Error: Invalid Email or Password")
    setShowForgetPassword(true)
  }
}, [tryPassword])

  return (
    <View>
    <AuthForm title="Sign in" actionText="Sign in" action = {signIn} email={email} setEmail={setEmail} />
    {showForgetPassword && (
      <View style={styles.container2}>
        <Pressable style = {styles.button } onPress={forgetPassword}>
          <Text style = {styles.buttonText}>Forget Password</Text>
        </Pressable>
    </View>
    )}
    <View style={styles.container}>
      <Text style={styles.text} >Don't have an account?<Link style={styles.link} href='/signUp'>
        <Text style={styles.linkText}> Sign Up Here!</Text>
      </Link></Text>
    </View>
    <ErrorText errorText={errorText} />
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flexDirection: "row-reverse",
      alignItems: 'flex-end',
  },
  container2 : {
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
  button: {
    backgroundColor: '#FF00FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: '30%',
    marginRight: 20,
    alignItems: 'center',
},

buttonText: {
    marginBottom: -3,
    color: 'white',
    textAlign: 'center',
},

})