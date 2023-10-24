import fetchSearchResult from './SabreFlightResultAPI';
import fetchAirsailData from './AirSialFlightResultAPI';
import { fetchPriceRates } from './AlternatesDatesAPI';
import { fetchAccessToken } from './SabreAuthToken';
import { fetchAirSialToken } from './AirsialAuthToken';
import { reviewItinerary } from './RevalidateItinerary';
import { SabrePNRCreate } from './SabrePNR';
import { AirsialPNRCreate } from './AirsialPNR';
// import { airsialTravelerDetail } from './AirsialTravellerDetails';
import {TravelerInfo} from './TravellerInfo';
import { getTokenApi} from './payment/getToken';
import { createOrderApi} from './payment/createOrder';
import { getPaymentTokenApi} from './payment/getPaymentToken';
import {getBookingApi} from './GetBookingAPI'

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
      const PNRGenerate = await AirsialPNRCreate();
      // const travelDetails = await airsialTravelerDetail(PNRGenerate,formData);
      return PNRGenerate;
    }
    else
    {
      const PNRGeerate = await SabrePNRCreate();
      return PNRGeerate;
    }
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

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
    return getPaymentToken;
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