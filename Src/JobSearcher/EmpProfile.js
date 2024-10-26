// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   TextInput,
//   FlatList,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import {moderateScale, scale} from 'react-native-size-matters';
// import Modal from 'react-native-modal';
// import NoLoginComponent from '../Commons/NoLoginComponent';
// import { launchImageLibrary } from 'react-native-image-picker';

// const EmpProfile = () => {
//   const navigation = useNavigation();
//   const [isLogin, setIsLogin] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [profileImage, setProfileImage] = useState(null); // State for the profile image


//   // State for skills, experience, and education
//   const [skills, setSkills] = useState([]);
//   const [experience, setExperience] = useState([]); // Array of experience objects
//   const [education, setEducation] = useState([]); // Array of education objects

//   // Input fields
//   const [newSkill, setNewSkill] = useState('');
//   const [newExperience, setNewExperience] = useState({
//     companyName: '',
//     duration: '',
//     salary: '',
//     position: '',
//   });
//   const [newEducation, setNewEducation] = useState({
//     university: '',
//     degree: '',
//   });

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalType, setModalType] = useState(''); // Determine the active modal (skill, experience, or education)
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     getData();
//     getDataFirebase();
//   }, [isFocused]);

//   const getData = async () => {
//     try {
//       const id = await AsyncStorage.getItem('ID');
//       const type = await AsyncStorage.getItem('USER_TYPE');
//       setIsLogin(id !== null && type === 'user');
//     } catch (error) {
//       console.error('Error retrieving user data', error);
//     }
//   };

//   const getDataFirebase = async () => {
//     const id = await AsyncStorage.getItem('ID');
//     firestore()
//       .collection('Users_Jobs')
//       .doc(id)
//       .get()
//       .then(data => setUserData(data.data()))
//       .catch(error => console.error('Error fetching Firebase data:', error));
//   };

//   const toggleModal = type => {
//     setModalType(type);
//     setModalVisible(!isModalVisible);
//   };

//   const handleAddItem = () => {
//     if (modalType === 'skill' && newSkill.trim() !== '') {
//       setSkills(prev => [...prev, newSkill.trim()]);
//       setNewSkill('');
//     } else if (
//       modalType === 'experience' &&
//       Object.values(newExperience).every(field => field.trim() !== '')
//     ) {
//       setExperience(prev => [...prev, newExperience]);
//       setNewExperience({
//         companyName: '',
//         duration: '',
//         salary: '',
//         position: '',
//       });
//     } else if (
//       modalType === 'education' &&
//       Object.values(newEducation).every(field => field.trim() !== '')
//     ) {
//       setEducation(prev => [...prev, newEducation]);
//       setNewEducation({university: '', degree: ''});
//     }
//     setModalVisible(false);
//   };

//   const handleRemoveItem = (type, index) => {
//     Alert.alert('Remove Item', 'Are you sure you want to remove this?', [
//       {text: 'Cancel', style: 'cancel'},
//       {
//         text: 'Remove',
//         style: 'destructive',
//         onPress: () => {
//           if (type === 'skill')
//             setSkills(prev => prev.filter((_, i) => i !== index));
//           if (type === 'experience')
//             setExperience(prev => prev.filter((_, i) => i !== index));
//           if (type === 'education')
//             setEducation(prev => prev.filter((_, i) => i !== index));
//         },
//       },
//     ]);
//   };

//   const renderItem = (item, index, type) => (
//     <View style={styles.item}>
//       <Text style={styles.itemText}>
//         {type === 'experience'
//           ? `${item.position} at ${item.companyName} (${item.duration}) - Salary: ${item.salary}`
//           : type === 'education'
//           ? `${item.degree} from ${item.university}`
//           : item}
//       </Text>
//       <TouchableOpacity
//         style={styles.removeButton}
//         onPress={() => handleRemoveItem(type, index)}>
//         <Image
//           source={require('../assets/images/close.png')}
//           style={{width: scale(15), height: scale(15)}}
//         />
//       </TouchableOpacity>
//     </View>
//   );
//   const handleProfileImage = () => {
//     const options = {
//       mediaType: 'photo',
//       maxWidth: 1024,
//       maxHeight: 1024,
//       quality: 0.7,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.error('ImagePicker Error: ', response.error);
//       } else {
//         const source = response.assets[0].uri;
//         setProfileImage(source); // Update the profile image state
//         // Here you can upload the image to Firestore or your server if needed
//       }
//     });
//   };
  
