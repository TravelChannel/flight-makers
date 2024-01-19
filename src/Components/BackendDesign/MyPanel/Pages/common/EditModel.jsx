import React ,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, } from 'reactstrap';
import * as images from '../../../../../Constant/images';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateUserProfile } from '../../../../../API/BackendAPI/UserBookingDetails';

const EditModel = (props) => {
 const {isOpen , setIsOpen} = props;

//  const [selectedDate, setSelectedDate] = useState(null);

 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [cnic, setCnic] = useState('');
 const [passportNo, setPassportNo] = useState('');
 const [dob, setDob] = useState('');
const [selectedDate, setSelectedDate] = useState(null);
 const [gender, setGender] = useState('');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const CloseEditModel =()=>{
    setIsOpen(false);
  }

  const handleFnameChange = (event)=>{
    setFirstName(event.target.value);
  }
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCnicChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9!@#$%^&*()_+={}[\]:;<>,.?~\\/-]/g, '');
    const cnicValidated = inputValue.slice(0, 15);
    setCnic(cnicValidated);
  };

  const handlePassportNoChange = (event) => {
    const validatedValue = event.target.value.slice(0,9);
    setPassportNo(validatedValue);
  };

  const handleDobChange = (date) => {
    const formattedDate = date ? formatSelectedDate(date) : null;
    setSelectedDate(date);
    setDob(formattedDate);

  };
  const formatSelectedDate = (date) => {
    return date ? date.toLocaleDateString('en-US') : null;
  };


  const maxDate = new Date();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const userUpdatedObject = {
    "username": "hghh",
    "email": "ssss@gmail.com",
    "passportExpiryDate": "2026-12-23",
    'firstName':firstName,
    'lastName':lastName,
    'cnic': cnic,
    'passportNo':passportNo,
    'dateOfBirth':dob,
    'gender':gender

  }

  const handleSubmit =async () => {
    console.log("userUpdatedObject",userUpdatedObject);
 const updateDataAPI = await updateUserProfile(userUpdatedObject);
 window.location.reload();

  };
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} className="custom_edit_modal">
    <ModalHeader toggle={toggleModal}>
        <div id="logobox" className="hdrLogo"><img src={images.default} className="imgView w-91" alt="FM-LOGO"/><span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span></div>
        </ModalHeader>
    <ModalBody>
        <h3 className='edit_model_body'>Edit Your Profile</h3>
       <div className='d-flex justify-content-between user_input_row'>
            <div className='w-50'>
            <h3 className='editModel_labeling'>First Name</h3>
            <Box
            sx={{
                width: 500,
                maxWidth: '90%',
            }}
            >
            <TextField fullWidth label="" id="fullWidth"  value= {firstName} onChange={handleFnameChange}/>
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
            <TextField fullWidth label="" id="fullWidth" value= {lastName} onChange={handleLastNameChange} />
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
            <TextField fullWidth label="" id="fullWidth" value= {cnic} onChange={handleCnicChange} />
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
            <TextField fullWidth label="" id="fullWidth" value= {passportNo} onChange={handlePassportNoChange}/>
          </Box>
            </div>
       </div>
       <div className='d-flex justify-content-between user_input_row'>
            <div className='w-50'>
            <h3 className='editModel_labeling'>DOB</h3>
            <DatePicker
               className='User_DOb_Cal'
                selected={selectedDate}
                value={selectedDate}
                onChange={handleDobChange}
                dateFormat="MM/dd/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={70} 
                placeholderText="Select Date of Birth"
                maxDate={maxDate}
              />
            </div>
            <div className='w-50 m-1'>
            <h3 className='editModel_labeling'>Gender</h3>
          <FormControl className="fname_textfield1" size="small">
               <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                      <Select
                          labelId="demo-simple-select-helper-label"
                             id="demo-simple-select-helper"
                            value={gender}
                            label="Gender"
                            // name={`gender${index}`}
                            onChange={handleGenderChange}
                          >
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                      </Select>
        </FormControl>
            </div>
       </div>
       <div className='model_submit_main'>
                <button className='btn btn-primary' onClick={handleSubmit}>SUBMIT</button>
       </div>
    </ModalBody>

    </Modal>
  )
}

export default EditModel;