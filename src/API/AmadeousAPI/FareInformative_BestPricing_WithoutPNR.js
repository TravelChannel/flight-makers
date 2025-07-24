import { fetchApi } from "./Api";
export const FareBestpricing_WithOutPNR = async(flightData) =>{

 const { adults, children, infants } = flightData;

 const flightsegmentsData =flightData?.matchedFlights;

 // getting Flight Numebr
 
const flightNumber = flightData?.flightDetails?.flightInformation?.flightOrtrainNumber;
// console.log("flightNumber",flightNumber);

// getting booking class
const bookingClass = Array.isArray(flightData?.recommendations?.[0]?.paxFareProduct)
  ? flightData.recommendations[0].paxFareProduct[0]?.fareDetails?.majCabin?.bookingClassDetails?.designator
  : flightData?.recommendations?.[0]?.paxFareProduct?.fareDetails?.majCabin?.bookingClassDetails?.designator;


// getting companyIdentification Number 
const companyIdentification = flightData?.flightDetail?.flightInformation?.companyId?.marketingCarrier;
//making passangers dynamic with infant as well 
let measurementValue = 1;
const passengersGroup = []; 

 // Add adults to passengersGroup
 if (adults > 0) {
  passengersGroup.push({
      segmentRepetitionControl: {
          segmentControlDetails: {
              quantity: 1,
              numberOfUnits: adults
          }
      },
      travellersID: {
          travellerDetails: Array.from({ length: adults }, () => ({
              measurementValue: measurementValue++
          }))
      },
      discountPtc: {
          valueQualifier: "ADT"
      }
  });
}

// Add children to passengersGroup
if (children > 0) {
  passengersGroup.push({
      segmentRepetitionControl: {
          segmentControlDetails: {
              quantity: 2,
              numberOfUnits: children
          }
      },
      travellersID: {
          travellerDetails: Array.from({ length: children }, () => ({
              measurementValue: measurementValue++
          }))
      },
      discountPtc: {
          valueQualifier: "CNN"
      }
  });
}
// Add infants to passengersGroup
if (infants > 0) {
  passengersGroup.push({
      segmentRepetitionControl: {
          segmentControlDetails: {
              quantity: 3,
              numberOfUnits: infants
          }
      },
      travellersID: {
          travellerDetails: Array.from({ length: infants }, (_,index) => ({
              measurementValue: index + 1
          }))
      },
      discountPtc: {
          valueQualifier: "INF"
      }
  });
}
// console.log("passengersGroup",passengersGroup);
let flightIndicator = 1; // Initialize a flightIndicator counter
let itemNumberCounter = 1;
const updatedSegmentGrp = flightsegmentsData?.flatMap((matchedFlight, matchedFlightIndex) => {
  // Ensure flightDetails is always an array
  const flightDetails = Array.isArray(matchedFlight.flightDetails)
    ? matchedFlight.flightDetails
    : [matchedFlight.flightDetails];

  return flightDetails.map((flightDetail, detailIndex) => ({
    segmentInformation: {
      flightDate: {
        departureDate: flightDetail?.flightInformation?.productDateTime?.dateOfDeparture,
        departureTime: flightDetail?.flightInformation?.productDateTime?.timeOfDeparture,
        arrivalDate: flightDetail?.flightInformation?.productDateTime?.dateOfArrival,
        arrivalTime: flightDetail?.flightInformation?.productDateTime?.timeOfArrival
      },
      boardPointDetails: {
        trueLocationId: flightDetail?.flightInformation?.location?.[0]?.locationId
      },
      offpointDetails: {
        trueLocationId: flightDetail?.flightInformation?.location?.[1]?.locationId
      },
      companyDetails: {
        marketingCompany: flightDetail?.flightInformation?.companyId?.marketingCarrier,
        operatingCompany: flightDetail?.flightInformation?.companyId?.operatingCarrier
      },
      flightIdentification: {
        flightNumber: flightDetail?.flightInformation?.flightOrtrainNumber,
        bookingClass: bookingClass || 'Y' 
      },
      flightTypeDetails: {
        flightIndicator: (flightIndicator++).toString() // Dynamic flight indicator across all stops
      },
      itemNumber: itemNumberCounter++
    }
  }));
});

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "Fare_InformativeBestPricingWithoutPNR": {
    "passengersGroup":passengersGroup,
    "segmentGroup": updatedSegmentGrp,
    "pricingOptionGroup": [
      {
        "pricingOptionKey": {
          "pricingOptionKey": "VC"
        },
        "carrierInformation": {
          "companyIdentification": {
            "otherCompany": companyIdentification
          }
        }
      },
      {
        "pricingOptionKey": {
          "pricingOptionKey": "RP"
        }
      },
      {
        "pricingOptionKey": {
          "pricingOptionKey": "RLA"
        }
      },
      {
        "pricingOptionKey": {
          "pricingOptionKey": "FCO"
        },
        "currency": {
          "firstCurrencyDetails": {
            "currencyQualifier": "FCO",
            "currencyIsoCode": "USD"
          }
        }
      }
    ]
  },
  "session": {
    "TransactionStatusCode": "Start",
    "SessionId": "",
    "SequenceNumber": "",
    "SecurityToken": ""
  }
});
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
// console.log("FIBP-Request",raw);
try{
    const result = await fetchApi("fare-informative-bestpricing", requestOptions);
    // console.log('result',result)
    return result;
}catch(error){
    console.log("Error while Fetching FareInformative_BestPricing",error);
}

}