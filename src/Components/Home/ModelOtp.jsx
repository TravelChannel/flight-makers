import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, } from 'reactstrap';
import OTPSlider from '../Commom/OTPSlider';
import * as images from '../../Constant/images';
import PhoneInput from 'react-phone-input-2';
import OTPCode from '../Commom/OTPCode';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import { sendOTPCode } from '../../API/BackendAPI/allAPICalls';
import { useNavigate } from 'react-router';

const OtpModel = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [isOTP ,setOTP] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  console.log("phoneNumber",phoneNumber);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // -----------------------
  const handlePhoneNumberChange = (value, country) => {
    const dialCode = country.dialCode;

    if (value.includes(dialCode)) {
      const numericPhoneNumber = value.replace(dialCode, '').replace(/\D/g, '');
      setPhoneNumber(numericPhoneNumber);
    } else {
      setPhoneNumber(value.replace(/\D/g, ''));
    }
    setCountryCode(dialCode);
  };
  const getOTPData = {
    'countryCode':countryCode,
    'phoneNumber':phoneNumber
  }

  console.log("getOTPObj",getOTPData);


  const GetOTP =async ()=>{
    // try{
    //   const OTPResponce = await sendOTPCode(getOTPData); 
    //   console.log('OTPResponce',OTPResponce);
    //   setOTP(true);
    // }catch(error){  
    //   console.error('errorOTP',error);
    // }
    try{
      const OTPResponce = await sendOTPCode(getOTPData); 
      console.log('OTPResponce',OTPResponce);
      setOTP(true);
    }catch(error){ 
      console.error('errorOTP',error);
    }
  }
  const backToNumber = ()=>{
    setOTP(false);
  }

  const handlePrivacy = () =>{
    navigate('/refund-policy');
  }
  const handleServices =() =>{
    navigate('/terms-and-conditions')
  }
  // -------------------------
  return (
    
    <div>
      <Modal isOpen={isOpen} toggle={toggleModal} className="custom-modal">
        <ModalHeader toggle={toggleModal}>
        <div id="logobox" className="hdrLogo"><img src={images.default} className="imgView w-91" alt="FM-LOGO"/><span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span></div>
        </ModalHeader>
        <ModalBody>
          <div className='row'>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 ">
              <div className="background_slider_model">
                <OTPSlider />
              </div>
            </div>
            {
              isOTP ?(
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 ">
                   <div className='OTP_Back d-flex justify-content-start' onClick={backToNumber}>
                  <span><ReplyAllIcon/></span><p className=' model_backbtn align-self-center'>Change Number</p>
                   </div>
                   <div className='model_otp'>
                   <p className='otp_message_set'>Enter OTP sent to the number: {phoneNumber}</p>
                    <OTPCode getOTPData = {getOTPData}/>
                   </div>
                
                </div>
              ):(
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center">
              <form onSubmit={handleSubmit}>
                <FormGroup>
                   <h4 className=" model_heading pb-4"> Lets Get Started</h4>
                <div >
                <PhoneInput
                        country={'pk'}
                        value={`+${countryCode} ${phoneNumber}`} // Display the formatted phone number
                        onChange={(value, country) => handlePhoneNumberChange(value, country)}
                        placeholder="Enter your phone number"
                        onlyCountries={['pk']}
                      />
                  </div>
                  <div className="otp_btn_container">
                    <Button color="primary" type="submit" form="myForm" className="GetOTP_btn" onClick={GetOTP}>Get OTP</Button>
                  </div>
                  <div className="mt-3 fs-12 fw-400 c-neutral-grey ta-center"> You can now login via mobile number &amp; link email to access your account.</div>
                </FormGroup>
              </form>
            </div>
              )
            }
          </div>
        </ModalBody>
        <ModalFooter className="center_footer">
          <div className="otp_footer">
            By continuing, you agree to faremaker's <span className="otp_footer_color" onClick ={handlePrivacy}>privacy policy</span> &amp; <span className="otp_footer_color" onClick ={handleServices}>Terms of Services</span>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OtpModel;
