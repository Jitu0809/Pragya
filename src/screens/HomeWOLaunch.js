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
    Linking,
    Modal,
    Button,
} from 'react-native';
import Constants from 'expo-constants'
import TopHeader from '../views/Header';
import Colors from '../views/Colors';
import { Dialog } from 'react-native-simple-dialogs';
import Loader from '../views/Loader';
import * as Font from 'expo-font';
import Swiper from 'react-native-swiper'
import { Header } from 'react-native/Libraries/NewAppScreen';
import reactDom from 'react-dom';


const deviceHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


class HomeWOLaunch extends Component {


    state = {
        pressStatus: false,
        show:false,
        dialogVisible: false,
        dialogVisibleAbout: false,
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

    _onHideUnderlay(){
        this.setState({ pressStatus: false });
      }
      _onShowUnderlay(){
        this.setState({ pressStatus: true });
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
    pragyaLink = () => {
        Linking.openURL('https://www.pragya.org/privacy-policy');
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backPressed);
        this.loadFonts();
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
                <View style={{  backgroundColor: "#09A8AB" }}>
                    <TopHeader text='' leftComponent=''  />
                    <ScrollView >

                        <View style={{ backgroundColor: "" }}>
                            <TouchableHighlight underlayColor='#559BD0'  onPress={() => this.openInfoDialog(true)}>
                            <View style={styles.header}>
                                    <Text style={styles.headingText}>DMS HIMALAYA</Text>
                                    <View style={{ paddingLeft: 10 }}>
                                        <Image source={require('../../assets/info.png')} style={styles.info}></Image>
                                    </View>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='#559BD0' onPress={() => this.props.navigation.navigate('AssignedArea', {
                                id: 1
                            })}>
                                <View style={styles.yellowBox}>
                                    <View>
                                        <Image source={require('../../assets/risk2.png')} style={{ width: 78, height: 70 }}></Image>
                                    </View>
                                    <Text style={styles.text}>GO-RISK TOOL</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='#559BD0' onPress={() => this.props.navigation.navigate('AssignedAreaRNR', {
                                id: 2
                            })}>
                                <View style={styles.yellowBox}>
                                    <View >
                                        <Image source={require('../../assets/rnr5.png')} style={{ width: 72, height: 73 }}></Image>
                                    </View>
                                    <Text style={styles.text}>RNR-COMM TOOL</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='#559BD0' onPress={() => this.props.navigation.navigate('Contacts')}>
                                <View style={styles.yellowBox}>
                                    <View >
                                        <Image source={require('../../assets/call3.png')} style={{ width: 65, height: 61 }}></Image>
                                    </View>
                                    <Text style={styles.text}>EMERGENCY CONTACTS</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="" onPress={() => this.props.navigation.navigate('About')}>
                                <View style={styles.blueBtn}>
                                    <View style={styles.header2}>

                                        
                                        {/* <Text style={styles.headingTextAbout} onPress={()=>{this.setState({show:true})}}
                                                  style={this.state.pressStatus ? styles.aboutcolor : styles.aboutcolor2}
                                                  onHideUnderlay={this._onHideUnderlay.bind(this)}
                                                  onShowUnderlay={this._onShowUnderlay.bind(this)}>ABOUT US</Text> */}
                                                   <Text style={styles.headingTextAbout}
                                                  style={this.state.pressStatus ? styles.aboutcolor : styles.aboutcolor2}
                                                  onHideUnderlay={this._onHideUnderlay.bind(this)}
                                                  onShowUnderlay={this._onShowUnderlay.bind(this)}>ABOUT US</Text>
                                                  
                                        {/* <Button title="ABOUT US" onPress={()=>{this.setState({show:true})}} /> */}
                                        <Modal transparent= {true} visible={this.state.show} > 
                                          <View style={{backgroundColor: "#ffffff",flex:1,}} >
                                            <View style={{backgroundColor:"#fffffff",flex:1,}} >
                                              <TopHeader  onPress={() => this.props.navigation.navigate('')} />
                                                {/* <Text style={{fontsize:40, paddingBottom:20,fontWeight:'bold'}} onPress={()=>{this.setState({show:false})}}>Back</Text> */}
                                                {/* <View style={{flex:1, flexDirection:'row',}}>
                                                <TouchableHighlight  
                                                  onPress={()=>{this.setState({show:false})}}  
                                                 
                                                  
                                                  >
                                                  <View style={{  flex:1,alignItems:'center',justifyContent:'center', }} 
                                                  style={this.state.pressStatus ? styles.buttonPress : styles.button}
                                                  onHideUnderlay={this._onHideUnderlay.bind(this)}
                                                  onShowUnderlay={this._onShowUnderlay.bind(this)} >

                                                     <Image source={require('../../assets/arrow.png')} style={{ width: 16, height: 72,marginLeft:20  }}
                                                       
                                                     
                                                     ></Image>
                                                 </View>
                                                 
                                                </TouchableHighlight>

                                                <TouchableHighlight  style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',backgroundColor:'#E6E6E6' }} >
                                                  
                                                  <View style={{ flex:1,paddingRight:10,paddingBottom:5,}}>
                                                 <Image source={require('../../assets/logo.png')} style={{ width: 85, height: 85, marginBottom: 25,}} resizeMode='contain'></Image>
                                                 </View>

                                                     
                                                 
                                                 
                                                </TouchableHighlight>
                                                </View> */}

                                                <ScrollView style={{ width: '100%', height: '80%', padding:30 ,}}>
                                                <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                                    <Text  style={styles.modal2}>ABOUT DMS HIMALAYA</Text>
                                        
                                               </View>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Welcome to DMS Himalaya. </Text>
                                        
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
 section offers the contact information of the nearest Control Room and local responders, who can help in coordination with local authorities, emergency relief and rescue operations. The app is used by customised disaster communications networks that link even the remotest corners right through to government responders for timely pre-disaster warning and efficient post-disaster needs assessment and information-relay. The network consists of:</Text>
                                        
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
                                        <Text   style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 5, textAlign:'center',color:'#1A498B'}}>www.pragya.org</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text onPress={this.privacyLink} style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 10, paddingBottom:50, textAlign:'center', color:'#1A498B'}}>Privacy Policy</Text>
                                        
                                    </View>


                                   

                                </ScrollView>
                                            </View>
                                        </View>
                                        </Modal>
                                    </View>
                                </View>
                            </TouchableHighlight>

                            
                           
                            <Dialog
                                visible={this.state.dialogVisible}
                                dialogStyle={{ borderRadius: 5 }}
                                title="INFORMATION"
                                
                                onTouchOutside={() => this.openInfoDialog(false)}
                                titleStyle={styles.modal}
                                contentStyle={styles.contentStyle}
                                onRequestClose={() => this.openInfoDialog(false)} 
                                >
                                <View style={{ width: '100%', height: '80%', }} showsPagination={true}  >

                                <ScrollView >

                                <Swiper showsButtons={false} paginationStyle={styles.paginationStyle} loop={false} >
                                
                                 {/* <View style={{ width: '100%', height: '100%',}}>
                                    
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column',paddingTop:40}}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}><Text style={{ fontFamily: "OPENSANS-BOLD" }} style={styles.text2}>DMS HIMALAYA </Text>is an area-specific, cost-effective, decentralised system for </Text>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>i. Early warning and grassroots preparedness </Text>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>ii. Post-disaster damage and needs assessment and communication system</Text>
                                    </View>

                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Initial research phase supported by </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/logo1.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>


                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Recognised as Top 20 Innovation in Risk Award by UNISDR and Munich Re foundation at the Third UN World Conference on Disaster Risk Reduction, Sendai - 2015</Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.5, flexDirection: 'column', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/logo2.png')} style={{ width: 150, marginTop: 0, height: 40 }} resizeMode='contain'></Image>
                                            <Image source={require('../../assets/logo3.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                            
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Showcased at World Humanitarian Summit Innovation Marketplace, Geneva-2015, Istanbul-2016 </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/logo4.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text onPress={this.pragyaLink}  style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 80, textAlign:'center'}}>Copyright PRAGYA</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text onPress={this.pragyaLink} style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0, textAlign:'center'}}>www.pragya.org</Text>
                                        
                                    </View>
                                    
                                   
                                 </View> */}
                                  <View style={styles.slide2}>
                                    {/* <Text style={styles.text2} >Information</Text> */}
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column',paddingTop: 50, }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>The <Text style={{ fontFamily: "OPENSANS-BOLD",}} >DMS HIMALAYA </Text>application has been developed by Pragya, a not-for-profit, development organisation working for the appropriate development of vulnerable communities and ecosystems in remote and marginalised regions of the world.</Text>
                                       
                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 5, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>DMS Himalaya is funded and supported by <Text style={{ fontFamily: "OPENSANS-BOLD",}}>Elrha’s Humanitarian Innovation Fund (HIF), </Text> Pragya UK and other donors.  </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.9 }}>
                                            <Image source={require('../../assets/Page1/HIF.png')} style={{width:100,height:100}} resizeMode='contain'></Image>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 30, paddingTop: 30, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Elrha’s HIF is a grant making programme which improves outcomes for people affected by humanitarian crises by identifying, nurturing and sharing more effective and scalable solutions and is funded by the <Text style={{ fontFamily:"OPENSANS-BOLD"}}>Netherlands Ministry of Foreign Affairs. </Text>  </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.5, flexDirection: 'column' }}>
                                            <Image source={require('../../assets/Page1/Dutch.png')} style={{width:140,height:80}} resizeMode='contain'></Image>
                                            <Image source={require('../../assets/Page1/Pragya_logo.png')} style={{ width: 130, marginTop: 40, height: 40 }} resizeMode='contain'></Image>
                                        </View>
                                    </View> 
                                  </View>
                                   <View style={styles.slide3}>
                                   {/* <Text style={styles.text2}>Information</Text> */}
                                   <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 20, paddingTop: 50, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Initial research phase supported by Elrha’s Humanitarian Innovation Fund (HIF).</Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/Page2/HIF.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 25, paddingTop: 10, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Recognised among Top 20 Innovations in Risk Award by UNISDR and Munich Re foundation at the Third UN World Conference on Disaster Risk Reduction, Sendai - 2015</Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.5, flexDirection: 'column' }}>
                                            <Image source={require('../../assets/Page2/unisdr.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                            <Image source={require('../../assets/Page2/Munich.png')} style={{ width: 140, marginTop: 40, height: 40,paddingTop:40,}} resizeMode='contain'></Image>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 20, paddingTop: 10, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Showcased at World Humanitarian Summit Innovation Marketplace, Geneva - 2015, Istanbul  - 2016</Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/Page2/WHS.png')} style={{width:130,height:50,}} resizeMode='contain'></Image>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 20, paddingTop: 10, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Showcased at the Seventh Annual Conference of University College London Institute for Risk and Disaster Reduction, London - 2017 
 </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/Page2/ucl.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginLeft: 20, paddingTop: 10, alignItems: 'center' }}>
                                        <View style={{ width: screenWidth / 2.5 }}>
                                            <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Selected among Top 25 CBDRM cases in Asia by Asian Disaster Preparedness Center, Bangkok, 2018 </Text>
                                        </View>
                                        <View style={{ width: screenWidth / 2.6 }}>
                                            <Image source={require('../../assets/Page2/adpc.png')} style={styles.logoImage} resizeMode='contain'></Image>
                                        </View>
                                    </View>
                                    
                                    
                                  </View>
                                </Swiper>

                                    {/* <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
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
                                    </View> */}

                                </ScrollView>
                                </View>
                            </Dialog>
                            
                            {/* <Dialog
                                
                                visible={this.state.dialogVisibleAbout}
                                dialogStyle={{ borderRadius: 5 }}
                                title="ABOUT DMS HIMALAYA"
                                onTouchOutside={() => this.openInfoDialogAbout(false)}
                                titleStyle={styles.modal}
                                contentStyle={styles.contentStyle}
                                onRequestClose={() => this.openInfoDialogAbout(false)}
                                 >

                                <ScrollView style={{ width: '100%', height: '80%' }}>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR" }}>Welcome to DMS Himalaya. </Text>
                                        
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
 section offers the contact information of the nearest Control Room and local responders, who can help in coordination with local authorities, emergency relief and rescue operations. The app is used by customised disaster communications networks that link even the remotest corners right through to government responders for timely pre-disaster warning and efficient post-disaster needs assessment and information-relay. The network consists of:</Text>
                                        
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
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 50, textAlign:'center'}}>Copyright PRAGYA</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 0, textAlign:'center'}}>www.pragya.org</Text>
                                        
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                                        <Text style={{ fontFamily: "OPENSANS-REGULAR",paddingTop: 10, textAlign:'center'}}>Privacy Policy</Text>
                                        
                                    </View>


                                   

                                </ScrollView>
                            </Dialog> */}
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
        flexDirection: 'column',
        height: deviceHeight / 5.5,
        backgroundColor: '#ADCBE1',
        borderWidth:2,
        borderColor:'#1A498B',
        marginTop: 7,
        // marginBottom: 14,
        borderRadius: 5, 
        marginRight: 11,
        marginLeft: 11,
        paddingTop:10,
        paddingBottom: 0,
        // paddingLeft: 50,
        // paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    text2:{ paddingLeft: 0,
        display: 'flex',
        fontSize: 15,
        color: "#1A498B",
        paddingTop:40,
        // fontWeight: 'bold',
        fontFamily: "OPENSANS-EXTRABOLD",
        // textAlign: "left",
        // marginRight: "auto"
    },
    text: {
    
        display: 'flex',
        fontSize: 18,
        color: "#FFFF",
        // fontWeight: 'bold',
        fontFamily: "OPENSANS-EXTRABOLD",
        textAlign: "center",
        margin: "auto",
        paddingBottom: 10,
       
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
        height: 25.34

    },
    headingText: {
        color: '#1A498B',
        fontSize: 34,
        // marginRight: 25,
        fontFamily: 'LATO-BOLD',
        // fontWeight: 'bold'
    },
    headingTextAbout: {
        color: '#FFFFFF',
        fontSize: 11,
        borderColor:'#ffff',
        borderWidth:1,
        fontFamily: "OPENSANS-BOLD",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:40,
        paddingRight:40,
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
    modal2: {
        textAlign: 'left',
        color: Colors.greenColor,
        fontSize: 18,
        fontFamily: "OPENSANS-BOLD",
        paddingBottom:20



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
        paddingBottom: 90,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header2: {
        backgroundColor: "#1A498B",
        // width: 180,
        // height: 40,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop:10

    },
   
      button: {
        alignSelf:'center',
        backgroundColor:'#E6E6E6',
        
        
        
      },
      buttonPress: {
        alignSelf:'center',
        backgroundColor: 'rgba(230, 230, 230, 0)',
        
        
      },
      aboutcolor:{
        color: '#FFFFFF',
        fontSize: 11,
        fontFamily: "OPENSANS-BOLD",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:40,
        paddingRight:40,
        backgroundColor:'#1A498B'
      },
      aboutcolor2:{
        color: '#FFFFFF',
        fontSize: 11,
        fontFamily: "OPENSANS-BOLD",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:40,
        paddingRight:40,
    
        
         },
         paginationStyle:{ position: 'absolute',
         top: -755,
         
         
         
         justifyContent: 'center',
         alignItems: 'center',
        },
        container: {
            flex: 1,
            paddingTop:10,
            paddingRight:10,
            paddingLeft:10,
          },



})



export default HomeWOLaunch;