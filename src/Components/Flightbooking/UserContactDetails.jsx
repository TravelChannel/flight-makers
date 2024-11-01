import { React, useState, Fragment, useRef, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AllCountrySelection from './Comman/AllCountrySelection';
import { Alert, InputAdornment } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Popover from '@mui/material/Popover';
import * as images from '../../Constant/images';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import AutoTabDate from './Comman/AutoTabDate';
import { useFormData } from '../../Context/FormDataContext';
// import { sendOTPCode } from '../../API/index';
import { sendOTPCode } from '../../API/BackendAPI/allAPICalls';
// import { verifyOTPRes } from '../../API/index';
import { verifyOTPRes } from '../../API/BackendAPI/allAPICalls';
import { GetServiceCharges } from '../../API/BackendAPI/CommissionAPI/GetServiceCharges';
import { CustomerDetailLead } from '../../API/BackendAPI/LeadCreationAPI/CustomerDetailLead';
import { useUserData } from '../../Context/UserDataContext';

const UserContactDetails = (props) => {
  const {isLogin , setLogIn ,userVerName,completeUserData
     ,setVarName,userName,setUserName,setRoleID,setServiceCharges,setProfileImg} = useFormData();

  const {whtsAppMessage} = useUserData();
  
  // console.log('completeUserData',completeUserData);
//  console.log("shortFlightDetailfor-lead",shortFlightDetail)
  const [phoneNumber, setPhoneNumber] = useState(isLogin ? userVerName:'');
  const [countryCode, setCountryCode] = useState('');
  const [userOTP , setUserOtp] = useState('');

  const [Otp, setOtp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isColorChange, setIsColorChange] = useState("");
  const [isOtpTrue, setIsOtpTrue] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const [displayContact, setDisplayContact] = useState(false);
  const [storeEmail, setStoreEmail] = useState('');
  const [OTPResend, setOTPResend] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lNameDialog, setlNameDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [MajorData, setMajorData] = useState([]);
 

  // const [formData, setFormData] = useState([]);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [isSmallScreen, setSmallScreen] = useState(window.innerWidth < 462);

  const [isPNR ,setPNR] =useState('');

  const { formData, setFormData, setBackendFinalOBJ } = useFormData();
  const [dynamicObject, setDynamicObject] = useState({
    phoneNumber: phoneNumber,
    pnr: isPNR,
    pnrBookings: [],

  });

  // console.log("formData123",formData);
// ---------------------------
  // const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
  // console.log("countryCode",countryCode);
  // console.log("phoneNumber",phoneNumber);

  // console.log("userEnteredOTP",Otp);

  //----------------------?\

  const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
  // console.log("flightDetails12345",flightDetails);
  const { adults, children, infants } = flightDetails;

  const passengerDetails = adults + children + infants;

  const depart = flightDetails.groupDescription[0]?.departureLocation;
  const arrival = flightDetails.groupDescription[0]?.arrivalLocation;
  const departDate = flightDetails.groupDescription[0]?.departureDate;
  const returnDate = flightDetails.groupDescription[1]?.departureDate || '01-01-1900';
  const tripType = flightDetails.groupDescription[1] ? 2 : 1;

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const updatedData = [...prevFormData];  
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      return updatedData;
    });
  }

  // -----------------
 // Update dynamicObject when phoneNumber changes
  useEffect(() => {
    setDynamicObject((prevDynamicObject) => ({
      ...prevDynamicObject,
      phoneNumber: phoneNumber,
    }));
  }, [phoneNumber]);


  // useEffect(() => {
  //   setDynamicObject((prevDynamicObject) => ({
  //     ...prevDynamicObject,
  //     pnr: isPNR,
  //   }));
  // }, [isPNR]);
  // -----------------

  // const handlePhoneNumberChange = (value,country) => {
  //   const numericPhoneNumber = '';
  //   setPhoneNumber(numericPhoneNumber);
  //   setCountryCode(country.dialCode);
  // };
