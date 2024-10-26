import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
      } else {
        console.log('Unknown response:', response);
        Alert.alert('Error', 'An unknown error occurred.');
      }
    });
  };
  useEffect(() => {
    if (route.params?.selectedImage) {
      setSelectedImage(route.params.selectedImage);
    } else {
      loadImage();
    }
  }, [route.params?.selectedImage]);
  const loadImage = async () => {
    const storeImage=await AsyncStorage.getItem('Selectprofile');
    if(storeImage){
      setSelectedImage(storeImage)
    }
  };
  const saveInStorage = async imagefile => {
    await AsyncStorage.setItem('Selectprofile', imagefile);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/images/close.png')}
          style={styles.back}
        />
      </TouchableOpacity>
      <Image
        source={
          selectedImage
            ? {uri: selectedImage}
            : require('../assets/images/user.png')
        }
        style={styles.Profile}
      />
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={openImagePicker}>
        <Text style={styles.TextStyle}>Change your profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          if (selectedImage) {
            saveInStorage(selectedImage);
            navigation.navigate('UserProfile', {selectedImage});
          } else {
            Alert.alert(
              'No Image Selected',
              'Please select an image before uploading.',
            );
          }
        }}>
        <Text style={styles.uploadText}>Upload your Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  back: {
    width: verticalScale(18),
    height: moderateVerticalScale(18),
  },
  Profile: {
    width: scale(245),
    height: scale(250),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: scale(125),
  },
  TextStyle: {
    color: 'blue',
    textAlign: 'center',
    marginVertical: 15,
    borderWidth: 1,
    width: 200,
    height: 50,
    paddingTop: 10,
    fontSize: 18,
    borderRadius: 15,
  },
  uploadText: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    borderWidth: 1,
    width: 300,
    height: 50,
    paddingTop: 10,
    fontSize: 18,
    borderRadius: 15,
  },
});
