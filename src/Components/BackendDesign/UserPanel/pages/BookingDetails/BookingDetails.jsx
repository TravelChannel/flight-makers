import React, {useState, useEffect,Fragment} from 'react';
import EditModel from '../common/EditModel';
import userDetails from '../../../../../Constant/BackendData/userDetails';
import userDetailsBackend from '../../../../../API/BackendAPI/BackendAPI_Fun';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import { cityNameFunct,formatCompleteDate,calculateDuration,elapsedTimeFunct,airportNameFunct } from '../../../../../helpers/formatdata';
import airlinesName from '../../../../../Constant/airlineName';

// import { cityNameFunct,formatCompleteDate,calculateDuration,elapsedTimeFunct,airportNameFunct } from '../../../helpers/formatdata';
// import airlinesName from '../../../Constant/airlineName';


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

  // const openEditModel = ()=>{
  //   setIsOpen(true);
  // }
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
      const userData = await userDetailsBackend(setBackLoading);
    //  console.log("ApiCalledData",userData?.data.payload);
    console.log("ApiCalledData",userData?.data.payload);
        setUser(userData);
    }
    catch (error){
        console.error(error);
    }
} ;

fetchBackendData();
 },[]);


//  --------------------------------------

// ------------ALL PNR Detials Start------------
const allPNRs= userData?.data.payload;
// console.log("allPNR",allPNRs);



const allPNRuserDetails = allPNRs?.map((user)=>user.pnrDetail);

const allPassangersDetail = allPNRuserDetails?.map(item=>item.map(ref=>ref));
// console.log("allPassangersDetailallPassangersDetail",allPassangersDetail);



const allUsers = allPNRs?.map((items)=>items.pnrUserId);
console.log("allUsers",allUsers);
// console.log("allPNRuserDetails",allPNRuserDetails);


// ------------fetching SingleUSer all PNR -------------
const loggedInUserId = '1';  //pnrUserID specfiy the login user

const data = userData?.data?.payload ?? [];

const groupedData = data?.reduce((acc, item) => {
  const key = item?.pnrUserId;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(item);
  return acc;
}, {});


const extractedData = groupedData[loggedInUserId];   //Contain the active loginUser all Details

console.log('extractedData',extractedData);
// ------------fetching SingleUSer all PNR  end-------------

const pnrID = extractedData?.map((user) => user.id);
console.log('pnrID', pnrID);

const pnrDetails = extractedData?.map((user) => user.pnrDetail);
console.log('pnrDetails', pnrDetails);

const flightdetails = extractedData?.map((user) => user.flightDetails);
console.log('userFlightDetail', flightdetails);


// ----------------------Slected User Flight Detial ------------------------
const seatsType = flightdetails?.map(items=>items.fare?.passengerInfoList?.flatMap(item => item.passengerInfo?.passengerType));
const conSeatsType = seatsType?.join(', ');
console.log("seatsType",conSeatsType);

const FlightData = flightdetails?.map(items=>items.schedualDetGet);
console.log("FlightData",FlightData)

// ------------------------------------------------------------------------------


// const pnrBookingIds = pnrDetails?.flatMap(userArray => userArray.map(user => user.pnrBookingId));

// console.log(pnrBookingIds);

// const specificDetails = extractedData?.filter(item => item.id === "3");

// console.log('specificDetails', specificDetails);


