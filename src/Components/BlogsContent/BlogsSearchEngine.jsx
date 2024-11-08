import React ,{useState ,useEffect, useFragment} from 'react';
import DoneIcon from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useSelector, useDispatch } from "react-redux";
import { adultincNumber, adultdecNumber, childincNumber, childdecNumber, infantsdecNumber, infantsincNumber } from '../../Store/action/index.js';
import {Button} from 'reactstrap';
import { Select } from "antd";
import cities from "../../Constant/airport.js";
import Flag from 'react-world-flags';
import { DatePicker } from 'antd';
import * as images from '../../Constant/images.js';
import { useNavigate } from 'react-router';
import moment from "moment";
const { Option } = Select;

const BlogsSearchEngine = () => {
  let navigate = useNavigate();
    let tripTypeVal = 1;
    let classtypeVal = 'Economy';
    let departureSingle = null;
    let arrivalSingle = null;
    const municipalities = cities.map((city) => city.municipality);
    const iata_codes = cities.map((city) => city.iata_code);
    const airport_name = cities.map((city) => city.Name);
    const countery_name = cities.map((city) => city.iso_country);
    const concatenatedAirportsValues = [];


    const [tripActiveTab, settripActiveTab] = useState(tripTypeVal);
    const [isDivVisible, setDivVisible] = useState(false);
    const [activeClassTab, setClassActiveTab] = useState(classtypeVal);
    const [departure, setDeparture] = useState(departureSingle);
    const [arrival, setArrival] = useState(arrivalSingle);
    const [searchResults, setSearchResults] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isSearchDisabled, setIsSearchDisabled] = useState(true); 


    const adultQuant = useSelector((state) => state.adultNumber);
    const childQuant = useSelector((state) => state.childNumber);
    const infantsQuant = useSelector((state) => state.infantsNumber);
    const dispatch = useDispatch();

    const tripHandleTabClick = (tabNumber) => {
        settripActiveTab(tabNumber);
      };
    
    const travellingBoxModel = () => {
        setDivVisible(!isDivVisible);
      };

       // Increment and Decremnt Enable , Disable
  const adulthandleIncrement = () => {
    if (adultQuant < 6) {
      dispatch(adultincNumber());
    }
  };

  const adulthandleDecrement = () => {
    if (adultQuant > 1) {
      dispatch(adultdecNumber());
    }
  };
  const childhandleIncrement = () => {
    if (childQuant < 6) {
      dispatch(childincNumber());
    }
  };
  const childhandleDecrement = () => {
    if (childQuant > 0) {
      dispatch(childdecNumber());
    }
  };
  const infantshandleIncrement = () => {
    if (infantsQuant < adultQuant) {
      dispatch(infantsincNumber());
    }
  };

  const infantshandleDecrement = () => {
    if (infantsQuant > 0) {
      dispatch(infantsdecNumber());
    }
  };
  const adultdecrementStatus = adultQuant === 1 ? "c-blue c-not-allowed incrementIcn" : "c-blue c-pointer incrementIcn";
  const adultincrementStatus = adultQuant === 6 ? "c-blue c-not-allowed incrementIcn" : "c-blue c-pointer incrementIcn";
  const childdecrementStatus = childQuant === 0 ? "c-blue c-not-allowed incrementIcn" : "c-blue c-pointer incrementIcn";
  const childincrementStatus = childQuant === 6 ? "c-blue c-not-allowed incrementIcn" : "c-blue c-pointer incrementIcn";
  const infantsdecrementStatus = infantsQuant === 0 ? "c-blue c-not-allowed incrementIcn" : "c-blue c-pointer incrementIcn";
  const infantsincrementStatus = infantsQuant === adultQuant ? "c-blue c-not-allowed incrementIcn" : "c-blue c-pointer incrementIcn";

   // Select Trip Class Type
   const travelClasshandleTabClick = (tabNumber) => {

    let selectedClassValue =
      tabNumber === 1
        ? "Economy"
        : tabNumber === 2
          ? "Business class"
          : tabNumber === 3 ?
            "First class"
            : tabNumber === 4 ?
              "Premium economy"
              : null;

    setClassActiveTab(selectedClassValue);
  };
  
  const handleSelecor =() =>{
    setDivVisible(false);
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

const disabledDate = (current) => {
  const today = moment().startOf('day');
  const minSelectableDate = moment().add(3, 'days').startOf('day');
  return current && (current < today || current < minSelectableDate);
};

const searchFormValid = () => {
  return departure && arrival && startDate ;
};

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

      // --------------Api calling OBJ----------------
const handleSearchData = ()=>{
  const TripTypes = {
    1: 'Round',
    2: 'OneWay',
    default: 'Round'
  }
  const SelectedTripType  = TripTypes[tripActiveTab] ||TripTypes.default;

  let tripData = {
    CurrentDeparture: [],
    CurrentArrival: []
  };

  let tripDate =[]

  if (SelectedTripType === 'OneWay') {
    tripData.CurrentDeparture = [departure];
    tripData.CurrentArrival = [arrival]; 
    tripDate= [formatDateToString(startDate)];
  } else if (SelectedTripType === 'Round') {
    tripData.CurrentDeparture = [departure, arrival];
    tripData.CurrentArrival = [arrival, departure]; 
    tripDate= [
            formatDateToString(startDate),
            formatDateToString(endDate)
          ];
  }
  
  let searchDataArr = {
    adults: adultQuant,
    children: childQuant,
    infants: infantsQuant,
    classtype:activeClassTab,
    tripType:SelectedTripType,
    departure:tripData.CurrentDeparture,
    arrival:tripData.CurrentArrival,
    date:tripDate
  };

  console.log("SearchDataArr_Data",searchDataArr);
  navigate('/searchflightresult', { state: { searchDataArr } });
}

  return (
    <div className="bg-white">
      <div className="search_engine_supreme">
        <div className="search_engine_header d-flex justify-content-start">
          <img src={images.planelogo} alt="" width='38px' />
          <p className='se_head_title'>Search Flights</p>
        </div>
        <div className="SE_Body  ">
          <div className="SE_User_detail">
            {/* -------------------------- */}
            <div>
              <div className="d-flex justify-content-end ">
                <div onClick={travellingBoxModel} className="icon_padding">
                  <span className="traveller_detail ">
                    <PersonIcon />
                    <span className="">{`${adultQuant} Adult,${
                      childQuant > 0 ? ` ${childQuant} Child,` : ""
                    } ${
                      infantsQuant > 0 ? ` ${infantsQuant} Infant, ` : ""
                    } ${activeClassTab}`}</span>
                  </span>
                  <span>
                    <ExpandMoreIcon className="down_icon" />
                  </span>
                </div>
              </div>
              <div className="parentSelection">
                <span>
                  {isDivVisible && (
                    <div className="selectTypeClass">
                      <div
                        className="d-flex justify-content-end closecard_main "
                        onClick={travellingBoxModel}
                      >
                        <CloseOutlinedIcon className="closeCard_size" />
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Adults</h5>
                          <small>(12+ Years)</small>
                        </div>
                        <div>
                          <ul className="addingIcons  d-flex justify-content-between ">
                            <li
                              title="Decrement"
                              onClick={adulthandleDecrement}
                            >
                              <RemoveCircleOutlineOutlinedIcon
                                className={adultdecrementStatus}
                              />
                            </li>
                            <li>
                              <h5 className="mob_adult_space px-3">{adultQuant}</h5>
                            </li>
                            <li
                              title="Increment"
                              onClick={adulthandleIncrement}
                            >
                              <AddCircleOutlineOutlinedIcon
                                className={adultincrementStatus}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          <h5>Children</h5>
                          <small>(2 - 12 yrs)</small>
                        </div>
                        <div>
                          <ul className="addingIcons d-flex justify-content-between">
                            <li onClick={childhandleDecrement}>
                              <RemoveCircleOutlineOutlinedIcon
                                className={childdecrementStatus}
                              />
                            </li>
                            <li>
                              <h5 className="mob_adult_space px-3">{childQuant}</h5>
                            </li>
                            <li onClick={childhandleIncrement}>
                              <AddCircleOutlineOutlinedIcon
                                className={childincrementStatus}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          <h5>Infants </h5>
                          <small>(Below 2 yrs)</small>
                        </div>
                        <div>
                          <ul className="addingIcons d-flex justify-content-between">
                            <li onClick={infantshandleDecrement}>
                              <RemoveCircleOutlineOutlinedIcon
                                className={infantsdecrementStatus}
                              />
                            </li>
                            <li>
                              <h5 className="mob_adult_space px-3">{infantsQuant}</h5>
                            </li>
                            <li onClick={infantshandleIncrement}>
                              <AddCircleOutlineOutlinedIcon
                                className={infantsincrementStatus}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between flex-wrap mt-3">
                        <span
                          onClick={() => travelClasshandleTabClick(1)}
                          className={`travellingClassType ${
                            activeClassTab === "Economy"
                              ? "travel_class_active"
                              : ""
                          }`}
                        >
                          Economy
                        </span>
                        <span
                          onClick={() => travelClasshandleTabClick(2)}
                          className={`travellingClassType ${
                            activeClassTab === "Business class"
                              ? "travel_class_active"
                              : ""
                          }`}
                        >
                          Business class
                        </span>
                        <span
                          onClick={() => travelClasshandleTabClick(3)}
                          className={`travellingClassType ${
                            activeClassTab === "First class"
                              ? "travel_class_active"
                              : ""
                          }`}
                        >
                          First class
                        </span>
                        <span
                          onClick={() => travelClasshandleTabClick(4)}
                          className={`travellingClassType ${
                            activeClassTab === "Premium economy"
                              ? "travel_class_active"
                              : ""
                          }`}
                        >
                          Premium economy
                        </span>
                      </div>
                      <div className="d-flex justify-content-end mt-1">
                        <button
                          className="btn btn-primary selecttype_button"
                          onClick={handleSelecor}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </span>
              </div>
            </div>
            {/* ---------------------------------- */}
          </div>
          <div className="SE_Triptypes mt-1">
            <ul className="d-flex justify-content-start">
              <li
                className={`se_triptype_alignment ${
                  tripActiveTab === 1 ? "icon_background_active_2" : ""
                }`}
                onClick={() => tripHandleTabClick(1)}
              >
                <DoneIcon className="tick_icon" />
                ROUND TRIP
              </li>
              <li
                className={`se_triptype_alignment ${
                  tripActiveTab === 2 ? "icon_background_active_2" : ""
                }`}
                onClick={() => tripHandleTabClick(2)}
              >
                <DoneIcon className="tick_icon" />
                ONEWAY
              </li>
            </ul>
          </div>
          {/* ------------ */}
          <div className="mt-2 SE_Input_fields inputs_parents">
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
                  <Flag code={city.flag} className="flagDesignn" />
                  {city.airport}
                </Option>
              ))}
            </Select>
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
                  <Flag code={city.flag} className="flagDesignn" />
                  {city.airport}
                </Option>
              ))}
            </Select>
          </div>
          <div className="SE_Date_pickers">
            <div className="d-flex justify-content-center comm_date_picker2 parent-3 ">
              <DatePicker
                placeholder="Depart Date"
                className="promStartCalander"
                value={startDate}
                onChange={handleStartDateChange}
                disabledDate={disabledDate}
              />
             {
              tripActiveTab === 2 ? '' : <DatePicker
                placeholder="Arrival Date"
                className="promStartCalander"
                value={endDate}
                onChange={handleEndDateChange}
                disabledDate={(current) => current && current < startDate}
              />
             }
            </div>
          </div>
          <div className="SE_submit_btn">
            <div className="otp_btn_container">
              <Button
                color="primary"
                type="submit"
                form="myForm"
                className="GetOTP_btn2"
                onClick={handleSearchData}
                disabled = {!searchFormValid()}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsSearchEngine;