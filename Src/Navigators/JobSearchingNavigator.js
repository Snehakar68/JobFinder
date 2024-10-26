import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../JobSearcher/Main';
import SearchJobs from '../JobSearcher/SearchJobs';
import JobDetails from '../JobSearcher/JobDetails';
import LoginForUser from '../JobSearcher/LoginForUser';
import SignupForUser from '../JobSearcher/SignupForUser';
import SavedJobList from '../JobSearcher/SavedJobList';
import EditProfile from '../JobSearcher/EditProfile';
const Stack = createNativeStackNavigator();
const JobSearchingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavedJobList"
        component={SavedJobList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchJobs"
        component={SearchJobs}
        options={{title: 'Search Jobs'}}
      />
       <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{title: 'Job Details'}}
      />
       <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: 'EditProfile'}}
      />
      <Stack.Screen
        name="LoginForUser"
        component={LoginForUser}
        options={{title: ''}}
      />
      <Stack.Screen
        name="SignupForUser"
        component={SignupForUser}
        options={{title: ''}}
      />

    </Stack.Navigator>
  );
};

export default JobSearchingNavigator;

const styles = StyleSheet.create({});