// ------------------------------------------------
const handlePhoneNumberChange = (value, country) => {
  const dialCode = '92';

  // Check if userVerName is present
  if (userVerName && isLogin) {
    setCountryCode(dialCode); // Set country code to 92
    setPhoneNumber(userVerName);// Set phone number to userVerName
    setUserName(userName) //set userName 
  } else {
    // If userVerName is not present, handle the value as before
    if (value !== `+${dialCode} ${phoneNumber}`) {
      if (value.includes(dialCode)) {
        const numericPhoneNumber = value.replace(dialCode, '').replace(/\D/g, '');
        setPhoneNumber(numericPhoneNumber);
      } else {
        setPhoneNumber(value.replace(/\D/g, ''));
      }
      setCountryCode(dialCode); // Set country code to 92
    }
  }
};

  const getOTPData = {
    'countryCode':countryCode,
    'phoneNumber':phoneNumber
  }

  // console.log("getOTPData",getOTPData);
  // --------------------
  // const verifiedOTPData = {
  //   'coutryCode':countryCode,
  //   'phoneNumber':phoneNumber,
  //   'OTP':userOTP
  // }
// console.log("verifiedOTPDataOBj",verifiedOTPData);
// --------------------

  
  
// -----------------------------------------
  const { stateA, stateB } = props;

  const navigate = useNavigate();
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
      // setUserOtp(enteredOtp);
      // console.log("enteredOtpenteredOtp",enteredOtp);
      // const OtpResponceOBJ = {
      //   "phoneNumber": getOTPData.phoneNumber,
      //   "countryCode":getOTPData.countryCode,
      //   "otp": enteredOtp
      // }
      try {
        const verificationResult = await verifyOTPRes(getOTPData,enteredOtp);
        if (verificationResult.data.status ==='SUCCESS') {
          const AccessToken  = verificationResult.data.payload.accessToken;
          // console.log("AccessToken",AccessToken);
          document.cookie = `Access_token=${AccessToken}; path=/;`;
          // localStorage.setItem("Access_token", AccessToken);
          setIsOtpTrue(true);
          setDisplayContact(true);
          setLogIn(true);
          setRoleID(verificationResult.data.payload.userData.roleId);
          setProfileImg(verificationResult.data.payload.userData.imgSrc);
          setVarName(verificationResult.data.payload.userData.phoneNumber);
          // window.location.reload();
         
          // setUserName(verificationResult.data.payload.userData.firstName);
        } else {
          setIsOtpTrue(false);
        }

      } catch (error) {
        console.error("Error verifying OTP", error);
        // Handle error as needed
      }
      
      // if (enteredOtp === '111111') {
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
  const handleEmail = (event) => {
    setStoreEmail(event.target.value);
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

  // useEffect(() => {
  //   if (isOtpTrue === true || isOtpTrue === false) {
  //     setShowMessage(true);
  //     const timer = setTimeout(() => {
  //       setShowMessage(false);
  //       setIsOtpTrue(null);
  //     }, 1000);
  //     setOtp([]);
  //     otpInputs.current[0].focus();
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [isOtpTrue]);


