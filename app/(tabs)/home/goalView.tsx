import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { useNavigation, useLocalSearchParams } from 'expo-router'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext'
import ErrorText from '@/components/ErrorText'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import styles from '@/components/styles'

export default function goalView(props : any) {
  const auth = useContext(AuthContext)
  const FBdb = useContext(FirebaseDbContext)
  const params = useLocalSearchParams()
  const id: string = params.id as string

  interface Goal {
    title: string
    progress: number
  }

  const [document, setDocument] = useState<Goal | any >()
  const [errorText, setErrorText] = useState('')
  const [modified, setModified] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Goal',
    })
  })

  useEffect(() => {
    setModified(true)
  }, [document])

  const getGoal = async (documentId: string) => {
    const path = `users/${auth.currentUser.uid}/goals/${documentId}`
    const docSnap = await getDoc(doc(FBdb, path))
    if (docSnap.exists()) {
      setDocument(docSnap.data() as Goal)
      setModified(false)
    }
    else {
      console.log("No such document!")
    }
  }

  const updateGoal = async () => {
    const path = `users/${auth.currentUser.uid}/goals/${id}`
    try {
      await updateDoc(doc(FBdb, path), document)
      setModified(true)
      //console.log("Document successfully updated!")
      navigation.goBack()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const deleteGoal = async () => {
    const path = `users/${auth.currentUser.uid}/goals/${id}`
    try {
      await deleteDoc(doc(FBdb, path))
      console.log("Document successfully deleted!")
      navigation.goBack()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  useEffect(() => {
    getGoal(id)
  }, [])

  if (document) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Tittle </Text>
        <TextInput
        style={styles.input}
        value = {document.title}
        onChangeText = {(text) => setDocument({...document, title: text})}></TextInput>
        <Text style={styles.label}>Progress % </Text>
        <TextInput
        style={styles.input}
        value = {document.progress}
        onChangeText = {(number) => setDocument({...document, progress: number})}></TextInput>
        <ErrorText text={errorText} /> 
        <Pressable 
        style={styles.button}
        onPress={() => updateGoal()}>
          <Text style={styles.buttonText}>Update Goal</Text>
        </Pressable>
        <Pressable
        style={styles.button}
        onPress={() => deleteGoal()}>
          <Text style={styles.buttonText}>Delete Goal</Text>
        </Pressable>
      </View>
    )
  } else {
    return null
  }
}