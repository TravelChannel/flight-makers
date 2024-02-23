import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  const [isTopNavBar ,setTopNavBar]  = useState(true);
  // const [pnrData, setPnrData] = useState({});
  // const [airSialData, setAirSialData] = useState({});
  const [isLogin , setLogIn] = useState(false);
  const [userCountryCode , setUserCountryCOde] = useState('');
  const [userVerName , setVarName] = useState('');
  const [userName , setUserName] = useState('');
  const [roleID , setRoleID] = useState();



  return (
    <FormDataContext.Provider value={{ 
      formData, setFormData,
      showHeader,setShowHeader,
        isLogin,setLogIn,
       userVerName, setVarName,
       userName,setUserName,
       userCountryCode , setUserCountryCOde,
       isTopNavBar ,setTopNavBar,
       roleID , setRoleID,
       }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};