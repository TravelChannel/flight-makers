import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userDetail, setuserDetail] = useState(null);
  const [flightDetails , setFlightDetails] = useState(null);

  // const setUserDataForIndex = (pnrDetail,flightDetails) => {
  //   setuserDetail({ pnrDetail ,flightDetails});
  // };

  return (
    <UserDataContext.Provider value={{ userDetail, setuserDetail,flightDetails,setFlightDetails }}>
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



