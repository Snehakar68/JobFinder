import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'

const Indicator = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade" // Optional: Add animation for a better experience
    >
      <View style={styles.container}>
        <View style={styles.miniContainer}>
          <ActivityIndicator size={'large'} color="white" />
        </View>
      </View>
    </Modal>
  )
}

export default Indicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the whole screen
  },
  miniContainer: {
    width: moderateScale(90),
    height: moderateScale(90),
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // More opaque for the indicator container
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
