import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TopHeader from '../views/Header';
import Loader from '../views/Loader';
import { _component, TEXT } from '../views/constants';

export default class POPDetails extends Component {

    state = {
        dialogVisible: false,
        details: null,
        isLoading: false,
    }


    componentDidMount = async () => {
        this.setState({ isLoading: true })
        let res = await _component('showPOPDetail', this.props)
        this.setState({ details: res, isLoading: false })
    }


    renderData = () => {
        return this.state.details.map((detail, i) => {
            return (
                <View style={styles.container} key={i}>
                    <TEXT text={'LOCATION'} Detail={detail.pops_address}  />
                    
                    <TEXT text={'PHONE NUMBER'} Detail={detail.phone_number} Detail2={detail.phone_number2}  />
                    <TEXT text={'EMAIL ID'} Detail={detail.pop_email}  />
                    <TEXT text={'PRIMARY POP CONTACT'} Detail={detail.contact_person}  />
                    <TEXT text={'DISTANCE FROM NEAREST BLOCK HQ'} Detail={detail.distance_from_nearest_block_hq}  />
                    <TEXT text={'DISTANCE FROM NEAREST DISTRICT HQ'} Detail={detail.distance_from_nearest_district_hq}  />
                </View>
            )
        })
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />
        }
        return (
            <View>

                <View style={styles.container}>
                    {this.state.details && this.renderData()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingTop: 10
    },
    textColor: {
        color: "#1A498B"
    }

})