// ...
useEffect(() => {
  const numberOfInputs = otpInputs.current.length;

  if (isOtpTrue === true || isOtpTrue === false) {
    setShowMessage(true);
    const timer = setTimeout(() => {
      setShowMessage(false);
      setIsOtpTrue(null);
    }, 3000);

    // Make sure otpInputs.current[0] is not null before accessing focus
    if (numberOfInputs > 0 && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }

    return () => {
      clearTimeout(timer);
    };
  }
}, [isOtpTrue]);

  useEffect(() => {
    const handleSideBar = () => {
      // setIsMobile(window.innerWidth < 769);
      setSmallScreen(window.innerWidth < 462);
    };
    window.addEventListener('resize', handleSideBar);
    return () => {
      window.removeEventListener("resize", handleSideBar);
    }
  }, []);


  const sendOTPHandller = async() => {
      const OTPResponce = await sendOTPCode(getOTPData); 
        if(OTPResponce?.data?.status === 'SUCCESS'){
          console.log('OTPResponce',OTPResponce);
          setOTPResend(true);
        }else{
          console.log("Error While Sending OTP")
          // alert("Error While Sending OTP ,Please Try Again");
        }
  }
  // const handleChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleOpenDialog = (event) => {
    setDialogOpen(!isDialogOpen);
    setAnchorEl(event.currentTarget);
  }
  const handlelNameDialog = (event) => {
    setAnchorEl(event.currentTarget);
    setlNameDialog(!lNameDialog);
  }
  const HandleCloseDialog = () => {
    setDialogOpen(false);
    setlNameDialog(false);
  }

  // ------------------------------------------------
  const travelFormValid = () => {
    for (let i = 0; i < passengerDetails; i++) {
      const formDataItem = formData[i];
      const fname = formDataItem && formDataItem[`fname${i}`];
      const lname = formDataItem && formDataItem[`lname${i}`];
      const gender = formDataItem && formDataItem[`gender${i}`];
      const countery = formDataItem && formDataItem[`countery${i}`];
      const passport = formDataItem && formDataItem[`passport${i}`];
      const dob = formDataItem && formDataItem[`DateOfBirth${i}`];
      const expiredate = formDataItem && formDataItem[`PassportExpiryDate${i}`];

      if (!fname || !lname || !gender || !countery || !passport || expiredate === "DD-MM-YYYY" || dob === "DD-MM-YYYY") {
        return false;
      }
    }
    return true;
  };

  // ----------------------------------------------------
  const generateBookingObject = () => {
    const pnrBookingsArray = [];

    for (let i = 0; i < formData.length; i++) {
      const formDataItem = formData[i];
      
      const bookingItem = {
        phoneNumber: dynamicObject.phoneNumber,
        userEmail: storeEmail,
        dateOfBirth: formDataItem[`DateOfBirth${i}`],
        passportExpiryDate: formDataItem[`PassportExpiryDate${i}`],
        firstName: formDataItem[`fname${i}`],
        lastName: formDataItem[`lname${i}`],
        gender: formDataItem[`gender${i}`],
        cnic: formDataItem[`cnic${i}`],
        passportNo: formDataItem[`passport${i}`],
        // ispnr: pnr,
      };

      pnrBookingsArray.push(bookingItem);
    }


    // const airline = matchedAirline.id;

    const leadCreationData = {
        depart: depart,
        arrival: arrival,
        departDate: departDate,
        returnDate: returnDate,
        airline:MajorData.OperatingAirline[0],
        classType:MajorData.ClassType,
        adult:adults,
        child:children,
        infants:infants,
        phoneNumber: dynamicObject.phoneNumber,
        useDetail:pnrBookingsArray[0],
        tripType:tripType
    };
    console.log("leadFlightDetail123",leadCreationData);


    const finalObject = {
      countryCode:92,
      phoneNumber: dynamicObject.phoneNumber,
      // pnr,
      pnrBookings: pnrBookingsArray,
      flightDetails:flightDetails,
      MajorInfo:MajorData,
      leadCreationData:leadCreationData
    };

    console.log("Final Object:", finalObject);

    return finalObject;
  };

  const modifiedFormData = formData.map(item => {
    const modifiedItem = {};
    for (const key in item) {
      const newKey = key.replace(/\d/g, ''); // Remove digits from the key
      modifiedItem[newKey] = item[key];
    }
    return modifiedItem;
  });

  const handleNavigation =async() => {
    try{
      setLoading(true);
      const finalObject= generateBookingObject(); 
      setBackendFinalOBJ(finalObject);
      const PassLeadCreation = {
        leadData: finalObject.leadCreationData,
        userData: finalObject.pnrBookings
      };
      localStorage.setItem('userDetails', JSON.stringify(finalObject.pnrBookings[0]));
      console.log("PassLeadCreation",PassLeadCreation);
      const LeadCreationResp = await CustomerDetailLead(PassLeadCreation);
      console.log('LeadCreationResp',LeadCreationResp);
      setLoading(false);
      window.scrollTo(0, 0);
      navigate('/bookingpayment');  
     
    }catch(error){
      console.error("error While Creating FinalOBJ",error);
    }
    
  }
  // -----------------------------
//   useEffect(() => {
//     const newArrivalLocations = flightDetails.groupDescription.map(item => item.arrivalLocation);
//     const OperatingAirlines = flightDetails.schedualDetGet.flatMap(item => item.map(itm => itm.carrier.operating));
//     const CommissionData = {
//         'Destinations': newArrivalLocations,
//         'OperatingAirline': OperatingAirlines,
//         'ClassType': flightDetails.classtype
//     };
//     console.log("CommissionData", CommissionData);
//     setMajorData(CommissionData);
// }, []);

