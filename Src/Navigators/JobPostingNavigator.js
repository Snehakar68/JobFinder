import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginforCompany from '../JobPosting/LoginforCompany';
import SigupForCompany from '../JobPosting/SigupForCompany';
import CustomInput from '../Commons/CustomInput';
import DashboardForCompany from '../JobPosting/DashboardForCompany';
import EditCompanyProfile from '../JobPosting/EditCompanyProfile';
const Stack = createNativeStackNavigator();
const JobPostingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginForCompany"
        component={LoginforCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SigupforCompany"
        component={SigupForCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardForCompany"
        component={DashboardForCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditCompanyProfile"
        component={EditCompanyProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default JobPostingNavigator;

const styles = StyleSheet.create({});
