import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({ item }) {

  const navigation = useNavigation();
  return (
    <TouchableOpacity className='flex-1 m-1 p-2 rounded-lg bg-gray-200'
      onPress={() => navigation.push('product-detail',
        {
          product: item
        })}
    >
      <Image
        source={{ uri: item.image }}
        className='w-full h-[140px] rounded-lg'
      />
      <View>
        <Text className='text-[15px] font-bold mt-2 text-gray-500'>{item.title}</Text>
        <Text className='text-[16px] font-bold text-violet-500'>R$ {item.price}</Text>
        <Text className='text-violet-200 bg-violet-500 rounded-full px-3 mt-1 p-[2px] text-[12px] w-[90px] text-center'>{item.category}</Text>
      </View>
    </TouchableOpacity>
  )
}