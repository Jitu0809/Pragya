import React, { useEffect, useState } from "react";
import ReportCategoryLaunch from "./ReportCategoryLaunch";
import ReportCategoryWOLaunch from "./ReportCategoryWOLaunch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportCategory = (props) => {
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

    return <ReportCategoryLaunch {...props} />;
  } 
  else {
    console.log("I am RC WO");
    return <ReportCategoryWOLaunch {...props} />;
  }
};

export default ReportCategory;
