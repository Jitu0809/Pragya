import React, { Component } from 'react';
import CommonForm from '../screens/CommonForm';
import { withNavigation } from 'react-navigation';

class Form1 extends Component {

  render() {
    
    const data = this.props.navigation.getParam('data')
    const nextFormType=this.props.navigation.getParam('nextFormType');
    
    if(nextFormType=="Situation update"){
      return(
        <CommonForm
                api="savernrscaleofemergency"
                navigateForm='Form4'
                data={data}
                text='Situation Update'
                msg ="Go To Next"
            />
      )
    }
    else{
return (

      <CommonForm
        api='savernrscaleofemergency'
        navigateForm='Form3'
        data={data}
        text='Specific Requirements'
        msg="Go to Next"
      />

    );
    }
    
  }
}

export default withNavigation(Form1)