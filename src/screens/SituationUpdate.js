


import React, { Component } from 'react';
import CommonForm3 from '../screens/CommonForm3';
import { withNavigation } from 'react-navigation';

class SituationUpdate extends Component {


  render() {

    const data = this.props.navigation.getParam('data')
    return (

      <CommonForm3
        api='savernrEmergingconcerns'
        data={data}
        api2='savernrSituationupdate'
        text='Situation Update'
        navigateForm='ReportCategory'
        msg ="Successfully Submitted"
      />

    );
  }
}

export default withNavigation(SituationUpdate)