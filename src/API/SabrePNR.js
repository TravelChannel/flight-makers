export const SabrePNRCreate = async (formData) => {

    const userDetails = formData;
    const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
    const { adults, children, infants,classtype } = flightDetails;
  
    const passengerDetails = `${adults + children + infants}`;
    let classType = '';

   
    switch (classtype) {
        case 'Economy':
          classType = 'Y';
          break;
        case 'Business class':
          classType = 'C';
          break;
        case 'First class':
          classType = 'P';
          break;
        case 'Premium economy':
          classType = 'S';
          break;
        default:
          console.log(`Unexpected classtype: ${classtype}`);
          // Set a default value or throw an error if necessary
      }

    console.log("flightDetails",classType);
    console.log("passangerDetails",passengerDetails);

// --------------------------------
function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  const transformedUserData = userDetails.map((user, index) => {
    const transformedDateOfBirth = convertDateFormat(user[`DateOfBirth${index}`]);
    const transformedPassportExpiryDate = convertDateFormat(user[`PassportExpiryDate${index}`]);
  
    const transformedGender = user[`gender${index}`].toUpperCase().charAt(0);
 
    return {
      ...user,
      [`DateOfBirth${index}`]: transformedDateOfBirth,
      [`PassportExpiryDate${index}`]: transformedPassportExpiryDate,
      [`gender${index}`]: transformedGender,
    };
  });
 
  
  console.log("transformedData", transformedUserData);
// --------------------------------


console.log("userData",userDetails);
    const storedAuthtoken = JSON.parse(localStorage.getItem('AuthToken'))
    const authToken = storedAuthtoken ? storedAuthtoken.access_token : null;

    const flightdetails = JSON.parse(localStorage.getItem("bookingTicket"));
    const { schedualDetGet, flightSegments } = flightdetails;
    const flightName = schedualDetGet.flatMap(item => item.flatMap(valu => valu.carrier.marketing));
    const flightNumber = schedualDetGet.flatMap(item => item.flatMap(valu => valu.carrier.marketingFlightNumber));
    const flightArrival = schedualDetGet.flatMap((flight) => flight.map((segment) => segment.arrival.airport));
    const flightDepature = schedualDetGet.flatMap((flight) => flight.map((segment) => segment.departure.airport));

    const oddIndexedSegments = flightSegments.filter((segment, index) => index % 2 !== 0);

    const flights = oddIndexedSegments.flatMap((item, index) => [
        {
            ArrivalDateTime: `${item.date}T${item.arrival}`,
            DepartureDateTime: `${item.date}T${item.departure}`,
            FlightNumber: `${flightNumber[index]}`,
            NumberInParty: `${passengerDetails}`,
            ResBookDesigCode:`${classType}`,
            Status: "NN",
            DestinationLocation: {
                LocationCode: flightArrival[index],
            },
            MarketingAirline: {
                Code: flightName[index],
                FlightNumber: `${flightNumber[index]}`,
            },
            OriginLocation: {
                LocationCode: flightDepature[index],
            },
            OperatingAirline: {
                Code: flightName[index],
            },
            MarriageGrp: "I",
        },
    ]);
    console.log("flights",flights);

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append('Authorization',
    `Bearer ${authToken}`);

    var raw = JSON.stringify({
        "CreatePassengerNameRecordRQ": {
            "version": "2.5.0",
            "targetCity": "43ED",
            "haltOnAirPriceError": true,
            "TravelItineraryAddInfo": {
                "AgencyInfo": {
                    "Address": {
                        "AddressLine": "SABRE TRAVEL",
                        "CityName": "SOUTHLAKE",
                        "CountryCode": "US",
                        "PostalCode": "76092",
                        "StateCountyProv": {
                            "StateCode": "TX"
                        },
                        "StreetNmbr": "3150 SABRE DRIVE"
                    },
                    "Ticketing": {
                        "TicketType": "7TAW"
                    }
                },
                "CustomerInfo": {
                    "ContactNumbers": {
                        "ContactNumber": [
                            {
                                "NameNumber": "1.1",
                                "Phone": "923111147111",
                                "PhoneUseType": "H"
                            }
                        ]
                    },
                    "PersonName": [
                        {
                            "NameNumber": "1.1",
                            "NameReference": "Mr",
                            "PassengerType": "ADT",
                            "GivenName": "ARMAN",
                            "Surname": "AHMED"
                        }
                    ],
                    "Email": [
                        {
                            "Address": "kashiffm58@gmail.com"
                        }
                    ]
                }
            },
            "AirBook": {
                "RetryRebook": {
                    "Option": true
                },
                "HaltOnStatus": [
                    {
                        "Code": "KK"
                    },
                    {
                        "Code": "LL"
                    },
                    {
                        "Code": "NN"
                    },
                    {
                        "Code": "NO"
                    },
                    {
                        "Code": "UC"
                    },
                    {
                        "Code": "US"
                    }
                ],
                "OriginDestinationInformation": {
                    "FlightSegment": flights

               },
                "RedisplayReservation": {
                    "NumAttempts": 10,
                    "WaitInterval": 300
                }
            },
            "AirPrice": [
                {
                    "PriceRequestInformation": {
                        "Retain": true,
                        "OptionalQualifiers": {
                            "FOP_Qualifiers": {
                                "BasicFOP": {
                                    "Type": "CA"
                                }
                            },
                            "PricingQualifiers": {
                                "PassengerType": [
                                    {
                                        "Code": "ADT",
                                        "Quantity": "1"
                                    }
                                ]
                            }
                        }
                    }
                }
            ],
            "PostProcessing": {
                "ARUNK": {},
                "EndTransaction": {
                    "Source": {
                        "ReceivedFrom": "FM WEB1"
                    }
                }
            },
            "SpecialReqDetails": {
                "AddRemark": {
                    "RemarkInfo": {
                        "Remark": [
                            {
                                "Text": "Test remark",
                                "Type": "Client Address"
                            }
                        ]
                    }
                },
                "SpecialService": {
                    SpecialServiceInfo: {
                        AdvancePassenger: transformedUserData.map((user, index) => ({
                          Document: {
                            IssueCountry: user[`countery${index}`]?.code,
                            NationalityCountry: user[`countery${index}`]?.code,
                            ExpirationDate: user[`PassportExpiryDate${index}`],
                            Number: user[`passport${index}`],
                            Type: "P"
                          },
                          PersonName: {
                            NameNumber: `${index + 1}.1`,
                            GivenName:user[`fname${index}`], 
                            Surname: user[`lname${index}`], 
                            DateOfBirth: user[`DateOfBirth${index}`],
                            Gender: user[`gender${index}`]

                          }
                        }))
                      }
                }
            }
        }
    });

    console.log("userallDetials",raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const responce = await fetch("https://api.havail.sabre.com/v2.5.0/passenger/records?mode=create", requestOptions);
        const result = await responce.json();
        console.log("Raw", raw)
        console.log("PNR SABRE", result)
        return result;
    }
    catch (error) {
        console.error("Sabre PNR Create", error)
    }
}