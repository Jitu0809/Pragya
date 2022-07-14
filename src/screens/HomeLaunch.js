import React, { Component } from 'react';

import {
    Alert,
    BackHandler,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
    ScrollView,
    Linking
} from 'react-native';
import Constants from 'expo-constants'
import TopHeader from '../views/Header';
import Colors from '../views/Colors';
import { Dialog } from 'react-native-simple-dialogs';
import Loader from '../views/Loader';
import * as Font from 'expo-font';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CopilotText = walkthroughable(Text);
const LandingPage = ({ copilot }) => (

    <View style={styles.header} {...copilot}>
        <Text style={styles.headingText}>DMS HIMALAYA</Text>
        <View style={{ paddingLeft: 10, }}>
            <Image source={require('../../assets/info.png')} style={styles.info}></Image>
        </View>
    </View>

);
const GoRiskComp = ({ copilot }) => (

    <View style={styles.yellowBox} {...copilot}>
        <View>
            <Image source={require('../../assets/risk2.png')} style={{ width: 74, height: 65 }}></Image>
        </View>
        <Text style={styles.text}>GO-RISK TOOL</Text>
    </View>

);
const RnRComp = ({ copilot }) => (

    <View style={styles.yellowBox} {...copilot}>

        <View >
            <Image source={require('../../assets/rnr5.png')} style={{ width: 72, height: 78 }}></Image>
        </View>

        <Text style={styles.text}>RNR-COMM TOOL</Text>


    </View>

);
const EmergencyComp = ({ copilot }) => (

    <View style={styles.yellowBox} {...copilot}>

        <View >
            <Image source={require('../../assets/call3.png')} style={{ width: 65, height: 60 }}></Image>
        </View>
        <Text style={styles.text}>EMERGENCY CONTACTS</Text>

    </View>

);
const AboutUsComp = ({ copilot }) => (


    <View style={styles.blueBtn} {...copilot}>
        <View style={styles.header2}>


            <Text style={styles.headingTextAbout}>ABOUT US</Text>
        </View>

    </View>

);
const deviceHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


class HomeLaunch extends Component {

    state = {
        dialogVisible: false,
        dialogVisibleAbout: false,
        fontsLoaded: false,
        firstLaunchHome: true
    }

