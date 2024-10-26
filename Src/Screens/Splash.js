// import { Image, StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Splash = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const checkUserType = async () => {
//       try {
//         const type = await AsyncStorage.getItem('USER_TYPE');
//         if (type !== null) {
//           if (type === 'Company') {
//             navigation.navigate('DashboardForCompany');  
//           } 
//         } else {
//           navigation.navigate('Option');  
//           // navigation.navigate('JobSearchingNavigator');  
//         }
//       } catch (error) {
//         console.log('Error retrieving user type:', error);
//       }
//     };

//     setTimeout(checkUserType, 1000);  
//   }, []);

//   return (
//     <View style={styles.Container}>
//       <Image source={require('../assets/images/jobimg.png')} />
//       <Text style={styles.textStyle}>FindMyJob</Text>
//       <Text style={{ color: 'black', top: 100, fontSize: 18, fontWeight: '600' }}>
//         Grab your opportunity from here
//       </Text>
//     </View>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   textStyle: {
//     color: 'blue',
//     fontSize: 35,
//     fontWeight: '500',
//   },
// });

import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const type = await AsyncStorage.getItem('USER_TYPE');
        console.log('Retrieved USER_TYPE:', type); // Debugging

        if (type === 'Company') {
          navigation.reset({
            index:0,
            routes:[{name:"DashboardForCompany"}]
          });
        } else if (type === 'user') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'JobSearchingNavigator' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Option' }],
          });
        }
      } catch (error) {
        console.log('Error retrieving USER_TYPE:', error);
      }
    };

    checkUserType();
  }, [navigation]);

  return (
    <View style={styles.Container}>
      <Image source={require('../assets/images/jobimg.png')} />
      <Text style={styles.textStyle}>FindMyJob</Text>
      <Text style={{ color: 'black', top: 100, fontSize: 18, fontWeight: '600' }}>
        Grab your opportunity from here
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'blue',
    fontSize: 35,
    fontWeight: '500',
  },
});
