import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';

const CustomInput = ({ title, placeholder, value, onChangeText,bad,secureTextEntry=false,keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.txtStyle}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"  // Semi-transparent black color
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input,{borderColor:bad?"red":"#ccc"}]}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    marginVertical: verticalScale(5),  // Space between inputs
  },
  input: {
    width: "100%",  // Adjust width to the container
    height: verticalScale(45),
    borderWidth: 0.7,
    paddingRight: moderateScale(15),
    paddingLeft: moderateScale(5),
    color: "black",
    borderRadius: moderateScale(10),
  },
  txtStyle: {
    color: "black",
    alignSelf: "flex-start",
    marginLeft: moderateScale(10),
    marginBottom: moderateVerticalScale(5), 
    top:moderateVerticalScale(15),
    // backgroundColor: "white",
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    fontWeight:"600"
  },
});
