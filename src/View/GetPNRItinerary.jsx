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

const Customersupport = () => {
const [isLoading , setLoading] = useState(false);
const [pnrData , setPnrData] = useState({});

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



   
    const fetch  = async() =>{
        try{
            setLoading(true);
            const userDetails = await  requestGetBooking();
            setPnrData(userDetails);
            setLoading(false);
        }catch(error){
            console.error("Error", error);
        }
    }

    useEffect(()=>{
        fetch()
    },[]);

    console.log("allUserData",pnrData);

    // const identityDocumentss = pnrData?.travelers?.identityDocuments;
    // console.log("identityDocumentsDetails",identityDocumentss);

    return (
           <div className='container'>
           {
            isLoading ? (
                <Loader/>
            ):(
                <div className="container bg-white p-5">
                    <div className="ticket_display">
                        <div className="d-flex justify-content-between">
                            <div id="logobox" className="hdrLogo" >
                                <img
                                    src={image.default}
                                    className="imgView"
                                    alt="FM-LOGO"
                                />
                                <span id="logotext" className="colorBlue d-block">
                                    Travel Channel Int'l (Pvt).Ltd
                                </span>
                            </div>
                            <h1 className="colorBlue">E-Reservation</h1>
                            <QRCode value={`https://fmcrm.azurewebsites.net/ViewItinerary.aspx?PNR=${hashEncripted}=`} size={qrCodeSize} />
                        </div>
                        <h6 className="text-danger mt-3">Payment is Pending</h6>
                        <div className="d-flex justify-content-between mt-5">
                            <div className="d-flex justify-content-start">
                            <h4>{ArrangeDateFormat(pnrData.startDate)}</h4> <ArrowRightIcon className="align-self-center ticket_right_arrrow"/>  <h4>{ArrangeDateFormat(pnrData.endDate)}</h4>
                            </div>
                            <div className="d-flex justify-content-end ">
                            {
                                pnrData.journeys &&
                                pnrData.journeys.map((items, index) => (
                                    <h4 key={index} className="journeys_spacing">
                                    {cityNameFunct[items.firstAirportCode]} → {cityNameFunct[items.lastAirportCode]}
                                    </h4>
                                ))
                                }
                            </div>
                            {/* <h4>Lahore → DAMMAM </h4> */}
                           
                                                            
                        </div>
                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Passenger</th>
                                    <th>Seats</th>
                                    <th>Passport-No</th>
                                    <th>eTicket Receipt(s)</th>
                                    
                                    
                                </tr>
                            </thead>
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
                        </table>
                        <div className="d-flex justify-content-between mt-3">
                            <h6><span>Booking Reference:</span> {inputPnr}</h6>
                            <h6><span>Airline Reference:</span> DCPK*8PY9Y6</h6>
                        </div>
                        <div >
                           
                            <div>
                               {flightDetails}
                            </div>
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
               
        </div>
    );
}
export default Customersupport;