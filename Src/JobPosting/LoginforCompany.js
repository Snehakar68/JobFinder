import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../Commons/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import Indicator from '../Commons/Indicator';
import firestore from '@react-native-firebase/firestore'; // Correct Firestore import
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginforCompany = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = () => {
    let valid = true;

    // Password validation
    if (!password.trim()) {
      setPasswordErr('Please enter your name');
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordErr('Please enter a valid Password');
      valid = false;
    } else {
      setPasswordErr('');
    }

    // Email validation
    if (!email.trim()) {
      setEmailErr('Please enter your email');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailErr('Please enter a valid email');
      valid = false;
    } else {
      setEmailErr('');
    }

    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      LoginUser();
    } else {
      Alert.alert('Validation Failed', 'Please fix the errors and try again.');
    }
  };

  const LoginUser = () => {
    setLoading(true);
    firestore()
      .collection('Posting_Jobs')
      .where('email', '==', email)
      .get()
      .then(userdata => {
        setLoading(false);

        if (userdata.docs.length > 0) {
          userdata.docs.forEach((item)=>{
            if (item.data().password === password) {
            setEmailErr(''); 
            setPasswordErr(''); 
            getDataInLogin(item.id,item.data().name,item.data().email)
            Alert.alert('Success', 'Login successful!');
          } else {
            setPasswordErr('Incorrect password'); 
          }
          })
          // const userData = userdata.docs[0].data(); 
          // console.log(userData)
          
          // if (userData.password === password) {
          //   setEmailErr(''); 
          //   setPasswordErr(''); 

          //   Alert.alert('Success', 'Login successful!');
          // } else {
          //   setPasswordErr('Incorrect password'); 
          // }
        } else {
          setEmailErr('Email does not exist'); 
        }
      })
      .catch(error => {
        setLoading(false); // Ensure loading state is reset in case of an error
        console.log('Error:', error);
        Alert.alert('Error', 'An error occurred while logging in.');
      });
  };
const getDataInLogin = async(id,name,email)=>{
    await AsyncStorage.setItem("Name", name)
    await AsyncStorage.setItem("Email", email)
    await AsyncStorage.setItem("ID",id)
    await AsyncStorage.setItem("USER_TYPE","Company")
    navigation.navigate("DashboardForCompany")
}
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/jobimg.png')}
        style={styles.Img}
      />
      <Text style={styles.headerText}>Login</Text>

      {/* CustomInput for Email */}
      <CustomInput
        title="Email"
        placeholder="john@XXX.com"
        value={email}
        onChangeText={setEmail}
        bad={!!emailErr}
      />
      {emailErr ? <Text style={{color: 'red'}}>{emailErr}</Text> : null}

      {/* CustomInput for password */}
      <CustomInput
        title="Password"
        placeholder=" *********"
        value={password}
        onChangeText={setPassword}
        bad={!!passwordErr}
        secureTextEntry={true}
      />
      {passwordErr ? <Text style={{color: 'red'}}>{passwordErr}</Text> : null}

      <Text
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('SigupforCompany')}>
        Forget Password
      </Text>

      {/* Log In Button */}
      <TouchableOpacity style={styles.btnStyle} onPress={handleLogin}>
        <Text style={styles.btn}>Log In</Text>
      </TouchableOpacity>
      <Indicator visible={loading} />

      {/* Create new Account */}
      <Text
        style={styles.createAccount}
        onPress={() => navigation.navigate('SigupforCompany')}>
        Create new Account from here
      </Text>
    </View>
  );
};

export default LoginforCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Img: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginBottom: verticalScale(20),
  },
  headerText: {
    color: 'black',
    fontSize: scale(30),
    fontWeight: '600',
    marginBottom: verticalScale(20),
  },
  forgotPassword: {
    color: 'blue',
    fontSize: scale(17),
    alignSelf: 'flex-start',
    marginLeft: moderateScale(50),
    marginTop: verticalScale(10),
  },
  btnStyle: {
    width: moderateScale(150),
    borderWidth: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(50),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(20),
    backgroundColor: 'black',
  },
  btn: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: '600',
  },
  createAccount: {
    color: 'blue',
    fontSize: scale(15),
    marginTop: verticalScale(100),
    textDecorationLine: 'underline',
  },
});
