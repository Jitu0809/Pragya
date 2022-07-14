import React, { Component } from 'react';
import CommonForm from '../screens/CommonForm';
import { withNavigation } from 'react-navigation';

class EmergingConcerns extends Component {

  render() {

    const data = this.props.navigation.getParam('data')
    return (

      <CommonForm
        api='savernrDisplacedpopulation'
        navigateForm='SituationUpdate'
        msg1="data not found"
        data={data}
        text='Emerging Concerns'
        msg ="Go To Next"
      />

    );
  }
}

export default withNavigation(EmergingConcerns)