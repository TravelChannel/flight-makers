import React, {useState, useEffect,Fragment} from 'react';
import userDetails from '../../../../../Constant/BackendData/userDetails';
import userDetailsBackend from '../../../../../API/BackendAPI/BackendAPI_Fun';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { cityNameFunct,formatCompleteDate,calculateDuration,elapsedTimeFunct,airportNameFunct } from '../../../../../helpers/formatdata';
import airlinesName from '../../../../../Constant/airlineName';

import { ReFund } from '../../../../../API/BackendAPI/allAPICalls';
import { ReIssue } from '../../../../../API/BackendAPI/allAPICalls';
import { Cancelation } from '../../../../../API/BackendAPI/allAPICalls';
import Loader from '../../../../../Loader/Loader';
// import '../styles.css';
const BookingDetail = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [getSearch , setSearch] = useState('');
  const [orders ,setOrders] = useState(userDetails);
  const [backLoading , setBackLoading] =useState(false);
  const [userData ,setUser] = useState(null);
  const [openDetails, setOpenDetails] = useState(null);
// -----------------------------------------------------------------------------
  const [isMobile , setIsMobile] = useState(window.innerWidth < 912);
  const [isSmallMob ,setSmallMob] = useState(window.innerWidth < 500);
  const [seatAvailable, setSeatAvailable] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(['']);
  const [isLoading , setLoading]=useState(false);

  useEffect(()=>{
    const handleResize = ()=>{
        setIsMobile(window.innerWidth < 912);
        setSmallMob(window.innerWidth<500);
    };
    window.addEventListener('resize', handleResize);
    return()=>{
        window.removeEventListener('resize', handleResize);
    }
},[])

//  ------------------------------------------------------------------------------
  const handleButtonClick = (id) => {
    setOpenDetails(openDetails === id ? null : id);
  };
  const ReFundCalled = (id)=>{
    ReFund(id);
    console.log(`Refund API called  for  booking ${id}`);
  }

  const CancelationCalled = (id)=>{
    Cancelation(id);
    console.log(`Cancel API called for booking ${id}`);

  }

  const reIssueCalled = (id)=>{
    ReIssue(id);
    console.log(`ReIssue API called for booking ${id}`);

  }

  const __handleSearch= (event)=>{
        const value = event.target.value;
          setSearch(value);
          if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.name?.toLowerCase().includes(getSearch.toLowerCase()) ||
                item.phone?.toLowerCase().includes(getSearch.toLowerCase()) ||
                item.airline?.toLowerCase().includes(getSearch.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
          setOrders(userDetails);
        }
 console.log("valuevalievalue",value);
  }

 useEffect(()=>{
  const fetchBackendData =async()=>{
    try{
      setLoading(true);
      const userData = await userDetailsBackend(setBackLoading);
    //  console.log("ApiCalledData",userData?.data.payload);
    // console.log("ApiCalledData",userData);
        setUser(userData);
        setLoading(false);
    }
    catch (error){
        console.error(error);
    }
} ;

fetchBackendData();
 },[]);
//  --------------------Start---------------------
const userPayLoad = userData?.data.payload;
console.log('userPayLoad',userPayLoad);

const userFlightId = userPayLoad?.map(items=>items.id);
console.log("userFlightId",userFlightId);

const flightdetails = userPayLoad?.map((item)=>item.flightDetails);
console.log("userFlightDetailsuserFlightDetails",flightdetails);
const seatsType = flightdetails?.fare?.passengerInfoList?.flatMap(item => item.passengerInfo.passengerType);
    const conSeatsType = seatsType?.join(', ');

const userInfo = userPayLoad?.map((items)=>items.pnrDetail);
console.log('userInfo',userInfo);
//  --------------------end---------------------
const handleChange = (event, index,id) => {
  const selectedOption = event.target.value;
  const newSelectedOptions = [...selectedOptions];
  newSelectedOptions[index] = selectedOption;
  setSelectedOptions(newSelectedOptions);

  switch (selectedOption) {
    case 'Refund':
      ReFundCalled(id);
      break;
    case 'ReIssue':
      reIssueCalled(id);
      break;
    case 'Cancel':
      CancelationCalled(id);
      break;
    default:
      // Handle other cases if needed
  }
};

const handleClear = (index) => {
  const newSelectedOptions = [...selectedOptions];
  newSelectedOptions[index] = '';
  setSelectedOptions(newSelectedOptions);
};


