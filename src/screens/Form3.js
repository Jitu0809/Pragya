import React, { Component } from 'react';
import CommonForm from '../screens/CommonForm';
import { withNavigation } from 'react-navigation';

class Form3 extends Component {


    render() {
      
        const data = this.props.navigation.getParam('data')
        return (

            <CommonForm
                api="savernrSpecificrequirements"
                navigateForm='Form4'
                data={data}
                text='Situation Update'
                msg ="Go To Next"
            />

        );
    }
}

export default withNavigation(Form3)