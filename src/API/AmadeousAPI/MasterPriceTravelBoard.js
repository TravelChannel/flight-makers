import { fetchApi } from "./Api";
export const MasterPriceTravelBoard =async (searchDataArr) =>{
    const  carrierIds = [
          "NK", "F9", "AZ", "CX", "CZ", "EY", "GF", "KL", "KU", "LX", "PK", "QR", "SV", 
          "TG", "TK", "UL", "6S", "YO", "HY", "LH", "WY", "PC", "BA", "VS", "KQ", "AC", 
          "AF", "SQ", "DV", "GP", "ET", "DL", "AT", "J2", "PF"
        ];

  const { departure, arrival, classtype, adults, children, infants, date } = searchDataArr;

  console.log("searchDataArr--c3",searchDataArr);
  const totalPX = adults + children;
   let classType = '';
  const departureCode = departure.map((dep) => dep.substring(dep.indexOf('(') + 1, dep.indexOf(')')));
  const arrivalCode = arrival.map((arr) => arr.substring(arr.indexOf('(') + 1, arr.indexOf(')')));

  console.log("Codes---c4",departureCode, arrivalCode)
   
  const  handleDateFormat = (date) => {
    const dates = new Date(date);

    // Extract the day, month, and year components
    const day = dates.toLocaleDateString('en-GB', { day: '2-digit' });
    const month = dates.toLocaleDateString('en-GB', { month: '2-digit' });
    const year = dates.toLocaleDateString('en-GB', { year: '2-digit' });
  
    // Concatenate the components in the desired order
    return `${day}${month}${year}`;
  }

   const formattedDateArray = date.map((date) => handleDateFormat(date));

  //  -------------------Setting the Origion Destination Itenrires------------------------------------
  const originDestinationInformation = departureCode?.map((dep, index) => ({
      departureId: dep,
      arrivalId: arrivalCode[index % arrivalCode.length],
      date: formattedDateArray[index % formattedDateArray.length]
  }));

  console.log("originDestinationInformation",originDestinationInformation);

  // ------setitng the adult , child infant ---------
  const paxReference = [];
 
  if (adults > 0) {
    paxReference.push({
        ptc: "ADT",
        traveller: Array.from({ length: adults }, (_, index) => ({ ref: (index + 1).toString() }))
    });
}
if (children > 0) {
    paxReference.push({
        ptc: "CNN",
        traveller: Array.from({ length: children }, (_, index) => ({ ref: (adults + index + 1).toString() }))
    });
}
if (infants > 0) {
    paxReference.push({
        ptc: "INF",
        traveller: Array.from({ length: infants },(_, index) =>({ 
          ref:(index + 1).toString(),
          infantIndicator:(index + 1).toString()
        }))
    });
};

// console.log("paxReference_Details",paxReference);
const cabinClassMapping = {
  Economy: "M",
  Business: "J",
  First: "F",
  PremiumEconomy:'W'
};

classType =
    classtype === 'Economy'
      ? 'M'
      : classtype === 'Business class'
        ? 'C'
        : classtype === 'First class'
          ? 'F'
          : classtype === 'Premium economy'
            ? 'W'
            : null;

// -------------------------------------------------
    const myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");

     const raw = JSON.stringify({
      "numberOfUnit": [
        {
          "number": totalPX.toString(),
          "type": "PX"
        },
        {
          "number": "100",
          "type": "RC"
        }
      ],
      "paxReference": paxReference,
      "fareOptions": {
        "priceTypes": [
          "ET",
          "RP",
          "RU",
          "TAC",
          "CUC"
        ],
        "currency": "USD",
      },
      "travelFlightInfo": {
        "cabin": classType,
        "carrierIds": [
            "AA",
            "US",
            "AZ",
            "B6",
            "DL",
            "UA",
            "AM",
            "NK",
            "F9",
            "AZ",
            "CX",
            "CZ",
            "EY",
            "GF",
            "KL",
            "KU",
            "LX",
            "PK",
            "QR",
            "SV",
            "TG",
            "TK",
            "UL",
            "6S",
            "YO",
            "HY",
            "LH",
            "WY",
            "PC",
            "BA",
            "VS",
            "KQ",
            "AC",
            "AF",
            "SQ",
            "DV",
            "GP",
            "ET",
            "DL",
            "AT",
            "J2",
            "PF"
        ]
      },
      "itinerary":originDestinationInformation
    });
    
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

// console.log("MasterPriceTravelBoard_Request",raw);

try{
    const result  = await fetchApi("masterprice-travelboard", requestOptions);
    if(!result){
      console.warn("No result received from the API.");
      return null;
    }
    // console.log("MasterPriceTravelBoard-result", result);

     // --------------------my amadeous Work Start------------------
  const MPBodyAccess = result?.data?.["soapenv:Envelope"]?.["soapenv:Body"]?.Fare_MasterPricerTravelBoardSearchReply;
    if(MPBodyAccess?.errorMessage){
      console.error("MasterPriceTravelBoard-Error",MPBodyAccess?.errorMessage);
      return null;
    }

// step 01: get the Reccomendations
const getReccomentation = Array.isArray(MPBodyAccess?.recommendation) ? MPBodyAccess?.recommendation : [MPBodyAccess?.recommendation];
 
// step 02: get the segmentFlightRef for all the flights
  const getSegmentFlightRef = getReccomentation?.map((items)=>items?.segmentFlightRef);
  // console.log("getSegmentFlightRef",getSegmentFlightRef);

// step 03 extracted ref number 
  const extractedRefDetails = getSegmentFlightRef.map((segmentArray) => 
    Array.isArray(segmentArray) 
      ? segmentArray.map((segment) => 
          Array.isArray(segment?.referencingDetail) ? segment.referencingDetail.filter((ref) => ref.refQualifier === "S") : []
        )
      : [segmentArray].map((segment) =>segment.referencingDetail.filter((ref) => ref.refQualifier === "S"))
  );

  // console.log("extractedRefDetails",extractedRefDetails);

  const rfineRefNumber = extractedRefDetails.map((items)=>items.map((item)=>item.map((itm)=>itm.refNumber)));
  // console.log("rfineRefNumber",rfineRefNumber);


  // Step 04 ----------------Matching and exracting the Flight based on Reccomendation RefNum-----------------------

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
        const flightProposal = flight.propFlightGrDetail.flightProposal[0]; // Only check the first ref
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

        // setting manually stopCounts into the groupDescription of Flights
        const stopCounts = flightDetailsArray.length - 1;
        return {
          departure: firstLeg?.location[0]?.locationId || null, // Departure location
          arrival: lastLeg?.location[1]?.locationId || null, // Arrival location
          departDate: firstLeg?.productDateTime?.dateOfDeparture || null, // Departure date
          arrivalDate: lastLeg?.productDateTime?.dateOfArrival || null, // Arrival date
          departTime: firstLeg?.productDateTime?.timeOfDeparture || null, // Departure time
          arrivalTime: lastLeg?.productDateTime?.timeOfArrival || null, // Arrival time
          marketingCarrier: firstLeg?.companyId?.marketingCarrier || null, // Marketing carrier
          stopCounts:stopCounts || 0
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

console.log("matchedFlightsWithRecommendations",matchedFlightsWithRecommendations);


// filtering the final passing array to get only the desired Carriers
const filteredFlights = matchedFlightsWithRecommendations.filter(flight => flight.groupDescription?.some(group => carrierIds.includes(group.marketingCarrier)));

console.log("filteredFlights",filteredFlights);


// -----------------------End-----------------------------------
    // return matchedFlightsWithRecommendations;
    return matchedFlightsWithRecommendations;
} catch(error){
    console.error("MasterPriceTravelBoard-Error", error);
    throw error;
}

}





