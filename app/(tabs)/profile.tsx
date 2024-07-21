import { Text, View, Pressable, StyleSheet } from 'react-native'
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext';

export default function ProfileScreen(props:any) {

  const auth = useContext(AuthContext);
  const FBdb = useContext(FirebaseDbContext);
  const router = useRouter();
  const LogOut = () => {
    signOut(auth).then(() => {
      console.log("logged out")
      router.replace("/")
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    });
  }


  return (
   <View>
    <Text>Profile</Text>
    <Pressable>
      <Text>Add Data</Text>
    </Pressable>
    <Pressable onPress={LogOut}>
      <Text>Log Out</Text>
    </Pressable>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})