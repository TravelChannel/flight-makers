import React, { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  const [isTopNavBar, setTopNavBar] = useState(true);
  // const [pnrData, setPnrData] = useState({});
  // const [airSialData, setAirSialData] = useState({});
  const [isLogin, setLogIn] = useState(false);
  const [userCountryCode, setUserCountryCOde] = useState("");
  const [userVerName, setVarName] = useState("");
  const [userName, setUserName] = useState("");
  const [roleID, setRoleID] = useState();
  const [userID, setUserID] = useState(0);
  const [backendFinalOBJ, setBackendFinalOBJ] = useState([]);
  const [isPNRLoading, setPNRLoading] = useState(false);
  const [completeUserData, setCompleteUserData] = useState([]);
  const [serviceCharges, setServiceCharges] = useState();
  const [searcRes, setSearchRes] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [isMobile, setMobile] = useState(false);

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
        showHeader,
        setShowHeader,
        isLogin,
        setLogIn,
        userVerName,
        setVarName,
        userName,
        setUserName,
        userCountryCode,
        setUserCountryCOde,
        isTopNavBar,
        setTopNavBar,
        roleID,
        setRoleID,
        userID,
        setUserID,
        backendFinalOBJ,
        setBackendFinalOBJ,
        isPNRLoading,
        setPNRLoading,
        completeUserData,
        setCompleteUserData,
        serviceCharges,
        setServiceCharges,
        searcRes,
        setSearchRes,
        profileImg,
        setProfileImg,
        isMobile,
        setMobile,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  //console.log(context);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
