import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import TopHeader from '../views/Header';
import Colors from '../views/Colors';


const data = ['Level 1', 'Level 1', 'Level 2'];

class ObservationSite extends Component {
    renderData() {
        return data.map((m, i) => {
            return (
                <View key={i}>
                    <TouchableHighlight underlayColor='#fff' key={i}  >
                        <View style={styles.listItem}>
                            <Text style={styles.paraText}>{m}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        })
    }

    render() {
        return (
            <View>
                <TopHeader text='OBSERVATION SITE' />
                <View style={styles.container} >
                    <View>
                        {this.renderData()}
                    </View>
                    <View style={styles.innerContainer}>

                    <TouchableHighlight underlayColor="#fff" onPress={()=>this.props.navigation.navigate('SOSLevels')}>
                    <View style={styles.addBox}>
                        <Text style={styles.addText}>ADD</Text>
                    </View>
                    </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: Colors.greyColor,
        borderWidth: 1,
        height: 69,
        borderColor:Colors.whiteColor,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 23,
      
    },
    paraText: {
        fontSize: 17,
        color: Colors.listItemColor
    },
    addBox: {
        width: 160,
        height: 40,
        backgroundColor: Colors.greenColor,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: {
        color: Colors.whiteColor,
        fontWeight: 'bold',
        fontSize: 15
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    innerContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

})
export default ObservationSite;