//   return !isLogin ? (
//     <View style={styles.Container}>
//       <NoLoginComponent
//         heading={
//           'Manage your professional profile/portfolio for attracting many jobs'
//         }
//         desc={'Easily manage your profile/portfolio'}
//       />
//     </View>
//   ) : (
//     <ScrollView
//       contentContainerStyle={styles.scrollContainer}
//       style={styles.scrollView}>
//       <TouchableOpacity onPress={handleProfileImage}>
//         <Image
//           source={
//             profileImage
//               ? {uri: profileImage}
//               : require('../assets/images/user.png')
//           }
//           style={styles.EmpProfile}
//         />
//       </TouchableOpacity>
//       <Text style={[styles.UserStyle, {left: 5}]}>
//         {userData ? userData.name : 'Name'}
//       </Text>
//       <Text style={[styles.UserStyle, {fontSize: 20}]}>
//         {userData ? userData.email : 'Email'}
//       </Text>
//       <TouchableOpacity
//         style={styles.ButtonStyle}
//         onPress={() => {
//           navigation.navigate('EditProfile', {
//             skills,
//             experience,
//             education,
//             onSave: (updatedSkills, updatedExperience, updatedEducation) => {
//               setSkills(updatedSkills);
//               setExperience(updatedExperience);
//               setEducation(updatedEducation);
//             },
//           });
//         }}>
//         <Text style={{color: 'black', textAlign: 'center', fontSize: 20}}>
//           Edit Profile
//         </Text>
//       </TouchableOpacity>

//       {/* Skills Section */}
//       <Section
//         title="Skills"
//         data={skills}
//         onAdd={() => toggleModal('skill')}
//         renderItem={(item, index) => renderItem(item, index, 'skill')}
//       />

//       {/* Experience Section */}
//       <Section
//         title="Experience"
//         data={experience}
//         onAdd={() => toggleModal('experience')}
//         renderItem={(item, index) => renderItem(item, index, 'experience')}
//       />

//       {/* Education Section */}
//       <Section
//         title="Education"
//         data={education}
//         onAdd={() => toggleModal('education')}
//         renderItem={(item, index) => renderItem(item, index, 'education')}
//       />

//       {/* Modal for Adding Items */}
//       <Modal
//         isVisible={isModalVisible}
//         onBackdropPress={() => setModalVisible(false)}>
//         <View style={styles.modalView}>
//           <Text style={styles.modalTitle}>
//             Add {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
//           </Text>

//           {modalType === 'skill' ? (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Your Skill here"
//                 placeholderTextColor="black"
//                 value={newSkill}
//                 onChangeText={setNewSkill}
//               />
//             </>
//           ) : modalType === 'experience' ? (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Company Name"
//                 placeholderTextColor="black"
//                 value={newExperience.companyName}
//                 onChangeText={text =>
//                   setNewExperience(prev => ({...prev, companyName: text}))
//                 }
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Duration"
//                 placeholderTextColor="black"
//                 value={newExperience.duration}
//                 onChangeText={text =>
//                   setNewExperience(prev => ({...prev, duration: text}))
//                 }
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Salary"
//                 placeholderTextColor="black"
//                 value={newExperience.salary}
//                 onChangeText={text =>
//                   setNewExperience(prev => ({...prev, salary: text}))
//                 }
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Position"
//                 placeholderTextColor="black"
//                 value={newExperience.position}
//                 onChangeText={text =>
//                   setNewExperience(prev => ({...prev, position: text}))
//                 }
//               />
//             </>
//           ) : modalType === 'education' ? (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="University"
//                 placeholderTextColor="black"
//                 value={newEducation.university}
//                 onChangeText={text =>
//                   setNewEducation(prev => ({...prev, university: text}))
//                 }
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Degree"
//                 placeholderTextColor="black"
//                 value={newEducation.degree}
//                 onChangeText={text =>
//                   setNewEducation(prev => ({...prev, degree: text}))
//                 }
//               />
//             </>
//           ) : null}

