export const fetchPriceRates = async (departure, arrival,futureDate,futureDate1,tripType,adults,children,infants) => {
    const departureCode = departure.substring(departure.indexOf('(') + 1, departure.indexOf(')'));
    const arrivalCode = arrival.substring(arrival.indexOf('(') + 1, arrival.indexOf(')'));
    const storedAuthtoken = JSON.parse(localStorage.getItem("AuthToken"));
    const accessToken = storedAuthtoken ? storedAuthtoken.access_token : null;
    // console.log(tripType);

    const originDestinationInfo = futureDate1 !== undefined && futureDate1 !== "undefinedT00:00:00"
  ? [
      {
        "DepartureDateTime": futureDate,
        "OriginLocation": {
          "LocationCode": departureCode
        },
        "DestinationLocation": {
          "LocationCode": arrivalCode
        },
        "RPH": "0"
      },
      {
        "DepartureDateTime": futureDate1,
        "OriginLocation": {
          "LocationCode": arrivalCode
        },
        "DestinationLocation": {
          "LocationCode": departureCode
        },
        "RPH": "0"
      }
    ]
  : [
      {
        "DepartureDateTime": futureDate,
        "OriginLocation": {
          "LocationCode": departureCode
        },
        "DestinationLocation": {
          "LocationCode": arrivalCode
        },
        "RPH": "0"
      }
    ];

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

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${accessToken}`
    );
  
    const raw = JSON.stringify({
      "OTA_AirLowFareSearchRQ": {
        "OriginDestinationInformation": originDestinationInfo,
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
              "Name": "AD7"
            }
          }
        },
        "TravelPreferences": {
          "TPA_Extensions": {
            "DataSources": {
              "ATPCO": "Enable",
              "LCC": "Enable",
              "NDC": "Enable"
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
          "SeatsRequested": [1]
        },
        "Version": "1"
      }
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    return fetch("https://api.havail.sabre.com/v6.1.0/shop/altdates/flights?mode=live", requestOptions)
      .then(response => response.json())
      .then(result => {
        const priceRates = result.groupedItineraryResponse.itineraryGroups.flatMap((itineraryGroup) =>
          itineraryGroup.itineraries.flatMap((itinerary) =>
            itinerary.pricingInformation.flatMap((pricingInfo) => {
              const exchangeRateUSD = pricingInfo.fare.passengerInfoList[0].passengerInfo.currencyConversion.exchangeRateUsed;
              const priceRate = pricingInfo.fare.totalFare.totalPrice / exchangeRateUSD;
              // console.log(pricingInfo.fare.totalFare.totalPrice);
              return priceRate.toFixed(0);
            })
          )
        );
        const getDates = result.groupedItineraryResponse.itineraryGroups.map((item) => item.groupDescription.legDescriptions);
        const getPrice = result.groupedItineraryResponse.itineraryGroups.map((item) => item.itineraries.flatMap((itiner) => itiner.pricingInformation.flatMap((pricingInf) => pricingInf.fare.totalFare.totalPrice)));
        
        const combinedArray = getDates.map((date, index) => ({
          date: date,
          price: getPrice[index],
        }));
        
        // console.log(result);
        const data = tripType === undefined ? priceRates : combinedArray;
        return data;
      })
      
      .catch(error => {
        console.log('Error:', error);
        throw error;
      });
  };
  