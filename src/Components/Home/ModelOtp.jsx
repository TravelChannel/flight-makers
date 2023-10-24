import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, } from 'reactstrap';
import OTPSlider from '../Commom/OTPSlider';
import * as images from '../../Constant/images';

const OtpModel = () => {
  const [isOpen, setIsOpen] = useState(true); 
  const  [InputValue, SetInputValue]=useState('');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const ModelInputChange =(e)=>{
    SetInputValue(e.target.value);

  }
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);

  const handleFocus = () => {
    setPlaceholderVisible(false);
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setPlaceholderVisible(true);
    }
  };

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
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center">
              <form onSubmit={handleSubmit}>
                <FormGroup>
                   <h4 className=" model_heading pb-4"> Lets Get Started</h4>
                  <input className="input_feild_1" type="text" value="+92" readOnly  />
                  <input className="input_feild_2" type="number" 
                  onChange={ModelInputChange} value={InputValue}  
                  placeholder={isPlaceholderVisible ? 'Enter your Mobile No' : ''}
                  onFocus={handleFocus}
                onBlur={handleBlur}/>

                  <div className="otp_btn_container">
                    <Button color="primary" type="submit" form="myForm" className="GetOTP_btn">Get OTP</Button>
                  </div>
                  <div className="mt-3 fs-12 fw-400 c-neutral-grey ta-center"> You can now login via mobile number &amp; link email to access your account.</div>
                </FormGroup>
              </form>
            </div>
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
