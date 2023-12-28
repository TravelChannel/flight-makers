import React ,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, } from 'reactstrap';
import * as images from '../../../../../Constant/images';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const EditModel = (props) => {
 const {isOpen , setIsOpen} = props;
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const CloseEditModel =()=>{
    setIsOpen(false);
  }
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} className="custom_edit_modal">
   {/* <ModalHeader toggle={''}>
   <div className='d-flex justify-content-between'>
            <div id="logobox" className="hdrLogo">
                    <img src={images.default} className="imgView w-91" alt="FM-LOGO"/>
                    <span  className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span>
            </div>
            <div>
              <CancelPresentationRoundedIcon className = 'edit_model_close' onClick = {CloseEditModel}/> 
            </div>
       </div>
    </ModalHeader> */}
    <ModalHeader toggle={toggleModal}>
        <div id="logobox" className="hdrLogo"><img src={images.default} className="imgView w-91" alt="FM-LOGO"/><span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span></div>
        </ModalHeader>
    <ModalBody>
        <h3 className='edit_model_body'>Edit Your Details</h3>
       <div className='d-flex justify-content-between user_input_row'>
            <div className='w-50'>
            <h3 className='editModel_labeling'>First Name</h3>
            <Box
            sx={{
                width: 500,
                maxWidth: '90%',
            }}
            >
            <TextField fullWidth label="" id="fullWidth" />
          </Box>
            </div>
            <div className='w-50'>
            <h3 className='editModel_labeling'> Last Name</h3>
            <Box
            sx={{
                width: 500,
                maxWidth: '90%',
            }}
            >
            <TextField fullWidth label="" id="fullWidth" />
          </Box>
            </div>
       </div>
       <div className='d-flex justify-content-between user_input_row'>
            <div className='w-50'>
            <h3 className='editModel_labeling'>CNIC</h3>
            <Box
            sx={{
                width: 500,
                maxWidth: '90%',
            }}
            >
            <TextField fullWidth label="" id="fullWidth" />
          </Box>
            </div>
            <div className='w-50'>
            <h3 className='editModel_labeling'>Passport No</h3>
            <Box
            sx={{
                width: 500,
                maxWidth: '90%',
            }}
            >
            <TextField fullWidth label="" id="fullWidth" />
          </Box>
            </div>
       </div>
       <div className='model_submit_main'>
                <button className='btn btn-primary'>SUBMIT</button>
       </div>
    </ModalBody>

    </Modal>
  )
}

export default EditModel;