return (
  isLoading ? (
    <Loader/>
  ) : (
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2>Booking Details</h2>
          <div className='dashboard-content-search'>
            <input
              type='text'
              value={getSearch}
              placeholder='Search..'
              className='dashboard-content-input'
              onChange={e => __handleSearch(e)}
            />
          </div>
        </div>
        <div className="User_card_detail">
          <div className="iti_review_main">
            <div className="d-flex justify-content_start mt-2 mb-4">
            </div>
            {flightdetails?.map((items, index) => (
              <Fragment key={index}>
                <div>
                  <h4>{`Booking ${items.id}`}</h4>
                  {items?.schedualDetGet?.map((item, index) => (
                    <div key={index}>
                      <div className="iti_flight_details" >
                        {!isSmallMob && (
                          <div className="d-flex justify-content-between w-100">
                            <div className="d-flex justify-content-start align-self-center w-75">
                              <h5 className="iti_city_font">{cityNameFunct[items?.groupDescription[index]?.departureLocation]}</h5>
                              <span className="airport_spacing"><RedoOutlinedIcon /></span>
                              <h5 className="iti_city_font">{cityNameFunct[items?.groupDescription[index].arrivalLocation]}</h5>
                              <p className="d-flex align-self-center iti_date_spacing"> {formatCompleteDate(items?.groupDescription[index].departureDate)}</p>
                            </div>
                            <div className="w-25">
                              <div className='iti_refund_detail'>
                                <p>{items?.fare?.passengerInfoList[0]?.passengerInfo?.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {isSmallMob && (
                          <div className='d-flex justify-content-between w-100'>
                            <div className=" align-self-center w-75">
                              <div className='d-flex justify-content-start'>
                                <h5 className="iti_city_font">{cityNameFunct[items?.groupDescription[index].departureLocation]}</h5>
                                <span className="airport_spacing"><RedoOutlinedIcon /></span>
                                <h5 className="iti_city_font">{cityNameFunct[items?.groupDescription[index].arrivalLocation]}</h5>
                              </div>
                              <p className=" d-flex align-self-center iti_date_spacing iti_mob_spacing"> {formatCompleteDate(items?.groupDescription[index].departureDate)}</p>
                            </div>
                            <div className=" align-self-center w-25">
                              <div className='iti_refund_detail'>
                                <p>{items?.fare?.passengerInfoList[0]?.passengerInfo?.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {item.map((itm, idx) => {
                          const airlineName = itm.carrier.marketing;
                          const matchedAirline = airlinesName.find(airline => airline.id === airlineName);
                          return (
                            <Fragment key={idx}>
                              <div className="row">
                                <div className={` col-md-9 flight_complete_details ${isMobile ? 'col-md-12' : 'col-md-9'}`}>
                                  <div className='d-flex jusitfy-content-start'>
                                    <div className='align-self-center text-center'>
                                      <img src={matchedAirline ? matchedAirline.logo : airlineName} alt="" width="32px" height="32px" />
                                      <p className="iti_flight_no">{matchedAirline ? matchedAirline.name : airlineName}</p>
                                      <p className="iti_flight_no">{`${airlineName}-${itm.carrier.marketingFlightNumber}`}</p>
                                      <p className="iti_flight_no">{items?.classtype}</p>
                                    </div>
                                    <div className="seprator">
                                      <DonutLargeIcon className="donut_size" />
                                      <div className={`${isSmallMob ? 'iti_mob_line' : 'vertical-line'}`}></div>
                                      <DonutLargeIcon className="donut_size" />
                                    </div>
                                    <div>
                                      <div>
                                        <span className="iti_flight_timing"> {itm.departure.time.slice(0, 5)}</span>
                                        <span className="iti_city_code">{itm.departure.airport}</span>
                                        {isSmallMob ? (
                                          <div className="iti_airport_name ">{airportNameFunct[itm.departure.airport]}</div>
                                        ) : (
                                          <span className="iti_airport_name">{airportNameFunct[itm.departure.airport]}</span>
                                        )}
                                      </div>
                                      <div className="iti_content_spacing">
                                        <QueryBuilderOutlinedIcon /> {elapsedTimeFunct(itm.elapsedTime)}
                                      </div>
                                      <div>
                                        <span className="iti_flight_timing">{itm.arrival.time.slice(0, 5)}</span>
                                        <span className="iti_city_code">{itm.arrival.airport}</span>
                                        {isSmallMob ? (<div className="iti_airport_name ">{airportNameFunct[itm.arrival.airport]}</div>) : (<span className="iti_airport_name">{airportNameFunct[itm.arrival.airport]}</span>)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {isMobile ? (
                                  <div className="iti_content_spacing">
                                    <div className='iti_mob_border'>
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          <p className="fd_airport_name fd_space_baggages">No of Seats</p>
                                          <p className="fd_airport_name fd_space_baggages ">{`${items?.adults + items?.children + items?.infants}`}</p>
                                        </div>
                                        <div>
                                          <p className="fd_airport_name fd_space_baggages ">Seats Types</p>
                                          <p className="fd_airport_name fd_space_baggages ">
                                            {conSeatsType}
                                          </p>
                                        </div>
                                        <div>
                                          <div>
                                            {items?.baggageAllowance[index].pieceCount ? (
                                              <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                                            ) : (
                                              <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                                            )}
                                          </div>
                                          <p className="fd_airport_name fd_space_baggages mob_iti_text">{items?.baggageAllowance[index].pieceCount} {items?.baggageAllowance[index].weight} {items?.baggageAllowance[index].unit}</p>
                                        </div>
                                        <div>
                                          <p className="fd_airport_name fd_space_baggages">
                                            <span className={seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}>
                                              Remaining Seats
                                            </span>
                                          </p>
                                          <p className="fd_airport_name fd_space_baggages">{items?.baggageAllowance[index].pieceCount} {items?.baggageAllowance[index].weight} {items?.baggageAllowance[index].unit}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="col-md-3 iti_content_spacing">
                                    <div className='d-flex justify-content-between'>
                                      <div className="">
                                        <p className="fd_airport_name fd_space_baggages">No of Seats</p>
                                        <p className="fd_airport_name fd_space_baggages iti_difference">Seats Types</p>
                                        {items?.baggageAllowance[index].pieceCount ? (
                                          <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                                        ) : (
                                          <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                                        )}
                                        <p className="fd_airport_name fd_space_baggages">
                                          <span className={seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}>
                                            Remaining Seats
                                          </span>
                                        </p>
                                      </div>
                                      <div className="">
                                        <p className="fd_airport_name fd_space_baggages">{`${items?.adults + items?.children + items?.infants}`}</p>
                                        <p className="fd_airport_name fd_space_baggages iti_difference">
                                          {conSeatsType}
                                        </p>
                                        <p className="fd_airport_name fd_space_baggages">{items?.baggageAllowance[index].pieceCount} {items?.baggageAllowance[index].weight} {items?.baggageAllowance[index].unit}</p>
                                        {seatAvailable && seatAvailable.length > 0 ? (
                                          <p className={`fd_airport_name fd_space_baggages ${seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}`}>{`${seatAvailable[index]}`}</p>
                                        ) : (
                                          <p className='fd_airport_name fd_space_baggages'>...</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              {idx < item.length - 1 &&
                                <div className="fd_line_structure">
                                  <div className="fd_line"></div>
                                  <div className="fd_icon_wrapper">
                                    <p className="fd_middle_border"><DirectionsRunIcon /> {`Short layover ${calculateDuration(itm.arrival.time, item[idx + 1].departure.time)}`}</p>
                                  </div>
                                  <div className="fd_line"></div>
                                </div>
                              }
                            </Fragment>
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
              <div className='d-flex justify-content-end'>
                <div key={index}>
                  <Select
                    className='support_field'
                    labelId={`select-label-${index}`}
                    id={`select-${index}`}
                    value={selectedOptions[index] !== undefined ? selectedOptions[index] : ''}
                    onChange={(event) => handleChange(event, index, userFlightId[index])}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    endAdornment={
                      selectedOptions[index] && (
                        <InputAdornment position="end">
                          <IconButton aria-label="Clear" onClick={() => handleClear(index)}>
                            <ClearIcon className='support_clear_icon' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  >
                    <MenuItem value="" disabled>Customer Support</MenuItem>
                    <MenuItem value="Refund">Refund</MenuItem>
                    <MenuItem value="ReIssue">ReIssue</MenuItem>
                    <MenuItem value="Cancel">Cancel</MenuItem>
                  </Select>
                </div>

                <div className='m-1'>
                  <button className='btn btn-primary buttons_typo' onClick={() => handleButtonClick(index)}>
                    View
                  </button>
                </div>

              </div>
              {openDetails === index && (
                <div>
                  {userInfo?.map((item, id) => (
                    id === index && (
                      <div className='d-flex justify-content-start'>
                        {item.map((detail, detailIndex) => (
                          <div key={detailIndex} className='m-2 passnagerDetailsTypo'>
                            <h5 className='passnger_pnr_info'>Passenger Info</h5>
                            <p>{`ID: ${detail.id}`}</p>
                            <p>{`FName: ${detail.firstName}`}</p>
                            <p>{`LName: ${detail.lastName}`}</p>
                            <p>{`CNIC: ${detail.cnic}`}</p>
                            <p>{`Gender: ${detail.gender}`}</p>
                            <p>{`Passport: ${detail.passportNo}`}</p>
                            <p>{`Phone: ${detail.phoneNumber}`}</p>
                            <p>{`Email : ${detail.userEmail}`}</p>
                            <p>{`DOB: ${formatCompleteDate(detail.dateOfBirth)}`}</p>
                            <p>{`PassportExp: ${formatCompleteDate(detail.passportExpiryDate)}`}</p>
                          </div>
                        ))}
                      </div>
                    )
                  ))}
                </div>
              )}
            </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);
}

export default BookingDetail;