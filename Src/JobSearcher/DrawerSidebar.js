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
import {moderateScale, scale} from 'react-native-size-matters';
import {FlatList} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerSidebar = ({navigation}) => {
  const menuItems = [
    {title: 'Saved Jobs', icon: require('../assets/images/star1.png')},
    {title: 'Rate Us', icon: require('../assets/images/star.png')},
    {title: 'Theme', icon: require('../assets/images/Theme.png')},
  ];

  const IsFocused = useIsFocused();
  const [IsLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(
    require('../assets/images/user.png'),
  ); // Default image

  useEffect(() => {
    getData();
  }, [IsFocused]);

  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem('ID');
      const type = await AsyncStorage.getItem('USER_TYPE');
      const UserName = await AsyncStorage.getItem('Name');
      const UserEmail = await AsyncStorage.getItem('Email');
      const userImage = await AsyncStorage.getItem('ProfileImage'); // Get profile image

      if (id !== null && type === 'user') {
        setIsLogin(true);
        setName(UserName);
        setEmail(UserEmail);
        if (userImage) {
          setProfileImage({uri: userImage}); // Set the image URI if available
        }
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };
  const handlePressProfile = () => {
    if (IsLogin) {
      navigation.navigate('EmpProfile');
    } else {
      Alert.alert('User Doesnt Logged In');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={handlePressProfile}>
        <Image
          source={profileImage} // Use the retrieved profile image
          style={styles.profileImage}
        />

        <View style={styles.profileTextContainer}>
          <Text style={styles.profileTitle}>
            {IsLogin ? name : 'Build Your Profile'}
          </Text>
          <Text
            style={[styles.profileSubtitle, {width: IsLogin ? '100%' : '50%'}]}>
            {IsLogin ? email : 'Your Dream Job is waiting for you in FindMyJob'}
          </Text>
        </View>
      </TouchableOpacity>

      {!IsLogin && (
        <View style={styles.BtnContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]}>
            <Text style={[styles.btnstyle, {color: 'white'}]}>Login </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={[styles.btnstyle, {color: 'black'}]}>Register </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.separator}></View>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('SavedJobList');
            }}>
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.LogOutStyle} onPress={()=>{
          // navigation.closeDrawer()
          navigation.navigate("Option")
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DrawerSidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: scale(10),
    // paddingVertical: moderateScale(20),
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: '21%',
    height: '100%',
    borderWidth: 1,
    // borderRadius: 40,
  },
  profileTextContainer: {
    marginLeft: scale(10),
    // top: 20,
  },
  profileTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: 'black',
  },
  profileSubtitle: {
    fontSize: moderateScale(14),
    color: 'black',
    marginTop: moderateScale(8),
    width: '50%',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: moderateScale(20),
    top: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  menuIcon: {
    width: scale(30),
    height: scale(30),
    marginRight: scale(15),
  },
  menuText: {
    fontSize: moderateScale(16),
    color: 'black',
    fontWeight: '400',
  },
  btnstyle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  BtnContainer: {
    top: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 120,
    height: 40,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderRadius: 30,
  },
  LogOutStyle:{
    position: 'absolute',
    bottom: 0,
    width: 150,
    height: 40,
    backgroundColor: 'black',
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
});
