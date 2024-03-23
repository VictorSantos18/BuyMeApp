import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'

export default function Slider({ sliderList }) {
  return (
    <View className='mt-5'>
      <ScrollView horizontal={true}>
        {sliderList.map((item, index) => (
          <View key={index}>
             <Image
              source={{ uri: item?.image }}
              className='h-[200px] w-[330px] mr-3 rounded-lg object-contain'
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}