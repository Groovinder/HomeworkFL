import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext'
import { collection, addDoc, where, getDocs, query} from "firebase/firestore";
import { AuthContext } from '@/contexts/AuthContext'
import ErrorText from '@/components/ErrorText'
import styles from '@/components/styles'
import { useNavigation } from 'expo-router'

export default function addDiary(props: any) {
    const auth = useContext(AuthContext);
    const FBdb = useContext(FirebaseDbContext);
    const navigation = useNavigation();

    const [title, setTitle] = useState('')
    const [mood, setMood] = useState('')
    const [description, setDescription] = useState('')
    const [validTitle, setValidTitle] = useState(false)
    const [validMood, setValidMood] = useState(false)
    const [validDescription, setValidDescription] = useState(false)
    const [date, setDate] = useState(new Date().toLocaleDateString())

    const [errorText, setErrorText] = useState('')
    
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add Entry',
        })
    })
    useEffect(() => {
        if (title.length > 0) {
            setValidTitle(true)
        }
        else {
            setValidTitle(false)
        }
    }, [title])

    useEffect(() => {
        if (mood.length > 0) {
            setValidMood(true)
        }
        else {
            setValidMood(false)
        }
    }, [mood])

    useEffect(() => {
        if (description.length > 0) {
            setValidDescription(true)
        }
        else {
            setValidDescription(false)
        }
    }, [description])

    const addDiary = async () => {
        setErrorText('')
        const diaryEntry = {
            date: date,
            tittle: title,
            mood: mood,
            description: description
        }

        const path = `users/${auth.currentUser.uid}/diary`
        const fetchDoc = query(collection(FBdb, path), where("date", "==", date))
        //try to fetch the document on inputted date from firebase
        const querySnapshot = await getDocs(fetchDoc)
        //if the document exists, prevent adding data
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data())
            })
            console.log("Document already exists.")
            setErrorText("Document already exists. Please take a look on diary page.")
        } else { //if the document doesn't exist, add data
            try {
                const docRef = await addDoc(collection(FBdb, path), diaryEntry)
                console.log("Document written with ID: ", docRef.id)
            }
            catch (e) {
                console.error("Error adding document: ", e)
                setErrorText("Error adding document")
            }   
        }

    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Date</Text>
            <TextInput 
                style = {styles.input}
                placeholder='DD/MM/YYYY'
                value = {date}
                onChangeText={(text) => setDate(text)}
            />
            <Text style={styles.label}>Tittle</Text>
            <TextInput 
             style = {styles.input}
             placeholder='hmmm'
             value = {title}
             onChangeText={(text) => setTitle(text)} 
             /> 

            <Text style={styles.label}>Overall Mood</Text>
            <TextInput 
             style = {styles.input}
             placeholder='meh' 
             value = {mood}
             onChangeText={(text) => setMood(text)}
             />

            <Text style={styles.label}>How was your day?</Text>
            <TextInput 
             style = {styles.input}
             placeholder='today was ..........' 
             value = {description}
             onChangeText={(text) => setDescription(text)}
             />

            <ErrorText errorText={errorText}/>
            <Pressable
            style = {styles.button}
            onPress = {() => addDiary()}>
                <Text style = {styles.buttonText}>Add Diary</Text>
            </Pressable>
        </View>
    )
}