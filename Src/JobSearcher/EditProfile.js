// // EditProfile.js
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from 'react-native';

// const EditProfile = ({route, navigation}) => {
//   const {skills, experience, education, onSave} = route.params;

//   const [updatedSkills, setUpdatedSkills] = useState(skills);
//   const [updatedExperience, setUpdatedExperience] = useState(experience);
//   const [updatedEducation, setUpdatedEducation] = useState(education);

//   const handleSave = () => {
//     onSave(updatedSkills, updatedExperience, updatedEducation);
//     Alert.alert('Profile Updated!', 'Your changes have been saved.', [
//       {text: 'OK', onPress: () => navigation.goBack()},
//     ]);
//   };

//   const renderItem = (item, index, type, setData) => (
//     <View style={styles.item}>
//       <TextInput
//         style={styles.input}
//         value={type === 'skill' ? item : item.position || item.degree}
//         onChangeText={(text) => {
//           const newData = [...(type === 'skill' ? updatedSkills : type === 'experience' ? updatedExperience : updatedEducation)];
//           newData[index] = { ...newData[index], ...(type === 'skill' ? text : { position: text }) };
//           setData(newData);
//         }}
//       />
//     </View>
//   );

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Edit Profile</Text>

//       {/* Skills Section */}
//       <Text style={styles.sectionTitle}>Skills</Text>
//       <FlatList
//         data={updatedSkills}
//         renderItem={({item, index}) =>
//           renderItem(item, index, 'skill', setUpdatedSkills)
//         }
//         keyExtractor={(item, index) => index.toString()}
//       />

//       {/* Experience Section */}
//       <Text style={styles.sectionTitle}>Experience</Text>
//       <FlatList
//         data={updatedExperience}
//         renderItem={({item, index}) =>
//           renderItem(item, index, 'experience', setUpdatedExperience)
//         }
//         keyExtractor={(item, index) => index.toString()}
//       />

//       {/* Education Section */}
//       <Text style={styles.sectionTitle}>Education</Text>
//       <FlatList
//         data={updatedEducation}
//         renderItem={({item, index}) =>
//           renderItem(item, index, 'education', setUpdatedEducation)
//         }
//         keyExtractor={(item, index) => index.toString()}
//       />

//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color:"black"
//   },
//   sectionTitle: {
//     fontSize: 20,
//     marginTop: 15,
//     marginBottom: 10,
//     color:"black"
//   },
//   item: {
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     borderRadius: 5,
//     color:"green"
//   },
//   saveButton: {
//     backgroundColor: 'blue',
//     padding: 15,
//     marginTop: 20,
//     borderRadius: 10,
//   },
//   saveButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });

// export default EditProfile;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

const EditProfile = ({ route, navigation }) => {
  const { skills, experience, education, onSave } = route.params;

  const [updatedSkills, setUpdatedSkills] = useState(skills);
  const [updatedExperience, setUpdatedExperience] = useState(experience);
  const [updatedEducation, setUpdatedEducation] = useState(education);

  const handleSave = () => {
    onSave(updatedSkills, updatedExperience, updatedEducation);
    Alert.alert('Profile Updated!', 'Your changes have been saved.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const renderItem = (item, index, type, setData) => (
    <View style={styles.item}>
      <TextInput
        style={styles.input}
        value={
          type === 'skill'
            ? item
            : type === 'experience'
            ? item.position
            : item.degree
        }
        onChangeText={(text) => {
          const newData = [...(type === 'skill'
            ? updatedSkills
            : type === 'experience'
            ? updatedExperience
            : updatedEducation)];

          if (type === 'skill') {
            newData[index] = text;
          } else if (type === 'experience') {
            newData[index] = { ...newData[index], position: text };
          } else {
            newData[index] = { ...newData[index], degree: text };
          }

          setData(newData);
        }}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Skills Section */}
      <Text style={styles.sectionTitle}>Skills</Text>
      <FlatList
        data={updatedSkills}
        renderItem={({ item, index }) =>
          renderItem(item, index, 'skill', setUpdatedSkills)
        }
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Experience Section */}
      <Text style={styles.sectionTitle}>Experience</Text>
      <FlatList
        data={updatedExperience}
        renderItem={({ item, index }) =>
          renderItem(item, index, 'experience', setUpdatedExperience)
        }
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Education Section */}
      <Text style={styles.sectionTitle}>Education</Text>
      <FlatList
        data={updatedEducation}
        renderItem={({ item, index }) =>
          renderItem(item, index, 'education', setUpdatedEducation)
        }
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
    color: 'black',
  },
  item: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    color: 'green',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditProfile;
