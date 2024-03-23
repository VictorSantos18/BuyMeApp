import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Explore from '../Screens/Explore'
import ProductDetail from '../Screens/ProdutcDetail'

const Stack = createStackNavigator()
export default function ExploreScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='explore-tab' component={Explore}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='product-detail' component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: '#7D32CE'
          },
          headerTintColor: '#fff',
          headerTitle: 'Detalhes'
        }}
      />
    </Stack.Navigator>
  )
}