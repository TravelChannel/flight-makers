import React ,{useState} from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import * as images from '../../../../../Constant/images';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import DatePicker from 'react-datepicker';
import { DatePicker } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { updateUserProfile } from '../../../../../API/BackendAPI/allAPICalls';
import { useFormData } from '../../../../../Context/FormDataContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditModel = (props) => {
 const {isOpen , setIsOpen ,setProfileData ,ProfileData} = props;

 console.log("profileDataUsers",ProfileData);

//  const [updatedData , setUpdatedData] = useState('');
//  const [selectedDate, setSelectedDate] = useState(null);

 const [firstName, setFirstName] = useState(ProfileData.firstName);
 const [lastName, setLastName] = useState(ProfileData.lastName);
 const [cnic, setCnic] = useState(ProfileData.cnic);
 const [passportNo, setPassportNo] = useState(ProfileData.passportNo);
 const [dob, setDob] = useState(ProfileData.dateOfBirth);
const [selectedDate, setSelectedDate] = useState(null);
 const [gender, setGender] = useState(ProfileData.gender);
 const [startDate, setStartDate] = useState(null);


 const {userName ,setUserName} = useFormData();

 const handleStartDateChange = (date) => {
  setStartDate(date);
};

// useEffect(() => {
//   if (ProfileData.dob) {
//     setStartDate(new Date(ProfileData.dateOfBirth));
//   }
// }, [ProfileData.dob]);


//  console.log("YOYOYOYOOO",userName);
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
  const formatDateToString = (date) => {
    return date ? date.toISOString().split('T')[0] : null;
};
  const userUpdatedObject = {
    "username": firstName,
    "email": "kashif123@gmail.com",
    "passportExpiryDate": "",
    'firstName':firstName,
    'lastName':lastName,
    'cnic': cnic,
    'passportNo':passportNo,
    'dateOfBirth':formatDateToString(startDate),
    'gender':gender

  }

  const handleSubmit =async () => {
  const updateDataAPI = await updateUserProfile(userUpdatedObject);
  const updatedFromatData = updateDataAPI.data.payload.updateUserDto;
  setProfileData(updatedFromatData);
  setUserName(updateDataAPI.data.payload.updateUserDto.firstName);
  setIsOpen(false);
  toast.success('Profile Updated Successfully!', {autoClose: 2000});
  };
  return (
    <Modal isOpen={isOpen}  className="custom_edit_modal">
    <ModalHeader toggle={toggleModal}>
        <div id="logobox" className="hdrLogo"><img src={images.default} className="imgView w-91" alt="FM-LOGO"/><span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span></div>
      </ModalHeader>
    <ModalBody>
        <h3 className='edit_model_body'>Edit Your Profile</h3>
       <div className='d-flex justify-content-between user_input_row'>
            <div className='w-50'>
            <h3 className='editModel_labeling'>First Name:</h3>
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
            <h3 className='editModel_labeling'> Last Name:</h3>
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
            <h3 className='editModel_labeling'>CNIC:</h3>
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
            <h3 className='editModel_labeling'>Passport No:</h3>
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
       <div className='d-flex justify-content-start user_input_row'>
            <div className="parent-element w-50 ">
             {/* <div className='w-50'>
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
            </div> */}
            <DatePicker
                  placeholder="Date of Birth"
                  className='userProfileCal'
                  value={startDate}
                  // selected={selectedDate}
                  onChange={handleStartDateChange}
                  // disabledDate={disabledStartDate}
                />
            </div>
            
            <div className='w-50 m-1'>
            {/* <h3 className='editModel_labeling'>Gender</h3> */}
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
                <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
       </div>
    </ModalBody>

    </Modal>
  )
}

export default EditModel;