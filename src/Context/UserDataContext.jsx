import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userDetail, setuserDetail] = useState(null);
  const [flightDetails , setFlightDetails] = useState(null);
  const [whtsAppMessage ,setWhatsAppMessage]  = useState({});
  const [gclid, setGclid] = useState('');
  const [gclidID, setGclidID] = useState('');
  const [cityBanner ,setCityBanner] = useState(false);


  // const setUserDataForIndex = (pnrDetail,flightDetails) => {
  //   setuserDetail({ pnrDetail ,flightDetails});
  // };

  return (
    <UserDataContext.Provider value={{ userDetail, setuserDetail,flightDetails,setFlightDetails ,whtsAppMessage ,setWhatsAppMessage,gclid, setGclid,gclidID, setGclidID,cityBanner, setCityBanner}}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('UserDataContext must be used within a UserDataProvider');
  }
  return context;
};



