import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import TopHeader from '../views/Header';
import Colors from '../views/Colors';
import axios from 'axios';
import Loader from "../views/Loader";
import { _retrieveData, _deleteToken, API } from "../views/constants";

import * as Font from 'expo-font';

import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";


const RnRComp = ({ copilot }) => (

  <View style={styles.greenBox}  {...copilot}>
    <Text style={styles.headingText}>Please Select Category of Report</Text>
  </View>

);
const SosComp = ({ copilot, data }) => (

  <View style={styles.listItem} {...copilot}>
    <Text style={styles.paraText}>{data.name}</Text>
  </View>

);
class ReportCategoryLaunch extends Component {


  state = {
    sessionId: null,
    drtId: null,
    isLoading: false,
    categoryList: [],
    fontsLoaded: false,


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
    let res = await this._getCategoryList();

    if (res.data.code == 203) {
      alert(res.data.msg);
      await _deleteToken();
      this.props.navigation.navigate("Login");
      return;
    }
    this.setState({ categoryList: res.data.data, isLoading: false });

    await Font.loadAsync({

      'OPENSANS-BOLD': {
        uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

    });
    this.setState({ fontsLoaded: true });
    this.props.start()
    this.props.copilotEvents.on("stop", () => {

      this.props.navigation.navigate('Home')

    })
  };



  // request to get the category list

  _getCategoryList = async () => {

    const { sessionId, drtId } = this.state;
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}showRNrcategory`, {
          data: {
            sessionId,
            drtId
          }
        });
        res(response);
      } catch (err) {
        rej(err);
      }
    });
  };

  onPressHandler = (id) => {
    const props = this.props.navigation
    const { sessionId, drtId } = this.state
    if (id == 1) {
      props.navigate('SOSLevels', {
        villageId: props.getParam('villageId'),
        disaster_type_id: props.getParam('disaster_type_id')
      })
    } else if (id == 4) {
      console.log(id, sessionId, drtId, props.getParam('villageId'), props.getParam('disaster_type_id'))
      props.navigate('DisplacedPopulation', {
        categoryId: id,
        sessionId,
        drtId,
        villageId: props.getParam('villageId'),
        disaster_type_id: props.getParam('disaster_type_id')
      })
    }
  }

  renderData = () => {
    return this.state.categoryList.map((data, i) => {
      console.log("report category ", data.name)
      return (
        <TouchableHighlight underlayColor='#fff' key={i} onPress={() => this.onPressHandler(data.id)}>

          {data.name === "SOS" ? <CopilotStep
            text="For SOS reports, select the level of emergency (1-5) as per the situation on ground. Levels 3, 4 and 5 all suggest urgency and would alert the DDMSU accordingly. "
            order={2}
            name="hello2345"
          >
            <SosComp data={data} />
          </CopilotStep> : <CopilotStep
            text="In the tracking emerging needs report, you will have to fill in data on the displaced population, emerging concerns and situation update."
            order={3}
            name="hello23fdfe45"
          >
            <SosComp data={data} />
          </CopilotStep>}


        </TouchableHighlight>
      )
    })
  }
  render() {
    if (this.state.fontsLoaded) {
      if (this.state.isLoading) {
        return <Loader />;
      }
      return (
        <View>
          <TopHeader text='REPORT CATEGORY' />
          <View>


            <CopilotStep
              text="Select the report type – SOS / Tracking emerging needs."
              order={1}
              name="hello"
            >
              <RnRComp />
            </CopilotStep>
            <View>
              {this.renderData()}
            </View>
          </View>
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
  greenBox: {
    backgroundColor: Colors.greenColor,
    display: 'flex',
    height: 50,
    justifyContent: 'center',

  },
  headingText: {
    color: '#fff',
    fontWeight: '400',
    paddingLeft: 23,
    fontSize: 18,
    fontFamily: "OPENSANS-BOLD"
  },
  listItem: {
    backgroundColor: Colors.greyColor,
    borderWidth: 1,
    height: 69,
    borderColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 23,

  },
  paraText: {
    fontSize: 17,
    color: Colors.listItemColor,
    fontFamily: "OPENSANS-BOLD"
  },

});
export default copilot({
  overlay: "svg", // or 'view'
  animated: true,// or false
  verticalOffset: 25,
  labels: {
    finish: "Finish"
  }
})(ReportCategoryLaunch);

