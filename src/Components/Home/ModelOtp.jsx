import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, } from 'reactstrap';
import OTPSlider from '../Commom/OTPSlider';
import * as images from '../../Constant/images';
import PhoneInput from 'react-phone-input-2';
import OTPCode from '../Commom/OTPCode';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const OtpModel = () => {
  const [isOpen, setIsOpen] = useState(true); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOTP ,setOTP] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  console.log("phoneNumber",phoneNumber);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // -----------------------
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const GetOTP = ()=>{
    setOTP(true);
  }
  const backToNumber = ()=>{
    setOTP(false);
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
                    <OTPCode/>
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
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="Enter your phone number"
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
            By continuing, you agree to faremaker's <span className="otp_footer_color">privacy policy</span> &amp; <span className="otp_footer_color">Terms of Services</span>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OtpModel;
