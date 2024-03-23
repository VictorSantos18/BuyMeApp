import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import AddPost from '../Screens/AddPost';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreenStackNavigation from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileStackNav from './ProfileStackNav';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7D32CE',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen name='home-nav' component={HomeScreenStackNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Início</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name='explore' component={ExploreScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Explorar</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen name='newpost' component={AddPost}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Novo Post</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera-plus-outline" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen name='profile' component={ProfileStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Perfil</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}