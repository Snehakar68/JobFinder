import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const NoLoginComponent = ({heading, desc, OnClick}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.Desc}>{desc}</Text>
      <TouchableOpacity style={styles.btn} onPress={OnClick}>
        <Text style={styles.Textstyle}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'black', fontSize: 20, left: 15}}>
          {"Don't have an account?"}
        </Text>
        <Text style={{color: 'black', fontSize: 20, left: 15,fontWeight:"500"}} >
          {'Create Account'}
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.btn}>
        <Text style={styles.Textstyle}>SignUp</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default NoLoginComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    justifyContent:"center"
  },
  heading: {
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  Desc: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    width: '95%',
    height: '8%',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'black',
    marginVertical: 15,
  },
  Textstyle: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
});
