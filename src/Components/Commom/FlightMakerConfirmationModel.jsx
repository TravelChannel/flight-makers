import React, { useState} from 'react';
import {Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import * as images from '../../Constant/images';
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useFormData } from '../../Context/FormDataContext';
import { CustomerDetailLead } from '../../API/BackendAPI/LeadCreationAPI/CustomerDetailLead';
import { toast } from 'react-toastify';
import { Select } from "antd";
import { useNavigate } from 'react-router';
import { convertDateFormat } from '../../helpers/formatdata';
import { BeatLoader } from 'react-spinners';
const { Option } = Select;

const FlightConfirmationModel = (props) => {
    const navigate = useNavigate();
    const flightData = JSON.parse(localStorage.getItem("bookingTicket"));

    console.log("flightData---test",flightData)
    const tripType = flightData?.groupDescription?.length === 1
    ? 1
    : flightData?.groupDescription?.length === 2
    ? 2
    : 2;
    console.log("tripType",tripType);
    const {isOpen,setIsOpen, setOpened} =props;
    const {isLogin, userVerName,userCountryCode,userName} = useFormData();

    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callUserName ,setCallUserName] = useState('');
    const [userLastName , setUserLastName] = useState("");

    const [isChange ,setChange] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading  ,setIsLoading] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

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
      const handleUserName = (event) =>{
        setChange(false);
        const value = event.target.value;
        setCallUserName(value);
      }
      const handleUserLastName = (event) =>{
        setChange(false);
        const value = event.target.value;
        setUserLastName(value);
      }

      const handleSubmission = async() =>{
         try{
        setIsLoading(true);
          if (!phoneNumber || !callUserName ) {
            toast.error("Please fill all the fields.", { autoClose: 2000 });
            throw new Error('All fields are mandatory');
        }
        const finalOBJ = {
          "leadData": {
              "depart":  flightData?.groupDescription?.[0]?.departure,
              "arrival": flightData?.groupDescription?.[0]?.arrival,
              "departDate":convertDateFormat(flightData?.groupDescription?.[0]?.departDate),
              "returnDate": convertDateFormat(flightData?.groupDescription?.[0]?.arrivalDate),
              "airline": flightData?.groupDescription?.[0]?.marketingCarrier,
              "classType": flightData?.classtype,
              "adult": flightData?.adults,
              "child":  flightData?.children,
              "infants": flightData?.infants,
              "phoneNumber": phoneNumber || userVerName,
              "tripType": tripType
          },
          "userData": [
              {
                  "phoneNumber": phoneNumber || userVerName,
                  "firstName": callUserName || userName,
                  "lastName": userLastName || userName,
              }
          ]
      }

        console.log("leadCreationData-test",finalOBJ);


        const LeadCreationResp = await CustomerDetailLead(finalOBJ);
        console.log('LeadCreationResp',LeadCreationResp);
        if(LeadCreationResp.data.message ==="Success"){
          setIsLoading(false);
            toast.success('Thank you! We’ve received your travel details, and our team will contact you shortly.', {
                autoClose: 3000,
                position: "top-center",
                onClose: () => navigate('/') 
              });
            }
          setOpened(false);
          setIsOpen(false);
         }catch(error){
          setIsLoading(false);
          console.error("Error While Sending Data");
         }
        }
// ----------------------------------------

     
  return (
    <div className=''>
           <Modal isOpen={isOpen}  className="custom-modal flightMaker_Container">
           <ModalHeader toggle={toggleModal} >
             <div id="logobox" className="hdrLogo"><img src={images.default} className="imgView w-91" alt="FM-LOGO"/></div>
          </ModalHeader>
         {
          isLoading ? (<div className='d-flex justify-content-center'>
                        <BeatLoader color="#0b20de" margin={20}  size={14} />
                        </div>
          ):(
            <ModalBody>
            <div className="container py-4">
                  <div className="row justify-content-center flightmaker-form-container">
                    <div className="col-12 col-md-8 col-lg-6">
                      {/* First Name */}
                      <div className="mb-4">
                        <label className="form-label fw-bold text-dark">F.Name:</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={handleUserName}
                          value = {isLogin && isChange ? userName:callUserName}
                          placeholder="Enter your First Name"
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#f8f9fa'
                            }
                          }}
                        />
                      </div>

                      {/* Last Name */}
                      <div className="mb-4">
                        <label className="form-label fw-bold text-dark">L.Name:</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={handleUserLastName}
                          placeholder="Enter your Last Name"
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#f8f9fa'
                            }
                          }}
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="mb-4">
                        <label className="form-label fw-bold text-dark">Phone No:</label>
                        <div className="row g-2">
                        <div className="custom-phone-input-login"> 
                          <PhoneInput
                            country={'us'}
                            value={isLogin ? `+${userCountryCode} ${userVerName}` : `+${countryCode} ${phoneNumber}`}
                            onChange={(value, country) => handlePhoneNumberChange(value, country)}
                            placeholder="Enter your phone number"
                            onlyCountries={['us']}
                           
                          />
                        </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="d-grid mt-4">
                        <Button
                          variant="contained"
                          fullWidth
                          style={{
                            backgroundColor: '#36c',
                            padding: '10px 0',
                            borderRadius: '8px',
                            fontWeight: '600',
                            textTransform: 'none',
                            fontSize: '1.1rem'
                          }}

                          onClick={handleSubmission}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
           </ModalBody>
          )
         }
           </Modal>
    </div>
  )
}

export default FlightConfirmationModel;
