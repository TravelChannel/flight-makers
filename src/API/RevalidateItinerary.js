export const reviewItinerary = async () => {

  const storedAuthtoken = JSON.parse(localStorage.getItem('AuthToken'))
  const authToken = storedAuthtoken ? storedAuthtoken.access_token : null;

  const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
  // console.log(flightData);
  const {groupDescription,schedualDetGet,adults,children,infants} = flightData;

  const noOfSeats = adults+children+infants;
  const OriginDestinationInformation = groupDescription.map((item, index) => ({
    "RPH": `${index}`,
    "DepartureDateTime": `${item.departureDate}T00:00:00`,
    "OriginLocation": {
      "LocationCode": `${item.departureLocation}`
    },
    "DestinationLocation": {
      "LocationCode": `${item.arrivalLocation}`
    },
    "TPA_Extensions": {
      "Flight": schedualDetGet[index].map((flight) => ({
        "ClassOfService": "B",
        "Number": flight.carrier.marketingFlightNumber,
        "DepartureDateTime": `${item.departureDate}T${flight.departure.time.slice(0, 8)}`,
        "ArrivalDateTime": `${item.departureDate}T${flight.arrival.time.slice(0, 8)}`,
        "Type": "A",
        "OriginLocation": {
          "LocationCode": flight.departure.airport
        },
        "DestinationLocation": {
          "LocationCode": flight.arrival.airport
        },
        "Airline": {
          "Operating": flight.carrier.marketing,
          "Marketing": flight.carrier.operating
        }
      })),
      "SegmentType": {
        "Code": "O"
      }
    }
  }));
  
  const passengerTypeQuantity = [
    {
      "Code": "ADT",
      "Quantity": adults,
      "TPA_Extensions": {}
    }
  ];
  if (children > 0) {
    passengerTypeQuantity.push({
      "Code": "CNN",
      "Quantity": children,
      "TPA_Extensions": {}
    });
  }
  if (infants > 0) {
    passengerTypeQuantity.push({
      "Code": "INF",
      "Quantity": infants,
      "TPA_Extensions": {}
    });
  }
  
  
  
  // console.log(OriginDestinationInformation)
  
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization',
    `Bearer ${authToken}`);
  myHeaders.append('Accept-Encoding', 'identity'); 

  var raw = JSON.stringify({
    "OTA_AirLowFareSearchRQ": {
      "Version": "4",
      "POS": {
        "Source": [
          {
            "PseudoCityCode": "43ED",
            "RequestorID": {
              "Type": "1",
              "ID": "1",
              "CompanyName": {
                "Code": "TN"
              }
            }
          }
        ]
      },
      "OriginDestinationInformation": OriginDestinationInformation,
      "TravelPreferences": {
        "TPA_Extensions": {
          "VerificationItinCallLogic": {
            "Value": "M"
          }
        }
      },
      "TravelerInfoSummary": {
        "SeatsRequested": [
          noOfSeats
        ],
        "AirTravelerAvail": [
          {
            "PassengerTypeQuantity": passengerTypeQuantity
          }
        ],
        "PriceRequestInformation": {
          "TPA_Extensions": {}
        }
      },
      "TPA_Extensions": {
        "IntelliSellTransaction": {
            "Debug": false,
            "RequestType": {
                "Name": "200ITINS"
            },
            "ServiceTag": {
                "Name": "REVALIDATE"
            },
        }
    }
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  try {
    const response = await fetch("https://api.havail.sabre.com/v4/shop/flights/revalidate", requestOptions);
    const result = await response.json();
    console.log("result", result);
    // console.log(raw);
    return result;
  }
  catch (error) {
    console.error("Revalidate Itinerary", error);
  }

};

