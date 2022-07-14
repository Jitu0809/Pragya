import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import TopHeader from "../views/Header";
import { ConfirmDialog } from "react-native-simple-dialogs";
import * as ImagePicker from "expo-image-picker";
import Colors from "../views/Colors";
import axios from "axios";
import { _retrieveData } from "../views/constants";
import { API } from "../views/constants";
import Loader from "../views/Loader";
import * as DocumentPicker from "expo-document-picker";
import { Constants, Location, Permissions } from "expo";
import * as Font from "expo-font";

import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

const GoRiskCompAndRnRComp = ({ copilot }) => (
  <View {...copilot}>
    <TopHeader text="INPUT DATA" />
  </View>
);
const UploadData = ({ copilot }) => (
  <View style={styles.uploadPhoto} {...copilot}>
    <Text style={styles.photoText}>UPLOAD DATA/PHOTO</Text>
  </View>
);
const SubmitButton = ({ copilot }) => (
  <View style={styles.uploadPhoto} {...copilot}>
    <Text style={styles.photoText}>SUBMIT</Text>
  </View>
);
class InputDataLaunch extends Component {
  state = {
    dialogVisible: false,
    yesChecked: [],
    noChecked: [],
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
    uploadPhoto: [],
    location: null,
    profileId: "",
    fontsLoaded: false,
  };

  openInfoDialog = (show) => {
    this.setState({ dialogVisible: show });
  };

