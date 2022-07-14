import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import TopHeader from '../views/Header';
import Loader from '../views/Loader';
import {_component,TEXT} from '../views/constants';

export default class ControlDetails extends Component {

    state = {
        dialogVisible: false,
        details: null,
        isLoading: false,
    }


    componentDidMount = async () => {
        this.setState({ isLoading: true })
        let res = await _component('showDDMSUDetail',this.props)
        this.setState({ details: res, isLoading: false })
    }

    renderData = () => {
        return this.state.details.map((detail,i) => {
            return (
                <View style={styles.container} key={i}>                  
                    <TEXT text={'NAME'} Detail={detail.ddmsu_name} />
                    <TEXT text={'LOCATION'} Detail={detail.ddmsu_address}/>
                    <TEXT text={'PHONE NUMBER'} Detail={detail.ddmsu_phone_no} />
                    <TEXT text={'EMAIL ID'} Detail={detail.ddmsu_email} />
                    <TEXT text={'PRIMARY POP CONTACT'} Detail={detail.pops_name} />
                    
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
                <View>
                    {this.state.details && this.renderData()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20
    },
  
})
