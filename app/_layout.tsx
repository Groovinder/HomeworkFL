import { Stack } from 'expo-router';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { firebaseConfig } from '@/config/Config';
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { AuthContext } from '@/contexts/AuthContext';
import { getFirestore} from '@firebase/firestore';
import { FirebaseDbContext } from '@/contexts/FirebaseDbContext';

export default function RootLayout() {
  //initialize firebase
  const FBapp = initializeApp(firebaseConfig);
  //initialize firebase auth
  const FBauth = getAuth(FBapp);
  //initialize firebase firestore
  const FBdb = getFirestore(FBapp);
  console.log("Firebase App Initialized:", FBapp.name === '[DEFAULT]'); 
  console.log("Firebase Auth Initialized:", FBauth);
  return (
    <AuthContext.Provider value={FBauth}>
      <FirebaseDbContext.Provider value={FBdb}>
        <SafeAreaView style={styles.container}>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='signUp' options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      </FirebaseDbContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
