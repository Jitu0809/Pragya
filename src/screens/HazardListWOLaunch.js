import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from "react-native";
import TopHeader from "../views/Header";
import { Dialog } from "react-native-simple-dialogs";
import Colors from "../views/Colors";
import { _retrieveData, _deleteToken, API } from "../views/constants";
import axios from "axios";
import Loader from "../views/Loader";
import * as Font from 'expo-font';

const deviceHeight = Dimensions.get('window').height;
export default class HazardListWOLaunch extends Component {
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

  };

  // request to get the hazard list

  _getHazardList = async () => {
    const { sessionId, drtId } = this.state;
    const state_id = this.props.navigation.getParam("state_id")
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post(`${API}showHazards`, {
          
          data: {
            sessionId,
            drtId,
            state_id
          }
        });
        console.log("responsee",response);

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
    // const filteredDataofD = response.disaster_data_type.filter((item) => {
    //   return item.status === "D"
    
    // })
    // console.log(filteredDataType ,"d ka data")
     console.log("filtered",filteredDataType);

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
    if (disasterTypeId === '33') {
      this.props.navigation.navigate("AddObservation2", {
        disasterId,
        disasterTypeId,
        villageId
      });
    }else{
      this.props.navigation.navigate("InputData", {
        disasterId,
        disasterTypeId,
        villageId
      });
    }
    
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
            <View style={styles.greenBox}>
              <Text style={styles.headingText}>Please Select Hazard</Text>
            </View>
            <ScrollView style={{height:"auto"}}>

              <ScrollView style={{height:1800}}>{this.state.hazardList && this.renderData()}</ScrollView>
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
                >
                <View>
                <View style={styles.modalBox2} >
                {
                  data.id == 1 && 
                <Text style={styles.modalText}>Landslide is the downslope movement of rocks, debris, soil caused by rain, earthquakes, etc. that make the slope unstable.</Text>
                }
                
               
                {
                  data.id == 5 && 
                <Text style={styles.modalText}>Drought occurs when an area experiences little or no rain over a long period of time, resulting in water shortage and crop loss.</Text>
                }
                {
                  data.id == 6 && 
                <Text style={styles.modalText}>An avalanche is a sudden rapid downslope movement of snow, ice, and associated debris down a mountainside. </Text>
                }
                {
                  data.id == 4 && 
                  <Text style={styles.modalText}>Flood occurs when water overflows onto land that is normally dry. 
                            Cloudburst refers to sudden very heavy precipitation in a short span of time over a limited area.
                   </Text>
                }
                {
                  data.id == 34 && 
                  <Text style={styles.modalText}>Desertification occurs when a fertile land undergoes slow and permanent change into a desert because of climatic variations and human activities.</Text>
                }
                {
                  data.id == 21 && 
                  <Text style={styles.modalText}>Glacial Lake Outburst Flood (GLOF) is the sudden release of meltwater and debris retained in a glacial lake which causes flooding downstream. </Text>
                }
                
                {
                  data.id == 18 && 
                  <Text style={styles.modalText}>Forest fire refers to an uncontrolled fire in a forest, grassland, or other natural settings, which burns the vegetation and spreads according to wind and topography.</Text>
                }
                {
                  data.id == 22 && 
                  <Text style={styles.modalText}>Locusts are short-horned grasshoppers that can form swarms containing millions of locusts, migrate long distances and cause extensive damage to crops and fodder.</Text>
                }
                {
                  data.id == 23 && 
                  <Text style={styles.modalText}>River bank erosion occurs where streams cut wider channels due to increased peak water flow or removal of vegetation cover.
                  </Text>
                }
                {
                  data.id == 20 && 
                  <Text style={styles.modalText}>An earthquake is sudden shaking or trembling of earth’s surface from a series of underground shock waves caused by natural movements of the earth’s crust.
                  </Text>
                }
                 {
                  data.id == 17 && 
                <Text style={styles.modalText}>A cyclone is a violent storm characterised by rapid circular wind movement around an area of low pressure, very high wind speeds and often accompanied by heavy rainfall.
                </Text>
                }
                </View>
             <View style={styles.modalBox}>
                <Text style={styles.modalText}>{data.name}</Text>
             </View>
             
             </View>

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
                {this.state.title === "GLOF" || this.state.title === "Desertification " || this.state.title === "Landslide" ?
                  <View>

                    {this.state.title === "GLOF" &&
                      <View style={styles.modalBox2}>
                      <Text style={styles.modalText}></Text>

                    </View>
                    }
                   
                     {/* {this.state.title === "Desertification " &&
                      <View style={styles.modalBox2}>
                      <Text style={styles.modalText}>Desertification occurs when a fertile land undergoes slow and permanent change into a desert because of climatic variations and human activities.</Text>

                    </View>
                    
                    } */}
                    {/* { this.state.title === "Desertification " && 
                    <View style={styles.modalBox}>
                    <Text style={styles.modalText}>Add Observation</Text>

                    </View>

                    } */}
                    {/* { this.state.title === "Landslide" && 
                    <View style={styles.modalBox}>
                    <Text style={styles.modalText}>Add Observatio</Text>

                    </View>

                    } */}
                    { this.state.title === "Flood/Cloudburst " && 
                    <View style={styles.modalBox}>
                    {/* <Text style={styles.modalText}>Add Observation</Text> */}

                    </View>

                    }
                   
                    
                    
                  </View>
                  : <View >
                 

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
    // backgroundColor: "#E0E0E0",
    backgroundColor: 'rgba(82,208,235,0.2)',
    borderWidth: 1,
    height: deviceHeight / 7.85,
    // borderColor: "#fff",
    borderColor: 'rgb(82,208,235)',
    display: "flex",
    justifyContent: "center",
    paddingLeft: 23
  },
  paraText: {
    fontSize: 17,
    color: 'gray',
    fontFamily: 'OPENSANS-BOLD',
  },
  greenBox: {
    backgroundColor: 'rgb(82,208,235)',
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
    height: 'auto',
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    fontSize: 13,
    

  }
});