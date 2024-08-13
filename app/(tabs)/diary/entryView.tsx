import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { useNavigation, useLocalSearchParams } from 'expo-router'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext'
import ErrorText from '@/components/ErrorText'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import styles from '@/components/styles'


export default function entryView(props : any) {
    const auth = useContext(AuthContext);
    const FBdb = useContext(FirebaseDbContext);
    const params = useLocalSearchParams()
    const id: string = params.id as string
    
    interface DiaryEntry {
        date: string
        tittle: string
        mood: string
        description: string
    }
    const [document, setDocument] = useState<DiaryEntry | any >()
    const [errorText, setErrorText] = useState('')
    const [modified, setModified] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Entry',
        })
    })

    useEffect(() => {
        setModified(true)
     }, [document])

    const getEntry = async (documentId: string) => {
        const path = `users/${auth.currentUser.uid}/diary/${documentId}`
        const docSnap = await getDoc(doc(FBdb, path))
        if (docSnap.exists()) {
            setDocument(docSnap.data() as DiaryEntry)
            setModified(false)
        }
        else {
            console.log("No such document!")
        }
    }
    
    const updateEntry = async () => {
        const path = `users/${auth.currentUser.uid}/diary/${id}`
        try {
            await updateDoc(doc(FBdb, path), document)
            setModified(true)
            //console.log("Document successfully updated!")
            navigation.goBack()
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    const deleteEntry = async () => {
        const path = `users/${auth.currentUser.uid}/diary/${id}`
        try {
            await deleteDoc(doc(FBdb, path))
            console.log("Document successfully deleted!")
           // navigation.goBack()
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }
    useEffect(() => {
        getEntry(id)
    }, [])

    

    if (document) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Date</Text>
            <TextInput
            style = {styles.input}
            value={document.date}
            onChangeText={(text) => setDocument({...document, date: text})}></TextInput>
            <Text style={styles.label}>Tittle</Text>
            <TextInput 
            style = {styles.input}
            value={document.tittle} 
            onChangeText={(text) => setDocument({...document, tittle: text})}></TextInput>
            <Text style={styles.label}>Mood</Text>
            <TextInput 
            style = {styles.input}
            value={document.mood}
            onChangeText={(text) => setDocument({...document, mood: text})}></TextInput>
            <Text style={styles.label}>Description</Text>
            <TextInput 
            style = {styles.input}
            value={document.description}
            onChangeText={(text) => setDocument({...document, description: text})}></TextInput>
            <ErrorText errorText={errorText} />
            <Pressable 
            style={styles.button}
            onPress={ () => updateEntry()}>
                <Text style={styles.buttonText}>Save</Text></Pressable>
            <Pressable 
            style={styles.button}
            onPress={() => deleteEntry()}>
                <Text style={styles.buttonText}>Delete</Text></Pressable>

        </View>
    )
    }else {
    return null
    }
}