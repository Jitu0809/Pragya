import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, TouchableHighlight, KeyboardAvoidingView,Alert } from 'react-native';
import TopHeader from '../views/Header';
import Loader from "../views/Loader";
import { _retrieveData, _deleteToken, API } from "../views/constants";
import axios from 'axios';
import * as Font from 'expo-font';
const height = Dimensions.get('window').height;

class Form extends Component {

  state = {
    sessionId: null,
    drtId: null,
    isLoading: true,
    formData: [],
    answers: [],
    questions: [],
    nextFormType: "",
    level: "",
    profileId: null,
    fontsLoaded: false,
    disaster_user:null,
    required:"",
    error:"",
    
    
}




  onChangeHandler = (questionId, answerId, input, categoryId, SubcategoryId,
  ) => {
    
      
    this.setState({required:input})
  
  
    this.setState({ SubcategoryId })
    this.setState({ categoryId })


    var temp = this.state.questions;

    var foundQuestion = false;


    for (let i = 0; i < temp.length; i++) {
      if (temp[i].questionId === questionId) {

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].questionId === questionId) {

            foundQuestion = true;
          }
        }
      }
    }

    if (!foundQuestion) {
      temp.push({ questionId: questionId, answer: [] })
    }


    temp.map((item) => {
      
      if (item.questionId === questionId) {

        var answerFound = false;

        for (let i = 0; i < item.answer.length; i++) {
          if (item.answer[i].answerId === answerId) {

            answerFound = true;
          }
        }

        if (!answerFound) {
          item.answer.push({ answerId: answerId, input: '' })
        }

        let x = item.answer.map((list) => {
          if (list.answerId === answerId) {
            return { answerId: answerId, input: input }
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

    this.setState({ questions: temp })

  }
  
  validationfield=()=>{
    
  }

  onSubmitHandler = () => {

    if (this.state.required=="") {
      const validate =  Alert.alert(
        "Alert Title",
        "At least one field is required.",
        [
         
  
          {
            text: "Cancel",
            onPress: () => this.props.navigation.navigate('Form'),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.props.navigation.navigate('Form'),}
        ]
      );
      this.setState({validate})
    }
    else{
      this.setState({error:""})
    }
  
    const { SubcategoryId, categoryId, sessionId, drtId, questions, level,  } = this.state;
    const villageId = this.props.navigation.getParam('villageId')
    const disaster_type_id = this.props.navigation.getParam('disaster_type_id')
    const profileId = this.state.profileId
    const disaster_user =this.state.disaster_user
    this.setState({disaster_user: disaster_type_id})
    console.log(disaster_user,"disaster_user" ,disaster_type_id,"disaster_type_id")
    const data = { 
      questions,
      villageId,
      disaster_type_id,
      disaster_user,
      SubcategoryId,
      categoryId,
      sessionId,
      drtId,
      profileId,
      level,
      
    }
    const nextFormType = this.state.nextFormType;
    this.props.navigation.navigate('Form1', { data, nextFormType, })
    
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      'OPENSANS-REGULAR': require('../../assets/fonts/OpenSans-Regular.ttf'),
      'OPENSANS-BOLD': require('../../assets/fonts/OpenSans-Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
    // this.setState({ isLoading: true });
    const response = await _retrieveData();
    console.log("SOS", res);


    this.setState({
      sessionId: parseInt(response[0][1]),
      drtId: parseInt(response[1][1])
    });

    if (response[0][1] == "null") {
      this.props.navigation.navigate("Login");
      return;
    }
    let res = await this._getFormData();
    console.log("FORM", res);
    let d = JSON.parse(res['config']['data']);
    console.log("Data: ", d['data']['questions']['level']);
    this.setState({ nextFormType: res.data.form_type });
    this.setState({ level:  d['data']['questions']['level']});
    this.setState({ profileId: res.data.profileId });


    if (res.data.code == 203) {
      alert(res.data.msg);
      await _deleteToken();
      this.props.navigation.navigate("Login");
      return;
    }
    if (res.data.msg == 'No Assistance Required') {
      this.setState({ isLoading: false })
      alert(res.data.msg)
      this.props.navigation.pop();
    }


    this.setState({ formData: res.data.data, isLoading: false });
  };

 
 

  // request to get the category list

  _getFormData = async () => {
    

    const villageId = this.props.navigation.getParam('villageId')
    const disaster_type_id = this.props.navigation.getParam('disaster_type_id')
    const level = this.props.navigation.getParam('level')
    const id = this.props.navigation.getParam('id')
    const disaster_user =this.state.disaster_user
    this.setState({disaster_user: disaster_type_id})
    const { sessionId, drtId } = this.state;
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}savernrsosquestions`, {
          
          data: {
            sessionId,
            drtId,
            disaster_type_id,
            disaster_user,
            categoryId: 1,
            villageId,
            questions: {
              level,
              id
            }
          }
        });
        res(response);
        console.log(response)
        console.log("level: ", response['config']['data']);
      } catch (err) {
        rej(err);
      }
    });
  };

 

  renderData = () => {
    

    return this.state.formData.map((data, i) => {
      
      console.log("sandy",data)
      return (
        <View key={i}>
          <View>
            <Text style={styles.headerText}>{data.question.toUpperCase()}</Text>
          </View>
          <View>
            {data.options.map((mdata, i) => {
              
              if(data.question_type==1){
              return (
                <View key={i}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={mdata.option}
                    placeholderTextColor="black"
                    keyboardType='numeric'
                    onChangeText={(text) => this.onChangeHandler(data.rnr_comm_question_id, mdata.id, text, data.CategoryId, data.subcategory_id,)} />

                </View>
              )
              } else if(data.question_type==2){
                return (
                  <View key={i}>
                    <TextInput
                      
                      style={styles.textInput}
                      placeholder={mdata.option}
                      placeholderTextColor="black"
                      keyboardType='numeric'
                      onChangeText={(text) => this.onChangeHandler(data.rnr_comm_question_id, mdata.id, text, data.CategoryId, data.subcategory_id,)} />
                     {/* <Text>{this.state.error}</Text> */}
                  </View>
                  
                )
              }
            })}
          </View>
        </View>
      )
    })
  }

  render() {

    if (this.state.fontsLoaded) {

      if (this.state.isLoading) {
        return <Loader />;
      }

      const id = this.props.navigation.getParam('id')
      //console.log("hello " + this.state.formData[0]["Subcategory"]);


      return (
        <View style={{ height, flex: 1 }}>
          {id == 1 || id == 2 ? <TopHeader text={`SOS LEVEL-${id}`} /> : <TopHeader text={this.state.formData[0]["Subcategory"]} />}


          <KeyboardAvoidingView behavior="padding" style={{
            flex: 1,
            justifyContent: 'space-evenly',
          }}>
            <ScrollView>

              {this.state.formData && this.renderData()}
              <TouchableHighlight underlayColor="#fff" onPress={this.onSubmitHandler}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>SUBMIT</Text>
                </View>
              </TouchableHighlight>

            </ScrollView>
          </KeyboardAvoidingView>
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
    padding: 20,
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'center'
  },
  headerText: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    color: '#1A498B',
    fontFamily:"OPENSANS-BOLD",
    fontSize: 18,
  },
  textInput: {
    // borderRadius: 5,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
    padding: 8,
    marginLeft: 10,
    marginRight: 10
  },
  // button: {
  //   // width: 180,
  //   // height: 40,
  //   paddingTop: 10,
  //   paddingBottom: 10,
    
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   display: 'flex',
  //   marginBottom: 30,
  //   marginTop: 20,
  //   // marginLeft: 80,
  //   // marginRight: 80,
  //   // borderRadius: 5
  // },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1A498B",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 20,
    marginLeft: 80,
    marginRight: 80,
    // borderRadius: 5
},
buttonText: {
  color: "white",
  fontWeight: "bold"
},
  // buttonText: {
  //   backgroundColor: '#1A498B',
  //   paddingTop:20,
  //   paddingBottom:20,
  //   paddingLeft:50,
  //   paddingRight:50,
  //   color: 'white',
  //   fontFamily:"OPENSANS-BOLD"
  // }

})
export default Form;
