import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../Screens/Profile'
import MyProducts from '../Screens/User/MyProducts'
import ProductDetail from '../Screens/ProdutcDetail'

const Stack = createStackNavigator()
export default function ProfileStackNav() {

  return (
    <Stack.Navigator>
      <Stack.Screen name='profile-tab' component={Profile}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='my-products' component={MyProducts}
        options={{
          headerStyle: {
            backgroundColor: '#7D32CE'
          },
          headerTintColor: '#fff',
          headerTitle: 'Meus Produtos'
        }} />
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