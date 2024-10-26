// DashboardForCompany.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import SearchUser from './SearchUser';
import AddUser from './AddUser';
import Chat from './Chat';
import UserProfile from './UserProfile';
import EditCompanyProfile from './EditCompanyProfile'; // Ensure correct import
import UpdateProfile from './UpdateProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 3,
        elevation: 5,
        height: 60,
        paddingBottom: 5,
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'black',
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchUser"
      component={SearchUser}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon1 name="account-search" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="AddUser"
      component={AddUser}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="circle-with-plus" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon1 name="chat" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon2 name="person-circle-sharp" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const DashboardForCompany = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditCompanyProfile"
        component={EditCompanyProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardForCompany;
