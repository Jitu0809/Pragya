import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TextInput,
    Dimensions,
    Image,
    TouchableHighlight,

    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, _retrieveData } from '../views/constants';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../views/Loader';
import * as Font from 'expo-font';


// Constants terms

const width = Dimensions.get('window').width
const icon = 'md-eye-off'
const icon2 = 'md-eye'

class Login extends Component {

    state = {
        isLoading: false,
        data: {
            userName: '',
            password: '',
            showPassword: false
        },
        fontsLoaded: false,
        firstLaunch: null

    }
    // async loadFonts() {
    //     await Font.loadAsync({
    //         'GEORGIA-BOLD': require('../../assets/fonts/georgia-bold.ttf'),
    //     });
    //     this.setState({ fontsLoaded: true });
    // }
    onSubmit = async () => {

        try {
            const res = await axios.post(`${API}login`, {
                ...this.state
            });

            const token = res.data.data.sessionId.toString()

            if (token) {
                ToastAndroid.showWithGravity(
                    'User loggedin successfully',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
            const id = res.data.data.drt_id.toString()
            const keys = [
                ['token', token],
                ['id', id]
            ];

            await this._storeData(keys)
            this.props.navigation.navigate('Home')
        } catch (err) {
            alert('Invalid username or password')
        }
    }

    componentDidMount = async () => {
      
        await Font.loadAsync({
            'GEORGIA-EXTRABOLD': require('../../assets/fonts/georgia-bold.ttf'),
            'OPENSANS-REGULAR': require('../../assets/fonts/OpenSans-Regular.ttf'),
            'OPENSANS-BOLD': require('../../assets/fonts/OpenSans-Bold.ttf'),
        });
        this.setState({ fontsLoaded: true });
        this.setState({ isLoading: true })
        let res = await _retrieveData();
        if (res[0][1]) {
            this.setState({ isLoading: false })
            this.props.navigation.navigate('Home')
        } else if (res[0][1] == 'null') {
            this.setState({ isLoading: false })
        }
        else {
            this.setState({ isLoading: false })
        }
    }

    // Store id and token to async storage

    _storeData = async (data) => {
        return new Promise(async (res, rej) => {
            try {
                let response = await AsyncStorage.multiSet(data);
                res(response)
            }
            catch (err) {
                rej(err)
            }
        })
    };


    onChangeHandler = (text, name) => {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: text
            }
        }))
    }

    // on tapping view icon 

    iconPressHandler = () => {
        const recentPassword = this.state.showPassword
        this.setState({ showPassword: !recentPassword })
    }
    render() {
        if (this.state.fontsLoaded) {

            if (this.state.isLoading) {
                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#19655F" />
                    </View>
                )
            }

            return (
                <View style={styles.container} >
                    <ImageBackground source={require('../../assets/login.png')} style={{ width: '100%', height: '100%' }}>
                        <View style={styles.headerContainer}>
                            {/* <Text style={styles.heading}>DMS HIMALAYA</Text> */}
                            <Image source={require('../../assets/applogo.png')}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Username'
                                placeholderTextColor="black"
                                name="userName"
                                autoCapitalize='none'
                                value={this.state.data.userName}
                                onChangeText={(text) => this.onChangeHandler(text, "userName")}
                                style={styles.textInput}>
                            </TextInput>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='Password'
                                    placeholderTextColor="black"
                                    secureTextEntry={this.state.showPassword ? false : true}
                                    name="password"
                                    autoCapitalize='none'
                                    value={this.state.data.password}
                                    onChangeText={(text) => this.onChangeHandler(text, "password")}
                                    style={styles.textInputField}>
                                </TextInput>
                                <Icon
                                    style={styles.textIcon}
                                    name={this.state.showPassword ? icon2 : icon}
                                    onPress={this.iconPressHandler} />
                            </View>
                            <TouchableHighlight underlayColor='transparent' onPress={this.onSubmit} >
                                <View style={styles.submitContainer}>
                                    <Text style={styles.submitText}>SUBMIT</Text>
                                </View>
                            </TouchableHighlight>
                            <View style={styles.textContainer}>
                                <Text style={styles.innerText}>An initative of</Text>
                            </View>
                            <View >
                                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                            </View>
                        </View>
                    </ImageBackground>
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
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 95,
        marginTop: 15
    },
    heading: {
        fontFamily: 'GEORGIA-EXTRABOLD',

        // fontWeight: 'bold',
        color: '#fff',
        fontSize: 40,
    },
    inputContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: '#E6E6E6',
        height: 40,
        width: width * 80 / 100,
        fontWeight: 'bold',
        // borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 8,
    },
    textInputField: {
        backgroundColor: '#E6E6E6',
        height: 40,
        width: width * 70 / 100,
        fontWeight: 'bold',
        // borderTopLeftRadius: 5,
        // borderBottomLeftRadius: 5,
        paddingLeft: 10,
        marginBottom: 8,
    },
    textIcon: {
        fontSize: 25,
        height: 40,
        paddingTop: 7,
        backgroundColor: '#E6E6E6',
        width: width * 10 / 100,
        // borderTopRightRadius: 5,
        // borderBottomRightRadius: 5,
        color: 'gray'
    },
    submitContainer: {
        backgroundColor: '#1A498B',

        width: 170,
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 5,
        marginTop: 12,
        marginBottom: width - 320
    },
    submitText: {
        color: '#fff',
        fontFamily: "OPENSANS-BOLD",
        fontSize: 15,
        padding: 10
    },
    textContainer: {
        paddingTop: 20,
    },
    innerText: {
        fontSize: 15,
        color: '#272727',
        fontFamily: "OPENSANS-REGULAR"
    },
    logo: {
        width: 148,
        height: 50
    },

})

export default Login;