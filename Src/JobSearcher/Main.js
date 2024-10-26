import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sidebar from './Sidebar'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerSidebar from './DrawerSidebar'
import SearchJobs from './SearchJobs'
const Drawer=createDrawerNavigator()
const Main = () => {
  return (
   <Drawer.Navigator drawerContent={(props)=><DrawerSidebar {...props}/>} >
    <Drawer.Screen name='Sidebar' component={Sidebar}  options={{title:"FindMyJob"}}/>
   </Drawer.Navigator>
  )
}

export default Main

const styles = StyleSheet.create({})