import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SecHome from './SecHome'
import Icon from "react-native-vector-icons/Entypo"
import Icon1 from "react-native-vector-icons/Ionicons"
import Chating from './Chating'
import EmpProfile from './EmpProfile'
import Send from './Send'
const Tab=createBottomTabNavigator()
const SideBar = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 3,
        elevation: 5,
        height: 60,
        paddingBottom: 5,
      },
      tabBarActiveTintColor:"blue",
      tabBarInactiveTintColor:"black",
      headerShown:false
    }}>
       <Tab.Screen
      name="SecondHome"
      component={SecHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    />
     <Tab.Screen
      name="Send"
      component={Send}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon1 name="send" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    />
    {/* <Tab.Screen
      name="chating"
      component={Chating}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="chat" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    /> */}
    <Tab.Screen
      name="EmpProfile"
      component={EmpProfile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    />
    </Tab.Navigator>
  )
}

export default SideBar

const styles = StyleSheet.create({})