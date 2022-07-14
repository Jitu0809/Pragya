import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet, Image, Text } from 'react-native';
import { Header } from 'react-native-elements'
import Constants from 'expo-constants'
import Colors from './Colors';
import { withNavigation } from 'react-navigation';
import * as Font from 'expo-font';
import Loader from './Loader';
class TopHeader extends Component {
    state = { fontsLoaded: false, }

    componentDidMount = async () => {
        await Font.loadAsync({
            'OPENSANS-EXTRABOLD': {
                uri: require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
                display: Font.FontDisplay.FALLBACK,
            },
        });
        this.setState({ fontsLoaded: true });
    }
    render() {
        if (this.state.fontsLoaded) {
            return (
                <View style={styles.container}>
                    {/* <View style={styles.statusBar} /> */}
                    <Header
                        backgroundColor={Colors.headerColor}
                        placement='center'
                        leftComponent={this.props.text !== '' &&
                            <TouchableHighlight underlayColor={Colors.headerColor} onPress={() => this.props.navigation.pop()}>
                                <View style={{ width: 50, height: 50 }}>

                                    <Image source={require('../../assets/arrow.png')} style={{ width: 16, height: 50, marginTop: -15, }} ></Image>
                                </View>
                            </TouchableHighlight>
                        }
                        rightComponent={<Image source={require('../../assets/logo.png')} style={{ width: 85, height: 85, marginBottom: 25 }} resizeMode='contain'></Image>}
                        containerStyle={styles.centerContainerStyle}
                        centerContainerStyle={{ marginBottom: Constants.statusBarHeight }}
                        centerComponent={{ text: this.props.text, style: { color: Colors.greenColor, fontFamily: "OPENSANS-EXTRABOLD", fontSize: 15, marginRight: 20, } }}
                    />
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


    statusBar: {
        height: Constants.statusBarHeight
    },
    centerContainerStyle: {
       paddingTop:30,
        height: 125 - Constants.statusBarHeight,

    }
})

export default withNavigation(TopHeader)