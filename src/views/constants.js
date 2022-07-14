import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import React from 'react';
import axios from 'axios';
import { useFonts } from 'expo-font';
import Loader from './Loader';

export const _component = async (detail, props) => {
    return new Promise(async (resolve, rej) => {
        try {
            const response = await _retrieveData()
            if (response[0][1] == 'null') {
                alert("Please login")
                props.navigation.navigate('Login');
                return;
            }
            const sessionId = parseInt(response[0][1])
            const drtId = parseInt(response[1][1])

            let res = await _getDetails(detail, sessionId, drtId);
            if (res.data.code == 203) {
                alert(res.data.msg)
                await _deleteToken()
                props.navigation.navigate('Login')
                return;
            }
            resolve(res.data.data)
        } catch (err) {
            rej(err)
        }
    })
}


_getDetails = async (detail, sessionId, drtId) => {
    return new Promise(async (res, rej) => {
        try {
            const response = await axios.post(`${API}${detail}`, {
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

export const API = 'https://www.pragya.org/RaviTest/drt_services/drtServices.php?action='

export const _setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const _retrieveData = async () => {
    return new Promise(async (res, rej) => {
        try {
            const value = await AsyncStorage.multiGet(['token', 'id', 'password', 'userName']);
            res(value)
        } catch (error) {
            rej(error)
        }
    })
};


export const _deleteToken = async () => {
    return new Promise(async (res, rej) => {
        try {
            const value = await AsyncStorage.setItem('token', JSON.stringify(null));
            res(value)
        } catch (error) {
            rej(error)
        }
    })
}

export const TEXT = (props) => {

    const [loaded] = useFonts({
        "OPENSANS-BOLD": require('../../assets/fonts/OpenSans-Bold.ttf'),
        "OPENSANS-REGULAR": require('../../assets/fonts/OpenSans-Regular.ttf'),
    });

    const openDialScreen = (numberphone) => {
        let number = '';
        if (Platform.OS === 'ios') {

            number = `telprompt:${numberphone}`;

        } else {
            number = `tel:${numberphone}`;
        }
        Linking.openURL(number);
    };

    const openDialScreen2 = (numberphone) => {
        let number = '';
        if (Platform.OS === 'ios') {

            number = `telprompt:${numberphone}`;

        } else {
            number = `tel:${numberphone}`;
        }
        Linking.openURL(number);
    };
    if (!loaded) {
        return (
            <Loader />
        )
    }
    return (
        <View style={styles.innerContainer}>


            <Text style={styles.heading}>{props.text}</Text>

            {props.text === 'PHONE NUMBER' ?
                <View >
                    <TouchableOpacity onPress={() => openDialScreen(props.Detail)}>
                        <Text style={styles.innerheading2}>
                            <Text style={styles.heading2}>CALL {` `}</Text>
                            <Image source={require('../../assets/dialicon.png')} style={styles.info}></Image>  {props.Detail}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => openDialScreen2(props.Detail2)}>
                        <Text style={styles.innerheading2}><Text style={styles.heading2}>CALL {` `}<Image source={require('../../assets/dialicon.png')} style={styles.info}></Image>  </Text>{props.Detail2}</Text>

                    </TouchableOpacity>

                </View>

                :
                <View>

                    <Text style={styles.innerheading}>{props.Detail}</Text>

                    <Text style={styles.innerheading}>{props.Detail2}</Text>
                </View>
            }


        </View >



    )
}



const styles = StyleSheet.create({
    heading: {
        color: '#1A498B',
        fontSize: 16,
        fontFamily: "OPENSANS-BOLD",
        marginBottom: 10
    },
    heading2: {
        color: '#1A498B',
        fontSize: 15,
        fontFamily: "OPENSANS-BOLD"

    },
    innerContainer: {
        paddingTop: 15
    },
    innerheading: {
        fontSize: 15,
        color: '#272727',
        fontFamily: "OPENSANS-REGULAR"
    },
    innerheading2: {
        color: '#272727',
        fontSize: 15,
        marginBottom: 20,
        height:65,
        fontFamily: "OPENSANS-REGULAR"
    },
    info: {
        width: 43,
        height: 43,
        resizeMode: 'stretch',

    }
})
