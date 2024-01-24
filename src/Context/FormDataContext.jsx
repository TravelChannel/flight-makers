import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  // const [pnrData, setPnrData] = useState({});
  // const [airSialData, setAirSialData] = useState({});
  const [isLogin , setLogIn] = useState(false);
  const [userVerName , setVarName] = useState('');
  const [userName , setUserName] = useState('');

  return (
    <FormDataContext.Provider value={{ formData, setFormData,showHeader, setShowHeader,isLogin,setLogIn,userVerName, setVarName,userName,setUserName}}>
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