  componentDidMount = async () => {
    this.props.start();
    this.props.copilotEvents.on("stop", () => {

      this.props.navigation.navigate('Home')

    })

    await Font.loadAsync({
      "OPENSANS-BOLD": {
        uri: require("../../assets/fonts/OpenSans-Bold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });

    this.setState({ isLoading: true });
    const response1 = await _retrieveData();

    this.setState({
      sessionId: parseInt(response1[0][1]),
      drtId: parseInt(response1[1][1]),
    });

    const disasterId = this.props.navigation.getParam("disasterId");
    const disasterTypeId = this.props.navigation.getParam("disasterTypeId");
    const villageId = this.props.navigation.getParam("villageId");
    const profileId = this.props.navigation.getParam("profileId");
    if (profileId !== undefined) {
      this.setState({ profileId });
    }

    let response = await this._getInputData(disasterId, disasterTypeId);

    let result = await this._getRiskProfileId(
      disasterId,
      disasterTypeId,
      villageId
    );

    this.setState({
      inputList: response.data.data,
      isLoading: false,
      riskProfileId: result.data.data.risk_profile_id,
    });
    let yesChecked = [];
    let noChecked = [];
    if (this.state.inputList) {
      for (let i = 0; i < this.state.inputList.length; i++) {
        yesChecked.push(false);
        noChecked.push(false);
      }
      this.setState({ yesChecked, noChecked });
    }

    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log("Loaction Error");
    } else {
      this._getLocationAsync();
    }
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Loaction Permission not granted");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    this.setState({ location });
    console.log("Loaction", JSON.stringify(this.state.location));
  };
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
            village_id: villageId,
          },
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
            questions: questionSubmitted,
          },
        });
        res(response);
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
            disaster_data_type_id: disasterTypeId,
          },
        });
        res(response);
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
      const image = [...this.state.image];
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
        quality: 0.5,
      });

      const uploadPhoto = [...this.state.uploadPhoto];
      uploadPhoto.push(`data:image/jpg;base64,${result.base64}`);
      this.setState({ uploadPhoto });
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

  onCheckHandler(index, value, answer, id) {
    let questionSubmitted = this.state.questionSubmitted;
    let updatedQuestionSubmitted = questionSubmitted.filter((item) => {
      if (item.questionId !== id) {
        return true;
      }
    });
    let question = {
      id,
      answer,
    };
    updatedQuestionSubmitted.push(question);

    this.setState({ questionSubmitted: updatedQuestionSubmitted });
    // console.log(this.state.questionSubmitted);

    let newCheckedYes = this.state.yesChecked;
    let newCheckedNo = this.state.noChecked;
    if (value === "yes") {
      newCheckedYes[index] = !this.state.yesChecked[index];
      newCheckedNo[index] = false;
    } else {
      newCheckedYes[index] = false;
      newCheckedNo[index] = !this.state.noChecked[index];
    }
    this.setState({
      yesChecked: newCheckedYes,
      noChecked: newCheckedNo,
      updatedQuestionSubmitted,
    });
    console.log(updatedQuestionSubmitted);
  }

  renderData = () => {
    return this.state.inputList.map((data, index) => {
      // console.log("dataa",data);

      {
        if (data.options.length > 1) {
          return (
            <View style={styles.list} key={index}>
              <Text style={styles.listText}>{data.question}</Text>

              <TouchableHighlight
                underlayColor="#fff"
                onPress={() =>
                  this.onCheckHandler(
                    index,
                    "yes",
                    data.options[0].id,
                    data.assessment_question_id
                  )
                }
              >
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <View
                    style={
                      this.state.yesChecked[index] === true
                        ? styles.checkedBox
                        : styles.checkBox
                    }
                  />
                  <Text
                    style={{ color: Colors.listItemColor, paddingLeft: 10 }}
                  >
                    {data.options[0].option}
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor="#fff"
                onPress={() =>
                  this.onCheckHandler(
                    index,
                    "no",
                    data.options[1].id,
                    data.assessment_question_id
                  )
                }
              >
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <View
                    style={
                      this.state.noChecked[index] === true
                        ? styles.checkedBox
                        : styles.checkBox
                    }
                  />
                  <Text style={{ color: Colors.redColor, paddingLeft: 10 }}>
                    {data.options[1].option}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        } else {
          return (
            <View style={styles.list} key={index}>
              <Text style={styles.listText}>{data.question}</Text>

              <TouchableHighlight
                underlayColor="#fff"
                onPress={() =>
                  this.onCheckHandler(
                    index,
                    "yes",
                    data.options[0].id,
                    data.assessment_question_id
                  )
                }
              >
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <View
                    style={
                      this.state.yesChecked[index] === true
                        ? styles.checkedBox
                        : styles.checkBox
                    }
                  />
                  <Text
                    style={{ color: Colors.listItemColor, paddingLeft: 10 }}
                  >
                    {data.options[0].option}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        }
      }
    });
  };

  formHandler = async () => {
    this.setState({ isLoading: true });

    const disaster_type_id = this.props.navigation.getParam("disasterId");
    const disaster_data_type_id =
      this.props.navigation.getParam("disasterTypeId");
    const villageId = this.props.navigation.getParam("villageId");
    const latitude = this.state.location.coords.latitude;
    const longitude = this.state.location.coords.longitude;

    const {
      updatedQuestionSubmitted,
      sessionId,
      drtId,
      uploadPhoto,
      image,
      profileId,
    } = this.state;

    //pushing base64 images in documents[anshul]
    const document = [];
    uploadPhoto.forEach((element) => {
      document.push({ image: element });
    });

    const data = {
      sessionId,
      drtId,
      disaster_type_id,
      disaster_data_type_id,
      villageId,
      questions: updatedQuestionSubmitted,
      document,
      latitude,
      longitude,
      profileId,
    };
    console.log("Payload", data);

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
    });
    console.log("totall", total);

    if (total < 5242880) {
      try {
        const response = await axios.post(`${API}saveGoRiskquestionanswer`, {
          data,
        });

        console.log(response);

        if (response.data.code == 200) {
          this.setState({ isLoading: false });
          if (response.data.data == 0) {
            alert(response.data.msg);
            this.props.navigation.pop(response.data.formCount);
            return;
          } else {
            // alert("else")
            this.setState({ isLoading: false });
            //this.props.navigation.pop();
            this.props.navigation.push("InputData", {
              disasterId: this.props.navigation.getParam("disasterId"),
              disasterTypeId: response.data.data,
              villageId: this.props.navigation.getParam("villageId"),
              profileId: response.data.profileId,
            });
          }
        }

        this.setState({ isLoading: false });
      } catch (err) {
        console.log(err);
        alert("Something went wrong!");
      }
    } else {
      alert("Documents Size is greater than 5 MB. Please upload file again!");
      this.setState({ image: [] });
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { image } = this.state;

    if (this.state.fontsLoaded) {
      if (this.state.isLoading) {
        return <Loader />;
      }
      return (
        <View>
          <CopilotStep
            text="Answer all questions for the required parameters - Formats can include yes / no questions, multiple choice questions, checklist questions, and entering numeric values. For the Landslide hazard, answer the questions pertaining to rainfall data, and observation data."
            order={1}
            name="hello"
          >
            <GoRiskCompAndRnRComp />
          </CopilotStep>
          <ScrollView>
            <View>{this.state.inputList && this.renderData()}</View>

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

            <View>
              {this.state.image.length !== 0 ? (
                <Text style={{ fontSize: 16, fontWeight: "bold", padding: 10 }}>
                  Documents Uploaded
                </Text>
              ) : null}
            </View>
            <View>
              {this.state.image.length !== 0
                ? this.state.image.map((item, index) => (
                    <Text
                      key={index}
                      style={{ paddingLeft: 15, paddingTop: 5 }}
                    >
                      {index + 1}. {item.name}
                    </Text>
                  ))
                : null}
            </View>

            <View
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                paddingBottom: 100,
                paddingTop: 20,
              }}
            >
              <TouchableHighlight
                underlayColor="#fff"
                onPress={() => this.openInfoDialog(true)}
              >
                <CopilotStep
                  text="Upload data / photo – If necessary, attach a photo to the go-risk report. Take a new photo or choose a photo from the library."
                  order={2}
                  name="hello12"
                >
                  <UploadData />
                </CopilotStep>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor="#fff"
                onPress={this.formHandler}
              >
                <CopilotStep
                  text="Submit the report. Only one Go-Risk report can be submitted at a time for any village. 
                  The DDMSU will be alerted if there is a threshold breach (potential early warning). "
                  order={3}
                  name="hello1212"
                >
                  <SubmitButton />
                </CopilotStep>
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
              fontWeight: "bold",
            }}
            positiveButton={{
              title: "Cancel",
              titleStyle: { color: Colors.blackColor, fontSize: 14 },
              onPress: () => this.openInfoDialog(false),
            }}
          >
            <TouchableHighlight
              underlayColor="#fff"
              onPress={this.cameraHandler}
            >
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
      return <Loader />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
  },
  modal: {
    textAlign: "center",
    // color: '#A8181F',
    fontSize: 18,
    fontFamily: "OPENSANS-BOLD",
  },

  list: {
    borderColor: "#707070",
    paddingLeft: 20,
    paddingTop: 10,

    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  listText: {
    color: "#1A498B",
    fontFamily: "OPENSANS-BOLD",

    fontSize: 16,
    // paddingLeft:20,
    paddingRight: 10,
  },
  uploadPhoto: {
    backgroundColor: Colors.greenColor,
    width: 180,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 1,
  },
  photoText: {
    color: Colors.whiteColor,
    fontSize: 12,
    fontFamily: "OPENSANS-BOLD",
  },
  contentStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    height: 40,
    justifyContent: "center",
    display: "flex",
  },
  modalText: {
    color: Colors.blackColor,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: Colors.greenColor,
    borderWidth: 2,
    borderRadius: 10,
  },
  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: Colors.greenColor,
    borderRadius: 10,
  },
});

export default copilot({
  overlay: "svg", // or 'view'
  animated: true, // or false
  verticalOffset: 25,
})(InputDataLaunch);
