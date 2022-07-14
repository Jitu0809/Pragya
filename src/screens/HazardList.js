import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HazardListLaunch1 from "./HazardListLaunch1";
import HazardListLaunch2 from "./HazardListLaunch2";
import HazardListWOLaunch from "./HazardListWOLaunch";

const HazardList = (props) => {
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

    return <HazardListLaunch1 {...props} />;
  } else if (
    props.navigation.getParam("id") === 2 &&
    isFirstLaunchRnR === true
  ) {
    console.log("I am HL 2");
    return <HazardListLaunch2 {...props} />;
  } else {
    console.log("I am HLWOL");
    return <HazardListWOLaunch {...props} />;
  }
};

export default HazardList;
