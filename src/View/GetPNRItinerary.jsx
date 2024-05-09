import React, { useState, useEffect, Fragment } from "react";
import * as image from "../Constant/images";
import FlightIcon from '@mui/icons-material/Flight';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';
import { useLocation } from "react-router-dom";
import { requestGetBooking } from "../API/index.js";
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import Loader from '../Loader/Loader.jsx';
import { airportNameFunct,cityNameFunct } from "../helpers/formatdata.js";
import { airsialBookingDetail } from "../API/index.js";
import { GetDetailByPNR } from "../API/BackendAPI/GetDetailbyPNR.js";
import { useFormData } from "../Context/FormDataContext.jsx";
import { AirSialTravDetial } from "../API/index.js";
import { useNavigate } from "react-router-dom";
import { getDetailByOrderId } from "../API/BackendAPI/CommissionAPI/GetDetailbyOrderId.js";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GetPNRItinerary = () => {
    const navigate = useNavigate();
    const [userPnr ,setUserPnr]  = useState(null);

    const [aFlightDetails ,setAFlightDetails] = useState([]);

    // console.log("pnrpnr",userPnr);

    // ---------------extract id from the url --------------------
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const id= urlParams.get("order");
    // const id= urlParams.get("id");
    console.log("id from URl",id);
    // const id =15937209;

   
    // ----------------------------------

const [isLoading , setLoading] = useState(false);
const [isAirSial , setAirSial] = useState(false);
const [pnrData , setPnrData] = useState({});
const [airSialData ,setAirSialData] = useState({});

const [usersDetail ,setUsersDetails] = useState([]);
const [TicketConfirmed ,setTicketConfirmed] = useState(false);
const [isMobile , setIsMobile] = useState(window.innerWidth < 667);
const [isSmallMobile , setSmallMobile] = useState(window.innerWidth < 480);

const { setShowHeader } = useFormData();
const [allPassangers ,setAllPassangers] = useState([]);

useEffect(()=>{
    const handleResize = ()=>{
        setIsMobile(window.innerWidth < 667);
    };
    window.addEventListener('resize', handleResize);
    return()=>{
        window.removeEventListener('resize', handleResize);
    }
},[]);
useEffect(()=>{
    const handleResize = ()=>{
        setSmallMobile(window.innerWidth < 480);
    };
    window.addEventListener('resize', handleResize);
    return()=>{
        window.removeEventListener('resize', handleResize);
    }
},[]);



// useEffect(() => {
//     const url = window.location.href;

//     console.log("url",url);
//     const urlParams = new URLSearchParams(url);

//     console.log("urlParams",urlParams);
//     const id = urlParams.get("id");
//     console.log('id', id);
// }, []);
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


const downloadPDF = () => {
    const input = document.getElementById('pdf-content');
  
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg'); // Change image type to 'JPEG'
  
      const pdf = new jsPDF('p', 'mm', 'a4', true);
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
  
      pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('invoice.pdf');
    });
  };
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
            <span className="span_verify_prior mt-2">Hand Baggage Allowance: </span>
            {correspondingBaggage.cabinBaggageAllowance?.totalWeightInKilograms
                ? `${correspondingBaggage.cabinBaggageAllowance.totalWeightInKilograms} KG`
                : (correspondingBaggage.cabinBaggageAllowance?.baggagePieces?.[0]?.maximumWeightInKilograms
                ? `${correspondingBaggage.cabinBaggageAllowance.baggagePieces[0].maximumWeightInKilograms} KG`
                : 'null')}
            </p>
            <p>
            <span className="span_verify_prior mt-2">Checked Baggage Allowance: </span>
            {correspondingBaggage.checkedBaggageAllowance?.totalWeightInKilograms
                ? `${correspondingBaggage.checkedBaggageAllowance.totalWeightInKilograms} KG`
                : (correspondingBaggage.checkedBaggageAllowance?.baggagePieces?.[0]?.maximumWeightInKilograms
                ? `${correspondingBaggage.checkedBaggageAllowance.baggagePieces[0].maximumWeightInKilograms} KG`
                : 'null')}
            </p>

        </div>
</div>
   </div>
    </Fragment>
    )
});

// --------------------------------------------------



