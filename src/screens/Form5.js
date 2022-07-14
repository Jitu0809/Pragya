import React, { Component } from 'react';
import CommonForm3 from '../screens/CommonForm3';
import { withNavigation } from 'react-navigation';

class Form5 extends Component {

    render() {
        
        
        const data = this.props.navigation.getParam('data')
        return (

            <CommonForm3
                api="savernrInfrastructuredamage"
                
                navigateForm='AssignedAreaRNR'
                data={data}
                text='Available Resources'
                api2='savernrAvailableresources'
                // api3='level_sos_3'
                //   api3='level_sos_1'
                msg ="Successfully Submitted"
            />

        );
    }
}

export default withNavigation(Form5)

