import { Text, View, Pressable, StyleSheet } from 'react-native'
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { TextInput } from 'react-native-gesture-handler';
import ErrorText from '@/components/ErrorText'
import styles from '@/components/styles'

export default function ProfileScreen(props:any) {

  const auth = useContext(AuthContext);
  const FBdb = useContext(FirebaseDbContext);
  const router = useRouter();
  const id = auth.currentUser.uid

  interface User {
    email: string
    firstName: string
    lastName: string
    motto: string
  }

  const [document, setDocument] = useState<User | any >()
  const [errorText, setErrorText] = useState('')
  const [modified, setModified] = useState(false)

  useEffect(() => {
    setModified(true)
   }, [document])

   const getProfile = async (id: string) => {
    const path = `users/${auth.currentUser.uid}`
    const docSnap = await getDoc(doc(FBdb, path))
    if (docSnap.exists()) {
      setDocument(docSnap.data() as User)
      setModified(false)
      //console.log ("Document data:", docSnap.data())
    }
    else {
      console.log("No such document!")
    }
  }

  const updateProfile = async () => {
    const path = `users/${auth.currentUser.uid}`
    try {
      await updateDoc(doc(FBdb, path), document)
      setModified(true)
      //console.log("Document successfully updated!")
    } catch (e) {
      setErrorText("Error Updating Profile")
      console.error("Error modifying document: ", e)
    }
  }

  const deleteProfile = async () => {
    const path = `users/${auth.currentUser.uid}`
    try {
      await deleteDoc(doc(FBdb, path))
      console.log("Document successfully deleted!")
      router.replace('/')
    }
    catch (e) {
      setErrorText("Error Deleting Profile")
      console.error("Error adding document: ", e)
    }
  }

  const LogOut = () => {
    signOut(auth).then(() => {
      console.log("logged out")
      router.replace('/')
    })
    .catch((error) => {
      // An error happened.
      setErrorText("Error Logging Out")
      console.log(error)
    });
  }

  useEffect(() => {
    getProfile(id)
  }, [])
if (document) {
  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Profile</Text>
      <Text style = {styles.label}>First Name</Text>
      <TextInput
      style = {styles.input}
      value={document.firstName}
      onChangeText={(text) => setDocument({...document, firstName: text})}></TextInput>
      <Text style = {styles.label}>Last Name</Text>
      <TextInput 
      style = {styles.input}
      value={document.lastName}
      onChangeText={(text) => setDocument({...document, lastName: text})}></TextInput>
      <Text style = {styles.label}>Email</Text>
      <TextInput
      style = {styles.input}
      value={document.email}
      onChangeText={(text) => setDocument({...document, email: text})}></TextInput>
      <Text style = {styles.label}>Motto</Text>
      <TextInput
      style = {styles.input}
      value={document.motto}
      onChangeText={(text) => setDocument({...document, motto: text})}></TextInput>

      <ErrorText errorText={errorText} />
      <Pressable 
      style = {styles.button}
      onPress={ () => updateProfile()}>
        <Text style = {styles.buttonText}>Save</Text></Pressable>
      <Pressable 
      style = {styles.button}
      onPress={() => deleteProfile()}>
        <Text style = {styles.buttonText}>Delete</Text></Pressable>
      
      <Pressable onPress={LogOut}
      style = {styles.button}>
        <Text style = {styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
    )
  }else {
    return null
}
}
