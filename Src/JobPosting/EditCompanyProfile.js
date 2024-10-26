import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInput from '../Commons/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  verticalScale,
  scale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Indicator from '../Commons/Indicator';
import firestore from '@react-native-firebase/firestore'; // Correct Firestore import
import CustomBackButton from '../Commons/CustomBackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditCompanyProfile = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    companyName: '',
  });
  const [loading, setLoading] = useState(false);

  const nameRegex = /^[a-zA-Z ]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex =
    /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?){1,4}\d{1,9}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const Validation = () => {
    let nameError = '';
    let emailError = '';
    let mobileError = '';
    let addressError = '';
    let companyNameError = '';

    if (!name.trim()) {
      nameError = 'Please enter your name';
    } else if (name.length < 3 || !nameRegex.test(name)) {
      nameError = 'Please enter a valid name (letters and spaces only)';
    }

    if (!email.trim()) {
      emailError = 'Please enter your email';
    } else if (!emailRegex.test(email)) {
      emailError = 'Please enter a valid email';
    }

    if (!mobile.trim()) {
      mobileError = 'Please enter your contact number';
    } else if (!mobileRegex.test(mobile)) {
      mobileError = 'Please enter a valid contact number';
    }

    if (!companyName.trim()) {
      companyNameError = 'Please enter your company name';
    }

    if (!address.trim()) {
      addressError = 'Please enter your address';
    }

    setErrors({
      name: nameError,
      email: emailError,
      mobile: mobileError,
      companyName: companyNameError,
      address: addressError,
    });

    return (
      !nameError &&
      !emailError &&
      !mobileError &&
      !companyNameError &&
      !addressError
    );
  };

  const handleSignup = () => {
    if (Validation()) {
      UpdateUsers(); // Call RegisterUsers only if validation is successful
    } else {
      Alert.alert('Validation Failed', 'Please fix the errors and try again.');
    }
  };

  const UpdateUsers = async () => {
    try {
      setLoading(true);
      const Id = await AsyncStorage.getItem('ID');
      // Firestore write operation
      firestore().collection('Posting_Jobs').doc(Id).update({
        name,
        email,
        mobile,
        companyName,
        address,
      });
      await AsyncStorage.setItem("Name",name)
      setLoading(false);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);

      console.log(require('../assets/images/check.png'));
    } catch (error) {
      setLoading(false);
      console.error('Error registering user: ', error);
      Alert.alert(
        'Registration Failed',
        'Something went wrong. Please try again.',
      );
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const MyEmail = await AsyncStorage.getItem('Email');
    firestore()
      .collection('Posting_Jobs')
      .where('email', '==', MyEmail)
      .get()
      .then(res => {
        res.docs.forEach(item => {
          setName(item.data().name);
          setEmail(item.data().email);
          setAddress(item.data().address);
          setCompanyName(item.data().companyName);
          setMobile(item.data().mobile);
        });
      });
  };
  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{paddingBottom: insets.bottom || 20}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
        <CustomBackButton
          onClick={() => {
            navigation.navigate('UserProfile');
          }}
          title={'Edit Profile'}
        />
        <Image
          source={require('../assets/images/jobimg.png')}
          style={styles.img}
        />
        <Text style={styles.headerText}>Update Profile</Text>

        <CustomInput
          title="Name"
          placeholder="John Smith"
          value={name}
          onChangeText={setName}
          bad={!!errors.name}
        />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}

        <CustomInput
          title="Mobile"
          placeholder="XXXXXXXX89"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
          bad={!!errors.mobile}
        />
        {errors.mobile ? (
          <Text style={styles.errorText}>{errors.mobile}</Text>
        ) : null}

        <CustomInput
          title="Address"
          placeholder="H no-XX Flat no-XX near XXXX"
          value={address}
          onChangeText={setAddress}
          bad={!!errors.address}
        />
        {errors.address ? (
          <Text style={styles.errorText}>{errors.address}</Text>
        ) : null}

        <CustomInput
          title="Company Name"
          placeholder="XXX XXX Pvt Ltd"
          value={companyName}
          onChangeText={setCompanyName}
          bad={!!errors.companyName}
        />
        {errors.companyName ? (
          <Text style={styles.errorText}>{errors.companyName}</Text>
        ) : null}

        <CustomInput
          title="Email"
          placeholder="john@XXX.com"
          value={email}
          onChangeText={setEmail}
          bad={!!errors.email}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <TouchableOpacity style={styles.btnStyle} onPress={handleSignup}>
          <Text style={styles.btn}>Update</Text>
        </TouchableOpacity>

        <Indicator visible={loading} />
      </View>
    </ScrollView>
  );
};

export default EditCompanyProfile;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(10),
    backgroundColor: 'white',
  },
  img: {
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
  errorText: {
    color: 'red',
    fontSize: scale(14),
    marginTop: verticalScale(5),
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
  doneView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Check: {
    width: 100, // Ensure width is set
    height: 100, // Ensure height is set
    resizeMode: 'contain', // Scale image correctly
  },
});
