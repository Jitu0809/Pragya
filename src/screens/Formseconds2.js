import React, { Component } from 'react';
import CommonForm2 from '../screens/CommonForm2';
import { withNavigation } from 'react-navigation';

class Formseconds2 extends Component {


    render() {
      
        const data = this.props.navigation.getParam('data')
        return (

            <CommonForm2
                api="savernrscaleofemergency_forest_fire"
                navigateForm='AssignedAreaRNR'
                data={data}
                text='Situation Update'
                api2='savernrSituationupdate_locus'
                msg ="Successfully Submitted"
            />

        );
    }
}

export default withNavigation(Formseconds2)