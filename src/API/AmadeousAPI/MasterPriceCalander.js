import { fetchApi } from "./Api";
const MasterPriceCalander = async(searchDataArr) =>{

  // console.log("searchDataArr",searchDataArr);
        const departure=searchDataArr?.departure ;
        const arrival= searchDataArr?.arrival;
        const futureDate= searchDataArr?.date[0];
        const futureDate1= searchDataArr?.date[1] || '0';
        let tripType= searchDataArr?.tripType;
        const adults= searchDataArr?.adults;
        const children= searchDataArr?.children;
        const infants= searchDataArr?.infants;
        const totalPX = adults + children;

  const departCode = departure.map((dep) => dep.substring(dep.indexOf('(') + 1, dep.indexOf(')')));
  const arrivalCode = arrival.map((arr) => arr.substring(arr.indexOf('(') + 1, arr.indexOf(')')));

const getCurrentDate = new Date()
if(tripType===1){
  tripType= "Round"
  
} else if(tripType===2){
  tripType= "OneWay"
} 

// -- function to set Amadeus Date format------
const reformatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day}${month}${year}`;

  };

 const departDate = reformatDate(futureDate);
 const arrivalDate = reformatDate(futureDate1);

// ------setitng the adult , child infant ---------
const paxReferences = [];
 
if (adults > 0) {
  paxReferences.push({
      ptc: "ADT",
      traveller: Array.from({ length: adults }, (_, index) => ({ ref: (index + 1).toString() }))
  });
}
if (children > 0) {
  paxReferences.push({
      ptc: "CNN",
      traveller: Array.from({ length: children }, (_, index) => ({ ref: (adults + index + 1).toString() }))
  });
}
if (infants > 0) {
  paxReferences.push({
      ptc: "INF",
      traveller: Array.from({ length: infants },(_, index) =>({ 
        ref:(index + 1).toString(),
        infantIndicator:(index + 1).toString()
      }))
  });
};


// ---------------------------------------
// ------------handle Iteeries for oneway and round----------
let itineraries=[];

if(tripType === 'Round'){
    itineraries.push(
        {
            "segRef": "1",
            "departureId": departCode[0],
            "arrivalId": arrivalCode[0],
            "date": departDate,
            "rangeQualifier": "C",
            "dayInterval": 3
        },
        {
            "segRef": "2", 
            "departureId":departCode[1],
            "arrivalId": arrivalCode[1],
            "date": arrivalDate,
            "rangeQualifier": "C",
            "dayInterval": 3
        }
    );
} else if (tripType === 'OneWay') {
    itineraries.push(
          {
            "segRef": "1",
            "departureId": departCode[0],
            "arrivalId": arrivalCode[0],
            "date": departDate,
            "rangeQualifier": "C",
            "dayInterval": 3
          }
    );

}

// -----------------------------------------------------------
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "numberOfUnit": [
    {
      "number": totalPX,
      "type": "PX"
    }
  ],
  paxReferences,
  "fareOptions": {
    "priceTypes": [
      "ET",
      "RP",
      "RU",
      "TAC",
      "CUC"
    ],
    "currency": "USD"
  },
  "itineraries":itineraries
//   [
//     {
//         "segRef": "1",
//         "departureId": "DXB",
//         "arrivalId": "YYZ",
//         "date": "270125",
//         "rangeQualifier": "C",
//         "dayInterval": 3
//     },
//     {
//       "segRef": "2",
//       "departureId": "YYZ",
//       "arrivalId": "DXB",
//       "date": "060225",
//       "rangeQualifier": "C",
//       "dayInterval": 3
//   }
// ]
});


const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

try{
const result = await fetchApi("masterprice-calender", requestOptions);

const MPBodyAccess = result?.data?.["soapenv:Envelope"]?.["soapenv:Body"]?.Fare_MasterPricerCalendarReply;
if(MPBodyAccess?.errorMessage){
  console.error("MasterPrice_Calander-Error",MPBodyAccess?.errorMessage);
  return null;
}
// step 01: get the Reccomendations
  const getReccomentation = Array.isArray(MPBodyAccess?.recommendation) ? MPBodyAccess?.recommendation : [MPBodyAccess?.recommendation];
 
// step 02: get the segmentFlightRef for all the flights
  const getSegmentFlightRef = getReccomentation?.map((items)=>items?.segmentFlightRef);
  // console.log("getSegmentFlightRef",getSegmentFlightRef);

// step 03 extracted ref number 
  const extractedRefDetails = getSegmentFlightRef?.map((segmentArray) => 
    Array.isArray(segmentArray) 
      ? segmentArray?.map((segment) => 
          Array.isArray(segment?.referencingDetail) ? segment.referencingDetail.filter((ref) => ref.refQualifier === "S") : []
        )
      : [segmentArray]?.map((segment) =>segment.referencingDetail.filter((ref) => ref.refQualifier === "S"))
  );

  // console.log("extractedRefDetails",extractedRefDetails);

  const rfineRefNumber = extractedRefDetails.map((items)=>items.map((item)=>item.map((itm)=>itm.refNumber)));
  // console.log("rfineRefNumber",rfineRefNumber);

  

  // Step 04: Map relevant recommendation with each pair
const recommendationsWithRefs = rfineRefNumber.map((refGroup, groupIndex) => {

  return refGroup.map((refPair, pairIndex) => {
    const relevantRecommendation = getReccomentation[groupIndex]; 
    return {
      refPair, 
      recommendation: relevantRecommendation, 
    };
  });
});
// console.log("recommendationsWithRefs", recommendationsWithRefs);

  // Step 05  ----------------Matching and exracting the Flight based on Reccomendation RefNum-----------------------

//   const matchedFlights = [];

// rfineRefNumber.forEach((group) => {
//   group.forEach((refs) => {
//     const matchedRefs = [];

//     // Iterate through the references and match with corresponding flightIndex
//     refs.forEach((ref, index) => {
//       const flightMatch = MPBodyAccess?.flightIndex[index]?.groupOfFlights.find((flight) => {
//         const flightProposal = flight.propFlightGrDetail.flightProposal[0];
//         return flightProposal.ref === ref;
//       });

//       if (flightMatch) {
//         matchedRefs.push(flightMatch);
//       }
//     });

//     // If all references match, add them to the results
//     if (matchedRefs.length === refs.length) {
//       matchedFlights.push(matchedRefs);
//     }
//   });
// });

// console.log("Matched Flights_2:", matchedFlights);

  // **********************************************Dont Delete this code****************************************************
 
 
const matchedFlightsWithRecommendations = []; // Final result array

//converting flightIndex to array for handling Oneway and Roundtrip
const handleFlightIndex = Array.isArray(MPBodyAccess?.flightIndex) ? MPBodyAccess?.flightIndex : [MPBodyAccess?.flightIndex];

rfineRefNumber.forEach((group, groupIndex) => {
  group.forEach((refs) => {
    const matchedFlights = [];

    // Iterate through the references and match with corresponding flightIndex
    refs.forEach((ref, index) => {
      const flightMatch = handleFlightIndex[index]?.groupOfFlights.find((flight) => {
        const flightProposal = flight?.propFlightGrDetail?.flightProposal[0]; // Only check the first ref
        return flightProposal.ref === ref;
      });

      if (flightMatch) {
        matchedFlights.push(flightMatch);
      }
    });

    // If all references match, add them along with the recommendation
    if (matchedFlights.length === refs.length) {
      const relevantRecommendation = getReccomentation[groupIndex]; // Get the recommendation for this group

 
      // Creaitng groupDescription for each leg
       const groupDescription = matchedFlights.map((flight ,index) => {
        // const flightInfo = flight.flightDetails.flightInformation;
        const flightDetailsArray = Array.isArray(flight.flightDetails) ? flight.flightDetails : [flight.flightDetails];
        const flightInfo = flightDetailsArray.map((items)=>items.flightInformation);
        const firstLeg = flightInfo[0];
        const lastLeg = flightInfo[flightInfo.length - 1];
        return {
          departure: firstLeg?.location[0]?.locationId || null, // Departure location
          arrival: lastLeg?.location[1]?.locationId || null, // Arrival location
          departDate: firstLeg?.productDateTime?.dateOfDeparture || null, // Departure date
          arrivalDate: lastLeg?.productDateTime?.dateOfArrival || null, // Arrival date
          departTime: firstLeg?.productDateTime?.timeOfDeparture || null, // Departure time
          arrivalTime: lastLeg?.productDateTime?.timeOfArrival || null, // Arrival time
          marketingCarrier: firstLeg?.companyId?.marketingCarrier || null, // Marketing carrier
        };
      }); 

     // Creaing Final object to pass to the final array
      matchedFlightsWithRecommendations.push({
        matchedFlights, 
        recommendation: relevantRecommendation, 
        groupDescription
      });
    }
  });
});

// console.log("Matched Flights with Recommendations:", matchedFlightsWithRecommendations);
return matchedFlightsWithRecommendations;

}catch(error){
    console.error("Error while Fetching CalnderDates",error);
}

}


export default MasterPriceCalander;