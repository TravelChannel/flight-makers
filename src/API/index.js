import fetchSearchResult from './SabreFlightResultAPI';
import fetchAirsailData from './AirSialFlightResultAPI';
import { fetchPriceRates } from './AlternatesDatesAPI';
import { fetchAccessToken } from './SabreAuthToken';
import { fetchAirSialToken } from './AirsialAuthToken';
import { reviewItinerary } from './RevalidateItinerary';
import { SabrePNRCreate } from './SabrePNR';
import { AirsialPNRCreate } from './AirsialPNR';
import { airsialTravelerDetail } from './AirsialTravellerDetails';
import { airSialViewDetail } from './AirsialGetBooking';
import {TravelerInfo} from './TravellerInfo';
import { getTokenApi} from './payment/getToken';
import { createOrderApi} from './payment/createOrder';
import { getPaymentTokenApi} from './payment/getPaymentToken';
import {getBookingApi} from './GetBookingAPI';

import { UserBookingDetails } from './BackendAPI/allAPICalls';
import { sendOTP } from './BackendAPI/sendOTP';
import { verifyOTP } from './BackendAPI/verifyOTP';



export const requestFetchSearchResult = async (searchDataArr) => {
  try {
    const flightData = await fetchSearchResult(searchDataArr);
    const { tripType,departure,arrival } = searchDataArr;
    if (tripType === 'MultiCity') {
      return flightData;
    }
    else {
      const validRoutes = {
        "KHI": ["LHE", "ISB", "PEW", "SKT", "UET", "JED", "MCT", "SKZ"],
        "LHE": ["KHI", "ISB", "JED", "MCT", "DMM"],
        "SKT": ["KHI", "JED", "MCT"],
        "ISB": ["KHI", "UET", "JED", "MCT", "DMM"],
        "PEW": ["KHI"],
        "UET": ["KHI", "ISB"],
        "SKZ": ["KHI", "ISB"],
        "MUX": ["JED"],
        "JED": ["KHI", "ISB", "LHE", "MUX", "SKT"],
        "MCT": ["KHI", "ISB", "LHE", "SKT"],
        "DMM": ["LHE", "ISB"]
      };
      const departureCode = departure[0].substring(departure[0].indexOf('(') + 1, departure[0].indexOf(')'));
      const arrivalCode = arrival[0].substring(arrival[0].indexOf('(') + 1, arrival[0].indexOf(')'));
      const checkValidations = (departureCode, arrivalCode) => {
        const validArrivals = validRoutes[departureCode];
        return validArrivals && validArrivals.includes(arrivalCode);
      };
      
      if (checkValidations(departureCode, arrivalCode)) {
        const airsialData = await fetchAirsailData(searchDataArr);
        if (airsialData) {
          flightData.unshift(airsialData[0]);
          // console.log("push", flightData);
          return flightData;
        } else {
          return flightData;
        }
      } else {
        return flightData;
      }
      
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const requestFetchAlternateRates = async (departureCode, arrivalCode, futureDate, futureDate1, tripType, adults, children, infants) => {
  try {
    const alternateRates = await fetchPriceRates(departureCode, arrivalCode, futureDate, futureDate1, tripType, adults, children, infants);
    return alternateRates;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const requestFetchAuthToken = async () => {
  try {
    fetchAccessToken();
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}
export const requestAirsialToken = async () => {
  try {
    fetchAirSialToken();
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}
export const requestReviewItinerary = async () => {
  try {
    const validation = await reviewItinerary();
    return validation;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const requestPNRCreate = async (formData) => {
  try {
    const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
    if(extra_Bagg.schedualDetGet[0][0].carrier.operating === "PF")
    {
      const PNRGenerate = await AirsialPNRCreate(formData);
      console.log("PNRGenerate",PNRGenerate);
      console.log("formDataValid",formData);

      // const travelDetails = await airsialTravelerDetail(PNRGenerate.Response.Data,formData);
      // console.log("travelDetails",travelDetails);
      return PNRGenerate;
    }
    else
    {
      const PNRGeerate = await SabrePNRCreate(formData);
      return PNRGeerate;
    }
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

// --------------------------------------------------------------
export const AirSialTravDetial = async(formData,activepnrNumber)=>{
try{
const AirsialtravInfo = await airsialTravelerDetail(formData,activepnrNumber);
console.log("finalFormData",formData);
return AirsialtravInfo;
}catch(error){
  console.log(error);
  throw error;
}
}
export const airsialBookingDetail = async()=>{
  try{
  const airsialBookingDet = await airSialViewDetail();
  return airsialBookingDet;
  }catch(error){
    console.error(error);
  }
}
// ----------------------------------------------------------
export const requestTravelerInfo = async (userInfodetails) =>
{
  try{
      const travellerInfo = await TravelerInfo();
      return travellerInfo;
  }
  catch (error) {
    console.error("TravelerInfo", error)
  }
}

export const requestGetpaymentToken = async (paymentCode) => {
  try {
    const getToken = await getTokenApi();
    const createOrder = await createOrderApi(getToken);
    const getPaymentToken = await getPaymentTokenApi(getToken,createOrder,paymentCode);
     return {
      createOrder: createOrder,
      getPaymentToken: getPaymentToken
    };
  }
  catch (error) {
    console.error("Responce error", error);
  }
}
export const requestGetBooking = async () => {
  try {
    const result = await getBookingApi();
    return result;
  }
  catch (error) {
    console.error("Responce error", error);
  }
}

// ---------------------------------Backend API----------------------------------

export const requestUserPnrBooking = async(finalObject)=>{
  try {
    const results = await UserBookingDetails(finalObject);
    return results;
    console.log("UserBookingDetails function is called");
  }
  catch (error) {
    console.error("Responce error", error);
  }
}

// export const  sendOTPCode = async(getOTPData)=>{
//   try{
//     const  res = await sendOTP(getOTPData);
//     return res;

//   }catch(error){
//     console.error("OTP Responce error", error);
//   }
// }

// export const verifyOTPRes = async(getOTPData,enteredOtp)=>{
//   try{
//     const  result = await verifyOTP(getOTPData,enteredOtp);
//     return result;

//   }catch(error){
//     console.error("OTP Responce error", error);
//   }
// }