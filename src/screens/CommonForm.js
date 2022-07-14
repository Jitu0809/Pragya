//Common form for all the forms which have radio button as a option

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Modal,
  ToastAndroid,
  Button,
  Picker,
  Image,
  Platform,
  Alert,
} from "react-native";

import TopHeader from "../views/Header";
import Loader from "../views/Loader";

import Toast from "react-native-tiny-toast";
import { _retrieveData, _deleteToken, API } from "../views/constants";
import { ConfirmDialog } from "react-native-simple-dialogs";
import axios from "axios";
import RadioButton from "react-native-radio-button";
import { withNavigation } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import style from "react-native-copilot/src/components/style";
import { CheckBox } from "react-native-elements";

const height = Dimensions.get("window").height;

class CommonForm extends Component {
  state = {
    show: false,

    isLoading: true,
    formData: [],
    answers: [],
    check: false,
    isChecked: [],
    inputQuestions: [],
    multipleInputOptions: [],
    dropdown: [],
    selectedDrop1: "",
    selectedDrop2: "",
    selectedDrop3: "",
    dialogVisible: false,
    uploadPhoto: [],
    showInputField: false,
    showInputField2: false,
    name_disease: "",
    no_disease: "",
    required: "",
    error: "",
    Situation_value: "1",
  };

  componentDidMount = async () => {
    // this.setState({ isLoading: true });

    const sessionId = this.props.sessionId;
    if (sessionId == "null") {
      this.props.navigation.navigate("Login");
      return;
    }
    let res = await this._getFormData();
    console.log("RES", res);
    if (res.data.form_type == "No Form") {
      this.props.navigation.navigate("SOSLevels");
      return;
    }

    this.setState({ dropdown: res.data.dropdown });
    console.log(this.state.dropdown);

    if (res.data.code == 203) {
      alert(res.data.msg);
      await _deleteToken();
      this.props.navigation.navigate("Login");
      return;
    }

    let isChecked = [];

    for (let i = 0; i < res.data.data.length; i++) {
      isChecked.push({
        checked: "",
        answer_id: "",
        rnr_comm_question_id: res.data.data[i].rnr_comm_question_id,
      });
    }

    this.setState({
      formData: res.data.data,
      isLoading: false,
      isChecked: isChecked,
    });
    const multipleInputQuestion = this.state.formData.filter((item) => {
      return item.question_type == 3;
    });
    // console.log(multipleInputQuestion);

    let options = [];
    multipleInputQuestion.forEach((item) => {
      options = options.concat(item.options);
    });
    // console.log("optionssss",options);

    this.setState({ multipleInputOptions: options });
    // let inputQuestions=res.data.data.filter((item)=>{
    //     return item.question_type==2;
    // })
    // const structure=[];

    // inputQuestions.map((item)=>{
    //     let data={
    //         questionId:item.rnr_comm_question_id,
    //         answer:[]
    //     }
    //     structure.push(data);
    // })
    // this.setState({inputQuestions:structure});
    // console.log(this.state.inputQuestions);
  };
  openInfoDialog = (show) => {
    this.setState({ dialogVisible: show });
  };
  cameraHandler = async () => {
    this.openInfoDialog(false);
    try {
      var result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        base64: true,
        quality: 0.5,
      });