// const location = useLocation();
// const searchParams = new URLSearchParams(location.search);
// const inputPnr = searchParams.get('inputPNR');

    const qrCodeValue = id;
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
    const fetchBookingDetails = async (pnrNum) => {
        try {
            // setLoading(true);
            // setShowHeader(false);
            const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
            console.log("extra_Bagg", extra_Bagg);
    
            if (extra_Bagg?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF") {
                const userDetailsResponse = await USerDetailResp(pnrNum); 
                const userDetails111 = userDetailsResponse?.data?.payload?.pnrDetail;
                console.log('userDetails111',userDetails111);

                await fetchData(userDetails111, pnrNum); 
                const airSialUserDetail = await airsialBookingDetail();
                console.log('airSialUserDetail',airSialUserDetail);
                setAirSialData(airSialUserDetail);
                setAirSial(true);
            } else {
                const userDetails = await requestGetBooking(pnrNum);
                console.log("userDetails", userDetails);
                setPnrData(userDetails);
            }
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading(false);
        }
    };
    
    const USerDetailResp = async (userPnr) => {
        try{
            
            const responce = await GetDetailByPNR(userPnr);
            console.log("responceofCurrentBooking", responce.data.payload.pnrDetail);
            setUsersDetails(responce.data.payload.pnrDetail);
            return responce;
        } catch(error) {
            console.error("Error at responceofCurrentBooking ", error);
        }
    };
    
    const fetchData = async (usersDetail, activepnrNumber) => { 
        if (activepnrNumber && activepnrNumber !== "") {
            try {
                const airsialtravllersDetail = await AirSialTravDetial(usersDetail, activepnrNumber);
                console.log("airsialtravllersDetail", airsialtravllersDetail);
            } catch (error) {
                console.error("Error", error);
            }
        }
    };
    const getuserDatabyID = async() =>{
        try{
            setLoading(true);
            setShowHeader(false);
            const responce = await getDetailByOrderId(id);
            console.log("responce",responce);
            setAFlightDetails(responce.data.payload.flightDetails);
            console.log("FlightDetails1112",responce.data.payload.flightDetails);
            setUserPnr(responce.data.payload.pnr);
            // console.log('pnr-1',responce.data.payload.pnr);
            await fetchBookingDetails(responce.data.payload.pnr)
            setAllPassangers(responce.data.payload.pnrDetail);
            setTicketConfirmed(responce.data.payload.isPaid)
            console.log('userPNR',responce.data.payload.pnr);
            console.log("userPaymentConfirmation",responce.data.payload.isPaid);

        }catch(error){
            console.error("error while getting data",error);
        }finally {
            setLoading(false);
        }
    }
    
    // useEffect(() => {
    //     getuserDatabyID();
    //     fetchBookingDetails();
    // }, []);

    useEffect(() => {
        getuserDatabyID();
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
                <div className="container bg-white p-5" >
                    {/* {  
                        TicketConfirmed ?( */}
                     <Fragment>
                     <div className="ticket_display" id="pdf-content">
                    {
                        isMobile ? (
                            <Fragment>
                            <div className="d-flex justify-content-between ">
                                <div  className="hdrLogo ETicket_main" onClick ={handleNavigate} >
                                    <img
                                        src={image.default}
                                        className="imgView"
                                        alt="FM-LOGO"
                                    />
                                    <span id="logotext" className="colorBlue d-block" >
                                        Travel Channel Int'l (Pvt).Ltd
                                    </span>
                                </div>
                                <QRCode value={`https://fmcrm.azurewebsites.net/ViewItinerary.aspx?PNR=${hashEncripted}=`} size={qrCodeSize} className="QR_Code_tytpo" />
                         </div>
                         <h3 className="colorBlue text-center mt-2">E-Reservation</h3>
                            </Fragment>
                            ):(
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
                        )
                    }
                    {
                        isSmallMobile ? (
                            <div className="d-flex justify-content-between mt-5">
                                <div className="">
                                    {
                                        isAirSial ? (
                                            <div className="d-flex justify-content-start">
                                                <p className="ticket_depart_date">{ArrangeDateFormat(outboundDepartureDate)}</p>
                                                {inboundDepartDate !=='N/A' && (
                                                    <>
                                                        <ArrowRightIcon className="align-self-center ticket_right_arrrow"/>  
                                                        <p className="ticket_depart_date">{ArrangeDateFormat(inboundDepartDate)}</p>
                                                    </>
                                                )}
                                            </div>
                                        ):(
                                            <div className="">
                                                <p className="ticket_depart_date">{`•${ArrangeDateFormat(pnrData?.startDate)}`}</p>
                                                {/* <ArrowRightIcon className="align-self-center ticket_right_arrrow"/>  */}
                                                <p className="ticket_depart_date">{`•${ArrangeDateFormat(pnrData?.endDate)}`}</p>
                                            </div>
                                            
                                        )
                                    }
                                  </div>
                                    <div className="">
                                                    {
                                                        isAirSial ?(
                                                            <div className="d-flex justify-content-start">
                                                            <p  className="journeys_spacing ticket_depart_date">{cityNameFunct[outboundOrigion]} → {cityNameFunct[outboundDes]} </p>
                                                            {
                                                                inboundOrigion !=='N/A'&& (
                                                                    <p  className="journeys_spacing ticket_depart_date">{cityNameFunct[inboundOrigion]} → {cityNameFunct[inboundDes]} </p>
                                                                )
                                                            }
                                                            </div>
                                                        ):(
                                                            <div>
                                                            {/* {
                                                            pnrData?.journeys &&
                                                            pnrData?.journeys.map((items, index) => (
                                                                <p key={index} className="journeys_spacing ticket_depart_date" >
                                                                {cityNameFunct[items.firstAirportCode]} → {cityNameFunct[items.lastAirportCode]}
                                                                </p>
                                                            ))
                                                            } */}

                                                            {aFlightDetails?.schedualDetGet?.map((item, index) => (
                                                                    <div key={index}>
                                                                        <div className='d-flex justify-content-start journeys_spacing ticket_depart_date'>
                                                                            <h5 className="iti_city_font">{cityNameFunct[aFlightDetails?.groupDescription[index]?.departureLocation]}</h5> 
                                                                            <span className="airport_spacing"><RedoOutlinedIcon /></span> 
                                                                            <h5 className="iti_city_font">{cityNameFunct[aFlightDetails?.groupDescription[index]?.arrivalLocation]}</h5>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )
                                                    }
                                    </div>  
                                </div>
                        ):(
                            <div className="d-flex justify-content-between mt-5">
                            <div className="d-flex justify-content-start">
                                {
                                    isAirSial ? (
                                        <div className="d-flex justify-content-start">
                                            <p className="ticket_depart_date">{ArrangeDateFormat(outboundDepartureDate)}</p>
                                            {inboundDepartDate !=='N/A' && (
                                                <>
                                                    <ArrowRightIcon className="align-self-center ticket_right_arrrow"/>  
                                                    <p className="ticket_depart_date">{ArrangeDateFormat(inboundDepartDate)}</p>
                                                </>
                                            )}
                                        </div>
                                    ):(
                                       <div className="d-flex justify-content-start">
                                        <p className="ticket_depart_date">{ArrangeDateFormat(pnrData?.startDate)}</p>
                                        <ArrowRightIcon className="align-self-center ticket_right_arrrow"/> 
                                         <p className="ticket_depart_date">{ArrangeDateFormat(pnrData?.endDate)}</p>
                                       </div>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-end ">
                          {
                            isAirSial ?(
                                <div className="d-flex justify-content-start">
                                <p  className="journeys_spacing ticket_depart_date">{cityNameFunct[outboundOrigion]} → {cityNameFunct[outboundDes]} </p>
                                {
                                    inboundOrigion !=='N/A'&& (
                                        <p  className="journeys_spacing ticket_depart_date">{cityNameFunct[inboundOrigion]} → {cityNameFunct[inboundDes]} </p>
                                    )
                                }
                                </div>
                            ):(
                                <>
                                {/* {
                                pnrData?.journeys &&
                                pnrData?.journeys.map((items, index) => (
                                    <p key={index} className="journeys_spacing ticket_depart_date" >
                                    {cityNameFunct[items.firstAirportCode]} → {cityNameFunct[items.lastAirportCode]}
                                    </p>
                                ))
                                } */}
                          {/* ------------------------ */}
                                {aFlightDetails?.schedualDetGet?.map((item, index) => (
                                        <div key={index}>
                                            <div className='d-flex justify-content-start journeys_spacing ticket_depart_date'>
                                                <h5 className="iti_city_font">{cityNameFunct[aFlightDetails?.groupDescription[index]?.departureLocation]}</h5> 
                                                <span className="airport_spacing"><RedoOutlinedIcon /></span> 
                                                <h5 className="iti_city_font">{cityNameFunct[aFlightDetails?.groupDescription[index]?.arrivalLocation]}</h5>
                                            </div>
                                        </div>
                                    ))}

                                {/* --------------------- */}
                                </>
                            )
                          }
                            </div>    
                        </div>
                        )
                    }
                        
                        {/* <div className="d-flex justify-content-between mt-5">
                            <div className="d-flex justify-content-start">
                                {
                                    isAirSial ? (
                                        <div className="d-flex justify-content-start">
                                            <p className="ticket_depart_date">{ArrangeDateFormat(outboundDepartureDate)}</p>
                                            {inboundDepartDate !=='N/A' && (
                                                <>
                                                    <ArrowRightIcon className="align-self-center ticket_right_arrrow"/>  
                                                    <p className="ticket_depart_date">{ArrangeDateFormat(inboundDepartDate)}</p>
                                                </>
                                            )}
                                        </div>
                                    ):(
                                       <div className="d-flex justify-content-start">
                                        <p className="ticket_depart_date">{ArrangeDateFormat(pnrData?.startDate)}</p>
                                        <ArrowRightIcon className="align-self-center ticket_right_arrrow"/> 
                                         <p className="ticket_depart_date">{ArrangeDateFormat(pnrData?.endDate)}</p>
                                       </div>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-end ">
                          {
                            isAirSial ?(
                                <div className="d-flex justify-content-start">
                                <p  className="journeys_spacing ticket_depart_date">{cityNameFunct[outboundOrigion]} → {cityNameFunct[outboundDes]} </p>
                                {
                                    inboundOrigion !=='N/A'&& (
                                        <p  className="journeys_spacing ticket_depart_date">{cityNameFunct[inboundOrigion]} → {cityNameFunct[inboundDes]} </p>
                                    )
                                }
                                </div>
                            ):(
                                <>
                                {
                                pnrData?.journeys &&
                                pnrData?.journeys.map((items, index) => (
                                    <p key={index} className="journeys_spacing ticket_depart_date" >
                                    {cityNameFunct[items.firstAirportCode]} → {cityNameFunct[items.lastAirportCode]}
                                    </p>
                                ))
                                }
                                </>
                            )
                          }
                            </div>    
                        </div> */}
                     <div className="table-responsive ">
                            <table className="table table-bordered mt-3">
                                    <thead>
                                    <tr>
                                        <th>Passenger</th>
                                        {isAirSial ? (
                                            <th>CNIC</th>
                                        ) : (
                                            <th>Passport#</th>
                                        )}
                                        <th>gender</th>
                                        {isSmallMobile ? <th>Receipt(s)</th> : <th>eTicket Receipt(s)</th>}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allPassangers.map((items ,index)=>(
                                                <tr key={index}>
                                                    <td>{`${items.firstName} ${items.lastName}`}</td>
                                                    {/* <td>{adultDetails.booking_status}</td> */}
                                                    <td>{items.passportNo}</td>
                                                    <td>{items.gender}</td>
                                                    <td>___</td>
                                                </tr> 
                                            ))
                                        }
                                    </tbody>
                                {/* {
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
                                    
                                    {pnrData.travelers && pnrData?.travelers?.map((traveler, index) => (
                                        <Fragment key={index}>
                                            {traveler?.identityDocuments?.map((document, documentIndex) => (
                                                <tr key={`${index}-${documentIndex}`}>
                                                    <td>{`${document.givenName} ${document.surname}`}</td>
                                                    <td>{pricingStatusName}</td>
                                                    <td>{document.documentNumber}</td>
                                                    <td>___</td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ))}
                                    </tbody>
                                    </>
                                    )
                                } */}
                                </table>
                     </div>
                           {
                            isSmallMobile ?(
                                <div className="d-flex justify-content-between mt-3">
                                  <h6><span>Booking-ID</span> {isAirSial ? (airSialData?.Response?.Data?.pnrDetail.PNRN):(pnrData?.request?.confirmationId)}</h6>
                                  <h6><span>Airline-ID:</span>-</h6>
                               </div>
                            ):(
                                <div className="d-flex justify-content-between mt-3">
                                    <h6><span>Booking-Reference:</span> {isAirSial ? (airSialData?.Response?.Data?.pnrDetail.PNRN):(pnrData?.request?.confirmationId)}</h6>
                                    <h6><span>Airline-Reference:</span>-</h6>
                                </div>
                            )
                           }
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
                            {
                                isMobile ? (
                                    <div className="mt-2">
                                        <p><span className="span_verify_prior">E-mail: </span>support@faremakers.com</p>
                                        <p><span className="span_verify_prior">UAN: </span> (+92-42) 03111-147-111</p>
                                    </div>
                                    ) :(
                                    <div className="d-flex justify-content-between mt-2">
                                        <p><span className="span_verify_prior">E-mail: </span>support@faremakers.com</p>
                                        <p><span className="span_verify_prior">UAN: </span> (+92-42) 03111-147-111</p>
                                    </div>
                                )
                            }
                            <p className="border-top mt-3 pt-3 E_Ticket_disc"><span className="span_verify_prior">www.Faremakers.com </span>Powered By Travel Channel International (Pvt.) Ltd. Pakistan. Which is Nationwide IATA accredited company, Founded in 2003 & successfully operating the business in Lahore, Karachi & Islamabad. Our Goal is Making Travel Simple & Easy through Giving Best Travel Services all over the Pakistan.</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className='btn btn-primary m-2 download_typography' onClick={() => downloadPDF()}>
                                Download as PDF
                        </button>
                    </div>
                     </Fragment>
                        {/* ):(
                            <div>
                                <h4 className='payment_failed_responce'>
                                We apologize for the inconvenience, but there was an error processing your payment. If you have completed your payment, please contact our Support Team for further assistance at  <span className="customer_support_No">03111147111</span>
                                </h4>
                            </div>
                        ) */}
                    {/* } */}
                    
                </div>

                
            )
           }

           {/* <button onClick={updateFormDataFromPage2}>Update FormData from Page 2</button> */}
               
        </div>
    );
}
export default GetPNRItinerary;