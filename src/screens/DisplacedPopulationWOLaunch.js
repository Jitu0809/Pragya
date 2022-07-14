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
    isLoading: false,
    formData: [],
    answers: [],
    questions: [],
    profileId: null,
    fontsLoaded: false,
    required:"",
    error:"",

  }

  onChangeHandler = (questionId, answerId, input, categoryId, SubcategoryId,
  ) => { 
    this.setState({required:input})

    this.setState({ SubcategoryId })
    this.setState({ categoryId })


    var temp = this.state.questions;
    console.log("Questionssss", temp);


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
    // console.log("QuestionDisplaced",this.state.questions);


  }

  onSubmitHandler = () => {
    if (this.state.required=="") {
      const validate =  Alert.alert(
        "Alert",
        "At least One field is required",
        [
         
  
          {
            text: "Cancel",
            onPress: () => this.props.navigation.pop(),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.props.navigation.pop(),}
        ]
      );
      this.setState({validate})
    }
    else{
      this.setState({error:""})
    }
    const { SubcategoryId, categoryId, sessionId, drtId, questions } = this.state;
    const villageId = this.props.navigation.getParam('villageId')
    const disaster_type_id = this.props.navigation.getParam('disaster_type_id')
    const profileId = this.state.profileId;
    const data = {
      questions,
      villageId,
      disaster_type_id,
      SubcategoryId,
      categoryId,
      sessionId,
      drtId,
      profileId

    }
    console.log("I AM INSIDE SUBMIT HANDLER")
    this.props.navigation.navigate('EmergingConcerns', { data })

  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const response = await _retrieveData();

    this.setState({
      sessionId: parseInt(response[0][1]),
      drtId: parseInt(response[1][1])
    });

    if (response[0][1] == "null") {
      this.props.navigation.navigate("Login");
      return;
    }
    let res = await this._getFormData();
    console.log(res);
    this.setState({ profileId: res.data.profileId })


    if (res.data.code == 203) {
      alert(res.data.msg);
      await _deleteToken();
      this.props.navigation.navigate("Login");
      return;
    }
    if (res.data.msg == 'Your answer Added Successfully') {
      this.setState({ isLoading: false })
      alert(res.data.msg)
      this.props.navigation.pop();
    }


    this.setState({ formData: res.data.data, isLoading: false });

    await Font.loadAsync({

      'OPENSANS-BOLD': {
        uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

    });
    this.setState({ fontsLoaded: true });
  };



  // request to get the category list

  _getFormData = async () => {
    const props = this.props.navigation;
    const categoryId = props.getParam('categoryId')
    const sessionId = props.getParam('sessionId')
    const drtId = props.getParam('drtId')
    const disaster_type_id = props.getParam("disaster_type_id")
    const villageId = props.getParam("villageId")

    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}getrnrDisplacedpopulation`, {
          data: {
            sessionId,
            drtId,
            categoryId
            , disaster_type_id,
            villageId
          }
        });
        res(response);
      } catch (err) {
        rej(err);
      }
    });
  };

  renderData = () => {
    return this.state.formData.map((data, i) => {
      return (
        <View key={i}>
          <View>
            <Text style={styles.headerText}>{data.question.toUpperCase()}</Text>
          </View>
          <View>
            {data.options.map((mdata, i) => {
              return (
                <View key={i}>
                  <TextInput
                    keyboardType='numeric'
                    placeholderTextColor="black"
                    style={styles.textInput}
                    placeholder={mdata.option}
                    onChangeText={(text) => this.onChangeHandler(data.rnr_comm_question_id, mdata.id, text, data.CategoryId, data.subcategory_id)}
                  />
                </View>
              )
            })}
          </View>
        </View>
      )
    })
  }

  render() {
    const id = this.props.navigation.getParam('id')

    if (this.state.fontsLoaded) {

      if (this.state.isLoading) {
        return <Loader />;
      }
      return (
        <View style={{ height, flex: 1 }}>
          <TopHeader text='Displaced Population' />
          <ScrollView>
            <KeyboardAvoidingView keyboardVerticalOffset={50} behavior="padding" style={styles.container}>
              {this.state.formData && this.renderData()}
              <TouchableHighlight underlayColor="#fff" onPress={this.onSubmitHandler}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>SUBMIT</Text>
                </View>
              </TouchableHighlight>
            </KeyboardAvoidingView>
          </ScrollView>
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
    paddingTop: 10,
    color: '#1A498B',
    fontFamily: 'OPENSANS-BOLD',

    fontSize: 17,
  },
  textInput: {
    // borderRadius: 5,
    backgroundColor: '#E6E6E6',
    marginTop: 10,
    padding: 8
  },
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

})
export default Form;