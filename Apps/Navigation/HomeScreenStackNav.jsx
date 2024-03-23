import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home';
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProdutcDetail';
const Stack = createStackNavigator();

export default function HomeScreenStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='item-list' component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: '#7D32CE'
          },
          headerTintColor: '#fff'
        })} />
      <Stack.Screen name='product-detail' component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: '#7D32CE'
          }, 
          headerTintColor: '#fff',
          headerTitle: 'Detalhes'
        }} />
    </Stack.Navigator>
  )
}