import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileInfo = ({icon, title, onclick}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onclick}>
      {/* Left section: Image and title */}
      <View style={styles.leftSection}>
        <Image source={icon} style={styles.jobStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
      </View>

      {/* Right section: Icon */}
      <Icon name="navigate" size={24} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space between the left section and the icon
    alignItems: 'center', // Vertically center items
    paddingHorizontal: 20, // Padding on the left and right
    width: '100%', // Full width to push the icon to the far right
    paddingVertical: 15,
    top: 30,
  },
  leftSection: {
    flexDirection: 'row', // Align the image and title horizontally
    alignItems: 'center',
  },
  jobStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  titleStyle: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10, // Space between image and title
  },
  iconStyle: {
    color: 'black',
    position: 'absolute', // Positioning the icon
    right: 20, // Moves icon to the right corner
  },
});
