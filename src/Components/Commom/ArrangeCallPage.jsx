import React, { useState} from 'react';
import {Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import * as images from '../../Constant/images';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OTPSlider from './OTPSlider';
import PhoneInput from 'react-phone-input-2';
import { useFormData } from '../../Context/FormDataContext';
import { DatePicker } from 'antd';
import { CustomerDetailLead } from '../../API/BackendAPI/LeadCreationAPI/CustomerDetailLead';
import { toast } from 'react-toastify';
import { Select } from "antd";
import cities from "../../Constant/airport.js";
import Flag from 'react-world-flags';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { useLocation } from 'react-router';
import ArrangeCallSlider from './ArrangeCallSlider.jsx';
const { Option } = Select;


const ArrangeCallPage = () => {
    const {isLogin,isMobile, setMobile, userVerName,userCountryCode,userName} = useFormData();

    const location = useLocation();

    if(location.path ==='/arrangeCall'){
        setMobile(true);
    };
    let departureSingle = null;
    let arrivalSingle = null;
    const municipalities = cities.map((city) => city.municipality);
    const iata_codes = cities.map((city) => city.iata_code);
    const airport_name = cities.map((city) => city.Name);
    const countery_name = cities.map((city) => city.iso_country);
    const concatenatedAirportsValues = [];

    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callUserName ,setCallUserName] = useState('');
    const [userDepart ,setUserDepart] = useState('');
    const [userArrival ,setUserArrival] = useState('');

    const [departure, setDeparture] = useState(departureSingle);
    const [arrival, setArrival] = useState(arrivalSingle);
    const [isChange ,setChange] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
     const [searchResults, setSearchResults] = useState([]);

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
      const handleUserArrival = (event) =>{
        setUserArrival(event.target.value);
      }
      const handleUserDepart =(event) =>{
        setUserDepart(event.target.value);

      }
      const handleStartDateChange = (date) => {
        setStartDate(date);
      };
    
      const handleEndDateChange = (date) => {

        setEndDate(date);
      };
      const formatDateToString = (date) => {
        return date ? date.toISOString().split('T')[0] : null;
    };

    const extractIATACode = (location) => {
      const match = location.match(/\(([^)]+)\)/);
      return match ? match[1] : null;
    };

      const handleSubmission = async() =>{
         try{
          if (!phoneNumber || !callUserName || !startDate || !endDate) {
            toast.error("Please fill all the fields.", { autoClose: 2000 });
            throw new Error('All fields are mandatory');
        }
        const departureCode = extractIATACode(departure);
        const arrivalCode = extractIATACode(arrival);
    
        console.log("Departure-G", departureCode);
        console.log("Arrival-G", arrivalCode);
    
        const finalOBJ = {
          "leadData": {
              "depart": departureCode || "KHI",
              "arrival": arrivalCode || 'DXB',
              "departDate": formatDateToString(startDate),
              "returnDate": formatDateToString(endDate),
              "airline": "SV",
              "classType": "Economy",
              "adult": 1,
              "child": 0,
              "infants": 0,
              "phoneNumber": phoneNumber || userVerName,
              "tripType": 2
          },
          "userData": [
              {
                  "phoneNumber": phoneNumber || userVerName,
                  "firstName": callUserName || userName,
                  "lastName": callUserName || userName,
              }
          ]
      }

        console.log("leadCreationData22",finalOBJ);


        const LeadCreationResp = await CustomerDetailLead(finalOBJ);
        console.log('LeadCreationResp',LeadCreationResp);
        if(LeadCreationResp.data.message ==="Success"){
          toast.success('Thank you! Our team will contact you as soon as possible.',
            {autoClose: 2000 });
        }
         }catch(error){
          console.error("Error While Sending Data");
         }
        }
