import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      {/* user info section */}
      <View className="flex flex-row items-center gap-2">
        <Image source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
          style={{
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 10,}}
        />
        <View>
          <Text className="text-[14px] text-gray-500">Bem Vindo</Text>
          <Text className="text-[18px] font-bold text-violet-500">{user?.fullName}</Text>
        </View>
      </View>
    </View>
  )
}