    async loadFonts() {
        await Font.loadAsync({
            'LATO-BOLD': require('../../assets/fonts/Lato-Bold.ttf'),

            'OPENSANS-EXTRABOLD': {
                uri: require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
                display: Font.FontDisplay.FALLBACK,
            },
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

    openInfoDialog = show => {
        this.setState({ dialogVisible: show })
    };
    openInfoDialogAbout = show => {
        this.setState({ dialogVisibleAbout: show })
    };
    privacyLink = () => {
        Linking.openURL('https://www.pragya.org/privacy-policy');
    }

    componentDidMount = async () => {

        BackHandler.addEventListener("hardwareBackPress", this.backPressed);
        this.loadFonts();

        this.props.start();
        // this.props.copilotEvents.on("stop", () => {
        //   this.props.navigation.navigate('AssignedArea', { id: 1 })
        // });

    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
    }
    backPressed = () => {
        let { routeName } = this.props.navigation.state;
        // console.log("route is :  " + routeName);

        if (routeName == "Home") {
            console.log("ROUTE :  " + routeName);
            if (this.props.navigation.isFocused()) {
                Alert.alert(
                    "Exit App",
                    "Do you want to exit?",
                    [
                        {
                            text: "No",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Yes", onPress: () => BackHandler.exitApp() }
                    ],
                    { cancelable: false }
                );
            }
            else {
                this.props.navigation.pop();
            }
            return true;
        } else {
            return false;
        }
    };

    render() {
        if (this.state.fontsLoaded) {



            return (
                <View style={{ flex: 1, backgroundColor: "#559BD0" }}>
                    <TopHeader text='' leftComponent='' />
                    <ScrollView >

                        <View style={{ backgroundColor: "" }}>
                            <TouchableHighlight underlayColor='#559BD0' onPress={() => this.openInfoDialog(true)}>
                                <CopilotStep
                                    text="On the home page, you will find the Go-risk and RNR-Comm tools, Emergency Contacts, and About Us sections."
                                    order={1}
                                    name="Landing Page"
                                >
                                    <LandingPage />
                                </CopilotStep>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='#559BD0' onPress={() => this.props.navigation.navigate('AssignedArea', {
                                id: 1
                            })}>
                                <CopilotStep
                                    text="Go-Risk is a tool used before the onset of a disaster and for regular monitoring of different hazards."
                                    order={2}
                                    name="hello"
                                >
                                    <GoRiskComp />
                                </CopilotStep>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='#559BD0' onPress={() => this.props.navigation.navigate('AssignedArea', {
                                id: 2
                            })}>
                                <CopilotStep
                                    text="The RnR-Comm tool includes formats for the post-disaster damage and needs assessment which are filled out only after a disaster event has taken place."
                                    order={3}
                                    name="hello78"
                                >
                                    <RnRComp />
                                </CopilotStep>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='#559BD0' onPress={() => this.props.navigation.navigate('Contacts')}>
                                <CopilotStep
                                    text="Here you can access the contact information of the District control room and the nearest POP (Point of Presence), who can help you communicate with others and assist you with relief work."
                                    order={4}
                                    name="hello3"
                                >
                                    <EmergencyComp />
                                </CopilotStep>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="#559BD0" onPress={() => this.openInfoDialogAbout(true)}>
                                <CopilotStep
                                    text="Over here, you can read about the purpose of the DMS Himalaya App, its features, and the organisations and partners associated with this initiative."
                                    order={5}
                                    name="hello5"
                                >
                                    <AboutUsComp />
                                </CopilotStep>
                            </TouchableHighlight>
                            <Dialog
                                visible={this.state.dialogVisible}
                                dialogStyle={{ borderRadius: 5 }}
                                title="INFORMATION"
                                onTouchOutside={() => this.openInfoDialog(false)}
                                titleStyle={styles.modal}
                                contentStyle={styles.contentStyle}
                                onRequestClose={() => this.openInfoDialog(false)} >

                                <ScrollView style={{ width: '100%', height: '80%' }}>

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>DMS HIMALAYA </Text>is an area-specific, cost-effective, decentralised system for </Text>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>i. Early warning and grassroots preparedness </Text>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>ii. Post-disaster damage and needs assessment and communication system</Text>
                                    </View>

                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Initial research phase supported by </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/logo4.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>


                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Recognised as Top 20 Innovation in Risk Award by UNISDR and Munich Re foundation at the Third UN World Conference on Disaster Risk Reduction, Sendai - 2015</Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.5, flexDirection: 'column' }}>
                                            <Image source={require('../../assets/logo3.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                            <Image source={require('../../assets/logo2.png')} style={{ width: 100, marginTop: 10, height: 40 }} resizeMode='contain'></Image>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingLeft: 20, paddingTop: 30, alignItems: 'center' }}>

                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/logo1.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>

                                </ScrollView>
                            </Dialog>
                            <Dialog
                                visible={this.state.dialogVisibleAbout}
                                dialogStyle={{ borderRadius: 5 }}
                                title="INFORMATION"
                                onTouchOutside={() => this.openInfoDialogAbout(false)}
                                titleStyle={styles.modal}
                                contentStyle={styles.contentStyle}
                                onRequestClose={() => this.openInfoDialogAbout(false)} >

                                <ScrollView style={{ width: '100%', height: '80%' }}>

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>DMS HIMALAYA </Text>is an area-specific, cost-effective, decentralised system for </Text>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>i. Early warning and grassroots preparedness </Text>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>ii. Post-disaster damage and needs assessment and communication system</Text>
                                    </View>

                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Initial research phase supported by </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/logo4.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>


                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Recognised as Top 20 Innovation in Risk Award by UNISDR and Munich Re foundation at the Third UN World Conference on Disaster Risk Reduction, Sendai - 2015</Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.5, flexDirection: 'column' }}>
                                            <Image source={require('../../assets/logo3.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                            <Image source={require('../../assets/logo2.png')} style={{ width: 100, marginTop: 10, height: 40 }} resizeMode='contain'></Image>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingLeft: 20, paddingTop: 30, alignItems: 'center' }}>

                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/logo1.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingLeft: 20, paddingTop: 30, alignItems: 'center' }}>
                                        <Text onPress={this.privacyLink} style={{ fontFamily: "OPENSANS-REGULAR", color: "#1A498B" }}>Privacy Policy</Text>
                                    </View>

                                </ScrollView>
                            </Dialog>
                        </View>
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
    statusBar: {
        height: Constants.statusBarHeight
    },
    centerContainerStyle: {
        height: 80 - Constants.statusBarHeight
    },
    yellowBox: {
        display: 'flex',
        flexDirection: 'row',
        height: deviceHeight / 5.2,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 14,
        borderRadius: 5,
        marginRight: 11,
        marginLeft: 11,
        paddingLeft: 50,
        // paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    text: {
        paddingLeft: 25,
        display: 'flex',
        fontSize: 15,
        color: "#1A498B",
        // fontWeight: 'bold',
        fontFamily: "OPENSANS-EXTRABOLD",
        textAlign: "left",
        marginRight: "auto"
    },
    header: {
        paddingTop: 32,
        paddingBottom: 10,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    info: {
        width: 25.34,
        height: 25.34,

    },
    headingText: {
        color: '#FFFFFF',
        fontSize: 34,
        marginRight: 25,
        fontFamily: 'LATO-BOLD',
        // fontWeight: 'bold'
    },
    headingTextAbout: {
        color: '#FFFFFF',
        fontSize: 11,
        fontFamily: "OPENSANS-BOLD"
        // fontWeight: 'bold'
    },
    image: {
        height: 70,
        width: 70
    },
    modal: {
        textAlign: 'center',
        color: Colors.greenColor,
        fontSize: 18,
        fontFamily: "OPENSANS-BOLD"



    },
    contentStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoImage: {
        width: 117,
        height: 38,
    },
    blueBtn: {

        paddingTop: 10,
        paddingBottom: 10,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header2: {
        backgroundColor: "#1A498B",
        width: 180,
        height: 40,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10

    },
    buttonText: {
        color: "red"
    }

})



export default copilot({
    overlay: "svg", // or 'view'
    animated: true,// or false
    verticalOffset: 30
})(HomeLaunch);