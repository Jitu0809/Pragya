import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image, Platform,TextInput,Alert
} from "react-native";
import Toast from 'react-native-tiny-toast'
import RadioButton from "react-native-radio-button";
import TopHeader from "../views/Header";
import { ConfirmDialog } from "react-native-simple-dialogs";
import * as ImagePicker from "expo-image-picker";
import Colors from "../views/Colors";
import axios from "axios";
import { _retrieveData } from "../views/constants";
import { API } from "../views/constants";
import Loader from "../views/Loader";
import * as DocumentPicker from "expo-document-picker";
// import { Constants, Location, Permissions } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
class InputDataWOLaunch extends Component {
  state = {
    dialogVisible: false,
    
    
    image: [],
    sessionId: null,
    drtId: null,
    userName: null,
    password: null,
    inputList: null,
    isLoading: false,
    questionSubmitted: [],
    riskProfileId: "",
    updatedQuestionSubmitted: [],
    uploadPhoto: [], location: null, profileId: "",
    fontsLoaded: false,
    maxiumum:"",
    minimum:"",
    speed:"",
    required:"",
    error:"",
    location: {},
    input: [],
    // answer:'',
    questionInputId:"",
    isChecked: [],
    checked:[],
    questions:[],
    inchecked:[],
    inquestions:[],

  };

  openInfoDialog = show => {
    this.setState({ dialogVisible: show });
  };

