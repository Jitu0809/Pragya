import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HazardListLaunch1RNR1 from "./HazardListLaunch1RNR1";
import HazardListLaunch2RNR2 from "./HazardListLaunch2RNR2";
import HazardListWOLaunchRNR from "./HazardListWOLaunchRNR";

const HazardListRNR = (props) => {
  const [isFirstLaunchGoRisk, setIsFirstLaunchGoRisk] = useState(null);
  const [isFirstLaunchRnR, setIsFirstLaunchRnR] = useState(null);

  useEffect(() => {
    if (props.navigation.getParam("id") === 1) {
      AsyncStorage.getItem("alreadyLaunchedHLGoRisk").then((value) => {
        if (value === null) {
          AsyncStorage.setItem("alreadyLaunchedHLGoRisk", "true");
          setIsFirstLaunchGoRisk(true);
        } else {
          setIsFirstLaunchGoRisk(false);
        }
      });
    } else {
      AsyncStorage.getItem("alreadyLaunchedHLRnR").then((value) => {
        if (value === null) {
          AsyncStorage.setItem("alreadyLaunchedHLRnR", "true");
          setIsFirstLaunchRnR(true);
        } else {
          setIsFirstLaunchRnR(false);
        }
      });
    }
  }, []);

  if (isFirstLaunchGoRisk === null && isFirstLaunchRnR === null) {
    return null;
  } else if (
    props.navigation.getParam("id") === 1 &&
    isFirstLaunchGoRisk === true
  ) {
    console.log("I am HL 1");

    return <HazardListLaunch1RNR1 {...props} />;
  } else if (
    props.navigation.getParam("id") === 2 &&
    isFirstLaunchRnR === true
  ) {
    console.log("I am HL 2");
    return <HazardListLaunch2RNR2 {...props} />;
  } else {
    console.log("I am HLWOL");
    return <HazardListWOLaunchRNR {...props} />;
  }
};

export default HazardListRNR;
