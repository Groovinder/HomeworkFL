import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext'
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from '@/contexts/AuthContext'

export default function addDiary(props: any) {
    const auth = useContext(AuthContext);
    const FBdb = useContext(FirebaseDbContext);

    const [title, setTitle] = useState('')
    const [mood, setMood] = useState('')
    const [description, setDescription] = useState('')
    const [validTitle, setValidTitle] = useState(false)
    const [validMood, setValidMood] = useState(false)
    const [validDescription, setValidDescription] = useState(false)
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
        const diaryEntry = {
            tittle: "title",
            mood: "mood",
            description: "description"
        }
        const authUser = auth.currentUser.uid
        const path = 'users/${authUser}/Diary'
        try {
            const docRef = await addDoc(collection(FBdb, path), diaryEntry)
            console.log("Document written with ID: ", docRef.id)
        }
        catch (e) {
            console.error("Error adding document: ", e)
        }

    }
    return (
        <View>
            <Text>Tittle</Text>
            <TextInput 
             placeholder='hmmm'
             value = {title}
             onChangeText={(text) => setTitle(text)} 
             /> 

            <Text>Overall Mood</Text>
            <TextInput 
             placeholder='meh' 
             value = {mood}
             onChangeText={(text) => setMood(text)}
             />

            <Text>How was your day?</Text>
            <TextInput 
             placeholder='today was ..........' 
             value = {description}
             onChangeText={(text) => setDescription(text)}
             />

            <Pressable
            onPress = {() => addDiary()}>
                <Text>Add Diary</Text>
            </Pressable>
        </View>
    )
}