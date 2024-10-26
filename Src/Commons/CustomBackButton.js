import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomBackButton = ({title,onClick}) => {
  return (
    <TouchableOpacity style={{flexDirection:"row",paddingRight:180}} onPress={onClick}>
        <Image source={require("../assets/images/back.png")} style={{width:30,height:30}}/>
      <Text style={{color:"black",fontSize:20,left:10}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBackButton

const styles = StyleSheet.create({})