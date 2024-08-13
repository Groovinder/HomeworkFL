import { Text, View, StyleSheet, Pressable , FlatList} from 'react-native'
import { Link } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext';
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext';
import { collection, onSnapshot, query, deleteDoc, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { TextInput } from 'react-native-gesture-handler';
import styles from '@/components/styles';
import { Icon } from '@/components/Icon';



export default function HomeScreen(props:any) {
  const auth = useContext(AuthContext);
  const FBdb = useContext(FirebaseDbContext);

  const [document, setDocument] = useState({})
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [addGoal, setAddGoal] = useState(false)
  const [goalTitle, setGoalTitle] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (loaded === false) {
      fetchGoals()
      setLoaded(true)
    }
  }, [data, auth])

  interface User {
    email: string
    firstName: string
    lastName: string
    goals: any
  }

  const getProfile = async (id: string) => {
    const path = `users/${auth.currentUser.uid}`
    const docSnap = await getDoc(doc(FBdb, path))
    if (docSnap.exists()) {
      setUsername(docSnap.data().firstName)
    }
    else {
      console.log("No such document!")
    }
  }
  const fetchGoals = async () => {
    const path = `users/${auth.currentUser.uid}/goals`
    const fetchDoc = query(collection(FBdb, path))
    const querySnapshot = onSnapshot(fetchDoc, (querySnapshot) => {
      let goals : any= []
      querySnapshot.forEach((doc) => {
        let goal = doc.data()
        goal.id = doc.id
        goals.push(goal)
      })
      setData(goals)
    })
    return () => querySnapshot()
  }

  const ListGoals = (props : any) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listText}>{props.title}</Text>
        <Text style={styles.goalText}>{props.progress} / 100%</Text>
        <Link style= {styles.button} href= {{ pathname: '/(tabs)/home/goalView', params: { id: props.id } }}>
        <Text style={styles.buttonText}>View Goal</Text></Link>
          
      </View>
    )
  }

  const Separator = () => {
    return <View style={{ height: 5 }} />
  }

  const renderGoal = ({item} : any) => {
    return (
      <View>
        <ListGoals title={item.title} progress={item.progress} id = {item.id}/>
      </View>
    )
  }

  const AddGoal = async() => {
    if (goalTitle === '') {
      return
    }
    else {
    const path = `users/${auth.currentUser.uid}/goals`
    const docRef = await addDoc(collection(FBdb, path), {
      title: goalTitle,
      progress: 0
    })
    setGoalTitle('')
    setAddGoal(false)
  }}

  const deleteGoal = async(id : any) => {
    const path = `users/${auth.currentUser.uid}/goals`
    await deleteDoc(doc(FBdb, path, id))
  }

  const updateGoal = async(id : any) => {
    const path = `users/${auth.currentUser.uid}/goals`
    await updateDoc(doc(FBdb, path, id), {
      progress: 1
    })
  }

  useEffect(() => {
    getProfile(auth.currentUser.uid)
  }, [])

  return (
   <View style={styles.container}>
    <Text style={styles.title}>Home</Text>
    <Text style={styles.label}>Welcome, {username}</Text>
    <Link style= {styles.button} href="/(tabs)/home/addHomeDiary"> 
    <Text style={styles.buttonText}><Icon name="add-outline" />Record Daily Entry</Text></Link>
    <Pressable
    style={styles.button}
    onPress={() => setAddGoal(true)}>
      <Text style={styles.buttonText}>{addGoal ? 'Close' : 'Add Goal'}</Text></Pressable>
    {addGoal ? <TextInput
      style={styles.input}
      placeholder="Goal Title"
      value={goalTitle}
      onChangeText={setGoalTitle}
    /> : null}
    {addGoal ? <Pressable
    style={styles.button}
    onPress={() => AddGoal()}>
      <Text style={styles.buttonText}>Add Goal</Text></Pressable> : null}
    <FlatList
      data={data}
      renderItem={renderGoal}
      keyExtractor={(item: any) => item.id}
      ItemSeparatorComponent={Separator}
      style = { styles.list}
    />
   </View>
  );
}