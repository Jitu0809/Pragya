import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, BackHandler, Dimensions } from 'react-native';
import TopHeader from '../views/Header';
import Colors from '../views/Colors';
import POPDetails from './POPDetails';
import ControlDetails from "./ControlDetails"
import Loader from '../views/Loader';
import * as Font from 'expo-font';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import { _component, TEXT } from '../views/constants';

const screenHeight = Dimensions.get('window').height
const CopilotText = walkthroughable(Text);
const CustomComponent = ({ copilot }) => (
  <View {...copilot}>
    <TouchableHighlight underlayColor='#fff'   >
      <View style={styles.listItem}>
        <Text style={styles.paraText}>District Control Room Details</Text>
      </View>
    </TouchableHighlight>
  </View>
);
const CustomComponent2 = ({ copilot }) => (
  <View {...copilot}>
    <TouchableHighlight underlayColor='#fff'   >
      <View style={styles.listItem}>

        <Text style={styles.paraText}>Nearest POP Details</Text>


      </View>
    </TouchableHighlight>
  </View>
);
const DetailComponent = ({ copilot }) => (
  <View style={styles.greenBox} {...copilot}>
    <Text style={styles.headingText}>Details</Text>
  </View>
);
const POPCall = ({ copilot, detail }) => (
  <View {...copilot}>

    <TEXT text={'PHONE NUMBER'} Detail={detail.phone_number} Detail2={detail.phone_number2} />
  </View>
);
const POPEmail = ({ copilot, detail }) => (
  <View {...copilot}>

    <TEXT text={'EMAIL ID'} Detail={detail.pop_email} />
    <TEXT text={'PRIMARY POP CONTACT'} Detail={detail.contact_person} />
    <TEXT text={'DISTANCE FROM NEAREST BLOCK HQ'} Detail={detail.distance_from_nearest_block_hq} />
    <TEXT text={'DISTANCE FROM NEAREST DISTRICT HQ'} Detail={detail.distance_from_nearest_district_hq} />

  </View>
);

const data = ['Nearest POP Details', 'District Control Room Details'];

class Contacts extends Component {
  state = {
    fontsLoaded: false,
    dialogVisible: false,
    details: null,


  }
  async loadFonts() {
    await Font.loadAsync({

      'OPENSANS-BOLD': {
        uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      }
    });
    this.setState({ fontsLoaded: true });
  }

  backPressed = () => {
    let { routeName } = this.props.navigation.state;
    // console.log("route is :  " + routeName);

    if (routeName == "Contacts") {
      // console.log("ROUTE :  " + routeName);
      this.props.navigation.navigate("Home")
      return true;
    } else {
      return false;
    }
  };
  componentDidMount = async () => {
    this.props.start(false, this.scrollView);
    this.props.copilotEvents.on('stepChange', this.handleStepChange);
    this.loadFonts();
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);

    let res = await _component('showPOPDetail', this.props)
    this.setState({ details: res, isLoading: false })


  }
  handleStepChange = step => {
    if (step.name === "hello1") {
      // this.scrollView.scrollTo({x:0, y:screenHeight})
    }
    console.log(`Current step is: ${step.name}`);
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
    this.props.copilotEvents.off("stop");
  }

  renderData = () => {
    return this.state.details.map((detail, i) => {
      return (
        <View style={styles.container} key={i}>
          <TEXT text={'LOCATION'} Detail={detail.pops_address} />
          <CopilotStep
            text="Press the “Dial” buttons should you wish to call them. "
            order={2}
            name="POPCall"
          >
            <POPCall detail={detail} />
          </CopilotStep>
          <CopilotStep
            text={`You can take note of their address and email ID for any official correspondence.

You can also note the distances from nearest block headquarters and distance from nearest district headquarters.  `}
            order={3}
            name="POPEmail"
          >
            <POPEmail detail={detail} />
          </CopilotStep>


        </View>
      )
    })
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <TopHeader text='EMERGENCY CONTACTS' />

          <ScrollView ref={ref => (this.scrollView = ref)} style={{ flex: 1 }}
          >
            <View>

              <View>
                {/* <CopilotStep
                  text="Here you can access the contact information of the District control room and the nearest POP (Point of Presence), who can help you communicate with others and assist you with relief work."
                  order={1}
                  name="hello"
                > */}
                  <DetailComponent />
                {/* </CopilotStep> */}
                <TouchableHighlight underlayColor='#fff'   >
                  <View style={styles.listItem}>

                    <Text style={styles.paraText}>Nearest POP Details</Text>


                  </View>
                </TouchableHighlight>
                <View>

                  <View style={styles.container}>
                    {this.state.details && this.renderData()}
                  </View>
                </View>
              </View>
            </View>

            <View>
              {/* <CopilotStep
                text="District Control Room Details"
                order={3}
                name="hello1"
              >
                <CustomComponent />
              </CopilotStep> */}
              <TouchableHighlight underlayColor='#fff'   >
                <View style={styles.listItem}>
                  <Text style={styles.paraText}>District Control Room Details</Text>
                </View>
              </TouchableHighlight>
              <ControlDetails />
            </View>
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
  greenBox: {
    backgroundColor: "#1A498B",
    display: 'flex',
    height: 49,
    justifyContent: 'center',

  },
  headingText: {
    color: '#fff',
    fontFamily: "OPENSANS-BOLD",
    paddingLeft: 23,
    fontSize: 18
  },
  listItem: {
    backgroundColor: "#EDEDED",
    borderWidth: 1,
    height: 69,
    borderColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 23,

  },
  paraText: {
    fontSize: 17.1,
    color: "#1A498B",
    fontFamily: "OPENSANS-BOLD",
  },

  container: {
    paddingLeft: 10,
    paddingTop: 10
  },
  textColor: {
    color: "#1A498B"
  }


});
export default copilot({
  overlay: "svg", // or 'view'
  animated: true, // or false
  verticalOffset: 30
})(Contacts);