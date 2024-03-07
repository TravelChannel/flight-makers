import React,{Fragment,useState,useRef, useEffect} from 'react'
// import { verifyOTPRes } from '../../API';
import { verifyOTPRes } from '../../API/BackendAPI/allAPICalls';
import { Navigate ,useNavigate} from 'react-router-dom';
import { useFormData } from '../../Context/FormDataContext';


const OTPCode = (props) => {

  const {fromSingUp,setIsOpen} = props;
  const {setLogIn} =useFormData();
  console.log("coming from SignUp",fromSingUp);
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

      //    const OtpResponceOBJ = {
      //   "phoneNumber": props.getOTPData.phoneNumber,
      //   "countryCode":props.getOTPData.countryCode,
      //   "otp": enteredOtp
      // }
      // console.log('OtpResponceOBJ',OtpResponceOBJ);
      

      try {
        const verificationResult = await verifyOTPRes(props.getOTPData,enteredOtp);
        console.log('verificationResult',verificationResult);
        
        if (verificationResult.data.status ==='SUCCESS') {
          setIsOtpTrue(true);
          setLogIn(true);
          // setIsOpen(false);
          // alert('Login SuccessFully');
          fromSingUp ? (window.location.href = '/'):(window.location.reload());
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
     <div className={`iti_otp_main ${fromSingUp ?('d-flex justify-content-center'):('d-flex justify-content-start')} `}>
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
                    <p className={`${fromSingUp ?('otp_message text-center'):('otp_message')}`}> {isOtpTrue ? (<span className="success_message">OTP successfull</span>) : (<span className='failer_message'>Please Enter a Valid OTP</span>)}</p>
                  )
                  }
                </div>
                  <div className={`otp_resend_time ${fromSingUp ? ('text-center sign_up_message_color'):('')}`}>
                    Have Not Received OTP ?{' '}
                    {isTimerRunning ? (
                      <span className={`${fromSingUp && 'change_message_color'}`}> Resend in {currentTime} sec</span>
                     
                    ) : (
                      <span onClick={HandleGetOTP} className={`otp_resend_button ${fromSingUp && 'change_message_color'}`}>
                        Resend
                      </span>
                      
                    )}
                  </div>
               
   </Fragment>
  )
}

export default OTPCode;