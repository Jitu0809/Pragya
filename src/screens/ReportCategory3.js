import React, { useEffect, useState } from "react";
import ReportCategoryLaunch2 from "./ReportCategoryLaunch2";
import ReportCategoryWOLaunch3 from "./ReportCategoryWoLaunch3";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportCategory3 = (props) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunchedReportCategory").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunchedReportCategory", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }
   else if (isFirstLaunch === true) {
    console.log("I am RC ");

    return <ReportCategoryLaunch2 {...props} />;
  } 
  else {
    console.log("I am RC WO");
    return <ReportCategoryWOLaunch3 {...props} />;
  }
};

export default ReportCategory3;
