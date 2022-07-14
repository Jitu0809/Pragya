import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    BackHandler

} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import TopHeader from '../views/Header';
import { _retrieveData, API, _deleteToken } from '../views/constants';
import Colors from '../views/Colors';
import axios from 'axios'
import Loader from '../views/Loader';
import * as Font from 'expo-font';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";


const GoRiskCompAndRnRComp = ({ copilot, data }) => (

    <View style={styles.greenBox} {...copilot}>
        <Text style={styles.headingText}>Panchayat:{" "}{data.panchayat_name}</Text>
    </View>

);
class AssignedAreaLaunch1 extends Component {

    state = {
        sessionId: null,
        drtId: null,
        areasList: null,
        isLoading: false,
        isConnected: null,
        fontsLoaded: false,

    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })


        const response = await _retrieveData()

        this.setState({
            sessionId: parseInt(response[0][1]),
            drtId: parseInt(response[1][1]),

        })

        if (response[0][1] == 'null') {
            alert("Please login")
            this.props.navigation.navigate('Login');
            return;
        }
        await this._mainHandler();
        await Font.loadAsync({

            'OPENSANS-BOLD': {
                uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
                display: Font.FontDisplay.FALLBACK,
            },

        });
        this.setState({ fontsLoaded: true });
        // BackHandler.addEventListener("hardwareBackPress", this.backPressed);

        this.props.start()
        this.props.copilotEvents.on("stop", () => {
            if (this.props.navigation.getParam('id') == 1) {

                this.props.navigation.navigate('HazardList', { id: 1 })
            } else {
                this.props.navigation.navigate('HazardList', { id: 2 })

            }
        });
    }

    componentWillUnmount() {
        // NetInfo.removeEventListener("change",this._handleConnectivityChange);
        // BackHandler.removeEventListener("hardwareBackPress", this.backPressed);

    }

    // backPressed = () => {
    //     let { routeName } = this.props.navigation.state;
    //     // console.log("route is :  " + routeName);

    //     if (routeName == "AssignedArea") {
    //         // console.log("ROUTE :  " + routeName);
    //         this.props.navigation.navigate("Home")
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    // Check the status of network 

    checkNetStatus = async () => {

        return (NetInfo.addEventListener(

            this._handleConnectivityChange
        )
        )
    }




    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnected,
        });
    };

    //Main handler 

    _mainHandler = async () => {

        const isConnected = await this.checkNetStatus()
        this.setState({ isConnected })

        if (isConnected) {
            let res = await this._getAreasList();

            if (res.data.code == 203) {
                alert(res.data.msg)
                await _deleteToken()
                this.props.navigation.navigate('Login')
                return;
            }
            this.setState({ areasList: res.data.data, isLoading: false })
        } else if (!isConnected) {
            alert('Please connect to network')
        }

    }


    // request the api to get the assigned area list 

    _getAreasList = async () => {
        const { sessionId, drtId } = this.state;
        return new Promise(async (res, rej) => {
            try {
                const response = await axios.post(`${API}showDrtVillages`, {
                    data: {
                        sessionId,
                        drtId
                    }
                })
                res(response)
            } catch (err) {
                rej(err)
            }

        })
    }


    renderData = () => {

        return this.state.areasList.map((data, i) => {
            console.log(data, "VAIBHAV DATA", i)
            return (
                <View key={i}>
                    {this.props.navigation.getParam('id') == 1 && i ==0 ?



                        <CopilotStep
                            text="Select the village – Identify the panchayat and choose from the corresponding list of villages."
                            order={1}
                            name="hello"
                        >
                            <GoRiskCompAndRnRComp data={data} />
                        </CopilotStep>


                        :
                        
                            <GoRiskCompAndRnRComp data={data} />
                        

                    }

                    {data.villages.map((mdata, i) => {
                        return (
                            <TouchableHighlight underlayColor='#fff' key={i} onPress={() => this.props.navigation.navigate('HazardList', {
                                id: this.props.navigation.getParam('id'),
                                village_id: mdata.village_id
                            })}>
                                <View style={styles.listItem}>
                                    <Text style={styles.paraText}>{mdata.village_name}</Text>
                                </View>

                            </TouchableHighlight>
                        )
                    })}
                </View>
            )
        })
    }

    render() {

        console.log(this.state.isConnected, 'panny gadhi')
        console.log(this.state.isLoading, 'panny gadhi')
        console.log(this.state.areasList, 'panny gadhi')
        if (this.state.fontsLoaded) {


            if (this.state.isLoading) {
                return (
                    <Loader />
                )
            }
            return (
                <View>
                    <TopHeader text='ASSIGNED AREA' />
                    <ScrollView>
                        {this.state.areasList && this.renderData()}
                    </ScrollView>
                </View>
            );
        }
        else {
            return (
                <Loader />
            )
        }
    }
}

const styles = StyleSheet.create({
    greenBox: {
        backgroundColor: "#1A498B",
        height: 55,
        display: 'flex',
        justifyContent: 'center',

    },
    headingText: {
        color: Colors.whiteColor,
        fontFamily: 'OPENSANS-BOLD',
        paddingLeft: 23,
        fontSize: 18
    },
    listItem: {
        backgroundColor: '#E0E0E0',
        borderWidth: 1,
        height: 69,
        borderColor: Colors.whiteColor,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 23,
    },
    paraText: {
        fontSize: 17,
        fontFamily: 'OPENSANS-BOLD',
        color: Colors.listItemColor,
    }
});





export default copilot({
    overlay: "svg", // or 'view'
    animated: true,// or false
    verticalOffset: 25,
    labels: {
        finish: "Next"
    }
})(AssignedAreaLaunch1);