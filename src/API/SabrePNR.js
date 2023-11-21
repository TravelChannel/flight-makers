export const SabrePNRCreate = async () => {


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
            NumberInParty: "1",
            ResBookDesigCode: "O",
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
    console.log(flights);

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
                    "SpecialServiceInfo": {
                        "SecureFlight": [
                            {
                                "PersonName": {
                                    "NameNumber": "1.1",
                                    "GivenName": "Muhammad",
                                    "Surname": "Kashif",
                                    "DateOfBirth": "1980-01-01",
                                    "Gender": "M"
                                }
                            }
                        ]
                    }
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