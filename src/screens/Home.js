import React, { useEffect, useState } from 'react';
import HomeLaunch from './HomeLaunch';
import HomeWOLaunch from './HomeWOLaunch';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = (props) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunchedHome").then(value => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunchedHome", "true");
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {

    return (
      <HomeLaunch {...props} />
    )
  } else {
    return <HomeWOLaunch {...props}  />
  }
}

export default Home
