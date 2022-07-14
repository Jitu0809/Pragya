import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AssignedAreaLaunch1 from "./AssignedAreaLaunch1";
import AssignedAreaLaunch2 from "./AssignedAreaLaunch2";
import AssignedAreaWOLaunch from "./AssignedAreaWOLaunch";

const AssignedArea = (props) => {
    const [isFirstLaunchGoRisk, setIsFirstLaunchGoRisk] = useState(null);
    const [isFirstLaunchRnR, setIsFirstLaunchRnR] = useState(null);

    useEffect(() => {

        if (props.navigation.getParam("id") == 1) {

            AsyncStorage.getItem("alreadyLaunchedAssignedAreaGoRisk").then((value) => {
                if (value === null) {
                    AsyncStorage.setItem("alreadyLaunchedAssignedAreaGoRisk", "true");
                    setIsFirstLaunchGoRisk(true);
                } else {
                    setIsFirstLaunchGoRisk(false);
                }
            });
        } else {
            AsyncStorage.getItem("alreadyLaunchedAssignedAreaRnR").then((value) => {
                if (value === null) {
                    AsyncStorage.setItem("alreadyLaunchedAssignedAreaRnR", "true");
                    setIsFirstLaunchRnR(true);
                } else {
                    setIsFirstLaunchRnR(false);
                }
            });
        }
    }, []);

    if (isFirstLaunchGoRisk === null && isFirstLaunchRnR === null) {
        return null;
    } else if (props.navigation.getParam("id") == 1 && isFirstLaunchGoRisk === true) {

        return <AssignedAreaLaunch1 {...props} />;

    } else if (props.navigation.getParam("id") == 2 && isFirstLaunchRnR === true) {
        return <AssignedAreaLaunch2 {...props} />;

    }
    else {
        return <AssignedAreaWOLaunch {...props} />;
    }
};

export default AssignedArea;
