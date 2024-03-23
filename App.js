import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Login from './Apps/Screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './Apps/Navigation/TabNav';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_c2V0dGxpbmctbGFiLTMuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <View className="flex-1 "> 
        <StatusBar style="auto" />
        
        <SignedIn>
          <NavigationContainer>
            <TabNav />
          </NavigationContainer>
        </SignedIn>

        <SignedOut>
          <Login />
        </SignedOut>

      </View>
    </ClerkProvider>
  )
}
