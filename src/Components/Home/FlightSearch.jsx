import React, { Fragment, useState, useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import RecentSearches from './RecentSearches.jsx';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { adultincNumber, adultdecNumber, childincNumber, childdecNumber, infantsdecNumber, infantsincNumber } from '../../Store/action/index.js';
import { DatePicker, Select } from "antd";
import dayjs from 'dayjs';
import moment from "moment";
import cities from "../../Constant/airport.js";
import Flag from 'react-world-flags';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { requestFetchAlternateRates } from '../../API/index.js';
import { useLocation } from 'react-router-dom';
import Precautions from '../Commom/Precautions.jsx';
import BusinessLogo from '../Commom/BusinessLogo.jsx';
import SearchButton from '../Commom/SearchButton.jsx';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const antDateFormat = 'D MMM, YYYY';

const FlightSearch = (props) => {

  const location = useLocation();
  // let {searchDataArr} = useSelector((state) => state.searchDataReducer);
  const shouldShowPrecautions = () => {
    const excludedPage = '/searchflightresult'; // Relative path of the "UserTripInfo" page
    return location.pathname !== excludedPage;
  }
  let { main_flight_rsult, resultpage, searchDataArr } = props;

  let tripTypeVal = 1;
  let classtypeVal = 'Economy';
  let arrivalval = null;
  let departureval = null;
  let departureSingle = null;
  let arrivalSingle = null;
  let dateval = [];

  if (resultpage) {
    const { tripType, classtype, arrival, departure, date } = searchDataArr;
    tripTypeVal = tripType === "Round" ? 1 : tripType === "OneWay" ? 2 : 3;
    classtypeVal = classtype;
    departureSingle = departure[0];
    arrivalSingle = arrival[0];
    arrivalval = arrival;
    departureval = departure;
    dateval = date;
  }

  // Sates  
  const [isDivVisible, setDivVisible] = useState(false);
  const [tripActiveTab, settripActiveTab] = useState(tripTypeVal);
  const [activeClassTab, setClassActiveTab] = useState(classtypeVal);
  const [departure, setDeparture] = useState(departureSingle);
  const [arrival, setArrival] = useState(arrivalSingle);
  const [selectedDates, setSelectedDates] = useState([dateval]);
  const [additionalFields, setAdditionalFields] = useState(
    arrivalval && departureval && dateval
      ? departureval.map((dep, index) => ({
        departure: dep,
        arrival: arrivalval[index],
        date: dayjs(dateval[index], dateFormat),
      }))
      : [{ departure: null, arrival: null, date: null }]
  );
  const [searchResults, setSearchResults] = useState([]);
  const [priceRates, setPriceRates] = useState([]);
  const placeholders = ['Departure Date', 'Return Date'];
  const [checkUpdate, setcheckUpdate] = useState(false);
  const adultQuant = useSelector((state) => state.adultNumber);
  const childQuant = useSelector((state) => state.childNumber);
  const infantsQuant = useSelector((state) => state.infantsNumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const municipalities = cities.map((city) => city.municipality);
  const iata_codes = cities.map((city) => city.iata_code);
  const airport_name = cities.map((city) => city.Name);
  const countery_name = cities.map((city) => city.iso_country);
  const concatenatedAirportsValues = [];

  useEffect(() => {
    const fetchData = async (startFutureDate) => {
      try {
        const futureDates = [];
        const currentDate = new Date(startFutureDate);
        for (let i = 0; i < 4; i++) {
          currentDate.setDate(currentDate.getDate() + i * 6); // Adjusted to fetch data every 7 days
          const grtData = currentDate.toISOString().slice(0, 10);
          const formattedFutureDate = grtData + "T00:00:00";
          futureDates.push(formattedFutureDate);
        }
        setPriceRates([]);
        for (const futureDate of futureDates) {
          const rates = await requestFetchAlternateRates(departure, arrival, futureDate);
          setPriceRates((prevRates) => [...prevRates, ...rates]);
        }
      } catch (error) {
      }
    };
    if (departure && arrival) {
      const startFutureDate = new Date();
      startFutureDate.setDate(startFutureDate.getDate() + 6);
      fetchData(startFutureDate);
      // if (resultpage) {
      //   handleDateChange();
      // }
    }
  }, [departure, arrival]);



  const handleDateChange = (dates, dateStrings) => {
    if (!dates || dates.length === 0) {
      setSelectedDates([]);
      return;
    }
    if (resultpage) {
      setcheckUpdate(true);
    }
    setSelectedDates(dates);
    const startDate = moment(dateStrings[0]).startOf('day').add(3, 'days');
    const endDate = moment(dateStrings[dateStrings.length - 1]).endOf('day');

    const prices = [];
    let priceIndex = startDate.diff(moment().startOf('day').add(3, 'days'), 'days');

    for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, 'day')) {
      const price = priceRates[priceIndex];
      prices.push(price);

      priceIndex = (priceIndex + 1) % (priceRates.length - 2);
    }
  };

  const renderDateCell = (date) => {
    const startDate = moment(selectedDates[0]).startOf('day').add(3, 'days');
    const priceIndex = date.diff(startDate, 'days');
    if (priceIndex >= 0 && priceIndex < priceRates.length) {
      const price = priceRates[priceIndex];
      const isCurrentDate = date.isSame(moment(), 'day');
      return (
        <div className={isCurrentDate ? 'current-date' : ''}>
          <div>{date.date()}</div>
          {price && <div style={{ fontSize: '10px', color: 'green' }}>${price}</div>}
        </div>
      );
    }
    return (
      <div>
        <div>{date.date()}</div>
      </div>
    );
  };
  //---- This code search Values

  const handleSwapCity = () => {
    setDeparture(arrival);
    setArrival(departure);
  };

  const handleDepartureSearch = (value) => {
    setDeparture(value);
    const filteredCities = value.length >= 3 ? concatenatedAirportsValues.filter((city) => {
      const concatenatedValue = city.airport;
      const iataCode = concatenatedValue.match(/\((.*?)\)/)?.[1]?.trim();
      const cityName = concatenatedValue.replace(/\(.*?\)/, '').trim();
      const airportName = concatenatedValue.split(',')[1]?.trim();
      return (
        iataCode && iataCode.toLowerCase() === value.toLowerCase()
      ) || (
          cityName.toLowerCase().startsWith(value.toLowerCase())
        ) || (
          airportName && airportName.toLowerCase().startsWith(value.toLowerCase())
        );
    }) : [];
    setSearchResults(filteredCities);
  };

  const handleArrivalSearch = (value) => {

    const filteredCities = value.length >= 3 ? concatenatedAirportsValues.filter((city) => {
      const concatenatedValue = city.airport;
      const iataCode = concatenatedValue.match(/\((.*?)\)/)?.[1]?.trim();
      const cityName = concatenatedValue.replace(/\(.*?\)/, '').trim();
      const airportName = concatenatedValue.split(',')[1]?.trim();
      return (
        iataCode && iataCode.toLowerCase() === value.toLowerCase()
      ) || (
          cityName.toLowerCase().startsWith(value.toLowerCase())
        ) || (
          airportName && airportName.toLowerCase().startsWith(value.toLowerCase())
        );
    }) : [];
    setSearchResults(filteredCities);
  };

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


  const MAX_ADDITIONAL_FIELDS = 5; // Maximum number of additional fields allowed
  const handleAddField = () => {
    // console.log(additionalFields);
    if (additionalFields.length < MAX_ADDITIONAL_FIELDS) {
      const newField = {
        departure: null,
        arrival: null,
        date: null
      };
      setAdditionalFields([...additionalFields, newField]);
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };

  // Incremnt & Decremnt code
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
  // Active Tabs
  const tripHandleTabClick = (tabNumber) => {
    settripActiveTab(tabNumber);
  };

  // Economic Class type
  const travellingBoxModel = () => {
    setDivVisible(!isDivVisible);
  };

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

  // Calender date disable
  const disabledDate = (current) => {
    const today = moment().startOf('day');
    const minSelectableDate = moment().add(3, 'days').startOf('day');
    return current && (current < today || current < minSelectableDate);
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

  //  Form Validations 
  const searchFormValid = () => {
    if (tripActiveTab === 1) {
      // console.log(selectedDates.length);
      return departure !== null && arrival !== null && (
        (Array.isArray(selectedDates) && selectedDates.length === 2) ||
        (Array.isArray(selectedDates) && selectedDates.flat().filter(item => item !== null).length === 2)
      );
    }
    if (tripActiveTab === 2) {
      return departure !== null && arrival !== null && selectedDates.length !== 0;
    }
    if (tripActiveTab === 3) {
      const additionalFieldsValid = additionalFields.every((field) => field.departure !== null && field.arrival !== null && field.date !== null);
      return additionalFieldsValid;
    }
    return false;
  };
  //  Form Inputs values
  const generateSearchData = (tripActiveTab, departure, arrival, selectedDates, additionalFields, activeClassTab) => {
    searchDataArr = {
      adults: adultQuant,
      children: childQuant,
      infants: infantsQuant,
      classtype: activeClassTab,
    };

    if (tripActiveTab === 1) {
      searchDataArr.tripType = 'Round';
      searchDataArr.departure = [departure, arrival];
      searchDataArr.arrival = [arrival, departure];
      searchDataArr.date = checkUpdate ? [selectedDates[0].format('YYYY-MM-DD'), selectedDates[1].format('YYYY-MM-DD')] : resultpage ? [selectedDates[0][0], selectedDates[0][1]] : [selectedDates[0].format('YYYY-MM-DD'), selectedDates[1].format('YYYY-MM-DD')];
    } else if (tripActiveTab === 2) {
      searchDataArr.tripType = 'OneWay';
      searchDataArr.departure = [departure];
      searchDataArr.arrival = [arrival];
      searchDataArr.date = checkUpdate ? [selectedDates.format('YYYY-MM-DD')] : resultpage ? [selectedDates[0][0]] : [selectedDates.format('YYYY-MM-DD')];
      // searchDataArr.date = checkUpdate ?  console.log("1") : resultpage ? console.log("2") : console.log("3");
    } else if (tripActiveTab === 3) {
      const validFields = additionalFields.filter((field) => field.departure && field.arrival && field.date);
      searchDataArr.tripType = 'MultiCity';
      searchDataArr.departure = validFields.map((field) => field.departure);
      searchDataArr.arrival = validFields.map((field) => field.arrival);
      searchDataArr.date = validFields.map((field) => field.date.format('YYYY-MM-DD'));
    }

    return searchDataArr;
  };

  //  On Click button
  const handleSearchflight = () => {
    const searchDataArr = generateSearchData(
      tripActiveTab,
      departure,
      arrival,
      selectedDates,
      additionalFields,
      activeClassTab
    );

    navigate('/searchflightresult', { state: { searchDataArr } });
  };
  //  On update result button
  const updateFlightResult = () => {
    const searchDataArr = generateSearchData(
      tripActiveTab,
      departure,
      arrival,
      selectedDates,
      additionalFields,
      activeClassTab
    );
    setcheckUpdate(false);
    console.log(searchDataArr);
    
    //Create History
    const existingSessionData = JSON.parse(localStorage.getItem('searchData')) || [];
    const updatedSessionData = [...existingSessionData, searchDataArr];
    const limitedSessionData = updatedSessionData.slice(-3);
    localStorage.setItem('searchData', JSON.stringify(limitedSessionData));

    navigate('/searchflightresult', { state: { searchDataArr } });
  };
  return (
    <Fragment>
      <div className={`container ${main_flight_rsult}`}>
        <form onSubmit={handleSearchflight} className="FlightSearch_main">
          <div>
            {/* {shouldShowPrecautions() && <Precautions />} */}

            {shouldShowPrecautions() && <BusinessLogo />}
          </div>
          <div className="trip_info d-flex justify-content-between">
            <ul className="d-flex justify-content-start">
              <li className={tripActiveTab === 1 ? "icon_background_active" : ""}
                onClick={() => tripHandleTabClick(1)}>
                <DoneIcon className="tick_icon" />
                ROUND TRIP
              </li>
              <li className={tripActiveTab === 2 ? "icon_background_active" : ""}
                onClick={() => tripHandleTabClick(2)}>
                <DoneIcon className="tick_icon" />
                ONEWAY
              </li>
              <li className={tripActiveTab === 3 ? "icon_background_active" : ""}
                onClick={() => tripHandleTabClick(3)}>
                <DoneIcon className="tick_icon" />
                MULTI CITY
              </li>
            </ul>

            <div>
              <div className="d-flex justify-content-end ">
                <div onClick={travellingBoxModel} className="icon_padding" >
                  <span className="traveller_detail "><PersonIcon />
                    <span className="classTypeSty">{`${adultQuant} Adult,${childQuant > 0 ? ` ${childQuant} Child,` : ''} ${infantsQuant > 0 ? ` ${infantsQuant} Infant, ` : ''} ${activeClassTab}`}</span>
                  </span>
                  <span><ExpandMoreIcon className="down_icon" /></span>
                </div>
              </div>
              <div className='parentSelection'>
                <span>
                  {isDivVisible &&
                    <div className="selectTypeClass">
                      <div className="d-flex justify-content-end closecard_main " onClick={travellingBoxModel} ><CloseOutlinedIcon className="closeCard_size" /></div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Adults</h5>
                          <small>(12+ Years)</small>
                        </div>
                        <div>
                          <ul className="addingIcons">
                            <li title="Decrement" onClick={adulthandleDecrement}>
                              <RemoveCircleOutlineOutlinedIcon className={adultdecrementStatus} />
                            </li>
                            <li>
                              <h5>{adultQuant}</h5>
                            </li>
                            <li title="Increment" onClick={adulthandleIncrement}>
                              <AddCircleOutlineOutlinedIcon className={adultincrementStatus} />
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
                          <ul className="addingIcons">
                            <li onClick={childhandleDecrement}>
                              <RemoveCircleOutlineOutlinedIcon className={childdecrementStatus} />
                            </li>
                            <li><h5>{childQuant}</h5></li>
                            <li onClick={childhandleIncrement}>
                              <AddCircleOutlineOutlinedIcon className={childincrementStatus} />
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
                          <ul className="addingIcons">
                            <li onClick={infantshandleDecrement}>
                              <RemoveCircleOutlineOutlinedIcon className={infantsdecrementStatus} />
                            </li>
                            <li><h5>{infantsQuant}</h5></li>
                            <li onClick={infantshandleIncrement} >
                              <AddCircleOutlineOutlinedIcon className={infantsincrementStatus} />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between flex-wrap mt-3">
                        <span onClick={() => travelClasshandleTabClick(1)} className={`travellingClassType ${activeClassTab === 'Economy' ? "travel_class_active" : ""}`}>Economy</span>
                        <span onClick={() => travelClasshandleTabClick(2)} className={`travellingClassType ${activeClassTab === 'Business class' ? "travel_class_active" : ""}`}>Business class</span>
                        <span onClick={() => travelClasshandleTabClick(3)} className={`travellingClassType ${activeClassTab === 'First class' ? "travel_class_active" : ""}`}>First class</span>
                        <span onClick={() => travelClasshandleTabClick(4)} className={`travellingClassType ${activeClassTab === 'Premium economy' ? "travel_class_active" : ""}`}>Premium economy</span>
                      </div>
                    </div>
                  }
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="search_flight_calander">
              {(tripActiveTab === 1 || tripActiveTab === 2) && (
                <div className="d-flex justify-content-between searchFlightField">
                  <Select
                    value={departure}
                    placeholder="Leaving From"
                    onChange={handleDepartureSelect}
                    onSearch={handleDepartureSearch}
                    className="inputDeprturFlight"
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
                  <span>
                    <svg class="swipCircle" onClick={handleSwapCity}><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></svg>
                  </span>
                  <Select
                    value={arrival}
                    placeholder="Going To"
                    onChange={handleArrivalSelect}
                    onSearch={handleArrivalSearch}
                    className="inputArrivalFlight"
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
              )}


              {tripActiveTab === 1 && (
                <RangePicker placeholder={placeholders} defaultValue={
                  dateval.length > 1
                    ? [dayjs(dateval[0], dateFormat), dayjs(dateval[1], dateFormat)]
                    : dateval.length > 0
                      ? [dayjs(dateval[0], dateFormat), null]
                      : [null, null]
                } onChange={handleDateChange} dateRender={renderDateCell} disabledDate={disabledDate} format={antDateFormat} />
              )}

              {tripActiveTab === 2 && (
                <DatePicker placeholder={placeholders[0]} defaultValue={dateval.length > 0 ? dayjs(dateval[0], dateFormat) : null} onChange={handleDateChange} dateRender={renderDateCell} disabledDate={disabledDate} format={antDateFormat} />
              )}
              {tripActiveTab !== 3 && (shouldShowPrecautions() ? null : (
                <button
                  onClick={updateFlightResult}
                  type='button'
                  className={`btn btn-primary search_btn_sp ${searchFormValid() ? 'c-pointer' : 'c-not-allowed-btn'}`}
                  disabled={!searchFormValid()}> Search
                </button>
              ))}


            </div>
            {tripActiveTab === 3 && (
              <Fragment>
                {tripActiveTab === 3 && (
                  <Fragment>
                    {additionalFields.map((field, index) => (
                      <div key={index} className="search_flight_calander mb-3">
                        <div className="d-flex justify-content-between searchFlightFieldmulti">
                          <h5 className='flignhtCounting mt-2'>{`Flight ${index + 1}`}</h5>
                          <Select
                            value={field.departure}
                            placeholder="Leaving From"
                            onChange={(selectedValue) => {
                              const extractedDept = selectedValue ? selectedValue.split(",")[0].trim() : null;
                              const updatedFields = [...additionalFields];
                              updatedFields[index].departure = extractedDept;
                              setAdditionalFields(updatedFields);
                            }}
                            onSearch={handleDepartureSearch}
                            className="inputDeprturFlight"
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
                          <Select
                            value={field.arrival}
                            placeholder="Leaving From"
                            onChange={(selectedValue) => {
                              const extractedArivl = selectedValue ? selectedValue.split(",")[0].trim() : null;
                              const updatedFields = [...additionalFields];
                              updatedFields[index].arrival = extractedArivl;
                              setAdditionalFields(updatedFields);
                            }}
                            onSearch={handleArrivalSearch}
                            className="inputArrivalFlight"
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
                          <DatePicker
                            value={field.date}
                            // defaultValue={dayjs(field.travelingDate, dateFormat)}
                            placeholder={placeholders[0]}
                            onChange={(date) => {
                              const updatedFields = [...additionalFields];
                              updatedFields[index].date = date;
                              setAdditionalFields(updatedFields);
                            }}
                            disabledDate={disabledDate}
                            format={antDateFormat}
                          />
                          {additionalFields.length > 2 && ( // Only show the delete button if there are more than 2 additional fields.
                            <DeleteIcon className='deletIconSty' onClick={() => handleRemoveField(index)} />
                          )}
                        </div>
                      </div>
                    ))}
                    {additionalFields.length < 2 && handleAddField()} {/* Automatically add one field */}
                    <div className='d-flex justify-content-between'>
                      <button type='button' className='btn btn-primary mt-3' onClick={handleAddField}> <AddIcon /> Add More</button>
                      {shouldShowPrecautions() ? null : <button type='button' onClick={updateFlightResult} className={`btn btn-primary mt-3 ${searchFormValid() ? 'c-pointer' : 'c-not-allowed-btn'}`} disabled={!searchFormValid()} > <SearchIcon /> Search</button>}
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}

          </div>
          <div className="recent_searches_main d-flex justify-content-start flex-wrap mt-1">
            {shouldShowPrecautions() && <RecentSearches />}
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 text_center_btn">
            {shouldShowPrecautions() && <SearchButton onButtonClick={searchFormValid} />}
          </div>
        </form>
        <form onSubmit={handleSearchflight} className="mob_res_hero">
          <div className="text-center">
            <span className="mob_heading_size">Flight</span>  <span className="mob_heading_size"><b>Search</b></span>
          </div>
          <div className="mobile_ways_info d-flex justify-content-center flex-wrap">
            <ul>
              <li className={tripActiveTab === 1 ? "icon_background_active_mob" : ""}
                onClick={() => tripHandleTabClick(1)} >
                <DoneIcon className="tick_icon" />
                ROUND TRIP
              </li>
              <li className={tripActiveTab === 2 ? "icon_background_active_mob" : ""}
                onClick={() => tripHandleTabClick(2)}  >
                <DoneIcon className="tick_icon" />
                ONEWAY
              </li>
              <li className={tripActiveTab === 3 ? "icon_background_active_mob" : ""}
                onClick={() => tripHandleTabClick(3)} >
                <DoneIcon className="tick_icon" />
                MULTI CITY
              </li>
            </ul>
          </div>
          <div>
            <div className="d-flex justify-content-end ">
              <div onClick={travellingBoxModel} className="icon_padding" >
                <span className="traveller_detail "><PersonIcon />
                  <span className="classTypeSty text-dark">{`${adultQuant} Adult,${childQuant > 0 ? ` ${childQuant} Child,` : ''} ${infantsQuant > 0 ? ` ${infantsQuant} Infant, ` : ''} ${activeClassTab}`}</span>
                </span>
                <span><ExpandMoreIcon className="down_icon" /></span>
              </div>
            </div>
            <div className='parentSelectionMob'>
              <span>
                {isDivVisible &&
                  <div className="selectTypeClassMob">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5>Adults</h5>
                        <small>(12+ Years)</small>
                      </div>
                      <div>
                        <ul className="addingIcons d-flex justify-content-between">
                          <li title="Decrement" onClick={adulthandleDecrement} >
                            <RemoveCircleOutlineOutlinedIcon className={adultdecrementStatus} />
                          </li>
                          <li>
                            <h5 className="mob_adult_space px-3">{adultQuant}</h5>
                          </li>
                          <li title="Increment" onClick={adulthandleIncrement}>
                            <AddCircleOutlineOutlinedIcon className={adultincrementStatus} />
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
                            <RemoveCircleOutlineOutlinedIcon className={childdecrementStatus} />
                          </li>
                          <li><h5 className="mob_adult_space px-3">{childQuant}</h5></li>
                          <li onClick={childhandleIncrement}>
                            <AddCircleOutlineOutlinedIcon className={childincrementStatus} />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <div>
                        <h5 >Infants </h5>
                        <small>(Below 2 yrs)</small>
                      </div>
                      <div>
                        <ul className="addingIcons d-flex justify-content-between ">
                          <li onClick={infantshandleDecrement}>
                            <RemoveCircleOutlineOutlinedIcon className={infantsdecrementStatus} />
                          </li>
                          <li><h5 className="mob_adult_space px-3">{infantsQuant}</h5></li>
                          <li onClick={infantshandleIncrement} >
                            <AddCircleOutlineOutlinedIcon className={infantsincrementStatus} />
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between flex-wrap mt-3">
                      <span onClick={() => travelClasshandleTabClick(1)} className={`${activeClassTab === 'Economy' ? "travel_class_active" : ""} travellingClassType`}>Economy</span>
                      <span onClick={() => travelClasshandleTabClick(2)} className={`${activeClassTab === 2 ? "travel_class_active" : ""} travellingClassType`}>Business class</span>
                      <span onClick={() => travelClasshandleTabClick(3)} className={`${activeClassTab === 3 ? "travel_class_active" : ""} travellingClassType`}>First class</span>
                      <span onClick={() => travelClasshandleTabClick(4)} className={`${activeClassTab === 4 ? "travel_class_active" : ""} travellingClassType`}>Premium economy</span>
                    </div>
                  </div>
                }
              </span>
            </div>
          </div>
          <div>
            {(tripActiveTab === 1 || tripActiveTab === 2) && (
              <div className="searchFlightFieldMob">
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
                <span>
                  <svg class="swipCircleMob" onClick={handleSwapCity}><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></svg>
                </span>
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
            )}
            {tripActiveTab === 1 && (
              <RangePicker placeholder={placeholders} defaultValue={
                dateval.length > 1
                  ? [dayjs(dateval[0], dateFormat), dayjs(dateval[1], dateFormat)]
                  : dateval.length > 0
                    ? [dayjs(dateval[0], dateFormat), null]
                    : [null, null]
              } onChange={handleDateChange} dateRender={renderDateCell} disabledDate={disabledDate} format={antDateFormat} />
            )}

            {tripActiveTab === 2 && (
              <DatePicker placeholder={placeholders[0]} defaultValue={dateval.length > 0 ? dayjs(dateval[0], dateFormat) : null} onChange={handleDateChange} dateRender={renderDateCell} disabledDate={disabledDate} format={antDateFormat} />
            )}

            {tripActiveTab === 3 && (
              <Fragment>
                {tripActiveTab === 3 && (
                  <Fragment>
                    {additionalFields.map((field, index) => (
                      <div key={index} className="search_flight_calander mb-2">
                        <div className="searchFlightFieldmulti">
                          <div className='d-flex justify-content-between'>
                            <h5 className='flignhtCounting mb-2'>{`Flight ${index + 1}`}</h5>
                            {additionalFields.length > 2 && ( // Only show the delete button if there are more than 2 additional fields
                              // <button >Delete</button>
                              <DeleteIcon className='deletIconSty mt-0' onClick={() => handleRemoveField(index)} />
                            )}
                          </div>
                          <Select
                            value={field.departure}
                            placeholder="Leaving From"
                            onChange={(selectedValue) => {
                              const extractedDept = selectedValue ? selectedValue.split(",")[0].trim() : null;
                              const updatedFields = [...additionalFields];
                              updatedFields[index].departure = extractedDept;
                              setAdditionalFields(updatedFields);
                            }}
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
                          <Select
                            value={field.arrival}
                            placeholder="Leaving From"
                            onChange={(selectedValue) => {
                              const extractedArivl = selectedValue ? selectedValue.split(",")[0].trim() : null;
                              const updatedFields = [...additionalFields];
                              updatedFields[index].arrival = extractedArivl;
                              setAdditionalFields(updatedFields);
                            }}
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
                          <DatePicker
                            value={field.date}
                            placeholder={placeholders[0]}
                            onChange={(date) => {
                              const updatedFields = [...additionalFields];
                              updatedFields[index].date = date;
                              setAdditionalFields(updatedFields);
                            }}
                            disabledDate={disabledDate}
                            format={antDateFormat}
                            className="mob_calander"
                          />
                        </div>
                      </div>
                    ))}
                    {additionalFields.length < 2 && handleAddField()} {/* Automatically add one field */}
                    <div className='d-flex justify-content-between'>
                      <button type='button' className='btn btn-primary my-2' onClick={handleAddField}> <AddIcon /> Add More</button>
                      {shouldShowPrecautions() ? null : <button type='button' onClick={updateFlightResult} className={`btn btn-primary mt-3 ${searchFormValid() ? 'c-pointer' : 'c-not-allowed-btn'}`} disabled={!searchFormValid()} > <SearchIcon /> Search</button>}
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}

          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 text-center">
            <button type='submit' className={`btn btn-primary colorWhite btn_searchFlight mt-3 ${searchFormValid() ? 'c-pointer' : 'c-not-allowed-btn'}`} disabled={!searchFormValid()}>SEARCH</button>
          </div>
          {shouldShowPrecautions() && <Precautions />}

        </form>
      </div>
    </Fragment>
  );
}

export default FlightSearch;