useEffect(() => {
  const newArrivalLocations = flightDetails.groupDescription.map(item => item.arrivalLocation);
  const OperatingAirlines = flightDetails.schedualDetGet.flatMap(item => item.map(itm => itm.carrier.operating));
  const CommissionData = {
      'Destinations': newArrivalLocations,
      'OperatingAirline': OperatingAirlines,
      'ClassType': flightDetails.classtype
  };


  console.log("CommissionData", CommissionData);
  setMajorData(CommissionData);

  const getServiceCharges = async() =>{
    try{
      const responce = await GetServiceCharges(CommissionData);
      // console.log("ServiceChargesData from Backend", responce);
      setServiceCharges(responce.data.payload);

    }catch(error){
      console.error("Error at fetching Commission",error);
    }
  }
  getServiceCharges();
}, []);




  // ---------------------------------

  return (
 
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {stateA ? ('') : (
            <Fragment>
              <div className="contact_details_main">
                <div className="d-flex justify-content_start">
                  <div className="iti_numbering d-flex align-self-center">
                    <p>2</p>
                  </div>
                  <div className="">
                    <h5 className="iti_heading_size">Add Traveller Details</h5>
                    <p className="iti_sub_heading">
                      E-Ticket details will be emailed and sent via SMS
                    </p>
                  </div>
                </div>
                 <div>
                  <div className="user_contact_info">
                    <p className="iti_mob_title">Phone Number<span className='text-danger'>*</span></p>
                  </div>
                  <div className="d-flex justify-content-start wrap  flex-wrap">
                  <div className="ph_input_filed">
                    <PhoneInput
                      country={'pk'}
                      // value={userVerName ? `+92 ${userVerName}` : `+${countryCode} ${phoneNumber}`}
                      value={userVerName ? `+92 ${userVerName}` : ''}
                      onChange={(value) => handlePhoneNumberChange(value)}
                      placeholder="92 3XXXXXXXXX"
                      onlyCountries={['pk']}
                      disabled={userVerName && isLogin ? true : false}
                    />
                  </div>
                  
                    {
                      isLogin ?(''):(
                        <div>
                      <button type="button" onClick={sendOTPHandller} className="btn btn-primary iti_otp_button">
                        Get OTP
                      </button>
                    
                    </div>
                      )
                    }
                  </div>
                  {
                    isLogin ?(''):(
                   <div>
                    <div className="user_contact_info">
                      <p className="iti_mob_title">OTP (Authentication Code)</p>
                    </div>
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
                   </div>
                    )
                  }
                 </div>
                <div className='otp_message_placeholder'>
                  {showMessage && (
                    <p className="otp_message"> {isOtpTrue ? (<span className="success_message">OTP successfull</span>):(<span className='failer_message'>Please Enter a Valid OTP</span>)}</p>
                  )
                  }
                </div>
                {OTPResend ? (
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
                ) : (
                  <div></div>
                )}
                <div className="user_contact_info">
                  <p className="iti_mob_title">Email (Optional)</p>
                  <div className="iti_email_field">
                    <input
                      type="email"
                      value={storeEmail}
                      onChange={(e) => handleEmail(e)}
                      placeholder='Enter your Email Address' className='mail_input_field' />
                  </div>
                </div>
              </div>
              <div>
                {isLogin && (
                  <div className="traveler_detail_main">
                    <div className="trav_data_main">
                      <h5 className="trav_heading"> Traveller Details</h5>
                      <div className="td_adults_details">

                        {Array.from({ length: passengerDetails }).map((_, index) => (
                          <div key={index} className="each_passanger_record">
                            <div className="adults_flight_info">
                              <h3 className="underline_text">
                                {index < adults ? `Adult` : index < adults + children ? `Child` : `Infant`}
                              </h3>
                            </div>
                            <div className="adults_input_fields  ">
                              <div className='important_note'>
                                <span className='adult_pre_icon align-self-center '><TipsAndUpdatesIcon /></span>
                                {isSmallScreen ? (<span className="adult_precautions  align-self-center">  Important : <br /></span>) : (<span className="adult_precautions  align-self-center">  Important :</span>)}
                                <span className={`precaution_data ${isSmallScreen ? 'mob_announce_heading' : ''}`}> Enter your name as it mentioned on your passport </span>
                              </div>
                              <div className='row p-0 m-0'>
                                <div className='col-md-4 mb-3'>
                                <TextField
                                        id="outlined-fname-input"
                                        label="First / Given Name"
                                        type="text"
                                        className="fname_textfield"
                                        size="small"
                                        name={`fname${index}`}
                                        onKeyPress={(e) => {
                                            const charCode = e.charCode;
                                            if (!/^[A-Za-z\s]+$/.test(String.fromCharCode(charCode))) {
                                              e.preventDefault();
                                            }
                                          }}
                                        onChange={(e) => handleInputChange(e, index)}
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment>
                                              <ErrorOutlineIcon className="fname_detailed_icon" onClick={handleOpenDialog} />
                                            </InputAdornment>
                                          )
                                        }}
                                      />
                                  <Popover
                                    open={isDialogOpen}
                                    onClose={HandleCloseDialog}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                  >
                                    <iconButton onClick={HandleCloseDialog} className="dialog_header d-flex justify-content-between" >
                                      <span className="dialog_fname_headind align-self-center"> Your Given Name</span> <div className="Dialog_close_icon align-self-center"><CloseIcon /></div>
                                    </iconButton>
                                    <DialogContent>
                                      <img src={images.passport_Fname} alt="" width="350px" />
                                    </DialogContent>
                                  </Popover>
                                </div>
                                <div className='col-md-4 mb-3'>
                                  <TextField
                                    id="outlined-fname-input"
                                    label="Last / Sur Name"
                                    name={`lname${index}`}
                                    type="text"
                                    className='fname_textfield'
                                    size="small"
                                    onKeyPress={(e) => {
                                        const charCode = e.charCode;
                                        if (!/^[A-Za-z\s]+$/.test(String.fromCharCode(charCode))) {
                                          e.preventDefault();
                                        }
                                      }}
                                    onChange={(e) => handleInputChange(e, index)}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment>
                                          <ErrorOutlineIcon className="fname_detailed_icon" onClick={handlelNameDialog} />
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                  <Popover
                                    open={lNameDialog}
                                    onClose={HandleCloseDialog}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                  >
                                    <iconButton onClick={HandleCloseDialog} className="dialog_header d-flex justify-content-between" >
                                      <span className="dialog_fname_headind align-self-center"> Your SurName</span> <div className="Dialog_close_icon align-self-center"><CloseIcon /></div>
                                    </iconButton>
                                    <DialogContent >
                                      <img src={images.passport_Lname} alt="" width="350px" />
                                    </DialogContent>
                                  </Popover>
                                </div>
                                <div className='col-md-4 mb-3'>
                                  <FormControl className="fname_textfield" size="small">
                                    <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={
                                        formData[index] && formData[index][`gender${index}`]
                                          ? formData[index][`gender${index}`]
                                          : ''
                                      }
                                      label="Gender"
                                      name={`gender${index}`}
                                      onChange={(e) => handleInputChange(e, index)}
                                    >
                                      <MenuItem value={'Male'}>Male</MenuItem>
                                      <MenuItem value={'Female'}>Female</MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className='col-md-4 mb-3'>
                                  <div className="fname_textfield" >
                                    <p className="dob_heading">Nationality</p>
                                    <AllCountrySelection name={`countery${index}`}
                                      onChange={(e) => handleInputChange(e, index)} />
                                  </div>
                                </div>
                                {index < adults && flightDetails?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF" ?
                                  <div className='col-md-4 mb-3'>
                                    <div className="passanger_gender_input">
                                      <p className="dob_heading">CNIC No:</p>
                                      <TextField name={`cnic${index}`}

                                          id="outlined-basic" 
                                          placeholder="CNIC No"
                                          variant="outlined" 
                                          size="small" 
                                          onKeyPress={(e) => {
                                          const charCode = e.charCode;
                                          const inputValue = e.target.value;
                                          const isAlphanumeric = /^[A-Za-z0-9]$/.test(String.fromCharCode(charCode));
                                          if (!isAlphanumeric || inputValue.length >= 13) {
                                            e.preventDefault(); 
                                          }
                                        }}
                                        onChange={(e) => {
                                          const inputValue = e.target.value;
                                          if (inputValue.length > 13) {
                                            e.target.value = inputValue.slice(0, 13);
                                          }
                                          handleInputChange(e, index);
                                        }}
                                          />
                                    </div>
                                  </div>
                                  :
                                  null
                                }
                                <div className='col-md-4 mb-3'>
                                <div className="fname_textfield">
                                      <p className="dob_heading">Passport No:</p>
                                      <TextField
                                        name={`passport${index}`}
                                        id="outlined-basic"
                                        placeholder="Passport No"
                                        className='fname_textfield'
                                        variant="outlined"
                                        size="small"
                                        onKeyPress={(e) => {
                                          const charCode = e.charCode;
                                          const inputValue = e.target.value;
                                          const isAlphanumeric = /^[A-Za-z0-9]$/.test(String.fromCharCode(charCode));
                                          if (!isAlphanumeric || inputValue.length >= 9) {
                                            e.preventDefault(); 
                                          }
                                        }}
                                        onChange={(e) => {
                                          const inputValue = e.target.value;
                                          if (inputValue.length > 9) {
                                            e.target.value = inputValue.slice(0, 9);
                                          }
                                          handleInputChange(e, index);
                                        }}
                                      />
                                    </div>

                                </div>
                                {/* {index < adults + children ?
                                  <div className='col-md-4 mb-3'>
                                    <p className="dob_heading">Wheel Chair:</p>
                                    <FormControl className="fname_textfield" size="small">
                                      <Select
                                        // labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={
                                          formData[index] && formData[index][`wheelChair${index}`]
                                            ? formData[index][`wheelChair${index}`]
                                            : 'N'
                                        }
                                        label="WheelChair"
                                        name={`wheelChair${index}`}
                                        onChange={(e) => handleInputChange(e, index)}
                                      >
                                        <MenuItem value={'Y'}>Yes</MenuItem>
                                        <MenuItem selected value={'N'}>No</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  :
                                  null
                                } */}
                                <div className="col-md-6 col-lg-4 mb-3"><AutoTabDate traveller={index < adults ? `Adult` : index < adults + children ? `Child` : `Infant`} label="Date Of Birth" value={index} handleInputChange={handleInputChange} /></div>
                                <div className="col-md-6 col-lg-4 mb-3"><AutoTabDate traveller={index < adults ? `Adult` : index < adults + children ? `Child` : `Infant`} label="Passport Expiry Date" value={index} handleInputChange={handleInputChange} /></div>
                                {index < adults + children ?
                                  <div className='col-md-4 mb-3'>
                                    <p className="dob_heading">Wheel Chair:</p>
                                    <FormControl className="fname_textfield" size="small">
                                      <Select
                                        // labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={
                                          formData[index] && formData[index][`wheelChair${index}`]
                                            ? formData[index][`wheelChair${index}`]
                                            : 'N'
                                        }
                                        label="WheelChair"
                                        name={`wheelChair${index}`}
                                        onChange={(e) => handleInputChange(e, index)}
                                      >
                                        <MenuItem value={'Y'}>Yes</MenuItem>
                                        <MenuItem selected value={'N'}>No</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  :
                                  null
                                }
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="move_payment_button">
                      <button type="button" className={`btn btn-primary continue_button  ${travelFormValid() ? 'c-pointer' : 'c-not-allowed-btn'}`} disabled={!travelFormValid()} onClick={handleNavigation}>Continue to Payment</button>
                    </div>
                  </div>
                )
                }
              </div>
            </Fragment>
          )}

          {stateB ?
            (
              <div className="contact_details_main">
                <div className="d-flex justify-content_start">
                  <div className="iti_numbering iti_disabled_col disabled_border d-flex align-self-center">
                    <p>2</p>
                  </div>
                  <div className="d-flex align-self-center iti_disabled_col">
                    <h5 className="iti_heading_size">Add Traveller Details</h5>
                  </div>
                </div>
                {/* )
           } */}
              </div>
            ) : ('')}

        </Fragment>
      )}
    </Fragment>
  );

};

export default UserContactDetails;
