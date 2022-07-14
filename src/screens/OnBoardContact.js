import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import TopHeader from "../views/Header"
const OnBoardContact = ({ navigation }) => {
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
            onSkip={() => navigation.navigate('Contacts')}
            onDone={() => navigation.navigate('Contacts')}
            titleStyles={{
                marginLeft: 0,
                textAlign: "left",

            }}
            pages={[

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
            ]}
        />

    </View>
    )
}

export default OnBoardContact
