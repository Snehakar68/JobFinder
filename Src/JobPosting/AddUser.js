import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomInput from '../Commons/CustomInput';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import CustomModalBtn from '../Commons/CustomModalBtn';
import {SkillsArray} from '../assets/SkillsArray';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Indicator from '../Commons/Indicator';

const AddUser = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [JobTitle, setJobTitle] = useState('');
  const [JobDesc, setJobDesc] = useState('');
  const [Company, setCompany] = useState('');
  const [Package, setPackage] = useState('');
  const [experience, setExperience] = useState('');
  const [Categoryvisible, setCategoryvisible] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [SkillVisible, setSkillVisible] = useState(false);
  const [SelectedSkills, setSelectedSkills] = useState([]);
  const [errors, setErrors] = useState({
    Title: '',
    Desc: '',
    Company: '',
    Package: '',
    Experience: '',
    Skills: '',
    Category: '',
  });
  useFocusEffect(
    useCallback(() => {
      setJobTitle('');
      setJobDesc('');
      setCompany('');
      setPackage('');
      setExperience('');
      setSelectedCategory(null);
      setSelectedSkills([]);
      setErrors({
        Title: '',
        Desc: '',
        Company: '',
        Package: '',
        Experience: '',
        Skills: '',
        Category: '',
      });
    }, []),
  );
  const Validation = () => {
    let TitleErr = '';
    let DescErr = '';
    let CompanyErr = '';
    let PackageErr = '';
    let ExpErr = '';
    let SkillErr = '';
    let CategoryErr = '';

    if (!JobTitle.trim()) {
      TitleErr = 'Please fill your JobTitle here';
    }
    if (!JobDesc) {
      DescErr = 'please fill your Job Description';
    } else if (JobDesc.length < 10) {
      DescErr = 'minimum 10 words required';
    }
    if (!Company.trim()) {
      CompanyErr = "Please fill your Company's name here";
    }
    if (!Package) {
      PackageErr = 'Please fill your Anuual Package here';
    }
    if (!experience) {
      ExpErr = 'Please fill your work experience here';
    }
    if (!SelectedCategory) {
      CategoryErr = 'Please choose one Category here';
    }
    if (!SelectedSkills) {
      SkillErr = 'Please Select your Skills here';
    }
    setErrors({
      Title: TitleErr,
      Desc: DescErr,
      Company: CompanyErr,
      Package: PackageErr,
      Experience: ExpErr,
      Skills: SkillErr,
      Category: CategoryErr,
    });
    return (
      !TitleErr &&
      !DescErr &&
      !CategoryErr &&
      !PackageErr &&
      !ExpErr &&
      !SkillErr &&
      !CategoryErr
    );
  };
  const JobPost = async () => {
    try {
      const User_id = await AsyncStorage.getItem('ID');
      const name = await AsyncStorage.getItem('Name');
      currentDate = new Date().toISOString();
      if (SelectedCategory !== null && SkillsArray[SelectedCategory]) {
        await firestore().collection('JobList').add({
          Postedby: User_id,
          PostedName: name,
          JobTitle,
          JobDesc,
          Company,
          Package,
          experience,
          skills: SelectedSkills.flat(), // Flatten to avoid nested arrays
          category: SkillsArray[SelectedCategory].category, // Safely access category
          PostedAt: currentDate,
        });
      } else {
        Alert.alert('Please select a valid category and skills.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };
  const handleJobPost = () => {
    if (Validation()) {
      JobPost();
      navigation.navigate('Home');
    } else {
      Alert.alert('Validation falied , please fix the Error and try again ');
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <CustomInput
          title={'Job Title'}
          placeholder={'ex. XYZ Developer'}
          value={JobTitle}
          bad={!!errors.Title}
          onChangeText={txt => setJobTitle(txt)}
        />
        {errors.Title ? (
          <Text style={{color: 'red'}}>{errors.Title}</Text>
        ) : null}
        <CustomInput
          title={'Job Description'}
          placeholder={'Briefly explain your last job'}
          value={JobDesc}
          bad={!!errors.Desc}
          onChangeText={txt => setJobDesc(txt)}
        />
        {errors.Desc ? <Text style={{color: 'red'}}>{errors.Desc}</Text> : null}

        <CustomModalBtn
          title={'Category'}
          placeholder={
            SelectedCategory === null
              ? 'Select Category'
              : SkillsArray[SelectedCategory].category
          }
          onClick={() => {
            setCategoryvisible(true);
          }}
        />
        {errors.Category ? (
          <Text style={{color: 'red'}}>{errors.Category}</Text>
        ) : null}

        <CustomModalBtn
          title={'Skills'}
          placeholder={
            SelectedSkills.length === 0
              ? 'Select Skills'
              : SelectedSkills.join(', ')
          }
          onClick={() => {
            if (SelectedCategory !== null) {
              setSkillVisible(true);
            } else {
              Alert.alert('Please select a category first.');
            }
          }}
        />
        {errors.Skills ? (
          <Text style={{color: 'red'}}>{errors.Skills}</Text>
        ) : null}

        <CustomInput
          title={'Experience'}
          placeholder={'ex. 5 years'}
          value={experience}
          onChangeText={txt => setExperience(txt)}
          keyboardType={'numeric'}
        />
        {errors.Experience ? (
          <Text style={{color: 'red'}}>{errors.Experience}</Text>
        ) : null}

        <CustomInput
          title={'Package'}
          placeholder={'ex. 10 LPA'}
          value={Package}
          onChangeText={txt => setPackage(txt)}
          keyboardType={'numeric'}
        />
        {errors.Package ? (
          <Text style={{color: 'red'}}>{errors.Package}</Text>
        ) : null}

        <CustomInput
          title={'Company'}
          placeholder={'ex. XYZ Pvt Ltd'}
          value={Company}
          onChangeText={txt => setCompany(txt)}
        />
        {errors.Company ? (
          <Text style={{color: 'red'}}>{errors.Company}</Text>
        ) : null}

        <TouchableOpacity style={styles.SubmitBtn} onPress={handleJobPost}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 20}}>
            Job Post
          </Text>
        </TouchableOpacity>
        {/* <Indicator visible={visible} /> */}
        {/* Category Modal */}
        <Modal visible={Categoryvisible} transparent>
          <View style={styles.modal}>
            <View style={styles.ModalView}>
              <FlatList
                data={SkillsArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.categories}
                    onPress={() => {
                      setSelectedCategory(index);
                      setSelectedSkills([]); // Clear selected skills when category changes
                      setCategoryvisible(false);
                    }}>
                    <Text style={{color: 'black'}}>{item.category}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Skills Modal */}
        {SelectedCategory !== null && (
          <Modal visible={SkillVisible} transparent>
            <View style={styles.modal}>
              <View style={styles.ModalView}>
                <FlatList
                  data={SkillsArray[SelectedCategory].keywords}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.categories}
                      onPress={() => {
                        if (SelectedSkills.includes(item)) {
                          // Remove skill if already selected
                          setSelectedSkills(prev =>
                            prev.filter(skill => skill !== item),
                          );
                        } else {
                          // Add skill if not selected
                          setSelectedSkills(prev => [...prev, item]);
                        }
                      }}>
                      <Text
                        style={{
                          color: SelectedSkills.includes(item)
                            ? 'blue'
                            : 'black',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.SubmitBtn}
                  onPress={() => setSkillVisible(false)}>
                  <Text style={{color: 'white'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  SubmitBtn: {
    width: moderateScale(100),
    height: moderateVerticalScale(50),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    top: moderateVerticalScale(6),
    backgroundColor: 'black',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  categories: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(30),
    borderWidth: 0.2,
    marginVertical: 10,
  },
});
