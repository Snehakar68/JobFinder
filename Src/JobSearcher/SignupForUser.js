import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const SignupForUser = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [AccountCreated, setAccountCreated] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
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
    let passwordError = '';
    let mobileError = '';

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

    if (!password.trim()) {
      passwordError = 'Please enter your password';
    } else if (!passwordRegex.test(password)) {
      passwordError =
        'Password must be at least 8 characters, include an uppercase letter, number, and special character';
    }

    setErrors({
      name: nameError,
      email: emailError,
      mobile: mobileError,
      password: passwordError,
    });

    return !nameError && !emailError && !mobileError && !passwordError;
  };

  const handleSignup = () => {
    if (Validation()) {
      RegisterUsers(); // Call RegisterUsers only if validation is successful
    } else {
      Alert.alert('Validation Failed', 'Please fix the errors and try again.');
    }
  };

  const RegisterUsers = async () => {
    try {
      setLoading(true);
      // Firestore write operation
      await firestore().collection('Users_Jobs').add({
        name,
        email,
        mobile,
        password,
      });
      setAccountCreated(true);
      setLoading(false);
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
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

  return (
    // Corrected conditional rendering using `AccountCreated`
    AccountCreated ? (
      <View style={styles.doneView}>
        <Image
          style={styles.Check}
          source={require('../assets/images/check.png')}
        />
        <Text style={{color: 'black'}}>{'Account Created'}</Text>
      </View>
    ) : (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{paddingBottom: insets.bottom || 20}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../assets/images/jobimg.png')}
            style={styles.img}
          />
          <Text style={styles.headerText}>Create Account</Text>

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
            title="Email"
            placeholder="john@XXX.com"
            value={email}
            onChangeText={setEmail}
            bad={!!errors.email}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <CustomInput
            title="Password"
            placeholder="XYZ@8766"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            bad={!!errors.password}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <TouchableOpacity style={styles.btnStyle} onPress={handleSignup}>
            <Text style={styles.btn}>Sign Up</Text>
          </TouchableOpacity>

          <Indicator visible={loading} />
          <Text
            style={styles.createAccount}
            onPress={() => navigation.navigate("LoginForUser")}>
            Already have an account? Login here
          </Text>
        </View>
      </ScrollView>
    )
  );
};

export default SignupForUser;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(30),
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
