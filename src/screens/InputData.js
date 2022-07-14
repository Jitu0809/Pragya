import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputLaunchLaunch from "./InputLaunchLaunch";
import InputDataWOLaunch from "./InputDataWOLaunch";

const InputData = (props) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunchedInputData").then(value => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunchedInputData", "true");
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])


  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
console.log("I AM INSIDE INPUT LAUNCH")
return (
  <InputLaunchLaunch {...props} />
  )
} else {
    console.log("I AM INSIDE INPUT WO LAUNCH")
    return <InputDataWOLaunch {...props} />
  }
};

export default InputData;
