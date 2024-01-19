import React, { Fragment, useEffect,useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import './responsive.css';
import TopNavBar from "./Components/Commom/TopNavBar";
import Header from "./Components/Commom/Header";
import Footer from "./Components/Commom/Footer";
import Routes from './Route';
import { requestFetchAuthToken, requestAirsialToken } from './API/index';
import { useLocation } from "react-router-dom";
import { FormDataProvider, useFormData } from "./Context/FormDataContext";
import { VerificationAPi } from "./API/BackendAPI/Find_me_verification";

// import { useFormData } from "./Context/FormDataContext";
// import { useHistory } from 'react-router-dom'; 

const App = () => {
  // const history = useHistory();
  const { showHeader, setShowHeader } = useFormData();
  const {isLogin , setLogIn} = useFormData();
  const {userVerName , setVarName} = useFormData();
  // ---------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await VerificationAPi();  
        console.log("Verification-API",response);
        if (response.data.status === 'SUCCESS') {
          console.log('User is logged in');
          setLogIn(true);
          const userPhone = response.data.payload.userData.phoneNumber;
          setVarName(userPhone);
          console.log("userPhone-verification",userPhone);
        } else {
          console.log('User is not logged in');
          // history.push('/index'); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };

    fetchData();  // Call fetchData when component mounts

    // Add dependencies if needed, e.g., fetchData() should run whenever some state changes
  }, []); 

  // -----------------------------------------

  useEffect(() => {
    const currentDate = new Date();
    const storedData = JSON.parse(localStorage.getItem("AuthToken"));
    requestAirsialToken();
    if (!storedData) {
      requestFetchAuthToken();
    } else {
      if (storedData.expireAuthTokenDate) {
        const futureDate = new Date(storedData.expireAuthTokenDate);
        if (futureDate < currentDate) {
          requestFetchAuthToken();
        }
      } else {
        requestFetchAuthToken();
      }
    }
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const inputPNR = searchParams.get('inputPNR');

  return (
    <Fragment>
      <div className="backgradiant">
        <div className="container-fluid">
            {!inputPNR &&<TopNavBar />}
            {!inputPNR && showHeader && <Header />}
            <Routes />
            {!inputPNR && <Footer />}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
