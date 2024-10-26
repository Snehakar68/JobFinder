import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Src/Screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import OptionPage from './Src/Screens/OptionPage';
import JobPostingNavigator from './Src/Navigators/JobPostingNavigator';
import JobSearchingNavigator from './Src/Navigators/JobSearchingNavigator';
import DashboardForCompany from './Src/JobPosting/DashboardForCompany';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="DashboardForCompany" component={DashboardForCompany} options={{headerShown:false}}/>
        <Stack.Screen name="Option" component={OptionPage} options={{headerShown:false}}/>
        <Stack.Screen name="JobPostingNavigator" component={JobPostingNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="JobSearchingNavigator" component={JobSearchingNavigator} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
