import React, { useEffect, useState } from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactsLaunch from './ContactsLaunch';
import ContactsWOLaunch from './ContactsWOLaunch';


const Contacts = (props) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunchedContacts").then(value => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunchedContacts", "true");
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
      <ContactsLaunch {...props} />
    )
  } else {
    return <ContactsWOLaunch {...props} />
  }
}

export default Contacts
