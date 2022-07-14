

import React, { Component } from 'react';
import CommonForm from '../screens/CommonForm';
import { withNavigation } from 'react-navigation';

class Form4 extends Component {

    render() {
       
        const data = this.props.navigation.getParam('data')
        return (

            <CommonForm
                api="savernrSituationupdate"
                navigateForm='Form5'
                data={data}
                text='Infrastructure Damage'
                msg ="Go To Next"
            />

        );
    }
}

export default withNavigation(Form4)