      //adding images to state.uploadPhoto array [anshul]
      const uploadPhoto = [...this.state.uploadPhoto];
      uploadPhoto.push(`data:image/jpg;base64,${result.base64}`);
      this.setState({ uploadPhoto });
    } catch (err) {
      alert("Something went wrong please try again later");
    }
    if (!result.cancelled) {
      // this.setState({ image: result.uri });
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
        quality: 0.5,
      });

      //adding images to state.uploadPhoto array [anshul]
      const uploadPhoto = [...this.state.uploadPhoto];
      uploadPhoto.push(`data:image/jpg;base64,${result.base64}`);
      this.setState({ uploadPhoto });
    } catch (err) {
      alert("Something went wrong please try again later");
    }
    if (!result.cancelled) {
      // this.setState({ image: result.uri });
    } else if (!result) {
      alert("Something went wrong please try again later");
    }
  };

  // cross check
  // renderData = () => {

  //         return (
  //             <View style={{flex:1,marginTop:100,backgroundColor:'red'}}>
  //                 <View style={styles.greenBox}>
  //                     <Text>Data Successfully</Text>
  //                 </View>

  //             </View>
  //         )

  // }

  _getFormData = async () => {
    const data = this.props.data;
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}${this.props.api}`, { data });
        res(response);
      } catch (err) {
        rej(err);
      }
    });
  };
  onChangeHandler = async (questionId, answerId, input) => {
    this.setState({ required: input });
    var temp = this.state.inputQuestions;
    //console.log("Questionssss",temp);

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
      temp.push({ questionId: questionId, answer: [] });
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
          item.answer.push({ answerId: answerId, input: "" });
        }

        let x = item.answer.map((list) => {
          if (list.answerId === answerId) {
            return { answerId: answerId, input: input };
          } else {
            return list;
          }
        });
        item.answer = x;

        return item;
      } else {
        return item;
      }
    });

    this.setState({ inputQuestions: temp });
    // console.log("INPUTQUEST",this.state.inputQuestions);

    // console.log("QuestionDisplaced",this.state.questions);
  };

  requestToSubmit = async () => {
    this.setState({ isLoading: true });
    let props = this.props;
    let data = props.data;
    let SubcategoryId = this.state.formData[0].subcategory_id;
    const { uploadPhoto } = this.state;
    //console.log("PROPS",props)
    const document = [];
    uploadPhoto.forEach((element) => {
      document.push({ image: element });
    });
    let radioQuestions = this.state.isChecked.map((item) => {
      return { answer_id: item.answer_id, id: item.rnr_comm_question_id };
    });
    ///console.log("QUESTIONS",questions);
    const filteredRaadioQuestion = radioQuestions.filter((item) => {
      return item.answer_id !== "";
    });
    //console.log("FilteredRadio",filteredRaadioQuestion);

    const inputQuestions = this.state.inputQuestions;
    inputQuestions.forEach((question) => {
      question.answer.sort(function (a, b) {
        return a.answerId - b.answerId;
      });
    });
    // console.log("INPUT QUESTIONS",inputQuestions);

    const questions = [...filteredRaadioQuestion, ...inputQuestions];
    console.log("Finalsss", questions);

    //console.log("FilteredQUE",questions);
    // const formData = new FormData();
    // const formData = new FormData();
    // formData.append("name_disease",this.state.name_disease)
    // formData.append("no_disease",this.state.no_disease)

    let name_disease = this.state.name_disease;
    let no_disease = this.state.no_disease;
    let Situation_value = this.state.Situation_value;
    data = {
      ...data,
      questions,
      SubcategoryId,
      document,
      name_disease,
      no_disease,
      Situation_value,
    };
    console.log(data);

    if (props.api === "savernrInfrastructuredamage") {
      // var api=[props.api2,props.api3]
      var api = props.api2;
    }
    if (props.api === "savernrscaleofemergency") {
      var api = props.api2;
    }
    if (props.api === "savernrEmergingconcerns") {
      var api = props.api2;
    }
    if (props.api === "savernrscaleofemergency_forest_fire") {
      var api = props.api2;
    }
    if (props.api === "savernrscaleofemergency_forest_fire") {
      var api = props.api2;
    }

    //console.log("API",api);

    try {
      const response = await axios.post(`${API}${api}`, { data });
      console.log(response, "hello Hariom");
      if (response.data) {
        Toast.showSuccess(this.props.msg);
      }

      if (response.status == 200) {
        props.navigation.navigate(props.navigateForm);
      } else {
        if (this.state.required == "") {
          const validate = Alert.alert(
            "Alert",
            "At least one field is required",
            [
              {
                text: "Cancel",
                onPress: () => this.props.navigation.pop(),
                style: "cancel",
              },
              { text: "OK", onPress: () => this.props.navigation.pop() },
            ]
          );
          this.setState({ validate });
        } else {
          this.setState({ error: "" });
        }
      }
      this.setState({ isLoading: false });
      props.navigation.navigate(props.navigateForm, { data });
    } catch (error) {
      // if (this.state.required=="") {
      //     const validate =  Alert.alert(
      //       "Alert",
      //       "At least one field is required",
      //       [

      //         {
      //           text: "Cancel",
      //           onPress: () => this.props.navigation.pop(),
      //           style: "cancel"
      //         },
      //         { text: "OK", onPress: () => this.props.navigation.pop(),}
      //       ]
      //     );
      //     this.setState({validate})
      //   }
      //   else{
      //     this.setState({error:""})
      //   }
      this.setState({ isLoading: false });
    }
  };

  formSubmitHandler = async () => {
    const data = new FormData();
    data.append("name_disease", this.state.name_disease);
    data.append("no_disease", this.state.no_disease);
    let res = await this.requestToSubmit(data);
    console.log(res);
    console.log(this.state.name_disease);
    console.log(this.state.no_disease);
  };

  onPressHandler = (id, i, answer_id) => {
    this.setState({ required: answer_id });
    console.log(answer_id, "answer_id");

    if (answer_id === "1033") {
      this.setState({
        showInputField: !this.state.showInputField,
        showInputField2: false,
      });
    }
    if (answer_id === "1034") {
      this.setState({
        showInputField2: !this.state.showInputField2,
        showInputField: false,
      });
    }
    const checked = i;
    let setArray =
      this.state.isChecked &&
      this.state.isChecked.map((item) => {
        if (item.rnr_comm_question_id === id) {
          return { rnr_comm_question_id: id, checked, answer_id: answer_id };
        } else {
          return item;
        }
      });
    this.setState({ isChecked: setArray });
  };

  checkPressedStatus = (id, i) => {
    let x = this.state.isChecked.filter((item) => {
      if (item.rnr_comm_question_id === id) {
        return true;
      }
    });
    if (x[0].checked === i) {
      return true;
    } else {
      return false;
    }
  };
  onAddOptions = (options, questionId) => {
    const formData = [...this.state.formData];
    let newForm = formData.map((item) => {
      if (item.rnr_comm_question_id == questionId) {
        item.options = item.options.concat(this.state.multipleInputOptions);
        return item;
      } else {
        return item;
      }
    });
    this.setState({ formData: newForm });
  };

  renderData = () => {
    return this.state.formData.map((data, i) => {
      console.log(data[0]);

      return (
        <View key={i}>
          <Text style={styles.heading}>{data.question}</Text>

          <View style={{ flexDirection: "column" }}>
            {data.options.map((mdata, i) => {
              let x = this.checkPressedStatus(data.rnr_comm_question_id, i);
              if (data.question_type == 0) {
                return (
                  <TouchableHighlight
                    underlayColor="#fff"
                    key={i}
                    onPress={() =>
                      this.onPressHandler(
                        data.rnr_comm_question_id,
                        i,
                        mdata.id
                      )
                    }
                  >
                    <View>
                      <View style={styles.optionContainer}>
                        <View style={{ paddingRight: 6 }}>
                          <RadioButton
                            innerColor="#1A498B"
                            outerColor="#1A498B"
                            animation={"bounceIn"}
                            isSelected={x}
                            size={14}
                            onPress={() =>
                              this.onPressHandler(
                                data.rnr_comm_question_id,
                                i,
                                mdata.id
                              )
                            }
                          />
                        </View>

                        <View>
                          <Text style={styles.innerText}>{mdata.option}</Text>
                        </View>
                      </View>
                      {mdata.id === "1033" && this.state.showInputField && (
                        <View>
                          <TextInput
                            keyboardType="text"
                            placeholder="Name Disease"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              this.setState({ name_disease: text })
                            }
                          />
                          <TextInput
                            keyboardType="numeric"
                            placeholder="No. Disease"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              this.setState({ no_disease: text })
                            }
                          />
                        </View>
                      )}
                      {mdata.id === "1034" && this.state.showInputField2 && (
                        <View>
                          <TextInput
                            keyboardType="text"
                            placeholder="Name Disease"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              this.setState({ name_disease: text })
                            }
                          />
                          <TextInput
                            keyboardType="numeric"
                            placeholder="No. Disease"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              this.setState({ no_disease: text })
                            }
                          />
                        </View>
                      )}
                    </View>
                  </TouchableHighlight>
                );
              } else if (data.question_type == 2) {
                return (
                  <View key={i}>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.textInput}
                      placeholder={mdata.option}
                      onChangeText={(text) =>
                        this.onChangeHandler(
                          data.rnr_comm_question_id,
                          mdata.id,
                          text
                        )
                      }
                    />
                  </View>
                );
              } else if (data.question_type == 3) {
                return (
                  <View key={i}>
                    {mdata.id == 166 || mdata.id == 168 || mdata.id == 170 ? (
                      <Picker
                        selectedValue={
                          mdata.id == 166
                            ? this.state.selectedDrop1
                            : mdata.id == 168
                            ? this.state.selectedDrop2
                            : mdata.id == 170
                            ? this.state.selectedDrop3
                            : ""
                        }
                        onValueChange={(itemValue) => {
                          this.onChangeHandler(
                            data.rnr_comm_question_id,
                            mdata.id,
                            itemValue
                          );
                          if (mdata.id == 166) {
                            this.setState({ selectedDrop1: itemValue });
                          }
                          if (mdata.id == 168) {
                            this.setState({ selectedDrop2: itemValue });
                          }
                          if (mdata.id == 170) {
                            this.setState({ selectedDrop3: itemValue });
                          }
                        }}
                      >
                        <Picker.Item key="0" label="Please select disease" />
                        {this.state.dropdown &&
                          this.state.dropdown.map((list) => {
                            return (
                              <Picker.Item
                                key={i}
                                label={list.name}
                                value={list.name}
                              />
                            );
                          })}
                      </Picker>
                    ) : (
                      <TextInput
                        keyboardType="numeric"
                        style={styles.textInput}
                        placeholder={mdata.option}
                        placeholderTextColor="#a3a3a3"
                        onChangeText={(text) =>
                          this.onChangeHandler(
                            data.rnr_comm_question_id,
                            mdata.id,
                            text
                          )
                        }
                      />
                    )}
                  </View>
                );
              }
            })}
          </View>
        </View>
      );
    });
  };

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <View style={{ height, flex: 1 }}>
        <TopHeader text={this.props.text} />
        <ScrollView>
          <KeyboardAvoidingView
            keyboardVerticalOffset={20}
            behavior="padding"
            style={styles.container}
          >
            {this.state.formData && this.renderData()}
            <ScrollView horizontal>
              <View
                style={{
                  marginTop: 10,
                  paddingLeft: 20,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {this.state.uploadPhoto.length !== 0
                  ? this.state.uploadPhoto.map((item, index) => (
                      <Image
                        source={{ uri: item }}
                        key={index}
                        style={{ width: 70, height: 70, margin: 10 }}
                      />
                    ))
                  : null}
              </View>
            </ScrollView>
            <View style={{ paddingBottom: 100 }}>
              {this.state.formData[0].Subcategory == "Infrastructure damage" ? (
                <TouchableHighlight
                  underlayColor="#fff"
                  onPress={() => this.openInfoDialog(true)}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Upload Data/Photo</Text>
                  </View>
                </TouchableHighlight>
              ) : null}
              <TouchableHighlight
                underlayColor="#fff"
                onPress={this.formSubmitHandler}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>SUBMIT</Text>
                </View>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <ConfirmDialog
          title="Select a Photo"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.openInfoDialog(false)}
          titleStyle={{
            color: "#19655F",
            fontSize: 18,
            fontWeight: "bold",
          }}
          positiveButton={{
            title: "Cancel",
            titleStyle: { color: "#4C4C4C", fontSize: 14 },
            onPress: () => this.openInfoDialog(false),
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
                            <Text style={styles.modalText}>Choose Document from Library</Text>
                        </View>
                    </TouchableHighlight> */}
        </ConfirmDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1A498B",
  },
  container: {
    padding: 10,
    paddingTop: 10,
    display: "flex",
    justifyContent: "center",
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    marginTop: 10,
    padding: 8,
  },
  innerText: {
    fontSize: 15,
    color: "black",
  },

  optionContainer: {
    flexDirection: "row",
    padding: 5,
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
  addButton: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1A498B",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: 120,
    marginTop: 10,
    borderRadius: 5,
  },
  modalBox: {
    height: 40,
    justifyContent: "center",
    display: "flex",
  },
  modalText: {
    color: "#4C4C4C",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  toast: {
    backgroundColor: "#4ADDFB",
    width: 300,

    color: "#ffffff",
    fontSize: 15,
    lineHeight: 2,

    borderRadius: 15,
    fontWeight: "bold",
  },
});

export default withNavigation(CommonForm);
