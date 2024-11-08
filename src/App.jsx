import React, { Fragment, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import "./responsive.css";
import TopNavBar from "./Components/Commom/TopNavBar";
import Header from "./Components/Commom/Header";
import Footer from "./Components/Commom/Footer";
import Routes from "./Route";
import { requestFetchAuthToken, requestAirsialToken } from "./API/index";
import { useLocation } from "react-router-dom";
import { FormDataProvider, useFormData } from "./Context/FormDataContext";
import { VerificationAPi } from "./API/BackendAPI/Find_me_verification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaPage from "./View/MetaPage";
import { MetaPageData } from "./Constant/MetaPageData";
import Cookies from "js-cookie";
import { sendCrashSMS } from "./API/BackendAPI/ArmanSirAPIs/SMSonCrash";
import ArrangeCall from "./Components/Home/ArrangeCall";
import { GetGclidID } from "./API/BackendAPI/ArmanSirAPIs/GetGclidID";
import { useUserData } from "./Context/UserDataContext";

const App = () => {
  const {
    showHeader,
    isLogin,
    setLogIn,
    userVerName,
    setVarName,
    setUserName,
    setUserCountryCOde,
    isTopNavBar,
    setRoleID,
    setUserID,
    setCompleteUserData,
    setProfileImg,
    isMobile,
    setMobile,
  } = useFormData();
  const { setGclid, setGclidID } = useUserData();

  // let urlParams = new URLSearchParams(window.location.search);
  // console.log("urlParams",urlParams);

  const GetQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };
  // ---------------------------------------
  const fetchData = async () => {
    try {
      // const response = await VerificationAPi();
      const response = Cookies.get("Access_token")
        ? await VerificationAPi()
        : false;
      console.log("Verification-API", response);
      if (response.data.status === "SUCCESS") {
        // if(response)
        console.log("User is logged in");
        setLogIn(true);
        const userPhone = response.data.payload.userData.phoneNumber;
        const PersonName = response.data.payload.userData.firstName;

        console.log("personName", PersonName);
        setUserCountryCOde(response.data.payload.userData.countryCode);
        setProfileImg(response.data.payload.userData.imgSrc);
        setRoleID(response.data.payload.userData.roleId);
        setUserID(response.data.payload.userData.id);
        setVarName(userPhone);
        setUserName(PersonName);
        setCompleteUserData(response.data.payload.userData);
        console.log("userPhone-verification", userPhone);
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const gclidApiResp = async (gclidValue) => {
    try {
      const responce = await GetGclidID(gclidValue);
      const GclidID = responce[0].loggID;
      console.log("GclidID", GclidID);
      setGclid(gclidValue);
      setGclidID(GclidID);
    } catch (error) {
      console.error("Eror While Fetching gclid ID", error);
    }
  };

  useEffect(() => {
    const gclidValue = GetQueryParam("gclid");
    console.log("gclidValue-v1", gclidValue);
    if (gclidValue) {
      gclidApiResp(gclidValue);
    }
  }, []);
  // useEffect(() => {
  //   fetchData();
  // }, [userVerName]);

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
  const inputPNR = searchParams.get("inputPNR");

  useEffect(() => {
    const handleSize = () => {
      setMobile(window.innerWidth < 490);
    };
    if (typeof window !== "undefined") {
      setMobile(window.innerWidth < 490);
      window.addEventListener("resize", handleSize);
      return () => {
        window.removeEventListener("resize", handleSize);
      };
    }
  }, []);

  return (
    <Fragment>
      <div className="backgradiant">
        <div className="container-fluid">
          <MetaPage metaPageData={MetaPageData}>
            {!inputPNR && isTopNavBar && <TopNavBar />}
            {!inputPNR && showHeader && <Header />}
            {!isMobile && <ArrangeCall />}
            <Routes />
            {<ToastContainer />}
            {!inputPNR && <Footer />}
          </MetaPage>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
