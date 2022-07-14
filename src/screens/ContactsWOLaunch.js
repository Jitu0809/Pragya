import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, BackHandler, Dimensions } from 'react-native';
import TopHeader from '../views/Header';
import Colors from '../views/Colors';
import POPDetails from './POPDetails';
import ControlDetails from "./ControlDetails"
import Loader from '../views/Loader';
import * as Font from 'expo-font';
const screenHeight = Dimensions.get('window').height


const data = ['Nearest POP Details', 'District Control Room Details'];

class Contacts extends Component {
  state = {
    fontsLoaded: false,
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
  componentDidMount() {
    this.loadFonts();
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);


  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <TopHeader text='EMERGENCY CONTACTS' />

          <ScrollView ref={ref => (this.scrollView = ref)} style={{ flex: 1 }}
          >
            <View>
              <View style={styles.greenBox}>
                <Text style={styles.headingText}>Details</Text>
              </View>
              <View>

                <TouchableHighlight underlayColor='#fff'   >
                  <View style={styles.listItem}>

                    <Text style={styles.paraText}>Nearest POP Details</Text>


                  </View>
                </TouchableHighlight>
                <POPDetails />
              </View>
            </View>

            <View>

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


});
export default Contacts;