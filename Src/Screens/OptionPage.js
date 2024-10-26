import {Image,StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OptionPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <Image
        source={require('../assets/images/jobimg.png')}
        style={styles.Img}
      />

      <TouchableOpacity
        style={styles.btnstyle}
        onPress={() => {
          navigation.navigate('JobPostingNavigator');
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Hired Candidate from here
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnstyle1}
        onPress={() => {
          navigation.navigate('JobSearchingNavigator');
        }}>
        <Text style={{color: 'black', textAlign: 'center'}}>
          Get Jobs from here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OptionPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white"
  },
  btnstyle: {
    width: 250,
    height: 50,
    borderColor: 'blue',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  btnstyle1: {
    width: 250,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  Img:{
    width:100,
    height:100
  }
});