  componentDidMount = async () => {


    await Font.loadAsync({

      'OPENSANS-BOLD': {
        uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

    });
    this.setState({ fontsLoaded: true });
    this.setState({ isLoading: true });
    const response1 = await _retrieveData();

    this.setState({
      sessionId: parseInt(response1[0][1]),
      drtId: parseInt(response1[1][1])
    });

    const disasterId = this.props.navigation.getParam("disasterId");
    const disasterTypeId = this.props.navigation.getParam("disasterTypeId");
    const villageId = this.props.navigation.getParam("villageId");
    const profileId = this.props.navigation.getParam("profileId");
    if (profileId !== undefined) {
      this.setState({ profileId })
    }

    let response = await this._getInputData(disasterId, disasterTypeId);


    let result = await this._getRiskProfileId(
      disasterId,
      disasterTypeId,
      villageId
    );
    let isChecked = [];
    
        if(response.data.data){
        for (let i = 0; i <response.data.data.length; i++) {
            
            isChecked.push({
                checked: "",
                answer: "",
                assessment_question_id: response.data.data[i].assessment_question_id
                
           });
        }
      }

    this.setState({
      inputList: response.data.data,
      isLoading: false,
      riskProfileId: result.data.data.risk_profile_id,
      isChecked: isChecked
    });
    
   










    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //   console.log("Loaction Error");

    // } else {
    //   this._getLocationAsync();
    // }
    // this._getLocationAsync();
  };
  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
  //   if (status !== 'granted') {
  //     console.log("Loaction Permission not granted");

  //   }

  //   let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  //   this.setState({ location });
  //   console.log("Loaction", JSON.stringify(this.state.location));

  // };
  // Getting risk_profile_id from url to request on next api

  _getRiskProfileId = async (disasterId, disasterTypeId, villageId) => {
    const { sessionId, drtId } = this.state;
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}saveRnRTool`, {
          data: {
            sessionId,
            drtId,
            disaster_type_id: disasterId,
            disaster_data_type_id: disasterTypeId,
            village_id: villageId
          }
        });
        res(response);
      } catch (err) {
        rej(err);
      }
    });
  };

  // request to save the questions on the api after getting the risk_profile_id

  _saveQuestions = async () => {
    const disasterId = this.props.navigation.getParam(" disasterId ");

    const { sessionId, drtId, riskProfileId, questionSubmitted } = this.state;
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}saveRnRTool`, {
          data: {
            sessionId,
            drtId,
            disaster_type_id: disasterId,
            risk_profile_id: riskProfileId,
            questions: questionSubmitted
          }
        });
        res(response);
        // console.log('sandeep');
      } catch (err) {
        rej(err);
      }
    });
  };

  _getInputData = async (disasterId, disasterTypeId) => {
    const { sessionId, drtId } = this.state;
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}showHazardsQuestions`, {
          data: {
            sessionId,
            drtId,
            disaster_type_id: disasterId,
            disaster_data_type_id: disasterTypeId
          }
        });
        res(response);
        console.log(response);
      } catch (err) {
        rej(err);
      }
    });
  };

  filePickerHandler = async () => {
    this.openInfoDialog(false);
    try {
      var result = await DocumentPicker.getDocumentAsync({});
    } catch (err) {
      alert("Something went wrong please try again later");
    }
    if (!result.cancelled) {
      const image = [...this.state.image]
      image.push(result);
      this.setState({ image });
    } else if (!result) {
      alert("Something went wrong please try again later");
    }

  };

  imagePickHandler = async () => {
    this.openInfoDialog(false);
    try {
      var result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        base64: true,
        quality: 0.5
      });

      //adding images to state.uploadPhoto array [anshul]
      const uploadPhoto = [...this.state.uploadPhoto];
      uploadPhoto.push(`data:image/jpg;base64,${result.base64}`);
      this.setState({ uploadPhoto });

    } catch (err) {
      alert("Something went wrong please try again later");
    }
    if (!result.cancelled) {
      console.log();

      //this.setState({ image: result.uri });
    } else if (!result) {
      alert("Something went wrong please try again later");
    }
  };

  cameraHandler = async () => {
    this.openInfoDialog(false);
    try {
      var result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        base64: true,
        quality: 0.5
      });

      const uploadPhoto = [...this.state.uploadPhoto];
      uploadPhoto.push(`data:image/jpg;base64,${result.base64}`);
      this.setState({ uploadPhoto });
      this.setState({required:uploadPhoto})
    } catch (err) {
      alert("Something went wrong please try again later");
    }
    if (!result.cancelled) {
      console.log("success");

      //this.setState({ image: result.uri });
    } else if (!result) {
      alert("Something went wrong please try again later");
    }
  };

  //On submitting data

  onSubmitHandler = async () => {
    let data = await this._saveQuestions(this.state.riskProfileId);
    alert("data submitted");
  };
  
  onPressHandler = (id, i, answer) => {
    this.setState({required:answer})
 console.log(answer,'answer')
 
 
   const checked = i;
    let setArray = this.state.isChecked && this.state.isChecked.map((item) => {
        
        if (item.assessment_question_id === id) {
            return { assessment_question_id: id, checked, answer: answer }
        } else {
            return item;
        }
    })
    this.setState({ isChecked: setArray })
    
  

};

checkPressedStatus = (id, i) => {
    let x = this.state.isChecked.filter((item) => {
        if (item.assessment_question_id === id) {
            return true;
        }
        console.log("Hariom",this.state.isChecked)
    })
    if (x[0] && x[0].checked === i) {
        return true;
    } else {
        return false;
    }
   
}

onChangeHandler=async(id,answer,input,)=>{
               
  this.setState({required:input})
  var temp = this.state.input;
//console.log("Questionssss",temp);


var foundQuestion = false;


for (let i = 0; i < temp.length; i++) {
if (temp[i].id === id) {

  for (let i = 0; i < temp.length; i++) {
    if (temp[i].id === id) {

      foundQuestion = true;
    }
  }
}
}

if (!foundQuestion) {
temp.push({ id: id, answer: [] })
}


temp.map((item) => {
if (item.id === id) {

  var answerFound = false;

  for (let i = 0; i < item.answer.length; i++) {
    if (item.answer[i].answer === answer) {

      answerFound = true;
    }
  }

  if (!answerFound) {
    item.answer.push({ answer: answer, input: '' })
  }

  let x = item.answer.map((list) => {
    if (list.answer === answer) {
      return { answer: answer, input: input }
    } else {
      return list;
    }
  })
  item.answer = x;

  return item;

} else {
  return item;
}
})

this.setState({input: temp })






}

onPressHandlers = (i,id) => {  
           
  // this.setState({required:answer_id})
  console.log(id,'id')
  // console.log(questionId,'answer_id')
  let newChecked = this.state.inchecked;
  newChecked[i] = !this.state.inchecked[i];
  this.setState({ checked: newChecked })
  
  
  let inquestions = this.state.inquestions;



  inquestions = inquestions.filter((item) => {


      if (item.id !== id) {
          return true;
      }
  })



  if (this.state.inchecked[i]) {
    inquestions.push({ id: id })
  }


  this.setState({ inquestions: inquestions })

  
 
};



renderData = () => {
        
  return this.state.inputList.map((data, i) => { 
    // console.log(data[0]);
      
      return (
          <View key={i}>
              <Text style={styles.listText}>{data.question}</Text>
               
              <View style={{ flexDirection: "column" }}>
                  {data.options.map((mdata, i) => {

                      let x = this.checkPressedStatus (data.assessment_question_id, i)
                      if(data.question_type==0){
                      return (
                      <TouchableHighlight underlayColor='#fff' key={i} onPress={() => this.onPressHandler( i, mdata.id)}>
                          
                              <View style={styles.optionContainer} >
                                  <View style={{ paddingRight: 6,paddingLeft:10 }}>
                                  <RadioButton
                                              innerColor='#1A498B'
                                              outerColor='#1A498B'
                                              animation={"bounceIn"}
                                              isSelected={x}
                                              size={14}
                                              onPress={() => this.onPressHandler(data.assessment_question_id, i, mdata.id,)}
                                          />    
                                  </View>
                                   
                                  <View>
                                      <Text style={{ color: Colors.listItemColor, paddingLeft: 10,paddingRight:15 }}>
                                        {mdata.option}
                                        </Text>
                                  </View>
                                 
                                  
                              </View>
                          </TouchableHighlight>
                      );
                      }  else if(data.question_type==2){
                          return(
                              <View key={i}>
                              <TextInput
                                 style={styles.textInput}
                                   placeholder={data.question}
                                    placeholderTextColor="black"
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.onChangeHandler(data.assessment_question_id, mdata.id, text,  )} />
                              </View>
                          )
                      } else if(data.question_type==1){ 
                        return(
                            <View key={i}>
                            <TouchableHighlight underlayColor='#fff' key={i} onPress={() => this.onPressHandlers(i,mdata.id,data.rnr_comm_question_id)}>
                                    
                                    <View style={styles.optionContainer} >
                                        <View style={{paddingTop:16,paddingRight:20}} >
                                            
                                             <View  style={this.state.inchecked[i] === true ? styles.checkedRectBox : styles.rectBox}></View>
                                        </View>
                                         
                                        <View>
                                            <Text style={styles.innerText2}>{mdata.option}</Text>
                                        </View>
                                     </View>
                                            
                            </TouchableHighlight>
                            </View>
                        )
                    }
                      
                  })}
              </View>
          </View>
      );
  });
};

  

  formHandler = async () => {
    
    if (this.state.required=="") {
      const validate =  Alert.alert(
        "Alert",
        "At least one field is required",
        [
         
  
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed"),}
        ]
      );
      this.setState({validate})
    }
    else{
      this.setState({error:""})
    }
     
    this.setState({ isLoading: true });
     const disaster_type_id = this.props.navigation.getParam("disasterId");
    const disaster_data_type_id = this.props.navigation.getParam("disasterTypeId");
    const villageId = this.props.navigation.getParam("villageId");
    // const latitude = this.state.location.coords.latitude;
    // const longitude = this.state.location.coords.longitude;
       const option = this.state.answer
        // const input  =  this.state.input
        let radioQuestions = this.state.isChecked.map((item) => {
          return { answer: item.answer, id: item.assessment_question_id }
      })
      ///console.log("QUESTIONS",questions);
      const filteredRaadioQuestion=radioQuestions.filter((item)=>{
          return item.answer !==""
      })
      const inputQuestions=this.state.input;
      inputQuestions.forEach((question)=>{
          question.answer.sort(function(a,b){
              return a.answerId-b.answerId;
          })
      })
      let checkradio = this.state.checked.map((item) =>{
        return{ answer_id: item.answer_id,id: id }
    
      })
      const filtercheck =checkradio.filter((item) =>{
        return item.answer_id !==""
      })
       
    const { updatedQuestionSubmitted, sessionId, drtId, uploadPhoto, image, profileId,answer,questionInputId } = this.state;
    console.log(updatedQuestionSubmitted,"hello")
    //pushing base64 images in documents[anshul]
    const document = []
    uploadPhoto.forEach(element => {
      document.push({ image: element })
    });
    const questions1 = this.state.inquestions.map((item) => { 
      return { answer_id: item.id,}
     })

    // const questiondata = updatedQuestionSubmitted.concat(input) 
    const questions = [...filteredRaadioQuestion,...inputQuestions,...document,...filtercheck,...questions1]
    const data = {
      
      // option,
      sessionId,
      drtId,
      disaster_type_id,
      disaster_data_type_id,
      villageId,
     
      questions: questions,
      document, profileId, 
      // latitude,
      // longitude
      
      
    }
    console.log("Sandeep", data);
   
    // var bodyFormData = new FormData();
    // const stringData=JSON.stringify(data);
    // bodyFormData.append("oldData",stringData);
    // image.forEach((item)=>{
    //   bodyFormData.append("docs",item);
    // });
    // try {
    //   axios({
    //     method:"POST",
    //     url:`${API}saveGoRiskquestionanswer`,
    //     data: bodyFormData,
    //     config: { headers: {'Content-Type': 'multipart/form-data' }}
    //   })
    //   .then(function (response) {
    //       //handle success
    //       console.log(response);
    //       if (response.data.code == 200) {
    //         this.setState({ isLoading: false })
    //         alert(response.data.msg)
    //         this.props.navigation.pop()
    //         return;
    //       }


    //   })
    //   .catch(function (response) {
    //       //handle error
    //       console.log(response);
    //       alert("Something went wrong")
    //       this.setState({ isLoading: false })

    //   })

    // } catch (error) {
    //   console.log(error);
    //   alert("Something went wrong")
    //   this.setState({ isLoading: false })
    // }


    let total = 0;
    image.forEach((item) => {
      total += item.size;
    })
    console.log("totall", total);

    if (total < 5242880) {
      try {
        const response = await axios.post(`${API}saveGoRiskquestionanswer`, { data })
        
        

        console.log(response)
          
        if (response.data.code == 200) {
          
          this.setState({ isLoading: false })
          if (response.data.data == 0) {
            Toast.showSuccess("Successfully Submitted")
            // alert(response.data.msg)
            this.props.navigation.pop(response.data.formCount)
            return;
          }
          else {
            // alert("else")
            this.setState({ isLoading: false })
            //this.props.navigation.pop();
            this.props.navigation.push("InputData", {
              disasterId: this.props.navigation.getParam("disasterId"),
              disasterTypeId: response.data.data,
              villageId: this.props.navigation.getParam("villageId"),
              profileId: response.data.profileId
            });

          }
        }


        this.setState({ isLoading: false })

      } catch (err) {
        console.log(err);
        alert("Something went wrong!")
      }
    }
    else {
      alert("Documents Size is greater than 5 MB. Please upload file again!")
      this.setState({ image: [] });
      this.setState({ isLoading: false })
    }




  }

  render() {

    const { image } = this.state;

    if (this.state.fontsLoaded) {
      if (this.state.isLoading) {
        return <Loader />;
      }
      return (
        <View>
          <TopHeader text="INPUT DATA" />
          <ScrollView>
            <View>{this.state.inputList && this.renderData()}</View>


            <ScrollView horizontal>
              <View
                style={{
                  marginTop: 10,
                  paddingLeft: 20,
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                {this.state.uploadPhoto.length !== 0 ? this.state.uploadPhoto.map((item, index) => (
                  <Image
                    source={{ uri: item }}
                    key={index}
                    style={{ width: 70, height: 70, margin: 10 }} />
                )) : null}
              </View>
            </ScrollView>

            <View>
              {this.state.image.length !== 0 ? <Text style={{ fontSize: 16, fontWeight: "bold", padding: 10 }}>Documents Uploaded</Text> : null}
            </View>
            <View>
              {this.state.image.length !== 0 ? this.state.image.map((item, index) => (
                <Text key={index} style={{ paddingLeft: 15, paddingTop: 5 }}>{index + 1}. {item.name}</Text>
              )) : null}
            </View>

            <View
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                paddingBottom: 100,
                paddingTop: 20
              }}
            >
              <TouchableHighlight
                underlayColor="#fff"
                onPress={() => this.openInfoDialog(true)}
              >
                <View style={styles.uploadPhoto}>
                  <Text style={styles.photoText}>UPLOAD DATA/PHOTO</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor="#fff"
                onPress={this.formHandler}
              >
                <View style={styles.uploadPhoto}>
                  <Text style={styles.photoText}>SUBMIT</Text>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>

          <ConfirmDialog
            title="Select a Photo"
            visible={this.state.dialogVisible}
            onTouchOutside={() => this.openInfoDialog(false)}
            titleStyle={{
              color: Colors.greenColor,
              fontSize: 18,
              fontWeight: "bold"
            }}
            positiveButton={{
              title: "Cancel",
              titleStyle: { color: Colors.blackColor, fontSize: 14 },
              onPress: () => this.openInfoDialog(false)
            }}
          >
            <TouchableHighlight underlayColor="#fff" onPress={this.cameraHandler}>
              <View style={styles.modalBox}>
                <Text style={styles.modalText}>Take Photo</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="#fff"
              onPress={this.imagePickHandler}
            >
              <View style={styles.modalBox}>
                <Text style={styles.modalText}>Choose Photo from Library</Text>
              </View>
            </TouchableHighlight>

            {/* <TouchableHighlight
            underlayColor="#fff"
            onPress={this.filePickerHandler}
          >
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>Select Documents from File Manager</Text>
            </View>
          </TouchableHighlight> */}
          </ConfirmDialog>
        </View>
      );
    } else {
      return (
        <Loader />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 30
  },
  modal: {
    textAlign: "center",
    // color: '#A8181F',
    fontSize: 18,
    fontFamily: 'OPENSANS-BOLD',

  },

  list: {
    borderColor: "#707070",
    paddingLeft: 20,
    paddingTop: 10,

    paddingBottom: 10,
    borderBottomWidth: 1
  },
  listText: {
    color: "#1A498B",
    fontFamily: 'OPENSANS-BOLD',

    fontSize: 16,
    paddingLeft:15,
    paddingRight: 10
  },
  uploadPhoto: {
    backgroundColor: Colors.greenColor,
    width: 180,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 1
  },
//   uploadPhoto: {
//     paddingTop: 10,
//     paddingBottom: 10,
//     backgroundColor: "#1A498B",
//     justifyContent: "center",
//     alignItems: "center",
//     display: "flex",
//     marginTop: 20,
//     marginLeft: 80,
//     marginRight: 80,
//     // borderRadius: 5
// },
  photoText: {
    color: Colors.whiteColor,
    fontSize: 12,
    fontFamily: 'OPENSANS-BOLD',

  },
  contentStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBox: {
    height: 40,
    justifyContent: "center",
    display: "flex"
  },
  modalText: {
    color: Colors.blackColor
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: Colors.greenColor,
    borderWidth: 2,
    borderRadius: 10
  },
  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: Colors.greenColor,
    borderRadius: 10
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
    padding: 8
  },
  rectBox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: Colors.greenColor,
},
checkedRectBox: {
    width: 18,
    height: 18,
    backgroundColor: Colors.greenColor
},
listContainer: {
  flexDirection: 'row',
  paddingTop: 20,
  paddingLeft: 10,
  paddingRight: 30,
  // justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  marginRight: 10

},
  optionContainer: {
    flexDirection: "row",
    padding: 5
},
});

export default InputDataWOLaunch;