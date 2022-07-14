import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import TopHeader from '../views/Header';
import Colors from '../views/Colors';
import axios from 'axios';
import Loader from "../views/Loader";
import { _retrieveData, _deleteToken, API } from "../views/constants";

import * as Font from 'expo-font';
class ReportCategoryWOLaunch3 extends Component {


  state = {
    sessionId: null,
    drtId: null,
    isLoading: false,
    categoryList: [],
    fontsLoaded: false,
    username:[],
    usernameid:[]


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
      props.navigate('SOSLevels3', {
        villageId: props.getParam('villageId'),
        disaster_type_id: props.getParam('disaster_type_id')
      })
    } else if (id == 4) {
      props.navigate('', {
        categoryId: id,
        sessionId,
        drtId,
        villageId: props.getParam('villageId'),
        disaster_type_id: props.getParam('disaster_type_id')
      })
    }
  }

  renderData = (data,i) => {
    this.state.categoryList.map((data, i) => {

   let datauser=data.name;
   let datauserid=data.id;
   this.state.username.push(datauser);
   this.state.usernameid.push(datauserid);
   
   console.log(datauser);
     
    })
    return (
      <TouchableHighlight underlayColor='#fff' key={i} onPress={() => this.onPressHandler(this.state.usernameid[0])}>
        <View style={styles.listItem}>
          <Text style={styles.paraText}>{this.state.username[0]}</Text>
        </View>
      </TouchableHighlight>
    )
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
            <View style={styles.greenBox}>
              <Text style={styles.headingText}>Please Select Category of Report</Text>
            </View>
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
export default ReportCategoryWOLaunch3;