import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {moderateVerticalScale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../Commons/CustomInput';
import CustomModalBtn from '../Commons/CustomModalBtn';
import {SkillsArray} from '../assets/SkillsArray';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [visible, setVisible] = useState(false); // Modal visibility
  const [Categoryvisible, setCategoryvisible] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [SkillVisible, setSkillVisible] = useState(false);
  const [SelectedSkills, setSelectedSkills] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    JobTitle: '',
    JobDesc: '',
    Company: '',
    Package: '',
    experience: '',
  });
  const [errors, setErrors] = useState({});
  const [editJobId, setEditJobId] = useState(null); // Job ID being edited
  const [loading, setLoading] = useState(false);
  const IsFocused = useIsFocused();

  // Fetch job details
  useEffect(() => {
    getDetails();
  }, [IsFocused]);

  const getDetails = async () => {
    setLoading(true);
    const Id = await AsyncStorage.getItem('ID');
    let temp = [];
    firestore()
      .collection('JobList')
      .where('Postedby', '==', Id)
      .get()
      .then(async JobInfo => {
        setLoading(false);
        JobInfo.docs.forEach(item => {
          temp.push({...item.data(), UserId: item.id});
        });
        await AsyncStorage.setItem('JOBS', temp.length + '');
        setJobs(temp);
      });
  };

  const deleteJob = id => {
    firestore()
      .collection('JobList')
      .doc(id)
      .delete()
      .then(() => {
        getDetails();
      });
  };

  // Open modal in Edit mode and pre-fill data
  const editJob = job => {
    const categoryIndex = SkillsArray.findIndex(
      category => category.category === job.category,
    );
    setJobDetails({
      JobTitle: job.JobTitle,
      JobDesc: job.JobDesc,
      Company: job.Company,
      Package: job.Package,
      experience: job.experience,
    });
    setSelectedCategory(categoryIndex); // Pre-select the correct category
    setSelectedSkills(job.skills);

    setEditJobId(job.UserId);
    setVisible(true); // Open modal
  };

  // Form validation logic
  const validate = () => {
    let TitleErr = !jobDetails.JobTitle.trim()
      ? 'Please fill your Job Title'
      : '';
    let DescErr = !jobDetails.JobDesc
      ? 'Please fill your Job Description'
      : jobDetails.JobDesc.length < 10
      ? 'Minimum 10 words required'
      : '';
    let CompanyErr = !jobDetails.Company.trim()
      ? "Please fill your Company's name"
      : '';
    let PackageErr = !jobDetails.Package
      ? 'Please fill your Annual Package'
      : '';
    let ExpErr = !jobDetails.experience
      ? 'Please fill your work experience'
      : '';
    let SkillErr = !SelectedSkills.length ? 'Please select your Skills' : '';
    let CategoryErr =
      SelectedCategory === null ? 'Please choose a Category' : '';

    setErrors({
      TitleErr,
      DescErr,
      CompanyErr,
      PackageErr,
      ExpErr,
      SkillErr,
      CategoryErr,
    });
    return !(
      TitleErr ||
      DescErr ||
      CompanyErr ||
      PackageErr ||
      ExpErr ||
      SkillErr ||
      CategoryErr
    );
  };

  // Update existing job data
  const updateJob = async () => {
    if (validate()) {
      // Update existing job in Firestore
      firestore()
        .collection('JobList')
        .doc(editJobId)
        .update({
          ...jobDetails,
          skills: SelectedSkills.flat(),
          category: SkillsArray[SelectedCategory].category,
        })
        .then(() => {
          setVisible(false);
          setEditJobId(null);
          getDetails(); // Refresh list after update
        });
    } else {
      Alert.alert('Validation failed, please fix the errors and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 30}}>FindMyJob</Text>
     {loading && 
      <View style={styles.loaderView}>
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({item, index}) => {
          return (
            <View style={styles.loaderView}>
              <ShimmerPlaceholder style={styles.loader} />
              <ShimmerPlaceholder
                style={[
                  styles.loader,
                  {width: '80%', alignSelf: 'flex-start', left: 20},
                ]}
              />
              <ShimmerPlaceholder
                style={[
                  styles.loader,
                  {width: '70%', alignSelf: 'flex-start', left: 20},
                ]}
              />
              <ShimmerPlaceholder
                style={[
                  styles.loader,
                  {width: '60%', alignSelf: 'flex-start', left: 20},
                ]}
              />
              <ShimmerPlaceholder
                style={[
                  styles.loader,
                  {width: '50%', alignSelf: 'flex-start', left: 20},
                ]}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  marginTop: 20,
                }}>
                <ShimmerPlaceholder style={styles.loaderBtn} />
                <ShimmerPlaceholder style={styles.loaderBtn} />
              </View>
            </View>
          );
        }}
      />
    </View>

     }

      {/* FlatList to show job details */}
      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={({item}) => (
            <ScrollView contentContainerStyle={styles.mainContainer}>
              <Text style={styles.label}>{item.JobTitle}</Text>
              <Text style={styles.label}>{item.category}</Text>
              <Text style={styles.label}>{item.JobDesc}</Text>
              <Text style={styles.label}>LPA: {item.Package}</Text>
              <Text style={styles.label}>Experience: {item.experience}</Text>
              <Text style={styles.label}>Skills: {item.skills.join(', ')}</Text>
              <Text style={styles.label}>{item.Company}</Text>
              <Text style={styles.label}>Posted By: {item.PostedName}</Text>
              <Text style={styles.label}>Posted At: {item.PostedAt}</Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => editJob(item)}
                  style={styles.editBtn}>
                  <Text style={{color: 'white',textAlign:"center"}}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteJob(item.UserId)}
                  style={styles.deleteBtn}>
                  <Text style={{color: 'white',textAlign:"center"}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        />
      ) : (
        <View style={styles.Empty}>
          <Text style={{color:"black",fontSize:20,fontWeight:"400"}}>Empty Jobs</Text>
        </View>
      )}

      {/* Modal for editing jobs */}
      <Modal visible={visible} transparent animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView>
            <Text style={{color: 'black', fontSize: 20}}>Edit Job</Text>
            <CustomInput
              title={'Job Title'}
              value={jobDetails.JobTitle}
              onChangeText={text =>
                setJobDetails({...jobDetails, JobTitle: text})
              }
            />
            {errors.TitleErr ? (
              <Text style={styles.errorText}>{errors.TitleErr}</Text>
            ) : null}

            <CustomInput
              title={'Job Description'}
              value={jobDetails.JobDesc}
              onChangeText={text =>
                setJobDetails({...jobDetails, JobDesc: text})
              }
            />
            {errors.DescErr ? (
              <Text style={styles.errorText}>{errors.DescErr}</Text>
            ) : null}

            <CustomModalBtn
              title={'Category'}
              value={''}
              placeholder={
                SelectedCategory === null
                  ? 'Select Category'
                  : SkillsArray[SelectedCategory].category
              }
              onClick={() => {
                setCategoryvisible(true);
              }}
            />
            {errors.CategoryErr ? (
              <Text style={styles.errorText}>{errors.CategoryErr}</Text>
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
            {errors.SkillErr ? (
              <Text style={styles.errorText}>{errors.SkillErr}</Text>
            ) : null}

            <CustomInput
              title={'Experience'}
              value={jobDetails.experience}
              onChangeText={text =>
                setJobDetails({...jobDetails, experience: text})
              }
              keyboardType={'numeric'}
            />
            {errors.ExpErr ? (
              <Text style={styles.errorText}>{errors.ExpErr}</Text>
            ) : null}

            <CustomInput
              title={'Package'}
              value={jobDetails.Package}
              onChangeText={text =>
                setJobDetails({...jobDetails, Package: text})
              }
              keyboardType={'numeric'}
            />
            {errors.PackageErr ? (
              <Text style={styles.errorText}>{errors.PackageErr}</Text>
            ) : null}

            <CustomInput
              title={'Company'}
              value={jobDetails.Company}
              onChangeText={text =>
                setJobDetails({...jobDetails, Company: text})
              }
            />
            {errors.CompanyErr ? (
              <Text style={styles.errorText}>{errors.CompanyErr}</Text>
            ) : null}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={updateJob} style={styles.modalBtn}>
                <Text style={{color: 'white'}}>Update Job</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={[styles.modalBtn, {backgroundColor: 'red'}]}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <Modal visible={Categoryvisible} transparent>
              <View style={styles.modal}>
                <View style={styles.ModalView}>
                  <FlatList
                    data={SkillsArray}
                    keyExtractor={(item, index) => index.toString()}
                    style={{maxHeight: '80%'}}
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
            {SelectedCategory !== null && (
              <Modal visible={SkillVisible} transparent>
                <View style={styles.modal}>
                  <View style={styles.ModalView}>
                    {/* Restrict the FlatList height to ensure Done button is visible */}
                    <FlatList
                      data={SkillsArray[SelectedCategory].keywords}
                      keyExtractor={(item, index) => index.toString()}
                      style={{maxHeight: '80%'}} // Limit height of the FlatList
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
                    {/* Ensure the Done button is visible */}
                    <TouchableOpacity
                      style={styles.SubmitBtn}
                      onPress={() => setSkillVisible(false)}>
                      <Text style={{color: 'white'}}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: moderateVerticalScale(20),
    borderRadius: 10,
    marginVertical: verticalScale(10),
  },
  label: {
    color: 'black',
    fontSize: 16,
  },
  editBtn: {
    width: '30%',
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center', // Center text horizontally
  },
  deleteBtn: {
    width: '30%',
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center', // Center text horizontally
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: moderateVerticalScale(20),
    borderRadius: 10,
  },
  modalBtn: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center', // Center text horizontally
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  ModalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  categories: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  SubmitBtn: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  Empty: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  loader: {
    alignSelf: 'stretch', // Make loader take full width of its container minus padding
    height: verticalScale(20),
    borderRadius: 8,
    marginVertical: verticalScale(8),
  },
  loaderBtn: {
    width: '45%', // Adjust width to fit two buttons side by side with space
    height: verticalScale(40),
    borderRadius: 10,
    marginVertical: verticalScale(10),
  },
});

