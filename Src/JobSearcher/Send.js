import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Send = () => {
  const navigation=useNavigation()
  const [isLogin, setIsLogin] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
    if (isLogin) {
      fetchAppliedJobs();
    }
  }, [isFocused, isLogin]);

  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem('ID');
      const type = await AsyncStorage.getItem('USER_TYPE');
      setIsLogin(id !== null && type === 'user');
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const fetchAppliedJobs = async () => {
    const userId = await AsyncStorage.getItem('ID');
    try {
      const snapshot = await firestore()
        .collection('Applied_jobs')
        .where('userId', '==', userId)
        .get();

      let jobs = snapshot.docs.map(doc => ({
        id: doc.id, // Firestore document ID
        ...doc.data(),
      }));

      // Remove duplicates using a Map for guaranteed uniqueness by ID
      const uniqueJobs = Array.from(new Map(jobs.map(job => [job.id, job])).values());

      console.log('Unique Jobs:', uniqueJobs); // Debug: Inspect unique jobs

      setAppliedJobs(uniqueJobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobItem}  onPress={() => {
      navigation.navigate('JobDetails', {Data: item});
    }}>
      <Text style={styles.jobTitle}>{item.JobTitle}</Text>
      <Text style={{color:"#3f403e"}}>{item.Company}</Text>
      <Text style={{color:"#696b69"}}>{`Posted at: ${item.PostedAt}`}</Text>
    </TouchableOpacity>
  );

  return !isLogin ? (
    <View style={styles.container}>
      <Text style={styles.message}>
        One place to track all your applications. Create an account to track jobs.
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={appliedJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No applied jobs found.</Text>}
      />
    </View>
  );
};

export default Send;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  message: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  jobItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"black"
  },
});
