import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from "react-native";
import TopHeader from "../views/Header";
import { Dialog } from "react-native-simple-dialogs";
import Colors from "../views/Colors";
import { _retrieveData, _deleteToken, API } from "../views/constants";
import axios from "axios";
import Loader from "../views/Loader";
import * as Font from 'expo-font';

import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";


const GoRiskCompAndRnRComp = ({ copilot }) => (

  <View style={styles.greenBox}  {...copilot}>
    <Text style={styles.headingText}>Please Select Hazard</Text>
  </View>

);

const deviceHeight = Dimensions.get('window').height;
class HazardListLaunch2 extends Component {
  state = {
    dialogVisible: false,
    dialogVisible2: false,
    sessionId: null,
    drtId: null,
    hazardList: null,
    isLoading: false,
    userName: null,
    password: null,
    dataType: [],
    fontsLoaded: false,

  };

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
    let res = await this._getHazardList();

    if (res.data.code == 203) {
      alert(res.data.msg);
      await _deleteToken();
      this.props.navigation.navigate("Login");
      return;
    }
    this.setState({ hazardList: res.data.data, isLoading: false });
    //cconsole.log("hazardList",this.state.hazardList);
    await Font.loadAsync({

      'OPENSANS-BOLD': {
        uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'OPENSANS-REGULAR': {
        uri: require('../../assets/fonts/OpenSans-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

    });
    this.setState({ fontsLoaded: true });
    this.props.start()
    this.props.copilotEvents.on("stop", () => {

      this.props.navigation.navigate('ReportCategory')

    });

  };

  // request to get the hazard list

  _getHazardList = async () => {
    const { sessionId, drtId } = this.state;
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}showHazards`, {
          data: {
            sessionId,
            drtId
          }
        });
        console.log("responsee", response);

        res(response);
      } catch (err) {
        rej(err);
      }
    });
  };

  openInfoDialog = show => {
    this.setState({ dialogVisible: show });
  };
  openInfoDialog2 = show => {
    this.setState({ dialogVisible2: show });
  };

  onPressHandler = async (show, id, title, data) => {

    const villageId = this.props.navigation.getParam("village_id")
    //const { sessionId, drtId, disaster_type_id } = this.state;
    this.setState({ disaster_type_id: id, title });

    // const response = await axios.post(`${API}showDisasterDataType`, {
    //   data: {
    //     sessionId,
    //     drtId,
    //     disaster_type_id: id
    //   }
    // });
    // console.log("subResponse",response);

    const response = { ...data }
    //  console.log("subResponsee",response);
    const filteredDataType = response.disaster_data_type.filter((item) => {
      return item.status === "A"
    })
    //  console.log("filtered",filteredDataType);

    this.setState({ dataType: filteredDataType, addObservation: response });
    if (this.props.navigation.getParam("id") === 1) {
      this.setState({ dialogVisible: show });
    } else {
      this.setState({ dialogVisible2: show });
      this.props.navigation.navigate("ReportCategory", {
        disaster_type_id: id,
        villageId
      });
    }
  };

  renderData = () => {
    return this.state.hazardList.map((m, i) => {
      console.log(m)
      return (
        <TouchableHighlight
          underlayColor="#fff"
          key={i}
          onPress={() =>
            this.onPressHandler(true, m.disaster_type_id, m.disaster_type, m)
          }
        >
          <View style={styles.listItem}>
            <Text style={styles.paraText}>{m.disaster_type}</Text>
          </View>
        </TouchableHighlight>
      );
    });
  };

  InputHandler = (disasterId, disasterTypeId, villageId) => {
    this.openInfoDialog(false);
    this.openInfoDialog2(false);
    this.props.navigation.navigate("InputData", {
      disasterId,
      disasterTypeId,
      villageId
    });
  };

  observationHandler = (disasterId, villageId) => {
    this.openInfoDialog(false);

    this.props.navigation.navigate("AddObservation", {
      disasterId,
      villageId
    });
  };
  observationHandler2 = () => {

    this.openInfoDialog2(false);

  };

  render() {
    if (this.state.fontsLoaded) {
      const { dataType } = this.state;

      if (this.state.isLoading) {
        return <Loader />;
      }
      return (
        <View>
          <TopHeader text="HAZARD LIST" />
          <View>
            {this.props.navigation.getParam('id') == 1 ?

              <CopilotStep
                text="Select the hazard (e.g. Landslide). The data collected for each hazard will vary (e.g. rainfall data, observation data, etc.)"
                order={1}
                name="hello"
              >
                <GoRiskCompAndRnRComp />
              </CopilotStep> :
              <CopilotStep
                text="Select the hazard (e.g. Flood)"
                order={1}
                name="hello"
              >
                <GoRiskCompAndRnRComp />
              </CopilotStep>

            }
            <ScrollView>

              <View>{this.state.hazardList && this.renderData()}</View>
            </ScrollView>
          </View>

          <Dialog
            visible={this.state.dialogVisible}
            title={this.state.title}
            onTouchOutside={() => this.openInfoDialog(false)}
            titleStyle={styles.modal}
            contentStyle={styles.contentStyle}
          >
            {dataType ? dataType.map((data, i) => {
              console.log(data)
              return (
                <TouchableHighlight
                  underlayColor="#fff"
                  key={i}
                  onPress={() =>
                    this.InputHandler(
                      this.state.disaster_type_id,
                      data.id,
                      this.props.navigation.getParam("village_id")
                    )
                  }
                >{data.id == 5 ?


                  <View style={styles.modalBox}>
                    <Text style={styles.modalText}>{data.name}</Text>

                  </View> :
                  <View>
                    <View style={styles.modalBox2}>
                      <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Maxime dolorum incidunt odit.</Text>

                    </View>
                    <View style={styles.modalBox}>
                      <Text style={styles.modalText}>{data.name}</Text>

                    </View>
                  </View>}

                </TouchableHighlight>
              );
            }) : console.log('Data not found')}

            {this.state.addObservation && this.state.addObservation.observation === "Records found" ?

              <TouchableHighlight
                underlayColor="#fff"
                onPress={() =>
                  this.observationHandler(
                    this.state.disaster_type_id,
                    this.props.navigation.getParam("village_id")
                  )
                }
              >
                {this.state.title === "GLOF" || this.state.title === "Desertification " ?
                  <View>
                    <View style={styles.modalBox2}>
                      <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime dolorum incidunt odit.</Text>

                    </View>
                    <View style={styles.modalBox}>
                      <Text style={styles.modalText}>Add Observation</Text>

                    </View>
                  </View>
                  : <View style={styles.modalBox}>
                    <Text style={styles.modalText}>Add Observation</Text>

                  </View>}





              </TouchableHighlight> : console.log('No observation')}



          </Dialog>
          <Dialog
            visible={this.state.dialogVisible2}
            title={this.state.title}
            onTouchOutside={() => this.openInfoDialog2(false)}
            titleStyle={styles.modal}
            contentStyle={styles.contentStyle}
          >
            <TouchableHighlight underlayColor="#fff"
              onPress={() =>
                this.observationHandler2()
              }>

              <View>
                <View style={styles.modalBox2}>
                  <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime dolorum incidunt odit.</Text>

                </View>
                <View style={styles.modalBox}>
                  <Text style={styles.modalText}>Proceed</Text>
                </View>
              </View>
            </TouchableHighlight>
          </Dialog>
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
  listItem: {
    backgroundColor: "#E0E0E0",
    borderWidth: 1,
    height: deviceHeight / 7.85,
    borderColor: "#fff",
    display: "flex",
    justifyContent: "center",
    paddingLeft: 23
  },
  paraText: {
    fontSize: 17,
    color: Colors.listItemColor,
    fontFamily: 'OPENSANS-BOLD',

  },
  greenBox: {
    backgroundColor: Colors.greenColor,
    display: "flex",
    height: 55,
    justifyContent: "center"
  },
  headingText: {
    color: Colors.whiteColor,
    fontFamily: 'OPENSANS-BOLD',

    paddingLeft: 23,
    fontSize: 18
  },
  modal: {
    textAlign: "center",
    color: Colors.greenColor,
    fontSize: 18,
    fontFamily: 'OPENSANS-BOLD',

  },
  modalBox: {
    width: 200,
    height: 40,
    backgroundColor: Colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    display: "flex"
  },
  modalBox2: {
    width: 200,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    display: "flex"
  },
  contentStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalText: {
    color: Colors.blackColor,
    textAlign: "center",
    fontFamily: 'OPENSANS-REGULAR',

  }
});

export default copilot({
  overlay: "svg", // or 'view'
  animated: true,// or false
  verticalOffset: 25,
  labels: {
      finish: "Next"
  }
})(HazardListLaunch2);