import React,{Fragment,useState,useRef, useEffect} from 'react'
import { verifyOTPRes } from '../../API';
import { Navigate ,useNavigate} from 'react-router-dom';

const OTPCode = (props) => {

  const navigate = useNavigate();
  console.log("ellllllllo123",props.getOTPData);

    const [isColorChange, setIsColorChange] = useState("");
    const [isOtpTrue, setIsOtpTrue] = useState('');
    const [Otp, setOtp] = useState([]);
    const [displayContact, setDisplayContact] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const [OTPResend, setOTPResend] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(10);


    const otpInputs = useRef([]);
  const handleOtp = async(index, value) => {
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 1);
    const newOtpValues = [...Otp];
    newOtpValues[index] = sanitizedValue;
    setOtp(newOtpValues);

    if (index < otpInputs.current.length - 1 && sanitizedValue) {
      otpInputs.current[index + 1].focus();
    } else if (index === otpInputs.current.length - 1 && sanitizedValue) {
      const enteredOtp = newOtpValues.join('');
      console.log("enteredOtpenteredOtp",enteredOtp);

      try {
        const verificationResult = await verifyOTPRes(props.getOTPData,enteredOtp);
        
        if (verificationResult.status==='SUCCESS') {
          setIsOtpTrue(true);
          window.location.reload();
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


      // if (enteredOtp === '1111') {
      //   setIsOtpTrue(true);
      //   setDisplayContact(true);
      // } else {
      //   setIsOtpTrue(false);
      // }
    }
  };
  const handleInputClick = (index) => {
    setIsColorChange(index);
  };
  const handleInputFocus = (index) => {
    setIsColorChange(index);
  };
  const HandleGetOTP = () => {
    setCurrentTime(10);
    setIsTimerRunning(true);
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
  }
  return (
   <Fragment>
     <div className="iti_otp_main d-flex justify-content-start">
    {Array.from({ length: 6 }).map((_, index) => (
      <input
        key={index}
        type="text"
        className={`otp_block ${isColorChange === index ? 'blue_border_input' : ''
          }`}
        maxLength={1}
        value={Otp[index] || ''}
        onChange={(e) => handleOtp(index, e.target.value)}
        ref={(input) => (otpInputs.current[index] = input)}
        onClick={() => handleInputClick(index)}
        onFocus={() => handleInputFocus(index)}
      />
    ))}
  </div>
           <div className='otp_message_placeholder'>
                  {showMessage && (
                    <p className="otp_message"> {isOtpTrue ? (<span className="success_message">OTP successfull</span>) : (<span className='failer_message'>Please Enter a Valid OTP</span>)}</p>
                  )
                  }
                </div>
                  <div className="otp_resend_time">
                    Have Not Received OTP ?{' '}
                    {isTimerRunning ? (
                      <span> Resend in {currentTime} sec</span>
                    ) : (
                      <span onClick={HandleGetOTP} className="otp_resend_button">
                        Resend
                      </span>
                      
                    )}
                  </div>
               
   </Fragment>
  )
}

export default OTPCode;