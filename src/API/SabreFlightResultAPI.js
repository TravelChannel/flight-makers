const fetchSearchResult = async (searchDataArr) => {
  const { departure, arrival, classtype, adults, children, infants, date } = searchDataArr;
  let classType = '';
  const storedAuthtoken = JSON.parse(localStorage.getItem('AuthToken'))
  const authToken = storedAuthtoken ? storedAuthtoken.access_token : null;

  const departureCode = departure.map((dep) => dep.substring(dep.indexOf('(') + 1, dep.indexOf(')')));
  const arrivalCode = arrival.map((arr) => arr.substring(arr.indexOf('(') + 1, arr.indexOf(')')));
  console.log(searchDataArr);
  classType =
    classtype === 'Economy'
      ? 'Y'
      : classtype === 'Business class'
        ? 'C'
        : classtype === 'First class'
          ? 'P'
          : classtype === 'Premium economy'
            ? 'S'
            : null;

  // console.log(departureCode,arrivalCode,date,classType,adults,children,infants);
  //  Conditionally add "CNN" (children) and "INF" (infants) objects if necessary

  const passengerTypeQuantity = [
    {
      "Code": "ADT",
      "Quantity": adults
    }
  ];
  if (children > 0) {
    passengerTypeQuantity.push({
      "Code": "CNN",
      "Quantity": children
    });
  }
  if (infants > 0) {
    passengerTypeQuantity.push({
      "Code": "INF",
      "Quantity": infants
    });
  }


  const originDestinationInformation = departureCode.map((dep, index) => ({
    DepartureDateTime: `${date[index]}T00:00:00`,
    DestinationLocation: {
      LocationCode: arrivalCode[index % arrivalCode.length]
    },
    OriginLocation: {
      LocationCode: dep
    },
    RPH: String(index),
    TPA_Extensions: {
      CabinPref: {
        Cabin: classType,
        PreferLevel: "Only"
      }
    }
  }));

  // console.log('originDestinationInformation',originDestinationInformation)

  // Construct the API request based on the searchDataArr values
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization',
    `Bearer ${authToken}`);

  const raw = JSON.stringify({
    "OTA_AirLowFareSearchRQ": {
      "OriginDestinationInformation": originDestinationInformation,
      "POS": {
        "Source": [
          {
            "PseudoCityCode": "43ED",
            "RequestorID": {
              "CompanyName": {
                "Code": "TN"
              },
              "ID": "1",
              "Type": "1"
            }
          }
        ]
      },
      "TPA_Extensions": {
        "IntelliSellTransaction": {
          "RequestType": {
            "Name": "200ITINS"
          }
        }
      },
      "TravelPreferences": {
        "TPA_Extensions": {
          "DataSources": {
            "ATPCO": "Enable",
            "LCC": "Disable",
            "NDC": "Disable"
          },
          "NumTrips": {}
        }
      },
      "TravelerInfoSummary": {
        "AirTravelerAvail": [
          {
            "PassengerTypeQuantity": passengerTypeQuantity
          }
        ],
        "SeatsRequested": [
          1
        ]
      },
      "Version": "3"
    }
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch("https://api.havail.sabre.com/v4/offers/shop", requestOptions);
    const result = await response.json();
    // console.log("kashi", result.groupedItineraryResponse.statistics.itineraryCount);
    if (result.groupedItineraryResponse.statistics.itineraryCount === 0) {
      const updatedArray = [];
      return updatedArray;
    }
    else {
      

      //Geting Dates Travelling
      const groupDescription = result.groupedItineraryResponse.itineraryGroups[0].groupDescription.legDescriptions;
      //Geting schedules
      const itinerGroup = result.groupedItineraryResponse.itineraryGroups.map(item => item.itineraries.map(itinerary => itinerary.legs.map(leg => leg.ref)));
      const legDes = result.groupedItineraryResponse.legDescs.map(legDesc => legDesc);
      const scheduleDes = result.groupedItineraryResponse.scheduleDescs.map((scheduleDesc) => scheduleDesc);


      const pricingDetails = result.groupedItineraryResponse.itineraryGroups.flatMap(item => item.itineraries.flatMap(pricing => pricing.pricingInformation));
      const matchSchedule = itinerGroup.map(group => group.map(refs => refs.map(ref => legDes.find(obj => obj.id === ref))));
      const matchLegsGet = matchSchedule.map(group1 => group1.map(group2 => group2.map(item => item.schedules.map(item2 => item2.ref))));

      const matchingData = matchLegsGet.map(group1 => group1.map(group2 => group2.map(refArray => refArray.flatMap(ref =>
        scheduleDes.filter(schedule => schedule.id === ref)))));


      // This function is used to giving the name of array and index assign
      const modifiedData = matchingData.map(item => item.map((innerArray, index) => ({ schedualDetGet: innerArray, })));



      // Geting baggageAllowance
      const baggageref = pricingDetails.map(bag => bag.fare.passengerInfoList[0].passengerInfo.baggageInformation.map(baggInfo => baggInfo.allowance.ref));
      const baggageval = result.groupedItineraryResponse.baggageAllowanceDescs;

      // Geting Seats                             
      const seatsAvailable = pricingDetails.map(priceing =>
        priceing.fare.passengerInfoList[0]?.passengerInfo.fareComponents?.flatMap(fareC =>
          fareC.segments?.flatMap(segm =>
            segm.segment?.seatsAvailable || []
          ) || []
        ) || []
      );


      // console.log(seatsAvailable);
      // Function to get values in proper format
      const getBaggageValues = (refArray) => {
        const descriptions = refArray.map(ref => {
          const matchingItems = baggageval.filter(item => item.id === ref);
          return matchingItems.length > 0 ? matchingItems[0] : null;
        });
        return descriptions;
      };

      // Use getBaggageValues function to get the values in proper format
      const baggageValues = baggageref.map(refArray => getBaggageValues(refArray));


      // This function is used to remove the extra values
      const newPricingDetails = pricingDetails.map(item => {
        const passengerInfoList = item.fare.passengerInfoList.map(passenger => {
          const { taxSummaries, taxes, fareComponents, baggageInformation, passengerTotalFare, ...rest } = passenger.passengerInfo;
          return { passengerInfo: rest };
        });

        return { ...item, fare: { ...item.fare, passengerInfoList } };
      });


      const updatedArray = modifiedData.flatMap((val, outerIndex) =>
        val.map((item, innerIndex) => {
          const pricingData = newPricingDetails[innerIndex];
          const baggageAllowance = baggageValues[innerIndex];
          const seatsAvailables = seatsAvailable[innerIndex];

          // Combine the item, pricingData, and baggageValues into a single object
          return { ...item, ...pricingData, groupDescription, baggageAllowance, seatsAvailables };
        })
      );

      // const departureDateAdjustment = result.groupedItineraryResponse.legDescs.map(item => item.schedules.map(adj =>adj.departureDateAdjustment))
      // console.log(departureDateAdjustment)
      console.log("kashi", updatedArray);
      return updatedArray;
    }

  } catch (error) {
    console.error("SabreFlightResultAPI", error);
  }
};

export default fetchSearchResult;
