import { Text, View, Pressable } from 'react-native'
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'

export default function ProfileScreen(props:any) {

  const auth = useContext(AuthContext);
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
    <Pressable onPress={LogOut}>
      <Text>Log Out</Text>
    </Pressable>
   </View>
  );
}