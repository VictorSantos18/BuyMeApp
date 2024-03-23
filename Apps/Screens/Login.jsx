import { View, Text, Image, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      {/* imagem */}
      <Image source={require("../../assets/loginImag2.jpg")}
        className="w-full h-[75%] object-cover"
      />

      <View className="p-4 bg-white mt-[-20px] rounded-t-3xl shadow-md">
        <Text className="text-[25px] font-bold text-violet-500 ">Buy.Me</Text>
        <Text className="text-[18px] text-slate-500 mt-2">Você pode fazer dinheiro comprando e vendendo em nossa plataforma!</Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-4 bg-violet-500 rounded-full mt-6"
        >
          <Text className="text-white text-center text-[16px]">Fazer Login com Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}