// ----------------------------------------


  let dateval = [];
        const handleDepartureSelect = (selectedValue) => {
          if (!selectedValue) {
            setDeparture(null);
          } else {
            const extractedDeparture = selectedValue.split(",")[0].trim();
            if (extractedDeparture === arrival) {
              setDeparture(null);
            } else {
              setDeparture(extractedDeparture);
            }
          }
        };


        const handleDepartureSearch = (value) => {
          setDeparture(value);
        
          if (value.length >= 3) {
              const filteredCities = concatenatedAirportsValues.filter((city) => {
                  const concatenatedValue = city.airport;
                  const iataCode = concatenatedValue.match(/\((.*?)\)/)?.[1]?.trim();
                  const cityName = concatenatedValue.replace(/\(.*?\)/, '').trim();
                  const airportName = concatenatedValue.split(',')[1]?.trim();
        
                  return (
                      (iataCode && iataCode.toLowerCase().includes(value.toLowerCase())) ||
                      cityName.toLowerCase().startsWith(value.toLowerCase()) ||
                      (airportName && airportName.toLowerCase().startsWith(value.toLowerCase()))
                  );
              });
        
              // Separate into groups
              const iataMatches = filteredCities.filter((city) => {
                  const iataCode = city.airport.match(/\((.*?)\)/)?.[1]?.trim();
                  return iataCode && iataCode.toLowerCase().includes(value.toLowerCase());
              });
        
              const otherMatches = filteredCities.filter((city) => {
                  const iataCode = city.airport.match(/\((.*?)\)/)?.[1]?.trim();
                  return !(iataCode && iataCode.toLowerCase().includes(value.toLowerCase()));
              });
        
              // Combine with IATA matches on top
              const sortedCities = [...iataMatches, ...otherMatches];
        
              setSearchResults(sortedCities);
          } else {
              setSearchResults([]);
          }
        };
        for (let i = 0; i < municipalities.length; i++) {
          const municipality = municipalities[i];
          const iataCode = iata_codes[i];
          const airportName = airport_name[i];
          const counteryName = countery_name[i];
          const flagUrl = counteryName;
          const concatenatedValue = `${municipality} (${iataCode}), ${airportName}, ${counteryName}`;
          const airportWithFlag = {
            airport: concatenatedValue,
            flag: flagUrl
          };
          concatenatedAirportsValues.push(airportWithFlag);
        }

        const handleArrivalSelect = (selectedValue) => {
          if (!selectedValue) {
            setArrival(null);
          } else {
            const extractedArrival = selectedValue.split(",")[0].trim();
            if (extractedArrival === departure) {
              setDeparture(null);
            }
            setArrival(extractedArrival);
          }
        };
        const handleArrivalSearch = (value) => {
          if (value.length >= 3) {
              const filteredCities = concatenatedAirportsValues.filter((city) => {
                  const concatenatedValue = city.airport;
                  const iataCode = concatenatedValue.match(/\((.*?)\)/)?.[1]?.trim();
                  const cityName = concatenatedValue.replace(/\(.*?\)/, '').trim();
                  const airportName = concatenatedValue.split(',')[1]?.trim();
      
                  return (
                      (iataCode && iataCode.toLowerCase().includes(value.toLowerCase())) ||
                      cityName.toLowerCase().startsWith(value.toLowerCase()) ||
                      (airportName && airportName.toLowerCase().startsWith(value.toLowerCase()))
                  );
              });
      
              // Separate into groups
              const iataMatches = filteredCities.filter((city) => {
                  const iataCode = city.airport.match(/\((.*?)\)/)?.[1]?.trim();
                  return iataCode && iataCode.toLowerCase().includes(value.toLowerCase());
              });
      
              const otherMatches = filteredCities.filter((city) => {
                  const iataCode = city.airport.match(/\((.*?)\)/)?.[1]?.trim();
                  return !(iataCode && iataCode.toLowerCase().includes(value.toLowerCase()));
              });
      
              // Combine with IATA matches on top
              const sortedCities = [...iataMatches, ...otherMatches];
      
              setSearchResults(sortedCities);
          } else {
              setSearchResults([]);
          }
      };
      
  return (
    <div className='container bg-white'>
      <div className='contact_us_heading d-flex justify-content-center'>
            <PhoneForwardedIcon className='about_detail_icon '/><h3 className='fmBanks_main_heading'>Schedule a Call With Our Team</h3>
      </div>
         <div className='row m-2'>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className='call_name_input call_page_margin'>
                        <p className="call_title_typo">Name:</p>
                        <TextField id="outlined-basic"  variant="outlined" size='small' placeholder='Enter your Full Name' onChange={handleUserName}  value = {isLogin && isChange ? userName:callUserName}/>
                        </div>
                        <div className='call_page_margin parental-element'>
                        <p className="call_title_typo">Phone No <span className ="mendatory">*</span>:</p>
                         <PhoneInput
                            country={'pk'}
                            value={isLogin ? `+${userCountryCode} ${userVerName}` : `+${countryCode} ${phoneNumber}`}
                            onChange={(value, country) => handlePhoneNumberChange(value, country)}
                            placeholder="Enter your phone number"
                            onlyCountries={['pk']}
                            containerClass="phone-input-container"
                            inputClass="phone-input" 
                            
                          />
                       </div> 
                       <div className='call_page_margin inputs_parents'>
                                <Select
                                  value={departure}
                                  placeholder="Leaving From"
                                  onChange={handleDepartureSelect}
                                  onSearch={handleDepartureSearch}
                                  className="inputDeprturFlightMob"
                                  showSearch
                                  showArrow
                                  allowClear
                                >
                                  {searchResults.map((city) => (
                                    <Option key={city.airport} value={city.airport}>
                                      <Flag code={city.flag} className='flagDesignn' />
                                      {city.airport}
                                    </Option>
                                  ))}
                                </Select>
                                {/* ------------------------------ */}
                       </div>
                       <div className='call_page_margin inputs_parents'>
                       <Select
                                    value={arrival}
                                    placeholder="Going To"
                                    onChange={handleArrivalSelect}
                                    onSearch={handleArrivalSearch}
                                    className="inputArrivalFlightMob"
                                    showSearch
                                    showArrow
                                    allowClear
                                  >
                                    {searchResults.map((city) => (
                                      <Option key={city.airport} value={city.airport}>
                                        <Flag code={city.flag} className='flagDesignn' />
                                        {city.airport}
                                      </Option>
                                    ))}
                                  </Select>
                       </div>
                       <div className='d-flex justify-content-center comm_date_picker2 parent-3  call_page_margin' >
                                    <DatePicker
                                    placeholder="Depart Date"
                                    className='promStartCalander'
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    // disabledDate={disabledStartDate}
                                    />
                                    <DatePicker
                                    placeholder="Arrival Date"
                                    className='promStartCalander'
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    disabledDate={(current) => current && current < startDate}
                                    />
                           </div>
                       <div className="otp_btn_container dail_call_parent" >
                        <Button color="primary" type="submit" form="myForm" className="GetOTP_btn2" onClick={handleSubmission}>Submit</Button>
                      </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 ">
                  <div className="background_slider_model">
                    {/* <OTPSlider /> */}
                    <ArrangeCallSlider/>
                  </div>
                </div>
            </div>
    </div>
  )
}

export default ArrangeCallPage