import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoLoginComponent from '../Commons/NoLoginComponent'

const Chating = () => {
  return (
    <View style={styles.Container}>
      <NoLoginComponent
        heading={'Talk to any recruiter for getting a job recommentation from MNCs '}
        desc={
          'you can  chat with recruiters of MNCs'
        }
      />
    </View>
  )
}

export default Chating

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
})