import React, { Component } from 'react';
import CommonForm from '../screens/CommonForm';
import { withNavigation } from 'react-navigation';

class Formsecond2 extends Component {


    render() {
      
        const data = this.props.navigation.getParam('data')
        return (

            <CommonForm
                api="savernrscaleofemergency_forest_fire"
                navigateForm='AssignedAreaRNR'
                data={data}
                text='Situation Update locust'
                api2='savernrSituationupdate_locus'
                msg ="Successfully Submitted"
            />

        );
    }
}

export default withNavigation(Formsecond2)