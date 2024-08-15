import { View, Text, StyleSheet, Pressable, FlatList, Button} from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext'
import { collection, query, onSnapshot} from "firebase/firestore";
import styles from '@/components/styles';
import { TextInput } from 'react-native-gesture-handler';
export default function diaryView() {
  const auth = useContext(AuthContext);
  const FBdb = useContext(FirebaseDbContext);

  const[data, setData] = useState([])
  const[loaded, setLoaded] = useState(false)
  const[searchInput, setSearchInput] = useState('')
  const[searchResults, setSearchResults] = useState([])



  useEffect(() => {
    if (loaded === false) {
      fetchData()
      setLoaded(true)
    }
  }, [data, auth])

  /*useEffect(() => {
    setSearchResults(data.filter(
      (entry: any) => entry.title.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }, [data, searchInput])*/
  
  //fetch diary entries from firebase
  const fetchData = async () => {
    const path = `users/${auth.currentUser.uid}/diary`
    const fetchDoc = query(collection(FBdb, path))
    const querySnapshot = onSnapshot(fetchDoc, (querySnapshot) => {
      let entries : any= []
      querySnapshot.forEach((doc) => {
        let entry = doc.data()
        entry.id = doc.id
        entries.push(entry)
      })
      setData(entries)
    })
    return () => querySnapshot()
  }

  const ListEntries = (props : any) => {
    return (
      <View style = {styles.listItem}>
        <Text style= {styles.listText}>{props.date}</Text>
        <Text style= {styles.listText}>{props.title}</Text>
        <Text style= {styles.listText}>{props.mood}</Text>
        <Link style = {styles.button} href={{ pathname: '/(tabs)/diary/entryView', params: { id: props.id } }}>
        <Text style={styles.buttonText}>View Entry</Text></Link>
      </View>
    )
  }

  const Separator = () => {
    return <View style={{ height: 5 }} />
  }

  const renderEntry = ({item} : any) => {
    return (
      <View>
        <ListEntries title={item.tittle} mood={item.mood} date={item.date}  id = {item.id}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Diary</Text>
      <Link style={styles.button} href="/(tabs)/diary/addDiary">
      <Text style={styles.buttonText}>Add Data Entry</Text></Link>

      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setSearchInput}
        value={searchInput}
      />
      <Pressable
        style={styles.button}
      >
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>

      <FlatList
        data={data}
        renderItem={renderEntry}
        keyExtractor={(item : any) => item.id}
        style = { styles.list}
      />

    </View>
  )
}