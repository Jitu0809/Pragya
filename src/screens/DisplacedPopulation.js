import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DisplacedPopulationWOLaunch from "./DisplacedPopulationWOLaunch";

const InputData = (props) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunchedInputDataDP").then(value => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunchedInputDataDP", "true");
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])


  if (isFirstLaunch === null) {
    return null;
  } 
  
  
  else {
   
    return <DisplacedPopulationWOLaunch {...props} />
  }
};

export default InputData;
