import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import TopHeader from "../views/Header"
const OnBoardingScreen = ({ navigation }) => {
    const Done = ({ ...props }) => (
        <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            {...props}
        >
            <Text style={{ fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
    );
    return (<View style={{ flex: 1 }}>

        <TopHeader text="Tutorial"  />

        <Onboarding
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace("Home")}
            onDone={() => navigation.replace("Home")}
            titleStyles={{
                marginLeft: 0,
                textAlign: "left",

            }}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 94, height: 95, marginTop: 25 }} source={require('../../assets/icon.png')} />,
                    title: 'Landing page',
                    subtitle: <>

                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                            <View style={{ padding: 20, paddingBottom: 0 }}>
                                <Text >On our home page, you will find the Go-risk and RNR-Comm tools, Emergency Contacts, and About Us sections.
                                </Text>


                            </View>

                        </ScrollView>
                    </>,
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 74, height: 65, marginTop: 25 }} source={require('../../assets/risk2.png')} />,
                    title: 'Go-Risk tool',
                    subtitle: <>

                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                            <View style={{ padding: 20, paddingBottom: 0 }}>
                                <Text >Go-Risk is a tool used before the onset of a disaster and for regular monitoring of different hazards.
                                </Text>


                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text>Steps
                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >1.	Select the village – Identify the panchayat and choose from the corresponding list of villages.</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >2.	Select the hazard (e.g. Landslide). The data collected for each hazard will vary (e.g. rainfall data, observation data, etc.)</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >3.	Answer all questions for the required parameters - Formats can include yes / no questions, multiple choice questions, checklist questions, and entering numeric values. For the Landslide hazard, </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >4.	Upload data / photo – If necessary, attach a photo to the go-risk report. Take a new photo or choose a photo from the library.</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >5.	Submit the report.</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >Only one Go-Risk report can be submitted at a time for any village.

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 200 }}>
                                <Text >The DDMSU will be alerted if there is a threshold breach (potential early warning).
                                </Text>

                            </View>
                        </ScrollView>
                    </>,
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 72, height: 78, marginTop: 25 }} source={require('../../assets/rnr5.png')} />,
                    title: 'RNR-COMM tool',
                    subtitle: <>

                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                            <View style={{ padding: 20, paddingBottom: 0 }}>
                                <Text >The RnR-Comm tool includes formats for the post-disaster damage and needs assessment which are filled out only after a disaster event has taken place.
                                </Text>


                            </View>

                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text>Steps
                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >1.	Select the village – Identify the panchayat and choose from the corresponding list of villages.</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >2.	Select the hazard {`(e.g. Flood)`}</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >3.	Select the report type – SOS / Tracking emerging needs.</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >4.	For SOS reports, select the level of emergency (1-5) as per the situation on ground. Levels 3, 4 and 5 all suggest urgency and would alert the DDMSU accordingly. </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >5.	Depending on the level of emergency selected, it would lead you to the Detailed Needs Assessment form where you have to fill in data on

                                </Text>
                                <Text>  -	Scale of emergency</Text>
                                <Text>  -	Specific requirements</Text>
                                <Text>  -	Situation update</Text>
                                <Text>  -	Infrastructure damage</Text>
                                <Text>  -	Available resources. </Text>
                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >The needs assessment report covers a wide range of questions across five different sections.
                                    Scale of emergency is used to understand the number of casualties, injuries, etc.
                                    Specific requirements is used to assess requirements for food, healthcare, etc.
                                    Situation update helps us understand the accessibility of the site and whether there are any fresh incidents.
                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >Infrastructure damage helps us assess the degree of damage to schools, health centres and houses, etc.
                                    Available Resources section helps us determine the urgency of sending food, medicines, and health care workers.

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >6.	Answer all questions. Formats can include multiple choice questions and entering numeric values.

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >7.	Upload data / photo – If necessary, attach a photo to the report. Take a new photo / Choose a photo from the library.

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >8.	If you select Tracking emerging needs reports, it would lead you to a form where you have to fill in data on

                                </Text>
                                <Text>  -	Displaced population</Text>
                                <Text>  -	Emerging concerns</Text>
                                <Text>  -	Situation update</Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >Tracking emergency needs report covers information on the displaced population, emerging concerns such as cases of violence, and information on any disease outbreak etc.

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >9.	Answer all questions. Formats can include multiple choice questions and entering numeric values.

                                </Text>

                            </View>

                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >10.	Submit the report

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >Only one RNR-Comm report can be submitted at a time for any village.

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                <Text >The DDMSU will be alerted if there is any need for relief or rescue assistance.

                                </Text>

                            </View>
                            <View style={{ padding: 20, paddingTop: 15, paddingBottom: 200 }}>
                                <Text >Please answer the questions as accurately as possible to enable targeted relief coordination and minimal wastage of resources.

                                </Text>

                            </View>
                        </ScrollView>
                    </>,
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 65, height: 60, marginTop: 25 }} source={require('../../assets/call3.png')} />,
                    title: 'Emergency Contacts',
                    subtitle:
                        <>

                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                                <View style={{ padding: 20, paddingBottom: 0 }}>
                                    <Text >Here you can access the contact information of the District control room and the nearest POP (Point of Presence), who can help you communicate with others and assist you with relief work.
                                    </Text>


                                </View>

                                <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                    <Text>Press the “Dial” buttons should you wish to call them
                                    </Text>

                                </View>
                                <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                    <Text >You can take note of their address and email ID  for any official correspondence</Text>

                                </View>
                                <View style={{ padding: 20, paddingTop: 15, paddingBottom: 0 }}>
                                    <Text >You can also note the distances from nearest block headquarters and distance from nearest district headquarters.</Text>

                                </View>
                            </ScrollView>
                        </>



                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 0, height: 0,marginTop:25 }} source={require('../../assets/info.png')} />,
                    title: 'About Us / Information Section',
                    subtitle: <>

                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                            <View style={{ padding: 20, paddingBottom: 0 }}>
                                <Text >Over here, you can read about the purpose of the DMS Himalaya App, its features, and the organisations and partners associated with this initiative.
                                </Text>


                            </View>

                        </ScrollView>
                    </>,
                },

            ]}
        />

    </View>
    )
}

export default OnBoardingScreen