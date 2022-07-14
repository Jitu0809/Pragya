import React, { useEffect, useState } from "react";
import ReportCategoryLaunch2 from "./ReportCategoryLaunch2";
import ReportCategoryWOLaunch2 from "./ReportCategoryWOLaunch2";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportCategory2 = (props) => {
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
    return <ReportCategoryWOLaunch2 {...props} />;
  }
};

export default ReportCategory2;
