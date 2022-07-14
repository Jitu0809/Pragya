import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ToastAndroid
} from "react-native";
import TopHeader from "../views/Header";
import Colors from "../views/Colors";
import Loader from '../views/Loader';
import * as Font from 'expo-font';
import { _retrieveData, _deleteToken, API } from "../views/constants";
const screenWidth = Dimensions.get("window").width;

import { copilot,  CopilotStep } from "react-native-copilot";


const RnRComp = ({ copilot }) => (

  <View style={styles.greenBox} {...copilot}>
    <Text style={styles.headingText}>
      Please select the Level of Emergency
    </Text>
  </View>

);

const RenderSOS = ({ copilot, data, i }) => (
  <TouchableHighlight
    key={i}
    underlayColor="#fff"
    onPress={() => this.onPressHandler(i + 1)}
    {...copilot}
  >
    <View style={styles.list}>
      <View>
        <Text
          style={{
            color:
              i === 1
                ? "#3E8232"
                : i === 2
                  ? "#8F8150"
                  : i === 3
                    ? "#F2A26C"
                    : i === 4
                      ? "#E62F33"
                      : "#AD4141",
            fontSize: 18,
            fontFamily: 'OPENSANS-BOLD',

          }}
        >
          {`Level ${i + 1}`}
        </Text>
      </View>
      <View>
        <Text style={{
          fontSize: 15, textAlign: "justify", fontFamily: 'OPENSANS-REGULAR',
        }}>{data.text}</Text>
      </View>
    </View>
  </TouchableHighlight>
)

const data = [
  { id: 1, text: "Safe; No assistance required at the moment" },
  { id: 2, text: "Some relief assistance required; no urgent requirements" },
  { id: 3, text: "Relief assistance required" },
  { id: 4, text: "Relief assistance required" },
  {
    id: 5,
    text:
      "Immediate evacuation, search & rescue needed; Immediate relief assistance required"
  }
];

class SOSLevelsLaunch3 extends Component {
  state = {
    sName: "",
    number: "",
    name: "",
    fontsLoaded: false,
    sessionId: null,
    drtId: null,

  };

  componentDidMount = async () => {


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
    const response = await _retrieveData();

    this.setState({
      sessionId: parseInt(response[0][1]),
      drtId: parseInt(response[1][1])
    });
    console.log(parseInt(response[1][1]), 'frg')
    this.props.start()
    this.props.copilotEvents.on("stop", () => {

      this.props.navigation.navigate("Form", {
        id: 3,
        level: 'Relief assistance required',
        villageId:969,
        disaster_type_id:1
      });

    })

  }
  onPressHandler = i => {

    const villageId = this.props.navigation.getParam('villageId')
    const disaster_type_id = this.props.navigation.getParam('disaster_type_id')
    if (i === 1) {
      //   ToastAndroid.showWithGravity(
      //     'No Assistance Required',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.CENTER,
      // );
      this.props.navigation.navigate("LevelForm", {
        id: i,
        level: 'Safe; No assistance required at the moment',
        villageId,
        disaster_type_id
      });
    }
    else if (i === 2) {

      // 
      //   ToastAndroid.showWithGravity(
      //     'No Assistance Required',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.CENTER,
      // );
      this.props.navigation.navigate("LevelForm2", {
        id: i,
        level: 'Some relief assistance required; no urgent requirements',
        villageId,
        disaster_type_id
      });
    }
    else if (i === 3) {
      this.props.navigation.navigate("Formsecond", {
        id: i,
        level: 'Relief assistance required',
        villageId,
        disaster_type_id
      });
    } else if (i === 4) {
      this.props.navigation.navigate("Formsecond", {
        id: i,
        level: 'Relief assistance required',
        villageId,
        disaster_type_id
      });
    } else if (i === 5) {
      this.props.navigation.navigate("Formsecond", {
        id: i,
        level: 'Immediate evacuation, search & rescue needed; Immediate relief assistance required',
        villageId,
        disaster_type_id
      })
    }
  };


  renderData = () => {

    return data.map((data, i) => {
      return (
        <CopilotStep
          text={`Depending on the level of emergency selected, it would lead you to the Detailed Needs Assessment form where you have to fill in data on
Scale of emergency
Specific requirements
Situation update
Infrastructure damage
Available resources.
The needs assessment report covers a wide range of questions across five different sections.                                                                        
Scale of emergency is used to understand the number of casualties, injuries, etc.                                                                                                                                      Situation update helps us understand the accessibility of the site and whether there are any fresh incidents.                                                                        
Infrastructure damage helps us assess the degree of damage to schools, health centres and houses, etc.`}
          order={2}
          name="hello2"
        >
          <RenderSOS data={data} i={i} key={i} />

        </CopilotStep>
      );
    });
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View>
          <TopHeader text="SOS LEVELS" />
          <View style={styles.container}>
            <CopilotStep
              text="For SOS reports, select the level of emergency (1-5) as per the situation on ground. Levels 3, 4 and 5 all suggest urgency and would alert the DDMSU accordingly."
              order={1}
              name="hello"
            >
              <RnRComp />
            </CopilotStep>
            <View style={styles.listContainer}>{this.renderData()}</View>
          </View>
        </View>
      );
    } else {
      return (<Loader />)
    }

  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    display: "flex"
  },
  greyBox: {
    backgroundColor: Colors.lightGrey,
    padding: 5,
    marginTop: 3,
    marginBottom: 3,
    width: (screenWidth * 90) / 100
  },
  greenBox: {
    backgroundColor: Colors.greenColor,
    display: "flex",
    height: 40,
    justifyContent: "center"
  },
  headingText: {
    color: "#fff",
    fontFamily: 'OPENSANS-BOLD',

    paddingLeft: 23,
    fontSize: 16.5
  },
  list: {
    flexDirection: "column",
    borderBottomWidth: 1,
    padding: 10
  }
});

export default copilot({
  overlay: "svg", // or 'view'
  animated: true,// or false
  verticalOffset: 25,
  labels: {
    finish: "Next"
  }
})(SOSLevelsLaunch3);

