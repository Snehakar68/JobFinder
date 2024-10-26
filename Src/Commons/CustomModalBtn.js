import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';

const CustomModalBtn = ({title, onClick, placeholder,bad}) => {
  return (
    <TouchableOpacity
      style={styles.inputContainer}
      onPress={() => {
        onClick()
      }}>
      <Text style={styles.txtStyle}>{title}</Text>
      <Text style={[styles.input,{borderColor: bad? 'red' :"#ccc",}]}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default CustomModalBtn;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    marginVertical: verticalScale(5), // Space between inputs
  },
  input: {
    width: '100%', // Adjust width to the container
    height: verticalScale(45),
    borderWidth: 0.7,
    paddingRight: moderateScale(15),
    paddingLeft: moderateScale(5),
    color: 'rgba(0,0,0,0.5)',
    borderRadius: moderateScale(10),
    paddingTop:10
  },
  txtStyle: {
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(10),
    marginBottom: moderateVerticalScale(5),
    top: moderateVerticalScale(15),
    // backgroundColor: "white",
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    fontWeight: '600',
  },
});