// ------
// const ViewPassangerDetails =()=>{
// setUserDetails(!showUserDetails);
// }
// -----------------------------------------
  return (
    <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Booking Detials</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={getSearch}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>
                {/* <h3>
                  {userData?.data?.message}
                </h3> */}
                <table>
                    <thead>
                        {/* <th>ID</th> */}
                        <th>PNR </th>
                        {/* <th>createdAt</th> */}
                        {/* <th>Phone</th> */}
                        {/* <th>STATUS</th> */}
                        {/* <th>Flight</th> */}
                    </thead>
                    <tbody>
                    {
                      extractedData && extractedData.map((items ,value)=>(
                        <tr key={value}>
                          <td>
                            {items.pnr}
                          </td>
                        </tr>
                      ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="User_card_detail">
                    {pnrID?.map((id) => {
                      const specificDetails = extractedData?.filter((item) => item.id === id);
                      const currentFlightDetails = flightdetails?.find((details) => details.id === id);
                      console.log('currentFlightDetails',currentFlightDetails)
                      return (
                        <div key={id} className='bg-white'>
                            <div className='main_flightDetails'>
                            {currentFlightDetails.schedualDetGet.map((item, index) => (
                    <div key={index}>
                        <div className="iti_flight_details" >
                            {
                                !isSmallMob && (
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex justify-content-start align-self-center w-75">
                                    <h5 className="iti_city_font">{cityNameFunct[currentFlightDetails.groupDescription[index].departureLocation]}</h5> <span className="airport_spacing"><RedoOutlinedIcon /></span> <h5 className="iti_city_font">{cityNameFunct[currentFlightDetails.groupDescription[index].arrivalLocation]}</h5>
                                    <p className=" d-flex align-self-center iti_date_spacing"> {formatCompleteDate(currentFlightDetails.groupDescription[index].departureDate)}</p>
                                </div>
                                <div className="w-25">
                                    <div className='iti_refund_detail'>
                                        <p>{currentFlightDetails.fare.passengerInfoList[0].passengerInfo.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p>
                                    </div>
                                </div>
                            </div>
                                )
                            }
                            {
                                isSmallMob &&(
                            <div className='d-flex justify-content-between w-100'>
                                <div className=" align-self-center w-75">
                                    <div className='d-flex justify-content-start'>
                                        <h5 className="iti_city_font">{cityNameFunct[currentFlightDetails.groupDescription[index].departureLocation]}</h5> 
                                        <span className="airport_spacing"><RedoOutlinedIcon /></span> 
                                        <h5 className="iti_city_font">{cityNameFunct[currentFlightDetails.groupDescription[index].arrivalLocation]}</h5>
                                    </div>
                                    <p className=" d-flex align-self-center iti_date_spacing iti_mob_spacing"> {formatCompleteDate(currentFlightDetails.groupDescription[index].departureDate)}</p>
                                </div>
                                <div className=" align-self-center w-25">
                                    <div className='iti_refund_detail'>
                                        <p>{currentFlightDetails.fare.passengerInfoList[0].passengerInfo.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p>
                                    </div>
                                </div>
                            </div>

                                )
                            }
                            {item.map((itm, idx) => {
                                const airlineName = itm.carrier.marketing;
                                const matchedAirline = airlinesName.find(airline => airline.id === airlineName);
                                return (
                                    <Fragment>
                                        <div className="row">
                                            <div className={` col-md-9 flight_complete_details ${isMobile ? 'col-md-12':'col-md-9'}`}>
                                                <div className='d-flex jusitfy-content-start'>
                                                    <div className='align-self-center text-center'>
                                                        <img src={matchedAirline ? matchedAirline.logo : airlineName} alt="" width="32px" height="32px" />
                                                        <p className="iti_flight_no">{matchedAirline ? matchedAirline.name : airlineName}</p>
                                                        <p className="iti_flight_no">{`${airlineName}-${itm.carrier.marketingFlightNumber}`}</p>
                                                        <p className="iti_flight_no">{currentFlightDetails.classtype}</p>
                                                    </div>
                                                    <div className="seprator">
                                                        <DonutLargeIcon className="donut_size" />
                                                        <div className={`${isSmallMob ? 'iti_mob_line':'vertical-line'}`}></div>
                                                        <DonutLargeIcon className="donut_size" />
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <span className="iti_flight_timing"> {itm.departure.time.slice(0, 5)}</span>
                                                             <span className="iti_city_code">{itm.departure.airport}</span>
                                                            {isSmallMob ? (<div className="iti_airport_name ">{airportNameFunct[itm.departure.airport]}</div>):(<span className="iti_airport_name">{airportNameFunct[itm.departure.airport]}</span>)}
                                                        </div>
                                                        <div className="iti_content_spacing">
                                                            <QueryBuilderOutlinedIcon /> {elapsedTimeFunct(itm.elapsedTime)}
                                                        </div>
                                                        <div>
                                                            <span className="iti_flight_timing">{itm.arrival.time.slice(0, 5)}</span>
                                                             <span className="iti_city_code">{itm.arrival.airport}</span> 
                                                            {
                                                                isSmallMob ?( <div className="iti_airport_name ">{airportNameFunct[itm.arrival.airport]}</div>):( <span className="iti_airport_name">{airportNameFunct[itm.arrival.airport]}</span>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           {
                                           isMobile ? (
                                              <div className="iti_content_spacing">
                                                <div className='iti_mob_border'>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                        <p className="fd_airport_name fd_space_baggages">No of Seats</p>
                                                        <p className="fd_airport_name fd_space_baggages ">{`${currentFlightDetails.adults+currentFlightDetails.children+currentFlightDetails.infants}`}</p>
                                                        </div>
                                                      <div>
                                                        <p className="fd_airport_name fd_space_baggages ">Seats Types</p>
                                                        <p className="fd_airport_name fd_space_baggages ">
                                                                {conSeatsType}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <div>
                                                            {
                                                              currentFlightDetails.baggageAllowance[index].pieceCount ? (
                                                                <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                                                                ) : (
                                                                <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                                                                )
                                                            }
                                                            </div>
                                                            <p className="fd_airport_name fd_space_baggages mob_iti_text">{currentFlightDetails.baggageAllowance[index].pieceCount} {currentFlightDetails.baggageAllowance[index].weight} {currentFlightDetails.baggageAllowance[index].unit}</p>

                                                      </div>
                                                      <div>
                                                        <p className="fd_airport_name fd_space_baggages">
                                                            <span className={seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}>
                                                                Remaining Seats
                                                            </span>
                                                        </p>
                                                        <p className="fd_airport_name fd_space_baggages">{currentFlightDetails.baggageAllowance[index].pieceCount} {currentFlightDetails.baggageAllowance[index].weight} {currentFlightDetails.baggageAllowance[index].unit}</p>
                                                      </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            ):(  
                                            <div className="col-md-3 iti_content_spacing">
                                                <div className='d-flex justify-content-between'>
                                                    <div className="">
                                                        <p className="fd_airport_name fd_space_baggages">No of Seats</p>
                                                        <p className="fd_airport_name fd_space_baggages iti_difference">Seats Types</p>
                                                        {
                                                          currentFlightDetails.baggageAllowance[index].pieceCount ? (
                                                            <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                                                            ) : (
                                                            <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                                                            )
                                                        }
                                                        <p className="fd_airport_name fd_space_baggages">
                                                        <span className={seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}>
                                                            Remaining Seats
                                                        </span>
                                                    </p>
                                                    </div>
                                                    <div className="">
                                                        <p className="fd_airport_name fd_space_baggages">{`${currentFlightDetails.adults+currentFlightDetails.children+currentFlightDetails.infants}`}</p>
                                                        <p className="fd_airport_name fd_space_baggages iti_difference">
                                                            {conSeatsType}
                                                        </p>
                                                        <p className="fd_airport_name fd_space_baggages">{currentFlightDetails.baggageAllowance[index].pieceCount} {currentFlightDetails.baggageAllowance[index].weight} {currentFlightDetails.baggageAllowance[index].unit}</p>
                                                        {seatAvailable && seatAvailable.length > 0 ? (
                                                        <p className={`fd_airport_name fd_space_baggages ${seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}`}>{`${seatAvailable[index]}`}</p>
                                                    ) : (
                                                        <p className='fd_airport_name fd_space_baggages'>...</p>
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                           }
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
                )
                )}
                                    
                                        
                                        <div className='text-end align-self-end'>
                                              <p className='iti_airport_name'>{`OrderId # ${id}`}</p>
                                              <button className='btn btn-primary buttons_typo' onClick={() => handleButtonClick(id)}>
                                                View
                                              </button>
                                        </div>

                                       
                            </div>

{/* -------------------------------------------------main----------------------------------------------- */}
                          {openDetails === id && (
                            <div>
                              {specificDetails?.map((user, index) => (
                                <div key={index} className='d-flex justify-content-start '>
                                  {user.pnrDetail.map((detail, detailIndex) => (
                                    <div key={detailIndex} className='m-2 passnagerDetailsTypo'>
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
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                {/* ------------------------------------------------------------ */}

                <div className="User_card_detail">
                <table className="table table-bordered">
                      <thead>
                          <tr>
                            <th>ID</th>
                            <th>PNRBookingID</th>
                            <th>FName</th>
                            <th>LName</th>
                            <th>CNIC</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Passport</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>PassportExp</th>
                          </tr>
                      </thead>
                      <tbody>
                      { allPassangersDetail?.map(items =>
                                  items.map((ref, index) => (
                                    <tr key={index}>
                                      <td>{ref.id}</td>
                                      <td>{ref.pnrBookingId}</td>
                                      <td>{ref.firstName}</td>
                                      <td>{ref.lastName}</td>
                                      <td>{ref.cnic}</td>
                                      <td>{ref.dateOfBirth}</td>
                                      <td>{ref.gender}</td>
                                      <td>{ref.passportNo}</td>
                                      <td>{ref.phoneNumber}</td>
                                      <td>{ref.userEmail}</td>
                                      <td>{ref.passportExpiryDate}</td>
                                    </tr>
                                  ))
                                )
                              }
                        </tbody>

              </table>

                    </div>
{/* ------------------------------------------------------------------------------------- */}
        </div>
  )
}

export default BookingDetail;