//           <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
//             <Text style={styles.addButtonText}>Add</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const Section = ({title, data, onAdd, renderItem}) => (
//   <View style={styles.section}>
//     <Text style={styles.sectionTitle}>{title}</Text>
//     <TouchableOpacity style={styles.addButton} onPress={onAdd}>
//       <Text style={styles.addButtonText}>Add {title.slice(0, -1)}</Text>
//     </TouchableOpacity>
//     <FlatList
//       data={data}
//       renderItem={({item, index}) => renderItem(item, index)}
//       keyExtractor={(item, index) => index.toString()}
//     />
//   </View>
// );

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   Container: {
//     flex: 1,
//   },
//   EmpProfile: {
//     width: moderateScale(100),
//     height: moderateScale(100),
//     alignSelf: 'center',
//     borderRadius:50
//   },
//   UserStyle: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'black',
//   },
//   ButtonStyle: {
//     backgroundColor: '#B0E0E6',
//     padding: moderateScale(10),
//     borderRadius: 10,
//     marginTop: 10,
//     width: '50%',
//     alignSelf: 'center',
//   },
//   section: {
//     marginBottom: moderateScale(20),
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: moderateScale(10),
//     color: 'black',
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: moderateScale(10),
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: moderateScale(5),
//   },
//   itemText: {
//     fontSize: 16,
//     color: 'black',
//   },
//   removeButton: {
//     padding: moderateScale(5),
//   },
//   modalView: {
//     backgroundColor: 'white',
//     padding: moderateScale(20),
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: moderateScale(10),
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: moderateScale(10),
//     marginBottom: moderateScale(10),
//     color: 'black',
//   },
//   addButton: {
//     backgroundColor: 'black',
//     padding: moderateScale(10),
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default EmpProfile;

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { moderateScale, scale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import NoLoginComponent from '../Commons/NoLoginComponent';
import { launchImageLibrary } from 'react-native-image-picker';

const EmpProfile = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // State for the profile image

  // State for skills, experience, and education
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]); // Array of experience objects
  const [education, setEducation] = useState([]); // Array of education objects

  // Input fields
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState({
    companyName: '',
    duration: '',
    salary: '',
    position: '',
  });
  const [newEducation, setNewEducation] = useState({
    university: '',
    degree: '',
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // Determine the active modal (skill, experience, or education)
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
    getDataFirebase();
  }, [isFocused]);

  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem('ID');
      const type = await AsyncStorage.getItem('USER_TYPE');
      setIsLogin(id !== null && type === 'user');
    } catch (error) {
      console.error('Error retrieving user data', error);
    }
  };

  const getDataFirebase = async () => {
    const id = await AsyncStorage.getItem('ID');
    firestore()
      .collection('Users_Jobs')
      .doc(id)
      .get()
      .then(data => setUserData(data.data()))
      .catch(error => console.error('Error fetching Firebase data:', error));
  };

  const toggleModal = type => {
    setModalType(type);
    setModalVisible(!isModalVisible);
  };

  const handleAddItem = () => {
    if (modalType === 'skill' && newSkill.trim() !== '') {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    } else if (
      modalType === 'experience' &&
      Object.values(newExperience).every(field => field.trim() !== '')
    ) {
      setExperience(prev => [...prev, newExperience]);
      setNewExperience({
        companyName: '',
        duration: '',
        salary: '',
        position: '',
      });
    } else if (
      modalType === 'education' &&
      Object.values(newEducation).every(field => field.trim() !== '')
    ) {
      setEducation(prev => [...prev, newEducation]);
      setNewEducation({ university: '', degree: '' });
    }
    setModalVisible(false);
  };

  const handleRemoveItem = (type, index) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          if (type === 'skill')
            setSkills(prev => prev.filter((_, i) => i !== index));
          if (type === 'experience')
            setExperience(prev => prev.filter((_, i) => i !== index));
          if (type === 'education')
            setEducation(prev => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const renderItem = (item, index, type) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {type === 'experience'
          ? `${item.position} at ${item.companyName} (${item.duration}) - Salary: ${item.salary}`
          : type === 'education'
          ? `${item.degree} from ${item.university}`
          : item}
      </Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(type, index)}>
        <Image
          source={require('../assets/images/close.png')}
          style={{ width: scale(15), height: scale(15) }}
        />
      </TouchableOpacity>
    </View>
  );

  const handleProfileImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.7,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0].uri;
        setProfileImage(source); // Update the profile image state
        saveProfileImage(source); // Call saveProfileImage to upload the image
      }
    });
  };

  // Function to save profile image
  const saveProfileImage = async (uri) => {
    try {
      // Save the image URI in AsyncStorage
      await AsyncStorage.setItem('profileImage', uri);
      setProfileImage(uri); // Update local state
    } catch (error) {
      console.error('Error saving profile image:', error);
      Alert.alert('Error', 'Could not save profile image.');
    }
  };

  return !isLogin ? (
    <View style={styles.Container}>
      <NoLoginComponent
        heading={
          'Manage your professional profile/portfolio for attracting many jobs'
        }
        desc={'Easily manage your profile/portfolio'}
      />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.scrollView}>
      <TouchableOpacity onPress={handleProfileImage}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../assets/images/user.png')
          }
          style={styles.EmpProfile}
        />
      </TouchableOpacity>
      <Text style={[styles.UserStyle, { left: 5 }]}>
        {userData ? userData.name : 'Name'}
      </Text>
      <Text style={[styles.UserStyle, { fontSize: 20 }]}>
        {userData ? userData.email : 'Email'}
      </Text>
      <TouchableOpacity
        style={styles.ButtonStyle}
        onPress={() => {
          navigation.navigate('EditProfile', {
            skills,
            experience,
            education,
            onSave: (updatedSkills, updatedExperience, updatedEducation) => {
              setSkills(updatedSkills);
              setExperience(updatedExperience);
              setEducation(updatedEducation);
            },
          });
        }}>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 20 }}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      {/* Skills Section */}
      <Section
        title="Skills"
        data={skills}
        onAdd={() => toggleModal('skill')}
        renderItem={(item, index) => renderItem(item, index, 'skill')}
      />

      {/* Experience Section */}
      <Section
        title="Experience"
        data={experience}
        onAdd={() => toggleModal('experience')}
        renderItem={(item, index) => renderItem(item, index, 'experience')}
      />

      {/* Education Section */}
      <Section
        title="Education"
        data={education}
        onAdd={() => toggleModal('education')}
        renderItem={(item, index) => renderItem(item, index, 'education')}
      />

      {/* Modal for Adding Items */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            Add {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
          </Text>

          {modalType === 'skill' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Skill here"
                placeholderTextColor="black"
                value={newSkill}
                onChangeText={setNewSkill}
              />
            </>
          ) : modalType === 'experience' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                placeholderTextColor="black"
                value={newExperience.companyName}
                onChangeText={text =>
                  setNewExperience({ ...newExperience, companyName: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Duration"
                placeholderTextColor="black"
                value={newExperience.duration}
                onChangeText={text =>
                  setNewExperience({ ...newExperience, duration: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Salary"
                placeholderTextColor="black"
                value={newExperience.salary}
                onChangeText={text =>
                  setNewExperience({ ...newExperience, salary: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Position"
                placeholderTextColor="black"
                value={newExperience.position}
                onChangeText={text =>
                  setNewExperience({ ...newExperience, position: text })
                }
              />
            </>
          ) : modalType === 'education' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="University"
                placeholderTextColor="black"
                value={newEducation.university}
                onChangeText={text =>
                  setNewEducation({ ...newEducation, university: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Degree"
                placeholderTextColor="black"
                value={newEducation.degree}
                onChangeText={text =>
                  setNewEducation({ ...newEducation, degree: text })
                }
              />
            </>
          ) : null}

          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Separate component for rendering sections
const Section = ({ title, data, onAdd, renderItem }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      data={data}
      renderItem={({ item, index }) => renderItem(item, index, title.toLowerCase())}
      keyExtractor={(item, index) => index.toString()}
    />
    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
      <Text style={styles.addButtonText}>Add {title}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
        flexGrow: 1,
      },
      scrollView: {
        flex: 1,
      },
      Container: {
        flex: 1,
      },
      EmpProfile: {
        width: moderateScale(100),
        height: moderateScale(100),
        alignSelf: 'center',
        borderRadius:50
      },
      UserStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
      },
      ButtonStyle: {
        backgroundColor: '#B0E0E6',
        padding: moderateScale(10),
        borderRadius: 10,
        marginTop: 10,
        width: '50%',
        alignSelf: 'center',
      },
      section: {
        marginBottom: moderateScale(20),
      },
      sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: moderateScale(10),
        color: 'black',
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: moderateScale(10),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: moderateScale(5),
      },
      itemText: {
        fontSize: 16,
        color: 'black',
      },
      removeButton: {
        padding: moderateScale(5),
      },
      modalView: {
        backgroundColor: 'white',
        padding: moderateScale(20),
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: moderateScale(10),
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: moderateScale(10),
        marginBottom: moderateScale(10),
        color: 'black',
      },
      addButton: {
        backgroundColor: 'black',
        padding: moderateScale(10),
        borderRadius: 5,
        alignItems: 'center',
      },
      addButtonText: {
        color: 'white',
        fontSize: 16,
      },
});

export default EmpProfile;
