import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const JobDetails = () => {
  const route = useRoute();
  const [isLogin, setIsLogin] = useState(false);
  const [SavedJob, setSavedJob] = useState(false);
  const [AppliedJob, setAppliedJob] = useState(false);
  const [JobId, setJobId] = useState('');
  const [AppliedJobId, setAppliedJobId] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
    getSavedJob();
    getAppliedJob();
  }, [isFocused]);

  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem('ID');
      const type = await AsyncStorage.getItem('USER_TYPE');
      setIsLogin(id !== null && type === 'user');
    } catch (error) {
      console.error("Error retrieving user's data:", error);
    }
  };

  const saveJob = async () => {
    const id = await AsyncStorage.getItem('ID');
    try {
      await firestore()
        .collection('Saved_jobs')
        .add({
          ...route.params.Data,
          userId: id,
        });
      console.log('Job saved successfully');
      setSavedJob(true);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const getSavedJob = async () => {
    const id = await AsyncStorage.getItem('ID');
    try {
      const snapshot = await firestore()
        .collection('Saved_jobs')
        .where('userId', '==', id)
        .get();

      snapshot.docs.forEach(item => {
        if (item.data().id === route.params.Data.id) {
          setSavedJob(true);
          setJobId(item.id);
        }
      });
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const removeSavedJob = async () => {
    try {
      await firestore().collection('Saved_jobs').doc(JobId).delete();
      console.log('Job removed successfully');
      setSavedJob(false);
    } catch (error) {
      console.error('Error removing job:', error);
    }
  };

  const handleJobSave = () => {
    if (SavedJob) {
      removeSavedJob();
    } else {
      saveJob();
    }
  };

  const applyJob = async () => {
    const id = await AsyncStorage.getItem('ID');
    try {
      const response = await firestore()
        .collection('Applied_jobs')
        .add({
          ...route.params.Data,
          userId: id,
        });
      console.log('Job applied successfully');
      setAppliedJob(true);
      setAppliedJobId(response.id);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const getAppliedJob = async () => {
    const id = await AsyncStorage.getItem('ID');
    try {
      const snapshot = await firestore()
        .collection('Applied_jobs')
        .where('userId', '==', id)
        .get();

      snapshot.docs.forEach(item => {
        if (item.data().id === route.params.Data.id) {
          setAppliedJob(true);
          setAppliedJobId(item.id);
        }
      });
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const cancelAppliedJob = async () => {
    try {
      await firestore().collection('Applied_jobs').doc(AppliedJobId).delete();
      console.log('Application cancelled successfully');
      setAppliedJob(false);
    } catch (error) {
      console.error('Error cancelling application:', error);
    }
  };

  const handleApplyJob = () => {
    if (AppliedJob) {
      cancelAppliedJob();
    } else {
      applyJob();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.PostJob, { fontSize: 40, color: 'black' }]}>
        {route.params.Data.JobTitle}
      </Text>
      <Text style={[styles.PostJob, { color: '#4d4c4c' }]}>
        {'Posted By: ' + route.params.Data.PostedName}
      </Text>
      <Text style={styles.PostJob}>{route.params.Data.JobDesc}</Text>
      <Text style={styles.PostJob}>
        {'Package: ' + route.params.Data.Package + ' LPA'}
      </Text>
      <Text style={styles.PostJob}>
        {'Experience: ' + route.params.Data.experience + ' Years'}
      </Text>
      <Text style={styles.PostJob}>
        {'Category: ' + route.params.Data.category}
      </Text>
      <Text style={styles.PostJob}>
        {'Skills: ' + route.params.Data.skills}
      </Text>
      <Text style={styles.PostJob}>
        {'Company: ' + route.params.Data.Company}
      </Text>
      <Text style={styles.PostJob}>
        {'Posted At: ' + route.params.Data.PostedAt}
      </Text>

      <View style={styles.bottomStyle}>
        <TouchableOpacity style={styles.JobButton} onPress={handleJobSave}>
          <Image
            source={
              SavedJob
                ? require('../assets/images/star.png')
                : require('../assets/images/star1.png')
            }
            style={styles.starIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!isLogin}
          style={[
            styles.ApplyButton,
            { backgroundColor: isLogin ? 'black' : '#585c57' },
          ]}
          onPress={handleApplyJob}
        >
          <Text style={styles.TextStyle}>
            {AppliedJob ? 'Applied' : 'Apply Job'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  PostJob: {
    color: '#171716',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  bottomStyle: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 50,
  },
  JobButton: {
    borderWidth: 1,
    width: scale(90),
    height: scale(50),
    justifyContent: 'center',
    borderRadius: 10,
  },
  starIcon: {
    width: scale(30),
    height: scale(30),
    alignSelf: 'center',
  },
  TextStyle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '500',
  },
  ApplyButton: {
    borderWidth: 1,
    width: scale(200),
    height: scale(50),
    justifyContent: 'center',
    borderRadius: 10,
  },
});
