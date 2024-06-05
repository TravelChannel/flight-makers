import React, { Fragment, useState, useRef, useEffect } from "react";
// import { verifyOTPRes } from '../../API';
import { verifyOTPRes } from "../../API/BackendAPI/allAPICalls";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormData } from "../../Context/FormDataContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../API/BackendAPI/api_main";
import { sendOTPCode } from "../../API/BackendAPI/allAPICalls";


const OTPCode = (props) => {
  const { fromSingUp, setIsOpen,getOTPData } = props;
  const { setLogIn, setVarName, setUserName} = useFormData();
  console.log("coming from SignUp", fromSingUp);
  const navigate = useNavigate();
  // console.log("ellllllllo123",getOTPData);

  const [isColorChange, setIsColorChange] = useState("");
  const [isOtpTrue, setIsOtpTrue] = useState("");
  const [Otp, setOtp] = useState([]);
  const [displayContact, setDisplayContact] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [OTPResend, setOTPResend] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(30);
  const [isOTP ,setOTP] = useState(false);

  const otpInputs = useRef([]);
  const handleOtp = async (index, value) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 1);
    const newOtpValues = [...Otp];
    newOtpValues[index] = sanitizedValue;
    setOtp(newOtpValues);

    if (index < otpInputs.current.length - 1 && sanitizedValue) {
      otpInputs.current[index + 1].focus();
    } else if (index === otpInputs.current.length - 1 && sanitizedValue) {
      const enteredOtp = newOtpValues.join("");
      console.log("enteredOtpenteredOtp", enteredOtp);

      //    const OtpResponceOBJ = {
      //   "phoneNumber": props.getOTPData.phoneNumber,
      //   "countryCode":props.getOTPData.countryCode,
      //   "otp": enteredOtp
      // }
      // console.log('OtpResponceOBJ',OtpResponceOBJ);

      // ---------------------------
      const setHeader = (userToken = null) => {
        console.log("userToken111", userToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;
        console.log("apiClient222", apiClient);
      };

      // ----------------------------------

      try {
        const verificationResult = await verifyOTPRes(
          props.getOTPData,
          enteredOtp
        );
        console.log("verificationResult", verificationResult);

        if (verificationResult.data.status === "SUCCESS") {
          const AccessToken = verificationResult.data.payload.accessToken;
          console.log("AccessToken", AccessToken);
          document.cookie = `Access_token=${AccessToken}; path=/;`;
          localStorage.setItem("Access_token", AccessToken);
          // setHeader(verificationResult.data.payload.accessToken);
          setIsOtpTrue(true);
          setLogIn(true);
          setVarName(verificationResult.data.payload.userData.phoneNumber);
          setUserName(verificationResult.data.payload.userData.firstName);
          fromSingUp ? (window.location.href = "/") : window.location.reload();
          setIsOpen(false);
          // window.location.reload();
        } else {
          setIsOtpTrue(false);
        }
        // if (enteredOtp==='111111') {
        //   setIsOtpTrue(true);
        //   setDisplayContact(true);
        // } else {
        //   setIsOtpTrue(false);
        // }
      } catch (error) {
        console.error("Error verifying OTP", error);
        // Handle error as needed
      }
    }
  };
  const handleInputClick = (index) => {
    setIsColorChange(index);
  };
  const handleInputFocus = (index) => {
    setIsColorChange(index);
  };
  const HandleGetOTP =async () => {
    setCurrentTime(10);
    setIsTimerRunning(true);
    try{
      const OTPResponce = await sendOTPCode(getOTPData); 
      console.log('OTPResponce',OTPResponce);
      if(OTPResponce.data.status === 'SUCCESS'){
        setOTP(true);
      }else{
        console.log("error while fetching Data")
        // alert('error while fetching Data');
      }
    
    }catch(error){ 
      console.error('errorOTP',error);
      // alert('error while Sending OTP' ,error);
      // alert(`Error while sending OTP: ${error.message}`);
      navigate('/signup');
    }
  };

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setCurrentTime((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (currentTime === 0) {
      setIsTimerRunning(false);
    }
  }, [currentTime]);
  useEffect(() => {
    if (isOtpTrue === true || isOtpTrue === false) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setIsOtpTrue(null);
      }, 1000);
      setOtp([]);
      otpInputs.current[0].focus();
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOtpTrue]);

  const sendOTPHandller = () => {
    setOTPResend(true);
  };

  // -----------------------------

  // ----------------------------
  return (
    <Fragment>
      <div
        className={`iti_otp_main ${
          fromSingUp
            ? "d-flex justify-content-center"
            : "d-flex justify-content-start"
        } `}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            className={`otp_block ${
              isColorChange === index ? "blue_border_input" : ""
            }`}
            maxLength={1}
            value={Otp[index] || ""}
            onChange={(e) => handleOtp(index, e.target.value)}
            ref={(input) => (otpInputs.current[index] = input)}
            onClick={() => handleInputClick(index)}
            onFocus={() => handleInputFocus(index)}
          />
        ))}
      </div>
      <div className="otp_message_placeholder">
        {showMessage && (
          <p
            className={`${
              fromSingUp ? "otp_message text-center" : "otp_message"
            }`}
          >
            {" "}
            {isOtpTrue ? (
              <span className="success_message">OTP successfull</span>
            ) : (
              <span className="failer_message">Please Enter a Valid OTP</span>
            )}
          </p>
        )}
      </div>
      <div
        className={`otp_resend_time ${
          fromSingUp ? "text-center sign_up_message_color" : ""
        }`}
      >
        Have Not Received OTP ?{" "}
        {isTimerRunning ? (
          <span className={`${fromSingUp && "change_message_color"}`}>
            {" "}
            Resend in {currentTime} sec
          </span>
        ) : (
          <span
            onClick={HandleGetOTP}
            className={`otp_resend_button ${
              fromSingUp && "change_message_color"
            }`}
          >
            Resend
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default OTPCode;
