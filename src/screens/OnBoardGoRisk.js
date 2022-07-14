import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import TopHeader from "../views/Header"
const OnBoardGoRisk = ({ navigation }) => {
    const Done = ({ ...props }) => (
        <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            {...props}
        >
            <Text style={{ fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
    );
    return (<View style={{ flex: 1 }}>

        <TopHeader text="Tutorial" />

        <Onboarding
            DoneButtonComponent={Done}
            onSkip={() => navigation.navigate('AssignedArea', {
                id: 1
            })}
            onDone={() => navigation.navigate('AssignedArea', {
                id: 1
            })}
            titleStyles={{
                marginLeft: 0,
                textAlign: "left",

            }}
            pages={[

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

            ]}
        />

    </View>
    )
}

export default OnBoardGoRisk
