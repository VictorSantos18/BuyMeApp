import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth()
  const menuList = [
    {
      id: 1,
      name: 'Meus Produtos',
      path: 'my-products'
    },
    {
      id: 2,
      name: 'Explorar',
      path: 'explore'
    },
    {
      id: 3,
      name: 'Sair'
    }
  ]
  const onMenuPress = (item) => {
    if (item.name == 'Sair') {
      signOut();
      return;
    }

    item?.path ? navigation.navigate(item.path) : null
  }
  return (
    <View className='p-8 bg-violet-500 h-full'>
      <View className='items-center mt-14'>
        <Image source={{ uri: user.imageUrl }}
          className=' w-[100px] h-[100px] rounded-full '
          style={{
            borderWidth: 4,
            borderColor: '#7D32CE',
            borderRadius: 10,
          }}
        />
        <Text className='font-bold text-[20px] text-white'>{user?.fullName}</Text>
        <Text className='text-[16px] text-white'>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList
        data={menuList}
        numColumns={2}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuPress(item)}
            className='flex-1 p-5 items-center rounded-md bg-gray-600 m-1'>
            <Text className='text-white'>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  )
}