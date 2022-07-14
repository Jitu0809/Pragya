import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, TouchableHighlight, KeyboardAvoidingView,Linking } from 'react-native';
import TopHeader from '../views/Header';

import { _retrieveData, _deleteToken, API } from "../views/constants";
import axios from 'axios';
import * as Font from 'expo-font';
const height = Dimensions.get('window').height;

class About extends Component {

    state = {
        
        fontsLoaded: false,
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
    privacyLink = () => {
        Linking.openURL('https://www.pragya.org/privacy-policy');
    }
    privacyLinks = () => {
        Linking.openURL('https://www.pragya.org');
    }

  render() {
    return (
        <View>
            <TopHeader text='ABOUT US' />
            <ScrollView style={{ width: '100%', height: '80%', padding:30 ,}}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                                    <Text  style={styles.modal2}>ABOUT DMS HIMALAYA</Text>
                                        
                                               </View>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily:"OPENSANS-REGULAR" }}>Welcome to DMS Himalaya. </Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column',}}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR", paddingTop: 15, }}>Pragya has worked extensively on Disaster Management, and based on rigorous participatory research, designed an area-specific, decentralized system for facilitating disaster management processes in the Himalayan region. DMS-Himalaya empowers remote and marginalised communities to take charge of disaster management at the local level, whist enabling seamless community-state collaboration.  </Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column',}}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR", paddingTop: 15, }}>This citizen-led initiative has been active in Uttarakhand, India since 2016 and we are currently expanding the implementation to new geographies including Assam, Himachal Pradesh, Ladakh and Meghalaya in India. Our aim is to improve community capacities for disaster risk reduction and response, make communities more resilient with effective disaster preparedness and risk identification and to support local authorities with improved early warning and relief information tools.  </Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 15,}}>The DMS Himalaya app facilitates decentralised information generation. It has three main components: </Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0,}}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>• Go-Risk </Text> is a location-specific pre-disaster early-warning tool using grassroots measurement grids. The data parameters monitored through the app are specific for each hazard. The relevant authorities are alerted in case of a threshold breach (potential early warning).</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0,}}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>• RNR-Comm </Text> is a relief and response information communication tool for post-disaster damage and needs assessment. It documents the age and gender-specific needs of disaster affected populations to facilitate rescue and relief operations.</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0,}}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>• Emergency Contacts </Text> 
 section offers the contact information of the nearest Control Room and local responders, who can help in coordination with local authorities, emergency relief and rescue operations.{'\n'}The app is used by customised disaster communications networks that link even the remotest corners right through to government responders for timely pre-disaster warning and efficient post-disaster needs assessment and information-relay. The network consists of:</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0,}}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>• Disaster Response Teams (DRTs) -  </Text>local youth responsible for: weather and geological data monitoring and reporting; assisting in community evacuations; acting as first responders in emergency; and post-disaster needs assessments. </Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0,}}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>• Points of Presence (POPs) -  </Text>proximal communications points, typically police or forest outposts equipped with satellite or radio communications technologies responsible for: relaying information across the network and assisting in emergency relief and evacuation. </Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0,}}><Text style={{ fontFamily: "OPENSANS-BOLD" }}>• District Disaster Management Support Unit (DDMSU)  </Text>or Local Disaster Management Unit (LDMU) or District Control Room- local government authorities responsible for: anchoring the network and managing information flow. </Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 20,}}>Effective communication between all stakeholders is of paramount importance, and the DMS Himalaya app plays a key role in facilitating the communication. All data, observations, photos from both Go-Risk and RNR-Comm reports are collated on the DMS Himalaya web interface, which is monitored and used by local authorities and responders.</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text  style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 50, textAlign:'center'}}>Copyright PRAGYA</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text onPress={this.privacyLinks}  style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 5, textAlign:'center',color:'#1A498B'}}>www.pragya.org</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text onPress={this.privacyLink} style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 10, paddingBottom:50, textAlign:'center', color:'#1A498B'}}>Privacy Policy</Text>
                                        
                                    </View>
            </ScrollView>
        </View>
    );
    
  }
}

const styles = StyleSheet.create({
    modal2: {
        textAlign: 'left',
        color:'#1A498B',
        fontSize: 18,
        fontFamily: "OPENSANS-BOLD",
        paddingBottom:20



    },

})
export default About;
