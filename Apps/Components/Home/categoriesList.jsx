import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function CategoryList({ categoryList }) {
  const navigation = useNavigation();

  return (
    <View className='my-2'>
      <Text className='font-bold text-[20px] mb-3 text-violet-500'>Categorias</Text>
      <ScrollView horizontal={true}>
        {categoryList.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              padding: 5,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 5,
              borderRadius: 10,
              alignItems: 'center'
            }}
            onPress={() => navigation.navigate('item-list', { category: category.name })}
          >
            <Text className='text-[14px] text-violet-500'>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
