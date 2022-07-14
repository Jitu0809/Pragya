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
const screenWidth = Dimensions.get("window").width;

const data = [
  { id: 1, text: "Safe; No assistance required at the moment" },
  { id: 2, text: "Some relief assistance required; no urgent requirements" },
  { id: 3, text: "Relief assistance required " },
  { id: 4, text: "Immediate relief assistance required; critical medical emergencies" },
  {
    id: 5,
    text:
      "Immediate evacuation, search & rescue needed; Immediate relief assistance required"
  }
];

class SOSLevels extends Component {
  state = {
    sName: "",
    number: "",
    name: "",
    fontsLoaded: false,

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
      this.props.navigation.navigate("Form", {
        id: i,
        level: 'Relief assistance required',
        villageId,
        disaster_type_id
      });
    } else if (i === 4) {
      this.props.navigation.navigate("Form", {
        id: i,
        level: 'Immediate relief assistance required; critical medical emergencies',
        villageId,
        disaster_type_id
      });
    } else if (i === 5) {
      this.props.navigation.navigate("Form", {
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
        <TouchableHighlight
          key={i}
          underlayColor="#fff"
          onPress={() => this.onPressHandler(i + 1)}
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
              <Text style={{ fontSize: 15, textAlign: "justify", fontFamily: 'OPENSANS-REGULAR',
 }}>{data.text}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View>
          <TopHeader text="SOS LEVELS" />
          <View style={styles.container}>
            <View style={styles.greenBox}>
              <Text style={styles.headingText}>
                Please select the Level of Emergency  
              </Text>
            </View>
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

export default SOSLevels;