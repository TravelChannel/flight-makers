import React, { useState, useEffect, Fragment } from "react";
import * as image from "../Constant/images";
import FlightIcon from '@mui/icons-material/Flight';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';
import { useLocation } from "react-router-dom";
import { requestGetBooking } from "../API/index.js";
import Loader from '../Loader/Loader.jsx';
import { airportNameFunct,cityNameFunct } from "../helpers/formatdata.js";
import { airsialBookingDetail } from "../API/index.js";
import { GetDetailByPNR } from "../API/BackendAPI/GetDetailbyPNR.js";
import { useFormData } from "../Context/FormDataContext.jsx";
import { AirSialTravDetial } from "../API/index.js";
import { useNavigate } from "react-router-dom";

const Customersupport = () => {
    const navigate = useNavigate();
const [isLoading , setLoading] = useState(false);
const [isAirSial , setAirSial] = useState(false);
const [pnrData , setPnrData] = useState({});
const [airSialData ,setAirSialData] = useState({});

const [usersDetail ,setUsersDetails] = useState([]);

const { setShowHeader } = useFormData();
// console.log("hello World",formData);
// -------------------2----------------------------
// const updateFormDataFromPage2 = () => {
//     setFormData([...formData, { airSialData }]);
//   };
// console.log("formDatakkk",formData);
const pricingStatusName = pnrData?.fares?.map(item => item.pricingStatusName) ?? [];

const  formDepartDate =  (startDate)=>{
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const formattedDate = new Date(startDate).toLocaleDateString('en-US', options);
    return formattedDate;
}
const  ArrangeDateFormat = (JourneyDate) =>{
     const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
     return formattedDate;
}
const DisplayTime = (times)=>{
    const time = new Date(`2000-01-01T${times}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return time;
}

const totalDuration = (durationInMinutes)=>{
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}h:${formattedMinutes}m`;
}
// ----------------------------------------------
const flightDetails = pnrData?.flights?.map((flight, index) =>{
    const correspondingBaggage  =pnrData?.fareOffers?.[0];
    return(
        <Fragment>
   <div className="itineryDetailssty mt-4" key={index}> 
   <div className="d-flex justify-content-start">
    <div>
        <FlightIcon className="airplane-rotated-icon" />
    </div>
    <div>
        <h5>{`Departure: ${formDepartDate(flight.departureDate)}`}</h5>
        <h6 className="verify_prior">Please verify flight times prior to departure</h6>
    </div>
    </div>
    <div className="row my-3 " key={index}>
        <div className="col-md-4 mb-3 ">
            <h4 className="mb-1">{flight.airlineName}</h4>
            <h5 className="mb-2">{`${flight.operatingAirlineCode}-${flight.operatingFlightNumber}`}</h5>
            <p><span className="span_verify_prior mb-2">Duration: </span>{totalDuration(flight.durationInMinutes)}</p>
            <p><span className="span_verify_prior mb-2">Class: </span>{`${flight.cabinTypeCode}-${flight.cabinTypeName}`}</p>
        </div>
        <div className="col-md-4 mb-3">
            <div className="row">
                <div className="d-flex justify-content-between">
                    <div>
                        <h4 className="font-weight-bolder text-center" >{flight.fromAirportCode} </h4>
                        <p className="airport_ticket_bok text-center">{airportNameFunct[flight.fromAirportCode]}</p>
                    </div>
                    <div><FlightIcon className="plane-mark-rotated-icon" /></div>
                    <div>
                        <h4 className="font-weight-bolder text-center">{flight.toAirportCode}  </h4>
                        <p className="airport_ticket_bok text-center">{airportNameFunct[flight.toAirportCode]}</p>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col text-center ">
                    <p className="text-center">Departing At: </p>
                    <p className="ticket_book_det text-center ">{DisplayTime(flight.departureTime)}</p>
                    <p>Terminal: </p>
                    <p className="ticket_book_terminal">{flight?.departureTerminalName || '_'}</p>
                    <p>departureGate: <span className="ticket_book_det">{flight?.departureGate ||'_'}</span></p>

                </div>
                <div className="col text-center">
                    <p>Arrival  At: </p>
                    <p className="ticket_book_det">{DisplayTime(flight.arrivalTime)}</p>
                    <p>Terminal:</p>
                    <p className="ticket_book_terminal">{flight?.arrivalTerminalName ||'_'}</p>
                    <p>arrivalGate: <span className="ticket_book_det">{flight?.arrivalGate ||'_'}</span></p>

                </div>
            </div>
        </div>
        <div className="col-md-4 mb-3">
            
            <p><span className="span_verify_prior mt-2">Aircraft: </span>{`${flight.aircraftTypeCode} ${flight.aircraftTypeName}`}</p>
            <p><span className="span_verify_prior mt-2">Seat No: </span>0</p>
            <p>
            <span className="span_verify_prior mt-2">Meals: </span>
            {flight.meals ? flight.meals.map((disc, index) => disc.description) : "Nill"}
            </p>
            <p>
            <span className="span_verify_prior mt-2">Hand Baggage Allowence: </span>
            {correspondingBaggage.cabinBaggageAllowance?.totalWeightInKilograms
                ? `${correspondingBaggage.cabinBaggageAllowance.totalWeightInKilograms} KG`
                : (correspondingBaggage.cabinBaggageAllowance?.baggagePieces?.[0]?.maximumWeightInKilograms &&
                    `${correspondingBaggage.checkedBaggageAllowance.baggagePieces[0].maximumWeightInKilograms} KG`)}
            </p>
            <p>
            <span className="span_verify_prior mt-2">Checked Baggage Allowance: </span>
            {correspondingBaggage.checkedBaggageAllowance?.totalWeightInKilograms
                ? `${correspondingBaggage.checkedBaggageAllowance.totalWeightInKilograms} KG`
                : (correspondingBaggage.checkedBaggageAllowance?.baggagePieces?.[0]?.maximumWeightInKilograms &&
                    `${correspondingBaggage.checkedBaggageAllowance.baggagePieces[0].maximumWeightInKilograms} KG`)}
            </p>

        </div>
</div>
   </div>
    </Fragment>
    )
});

// --------------------------------------------------



const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const inputPnr = searchParams.get('inputPNR');

    const qrCodeValue = inputPnr;
    const qrCodeSize = 70;
    const encryptText = (text) => {
        const myKey = 'KashifHussainTheCreatorofThisFareMakersSite';
        const encrypted = CryptoJS.TripleDES.encrypt(text, myKey).toString();
        return encrypted;
    };
    const hashEncripted = encryptText(qrCodeValue);



   
    // const fetchBookingDetails = async () => {
    //     try {
    //         setLoading(true);
    //         const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
    //         console.log("extra_Bagg", extra_Bagg);
    
    //         if (extra_Bagg?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF") {
    //             USerDetailResp();
    //             fetchData();
    //             const airSialUserDetail = await airsialBookingDetail();

    //             console.log('airSialUserDetail',airSialUserDetail);
    //             setAirSialData(airSialUserDetail);
    //             setAirSial(true);
    //         } else {
    //             const userDetails = await requestGetBooking();
    //             console.log("userDetails",userDetails);
    //             setPnrData(userDetails);
    //         }
    //     } catch (error) {
    //         console.error("Error", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const USerDetailResp = async () => {
    //     try{
    //         const activepnrNumber = JSON.parse(localStorage.getItem("PNRNumber"));
    //         const responce = await GetDetailByPNR (activepnrNumber);
    //         console.log("responceofCurrentBooking",responce.data.payload.pnrDetail[0]);
    //         setUsersDetails(responce.data.payload.pnrDetail[0]);
    //     }catch(error){
    //         console.error("error at responceofCurrentBooking ",error);
    //     }
    // }

    // const fetchData = async()=>{
    //     const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
    //     const activepnrNumber = JSON.parse(localStorage.getItem("PNRNumber"));
    //     if (extra_Bagg?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF"){
    //         try{
    //             const airsialtravllersDetail = await AirSialTravDetial(usersDetail,activepnrNumber);
    //             console.log("airsialtravllersDetail",airsialtravllersDetail);
        
    //         }catch(error){
    //             console.error("Error", error);
    //         }
        
    //      }
    
    //     }
    // useEffect(() => {
    //     fetchBookingDetails();
    // }, []);


    // -------------------------------------
    const fetchBookingDetails = async () => {
        try {
            setLoading(true);
            setShowHeader(false);
            const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
            console.log("extra_Bagg", extra_Bagg);
    
            if (extra_Bagg?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF") {
                const activepnrNumber = JSON.parse(localStorage.getItem("PNRNumber"));
                const userDetailsResponse = await USerDetailResp(activepnrNumber); // Wait for user detail response
                const userDetails111 = userDetailsResponse?.data?.payload?.pnrDetail;
                console.log('userDetails111',userDetails111);

                await fetchData(userDetails111, activepnrNumber); // Pass user details to fetchData
                const airSialUserDetail = await airsialBookingDetail();
                console.log('airSialUserDetail',airSialUserDetail);
                setAirSialData(airSialUserDetail);
                setAirSial(true);
            } else {
                const userDetails = await requestGetBooking();
                console.log("userDetails", userDetails);
                setPnrData(userDetails);
            }
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading(false);
        }
    };
    
    const USerDetailResp = async (activepnrNumber) => {
        try{
            const responce = await GetDetailByPNR(activepnrNumber);
            console.log("responceofCurrentBooking", responce.data.payload.pnrDetail);
            return responce;
            setUsersDetails(responce.data.payload.pnrDetail);
        } catch(error) {
            console.error("Error at responceofCurrentBooking ", error);
        }
    };
    
    const fetchData = async (usersDetail, activepnrNumber) => { // Modify to accept usersDetail parameter
        if (activepnrNumber && activepnrNumber !== "") {
            try {
                const airsialtravllersDetail = await AirSialTravDetial(usersDetail, activepnrNumber);
                console.log("airsialtravllersDetail", airsialtravllersDetail);
                // setAirsialData(airsialtravllersDetail);
                // setLoading(false);
            } catch (error) {
                console.error("Error", error);
            }
        }
    };
    
    useEffect(() => {
        fetchBookingDetails();
    }, []);

    // -------------------------------------

    // console.log("airSialUserData",airSialData);
   

    // const identityDocumentss = pnrData?.travelers?.identityDocuments;
    // console.log("identityDocumentsDetails",identityDocumentss);

// ---------------------------------------------------------
const outboundDepartureDate = airSialData?.Response?.Data?.outbound?.flightInfo?.dpdate || "N/A";
const inboundDepartDate = airSialData?.Response?.Data?.inbound?.flightInfo?.dpdate || "N/A";
const outboundOrigion = airSialData?.Response?.Data?.outbound?.flightInfo?.orig|| "N/A";
const outboundDes = airSialData?.Response?.Data?.outbound?.flightInfo?.dest|| "N/A";
const inboundOrigion = airSialData?.Response?.Data?.inbound?.flightInfo?.orig|| "N/A";
const inboundDes = airSialData?.Response?.Data?.inbound?.flightInfo?.dest|| "N/A";

const outboundFlightInfo = airSialData?.Response?.Data?.outbound?.flightInfo;
const inboundFlightInfo = airSialData?.Response?.Data?.inbound?.flightInfo;

const parseTime = (timeString) => {
    if (!timeString) {
        return { hours: 0, minutes: 0 };
    }

    const [time, period] = timeString.split(' ');

    if (!time || !period) {
        return { hours: 0, minutes: 0 };
    }

    const [hours, minutes] = time.split(':').map(Number);

    // Adjust hours for PM, considering 12:00 PM as noon
    const adjustedHours = period === 'AM' ? (hours % 12 === 0 ? 12 : hours % 12) : (hours % 12) + 12;

    return {
        hours: adjustedHours,
        minutes,
    };
};

const calculateDurationInMinutes = (departTime, arrivalTime) => {
    const parseDeparture = parseTime(departTime);
    let parseArrival = parseTime(arrivalTime);

    // If arrival is before departure, add 24 hours to arrival
    if (parseArrival.hours < parseDeparture.hours) {
        parseArrival.hours += 24;
    }

    const departureMinutes = parseDeparture.hours * 60 + parseDeparture.minutes;
    const arrivalMinutes = parseArrival.hours * 60 + parseArrival.minutes;

    return arrivalMinutes - departureMinutes;
};

const departTime = outboundFlightInfo?.departureTime;
const arrivalTime = outboundFlightInfo?.arrivalTime;
const outboundTotalDurationInMinutes = calculateDurationInMinutes(departTime, arrivalTime);


const inboundDepartTime = inboundFlightInfo?.departureTime;
const inboundArriveTime = inboundFlightInfo?.arrivalTime;
const inboundTotalDurationInMinutes = calculateDurationInMinutes(inboundDepartTime,inboundArriveTime);

console.log("inboundTotalDurationInMinutes",inboundTotalDurationInMinutes);
const outboundBaggage = airSialData?.Response?.Data?.outbound?.fareType?.WEIGHT;
const inboundBaggage = airSialData?.Response?.Data?.inbound?.fareType?.WEIGHT;

const totalAdults = airSialData?.Response?.Data?.passengerCount?.totalAdult;
const totalChilds = airSialData?.Response?.Data?.passengerCount?.totalChild;
const totalinfants = airSialData?.Response?.Data?.passengerCount?.totalInfant;

// console.log("total",totalAdults, totalChilds,totalinfants);
const totalPassangers = totalAdults + totalChilds + totalinfants;

// console.log("toatlPassangers",totalPassangers);

// ---------------------------------------------------------

const handleNavigate = () =>{
    navigate('/');
}

    return (
           <div className='container'>
           {
            isLoading ? (
                <Loader/>
            ):(
                <div className="container bg-white p-5">
                    <div className="ticket_display">
                        <div className="d-flex justify-content-between">
                            <div id="logobox" className="hdrLogo" onClick ={handleNavigate} >
                                <img
                                    src={image.default}
                                    className="imgView"
                                    alt="FM-LOGO"
                                />
                                <span id="logotext" className="colorBlue d-block" >
                                    Travel Channel Int'l (Pvt).Ltd
                                </span>
                            </div>
                            <h1 className="colorBlue">E-Reservation</h1>
                            <QRCode value={`https://fmcrm.azurewebsites.net/ViewItinerary.aspx?PNR=${hashEncripted}=`} size={qrCodeSize} />
                        </div>
                        {/* <h6 className="text-danger mt-3">Payment is Pending</h6> */}
                        <div className="d-flex justify-content-between mt-5">
                            <div className="d-flex justify-content-start">
                                {
                                    isAirSial ? (
                                        <div className="d-flex justify-content-start">
                                            <h4>{ArrangeDateFormat(outboundDepartureDate)}</h4>
                                            {inboundDepartDate !=='N/A' && (
                                                <>
                                                    <ArrowRightIcon className="align-self-center ticket_right_arrrow"/>  
                                                    <h4>{ArrangeDateFormat(inboundDepartDate)}</h4>
                                                </>
                                            )}
                                        </div>
                                    ):(
                                       <div className="d-flex justify-content-start">
                                       <h4>{ArrangeDateFormat(pnrData.startDate)}</h4> <ArrowRightIcon className="align-self-center ticket_right_arrrow"/>  <h4>{ArrangeDateFormat(pnrData.endDate)}</h4>
                                       </div>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-end ">
                          {
                            isAirSial ?(
                                <div className="d-flex justify-content-start">
                                <h4  className="journeys_spacing">{cityNameFunct[outboundOrigion]} → {cityNameFunct[outboundDes]} </h4>
                                {
                                    inboundOrigion !=='N/A'&& (
                                        <h4  className="journeys_spacing">{cityNameFunct[inboundOrigion]} → {cityNameFunct[inboundDes]} </h4>
                                    )
                                }
                                </div>
                            ):(
                                <>
                                {
                                pnrData.journeys &&
                                pnrData.journeys.map((items, index) => (
                                    <h4 key={index} className="journeys_spacing">
                                    {cityNameFunct[items.firstAirportCode]} → {cityNameFunct[items.lastAirportCode]}
                                    </h4>
                                ))
                                }
                                </>
                            )
                          }
                            </div>    
                        </div>
                        <table className="table table-bordered mt-3">
                            <thead>
                            <tr>
                                <th>Passenger</th>
                                <th>Seats</th>
                                {isAirSial ? (
                                    <th>CNIC</th>
                                ) : (
                                    <th>Passport-No</th>
                                )}
                                <th>eTicket Receipt(s)</th>
                            </tr>
                            </thead>
                           {
                            isAirSial ? (
                                <>
                                <tbody>
                                    {Object.values(airSialData?.Response?.Data?.pnrNames?.adult || {}).map((adultDetails, index) => (
                                        <tr key={index}>
                                            <td>{adultDetails.name}</td>
                                            <td>{adultDetails.booking_status}</td>
                                            <td>{adultDetails.nic}</td>
                                            <td>___</td>
                                        </tr>
                                    ))}
                                </tbody>
                                </>

                            ):(
                               <>
                               <tbody>
                               
                               {pnrData.travelers && pnrData.travelers.map((traveler, index) => (
                                   <React.Fragment key={index}>
                                       {traveler.identityDocuments.map((document, documentIndex) => (
                                           <tr key={`${index}-${documentIndex}`}>
                                               <td>{`${document.givenName} ${document.surname}`}</td>
                                               <td>{pricingStatusName}</td>
                                               <td>{document.documentNumber}</td>
                                               <td>___</td>
                                           </tr>
                                       ))}
                                   </React.Fragment>
                               ))}
                               </tbody>
                               </>
                            )
                           }
                        </table>
                        <div className="d-flex justify-content-between mt-3">
                            <h6><span>Booking Reference:</span> {isAirSial ? (airSialData?.Response?.Data?.pnrDetail.PNRN):(pnrData?.request?.confirmationId)}</h6>
                            <h6><span>Airline Reference:</span> DCPK*8PY9Y6</h6>
                        </div>
                        <div >
                          {
                            isAirSial ?(
                          <div>
                          <div className="itineryDetailssty mt-4">
                                <div className="d-flex justify-content-start">
                                <div>
                                    <FlightIcon className="airplane-rotated-icon" />
                                </div>
                                <div>
                                    <h5>{`departure: ${formDepartDate(outboundFlightInfo?.dpdate)}`}</h5>
                                    <h6 className="verify_prior">Please verify flight times prior to departure</h6>
                                </div>
                                </div>
                                <div className="row my-3 ">
                                    <div className="col-md-4 mb-3 ">
                                        <h4>AirSial</h4>
                                        <h5 className="mb-3">{outboundFlightInfo?.flno}</h5>
                                        <p><span className="span_verify_prior mt-2">Duration: </span>{totalDuration(outboundTotalDurationInMinutes)}</p>
                                        <p><span className="span_verify_prior mt-2">Class: </span>Standard Economy</p>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="row">
                                            <div className="d-flex justify-content-between text-center">
                                                <div>
                                                    <h4 className="font-weight-bolder">{outboundFlightInfo?.orig} </h4>
                                                    <p className="airport_ticket_bok">{airportNameFunct[outboundFlightInfo?.orig]}</p>
                                                </div>
                                                <div><FlightIcon className="plane-mark-rotated-icon" /></div>
                                                <div>
                                                    <h4 className="font-weight-bolder">{outboundFlightInfo?.dest}  </h4>
                                                    <p className="airport_ticket_bok">{airportNameFunct[outboundFlightInfo?.dest]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3 text-center">
                                            <div className="col">
                                                <p>Departing At: </p>
                                                <p className="ticket_book_det">{outboundFlightInfo?.departureTime}</p>
                                                <p>Terminal: <span className="ticket_book_det">Nill</span></p>
                                            </div>
                                            <div className="col">
                                                <p>Arrival  At: </p>
                                                <p className="ticket_book_det">{outboundFlightInfo?.arrivalTime}</p>
                                                <p>Terminal: <span className="ticket_book_det">Nill</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <p><span className="span_verify_prior mt-2">Flight No: </span>{outboundFlightInfo?.flno}</p>
                                        <p><span className="span_verify_prior mt-2">Stop(s): </span>00</p>
                                        {/* <p><span className="span_verify_prior mt-2">Seat No: </span>0</p> */}
                                        <p><span className="span_verify_prior mt-2">TotalPassangers: </span>{totalPassangers}</p>
                                        <p><span className="span_verify_prior mt-2">Baggage Allowence: </span>{`${outboundBaggage} KG`}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    inboundFlightInfo && (
                                        <div className="itineryDetailssty mt-4">
                                <div className="d-flex justify-content-start">
                                <div>
                                    <FlightIcon className="airplane-rotated-icon" />
                                </div>
                                <div>
                                    <h5>{`departure: ${formDepartDate(inboundFlightInfo?.dpdate)}`}</h5>
                                    <h6 className="verify_prior">Please verify flight times prior to departure</h6>
                                </div>
                                </div>
                                <div className="row my-3 ">
                                    <div className="col-md-4 mb-3 ">
                                        <h4>AirSial</h4>
                                        <h5 className="mb-3">{inboundFlightInfo?.flno}</h5>
                                        <p><span className="span_verify_prior mt-2">Duration: </span>{totalDuration(inboundTotalDurationInMinutes)}</p>
                                        <p><span className="span_verify_prior mt-2">Class: </span>Standard Economy</p>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="row">
                                            <div className="d-flex justify-content-between text-center">
                                                <div>
                                                    <h4 className="font-weight-bolder">{inboundFlightInfo?.orig} </h4>
                                                    <p className="airport_ticket_bok">{airportNameFunct[inboundFlightInfo?.orig]}</p>
                                                </div>
                                                <div><FlightIcon className="plane-mark-rotated-icon" /></div>
                                                <div>
                                                    <h4 className="font-weight-bolder">{inboundFlightInfo?.dest}  </h4>
                                                    <p className="airport_ticket_bok">{airportNameFunct[inboundFlightInfo?.dest]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3 text-center">
                                            <div className="col">
                                                <p>Departing At: </p>
                                                <p className="ticket_book_det">{inboundFlightInfo?.departureTime}</p>
                                                <p>Terminal: <span className="ticket_book_det">Nill</span></p>
                                            </div>
                                            <div className="col">
                                                <p>Arrival  At: </p>
                                                <p className="ticket_book_det">{inboundFlightInfo?.arrivalTime}</p>
                                                <p>Terminal: <span className="ticket_book_det">Nill</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <p><span className="span_verify_prior mt-2">Aircraft: </span>{inboundFlightInfo?.flno}</p>
                                        <p><span className="span_verify_prior mt-2">Stop(s): </span>00</p>
                                        {/* <p><span className="span_verify_prior mt-2">Seat No: </span>0</p> */}
                                        <p><span className="span_verify_prior mt-2">TotalPassangers: </span>{totalPassangers}</p>
                                        <p><span className="span_verify_prior mt-2">Baggage Allowence: </span>{`${inboundBaggage} KG`}</p>
                                    </div>
                                </div>
                            </div>
                                    )
                                }
                            </div>
                          </div>
                            ):(
                                 
                            <div>
                               {flightDetails}
                            </div>
                            )
                          }
                        </div>
                        <div className="mt-3">
                            <p className="ticket_book_heading">TERMS AND CONDITIONS</p>
                            <p>No terms and conditions found refer to GDS for more details</p>
                            <p className="ticket_book_heading border-top mt-3 pt-3">Travel Channel Int. Pvt. Ltd.</p>
                            <p>3-UGF, Century Tower, Kalma Chowk Main Boulevard, Gulberg-III Lahore, Pakistan</p>
                            <div className="d-flex justify-content-between mt-2">
                                <p><span className="span_verify_prior">E-mail: </span>support@faremakers.com</p>
                                <p><span className="span_verify_prior">UAN: </span> (+92-42) 03111-147-111</p>
                            </div>
                            <p className="border-top mt-3 pt-3"><span className="span_verify_prior">www.Faremakers.com </span>Powered By Travel Channel International (Pvt.) Ltd. Pakistan. Which is Nationwide IATA accredited company, Founded in 2003 & successfully operating the business in Lahore, Karachi & Islamabad. Our Goal is Making Travel Simple & Easy through Giving Best Travel Services all over the Pakistan.</p>
                        </div>
                    </div>

                </div>

            )
           }


           {/* <button onClick={updateFormDataFromPage2}>Update FormData from Page 2</button> */}
               
        </div>
    );
}
export default Customersupport;