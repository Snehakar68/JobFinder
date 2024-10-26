import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const SearchJobs = () => {
  const navigation = useNavigation();
  const [Search, setSearch] = useState('');
  const [JobList, setJobList] = useState([]);
  const JobSearch = txt => {
    firestore()
      .collection('JobList')
      .where('JobTitle', '==', txt)
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

  return (
    <View style={styles.Container}>
      <View style={styles.searchbar}>
        <Image
          source={require('../assets/images/search_icon.png')}
          style={styles.icon}
        />

        <TextInput
          placeholder="Search Job here..."
          placeholderTextColor="black"
          style={styles.searchText}
          value={Search}
          onChangeText={txt => {
            setSearch(txt);
            JobSearch(txt);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setSearch('');
            JobSearch('');
          }}>
          <Image
            source={require('../assets/images/close.png')}
            style={styles.CloseIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={JobList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.JobListing}
              onPress={() => {
                navigation.navigate('JobDetails', {Data: item});
              }}>
              <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
              <Text style={[styles.PostJob, {fontSize: 30, color: 'black'}]}>
                {item.JobTitle}
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/star1.png')}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              </View>
              <Text style={styles.PostJob}>{item.JobDesc}</Text>
              {/* <Text style={styles.PostJob}>
                {'Package:' + item.Package + 'LPA'}
              </Text>
              <Text style={styles.PostJob}>
                {'Experience :' + item.experience + 'Years'}
              </Text> */}
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

export default SearchJobs;

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
    color:"black"
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
    paddingHorizontal:10
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
