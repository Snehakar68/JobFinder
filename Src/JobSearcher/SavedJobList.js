import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedJobList = () => {
  const navigation = useNavigation();
  const [JobList, setJobList] = useState([]);
  const [SavedJob, setSavedJob] = useState(false);
  const [JobId, setJobId] = useState('');
  useEffect(() => {
    SavedJobs();
    // removeSavedJob()
  }, []);
  const SavedJobs = async () => {
    const id = await AsyncStorage.getItem('ID');
    firestore()
      .collection('Saved_jobs')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        console.log(snapshot.docs);
        let temp = [];
        snapshot.docs.forEach(item => {
          temp.push({...item.data(), id: item.id});
        });
        setJobList(temp);
      });
  };
  const removeSavedJob = async jobId => {
    try {
      await firestore().collection('Saved_jobs').doc(jobId).delete();
      console.log('Job removed successfully');

      // Update the state to remove the job from the list
      setJobList(prevList => prevList.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error removing job:', error);
    }
  };

  return (
    <View style={styles.Container}>
      <FlatList
        data={JobList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.JobListing}
              onPress={() => {
                navigation.navigate('JobDetails', {Data: item});
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text style={[styles.PostJob, {fontSize: 30, color: 'black'}]}>
                  {item.JobTitle}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    removeSavedJob(item.id);
                  }}>
                  <Image
                    source={require('../assets/images/star.png')}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.PostJob}>{item.JobDesc}</Text>
              <Text style={styles.PostJob}>{'Category:' + item.category} </Text>
              <Text style={styles.PostJob}>{'skills:' + item.skills} </Text>
              <Text style={styles.PostJob}>{'Company :' + item.Company}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SavedJobList;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: moderateScale(10),
  },
  searchbar: {
    width: '95%',
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: verticalScale(20),
  },
  icon: {
    width: scale(25),
    height: scale(25),
    marginHorizontal: moderateScale(10),
  },
  searchText: {
    fontSize: moderateScale(16),
    flex: 1,
    color: 'black',
  },
  CloseIcon: {
    width: verticalScale(18),
    height: moderateVerticalScale(18),
  },
  JobListing: {
    width: scale(320),
    height: scale(200),
    backgroundColor: '#cccc',
    alignSelf: 'center',
    borderRadius: 10,
    top: 10,
    paddingHorizontal: 10,
  },
  PostJob: {
    color: '#6e706e',
    fontSize: 20,
    fontWeight: '600',
  },
  starIcon: {
    width: scale(30),
    height: scale(30),
    alignSelf: 'center',
  },
});
