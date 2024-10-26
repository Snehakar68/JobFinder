// import { Image, StyleSheet, Text, View, Alert, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
// import ProfileInfo from '../Commons/ProfileInfo';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { moderateScale, scale } from 'react-native-size-matters';

// const UserProfile = () => {
//   const route = useRoute();
//   const { selectedImage } = route.params || {};
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();

//   const [name, setName] = useState('');
//   const [jobs, setJobs] = useState('');

//   useEffect(() => {
//     getUserData();
//   }, [isFocused]);

//   const getUserData = async () => {
//     try {
//       const storedName = await AsyncStorage.getItem('Name');
//       const storedJobs = await AsyncStorage.getItem('JOBS');
//       setName(storedName || 'No Name');
//       setJobs(storedJobs || '0');
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       Alert.alert('Error', 'Failed to fetch user data.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity >
//         <Image
//           source={
//             selectedImage
//               ?

//               { uri: selectedImage }
//               : require('../assets/images/user.png')
//           }
//           style={styles.defaultImg}
//         />
//       </TouchableOpacity>
//       <Text style={styles.nameText}>{name}</Text>
//       <Text
//         style={styles.linkText}
//         onPress={() => navigation.navigate('EditCompanyProfile')}
//       >
//         Update Your Profile
//       </Text>
//       <Text
//         style={styles.linkText}
//         onPress={()=>navigation.navigate('UpdateProfile')}
//       >
//         Change Your Profile Picture
//       </Text>
//       <ProfileInfo
//         icon={require('../assets/images/job.png')}
//         title={`MyJobs (${jobs})`}
//         onClick={() => navigation.navigate('Home')}
//       />
//       <ProfileInfo
//         icon={require('../assets/images/Theme.png')}
//         title="Theme"
//         onClick={() => {}}
//       />
//       <ProfileInfo
//         icon={require('../assets/images/contact.png')}
//         title="Contact Us"
//         onClick={() => {}}
//       />
//       <ProfileInfo
//         icon={require('../assets/images/Logout.png')}
//         title="Log Out"
//         onClick={() => {}}
//       />
//     </View>
//   );
// };

// export default UserProfile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//     backgroundColor: '#fff', // Optional: set a background color
//   },
//   defaultImg: {
//     width: scale(150),
//     height: scale(150),
//     borderRadius: scale(75),
//     marginBottom: 20,
//     backgroundColor: '#ccc', // Placeholder color
//   },
//   nameText: {
//     color: 'black',
//     fontSize: 30,
//     fontWeight: '400',
//     marginBottom: 10,
//   },
//   linkText: {
//     color: 'blue',
//     fontSize: 17,
//     textDecorationLine: 'underline',
//     marginBottom: 15,
//   },
// });

// UserProfile.js

import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import ProfileInfo from '../Commons/ProfileInfo';
import {moderateScale, scale} from 'react-native-size-matters';

const UserProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [name, setName] = useState('');
  const [jobs, setJobs] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getUserData();
    handleImageUpdate();
  }, [isFocused, route.params?.selectedImage]);

  // Function to fetch user data from AsyncStorage
  const getUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('Name');
      const storedJobs = await AsyncStorage.getItem('JOBS');
      setName(storedName || 'No Name');
      setJobs(storedJobs || '0');
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data.');
    }
  };

  // Function to handle image updates
  const handleImageUpdate = async () => {
    if (route.params?.selectedImage) {
      const newImage = route.params.selectedImage;
      setSelectedImage(newImage);
      await saveImageToStorage(newImage);
    } else {
      await loadStoredImage();
    }
  };

  // Function to load image from AsyncStorage
  const loadStoredImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('selectedImage');
      if (imageUri) {
        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.error('Error loading image from storage:', error);
    }
  };

  // Function to save image to AsyncStorage
  const saveImageToStorage = async imageUri => {
    try {
      await AsyncStorage.setItem('selectedImage', imageUri);
    } catch (error) {
      console.error('Error saving image to storage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={
            selectedImage
              ? {uri: selectedImage}
              : require('../assets/images/user.png')
          }
          style={styles.defaultImg}
        />
      </TouchableOpacity>
      <Text style={styles.nameText}>{name}</Text>
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('EditCompanyProfile')}>
        Update Your Profile
      </Text>
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('UpdateProfile')}>
        Change Your Profile Picture
      </Text>
      <ProfileInfo
        icon={require('../assets/images/job.png')}
        title={`MyJobs (${jobs})`}
        onClick={() => navigation.navigate('Home')}
      />
      <ProfileInfo
        icon={require('../assets/images/Theme.png')}
        title="Theme"
        onClick={() => {}}
      />
      <ProfileInfo
        icon={require('../assets/images/contact.png')}
        title="Contact Us"
        onClick={() => {}}
      />
      <ProfileInfo
        icon={require('../assets/images/Logout.png')}
        title="Log Out"
        onclick={() => {
          navigation.navigate('Option');
        }}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff', // Optional: set a background color
  },
  defaultImg: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
    marginBottom: 20,
    backgroundColor: '#ccc', // Placeholder color
  },
  nameText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 10,
  },
  linkText: {
    color: 'blue',
    fontSize: 17,
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
});
