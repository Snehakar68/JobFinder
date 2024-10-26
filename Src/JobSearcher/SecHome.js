import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const SecHome = () => {
  const navigation = useNavigation();
  const IsFocused = useIsFocused();
  const [IsLogin, setIsLogin] = useState(false);
  useEffect(() => {
    getData();
  }, [IsFocused]);

  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem('ID');
      const type = await AsyncStorage.getItem('USER_TYPE');

      if (id !== null && type === 'user') {
        setIsLogin(true); // Set login state to true only for valid user type
      } else {
        setIsLogin(false); // Ensure buttons are shown for non-user types or null values
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchbar}
        onPress={() => {
          navigation.navigate('SearchJobs');
        }}>
        <Image
          source={require('../assets/images/search_icon.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Search Job here..."
          placeholderTextColor="gray"
          style={styles.searchText}
        />
      </TouchableOpacity>

      {!IsLogin && (
        <View>
          {/* Header Text */}
          <Text style={styles.headerText}>
            You are one step away from getting your Dream job
          </Text>
          <View style={styles.featureRow}>
            <Image
              source={require('../assets/images/star1.png')}
              style={styles.starIcon}
            />
            <Text style={styles.featureText}>
              Get your job after creating an account
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Image
              source={require('../assets/images/star1.png')}
              style={styles.starIcon}
            />
            <Text style={styles.featureText}>
              Chat with recruiters directly
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => {
                navigation.navigate('LoginForUser');
              }}>
              <Text style={[styles.buttonText, {color: 'white'}]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('SignupForUser');
              }}>
              <Text style={[styles.buttonText, {color: 'black'}]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Search Job Card */}
      <View style={styles.card}>
        <Image
          source={require('../assets/images/search-book.gif')}
          style={styles.animation}
        />
        <TextInput
          placeholder="Enter your job title here..."
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter location or company..."
          placeholderTextColor="gray"
          style={[styles.input, {marginTop: verticalScale(10)}]}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search Jobs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SecHome;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: moderateScale(10),
    backgroundColor: 'white',
    alignItems: 'center',
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
    marginRight: moderateScale(8),
  },
  searchText: {
    fontSize: moderateScale(16),
    flex: 1,
  },
  headerText: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  starIcon: {
    width: scale(25),
    height: scale(25),
    marginRight: moderateScale(10),
  },
  featureText: {
    fontSize: moderateScale(16),
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(20),
  },
  button: {
    width: '45%',
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  card: {
    width: '100%',
    marginTop: verticalScale(30),
    alignItems: 'center',
  },
  animation: {
    width: '80%',
    height: verticalScale(180),
    resizeMode: 'contain',
  },
  input: {
    width: '90%',
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: moderateScale(15),
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  searchButton: {
    width: '60%',
    height: verticalScale(50),
    backgroundColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  searchButtonText: {
    color: 'white',
    fontSize: moderateScale(18),
  },
});
