// import { useFormData } from "../Context/FormDataContext";

export const SabrePNRCreate = async (formData) => {
    // const {completeUserData} = useFormData();



    const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
    const { adults, children, infants,classtype } = flightDetails;
    const userDetails = formData;

    console.log("userDetailsatSabrePNR",userDetails);
    // ----------------------------
    const PersonName = [];

    userDetails.forEach((passenger, index) => {
        const nameNumber = `${index + 1}.1`;
        let  nameReference
        let passengerType;
    
        // Determine passenger type dynamically based on index
        if (index < adults) {
            passengerType = 'ADT';
            nameReference = 'Mr';
        } else if (index < adults + children) {
            passengerType = 'CNN';
            nameReference = 'C09';
        } else {
            passengerType = 'INF';
            nameReference = 'I02';
        }
    
        // const givenName = passenger[`fname${index}`].toUpperCase();
        // const surname = passenger[`lname${index}`].toUpperCase();
        const givenNameRaw = passenger[`fname${index}`];
        const surnameRaw = passenger[`lname${index}`];
        const givenName = givenNameRaw ? givenNameRaw.toUpperCase() : "";
        const surname = surnameRaw ? surnameRaw.toUpperCase() : "";
        const person = {
            "NameNumber": nameNumber,
            "NameReference": nameReference,
            "PassengerType": passengerType, 
            "GivenName": givenName,
            "Surname": surname
        };
        if (passengerType === 'INF') {
            person.Infant = true;
        }
    
        PersonName.push(person);
    });
    
    console.log('kashifHussain',PersonName);

   
//  ---------------------------------------
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const PersonName2 = [];

userDetails.forEach((passenger, index) => {
    const nameNumber = `${index + 1}.1`;
    let nameReference;
    let passengerType;

    // Determine passenger type dynamically based on index
    if (index < adults) {
        passengerType = 'ADT';
        nameReference = 'Mr';
    } else if (index < adults + children) {
        passengerType = 'CNN';
        nameReference = 'MSTR*C09';
    } else {
        passengerType = 'INF';
        nameReference = 'I02';
    }

    const givenNameRaw = passenger[`fname${index}`];
    const surnameRaw = passenger[`lname${index}`];
    const givenName = givenNameRaw ? givenNameRaw.toUpperCase() : "";
    const surname = surnameRaw ? surnameRaw.toUpperCase() : "";

    // Extract DOB from userDetails based on index
    const dobKey = `DateOfBirth${index}`;
    const dob = passenger[dobKey];

    // Parse DOB string to Date object
    const dobDate = new Date(dob);
    const day = dobDate.getDate();
    const month = months[dobDate.getMonth()];
    const year = String(dobDate.getFullYear()).slice(-2); // Extract last two digits of the year

    // Format DOB in "DDMonYY" format
    const formattedDOB = `${day}${month}${year}`;

    const person1 = {
        "NameNumber": nameNumber,
        "NameReference": nameReference,
        "PassengerType": passengerType,
        "GivenName": givenName,
        "Surname": surname,
        "DOB": formattedDOB
    };

    if (passengerType === 'INF') {
        person1.Infant = true;
    }

    PersonName2.push(person1);
});

console.log('PersonName2222:', PersonName2);

// ------------------------------------------
const PassengerType = [];

// Add adult passengers
if (adults > 0) {
    PassengerType.push({ "Code": "ADT", "Quantity": adults.toString() });
}

// Add child passengers
if (children > 0) {
    PassengerType.push({ "Code": "CNN", "Quantity": children.toString() });
}

// Add infant passengers
if (infants > 0) {
    PassengerType.push({ "Code": "INF", "Quantity": infants.toString() });
}

console.log('passangersTypes',PassengerType);
  

    // --------------------------------
//     const serviceArray = PersonName2
//     .filter(user => user.PassengerType !== "ADT") 
//     .map((user, index) => ({
//         "PersonName": {
//             "NameNumber": user.PassengerType === "INF" ?  PersonName.find(u => u.PassengerType === "ADT").NameNumber : user.NameNumber
//         },
//         "Text": `${user.GivenName} ${user.Surname}`, 
//         "SegmentNumber": "A",
//         "SSR_Code": user.PassengerType === "CNN" ? "CHLD" : "INFT" 
//     }));

// console.log("serviceArray123",serviceArray);

// ---------------------

const serviceArray = PersonName2
    .filter(user => user.PassengerType !== "ADT") 
    .map((user, index) => {
        let text = ""; // Initialize text
        if (user.PassengerType === "CNN" || user.PassengerType === "INF") {
            if (user.PassengerType === "INF") {
                const infant = PersonName2.find(u => u.PassengerType === "INF" && u.NameNumber === user.NameNumber);
                text += `${infant.Surname}/${infant.GivenName}/${user.DOB}`;
            } else {
                text += `${user.DOB}`;
            }
        }
        return {
            "PersonName": {
                "NameNumber": user.PassengerType === "INF" ?  PersonName2.find(u => u.PassengerType === "ADT").NameNumber : user.NameNumber
            },
            "Text": text,
            "SegmentNumber": "A",
            "SSR_Code": user.PassengerType === "CNN" ? "CHLD" : "INFT" 
        };
    });

console.log("serviceArray", serviceArray);




    // ----------------------------------


  
    const passengerDetails = `${adults + children + infants}`;

    const passengerDet = `${adults + children}`;

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
    const flightName2 = schedualDetGet.flatMap(item => item.flatMap(valu => valu.carrier.operating));
    const flightNumber = schedualDetGet.flatMap(item => item.flatMap(valu => valu.carrier.marketingFlightNumber));
    const flightArrival = schedualDetGet.flatMap((flight) => flight.map((segment) => segment.arrival.airport));
    const flightDepature = schedualDetGet.flatMap((flight) => flight.map((segment) => segment.departure.airport));

    const oddIndexedSegments = flightSegments.filter((segment, index) => index % 2 !== 0);
    console.log("flightName1",flightName);
    console.log("flightName2",flightName2);


    // const flights = oddIndexedSegments.flatMap((item, index) => [
    //     {
    //         ArrivalDateTime: `${item.date}T${item.arrival}`,
    //         DepartureDateTime: `${item.date}T${item.departure}`,
    //         FlightNumber: `${flightNumber[index]}`,
    //         NumberInParty: `${passengerDet}`,
    //         ResBookDesigCode:`${classType}`,
    //         Status: "NN",
    //         DestinationLocation: {
    //             LocationCode: flightArrival[index],
    //         },
    //         MarketingAirline: {
    //             Code: flightName[index],
    //             FlightNumber: `${flightNumber[index]}`,
    //         },
    //         OriginLocation: {
    //             LocationCode: flightDepature[index],
    //         },
    //         OperatingAirline: {
    //             Code: flightName[index],
    //         },
    //         MarriageGrp: "I",
    //     },
    // ]);
    

    const flights = oddIndexedSegments.flatMap((item, index) => [
        {
            ArrivalDateTime: `${item.date}T${item.arrival}`,
            DepartureDateTime: `${item.date}T${item.departure}`,
            FlightNumber: `${flightNumber[index]}`,
            NumberInParty: `${passengerDet}`,
            ResBookDesigCode: `${classType}`,
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
            MarriageGrp: flightName[0] === flightName2[0] ? "I" : "O"
        },
    ]);
    
    console.log(flights);
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
                    "PersonName": PersonName,
                    "Email": [
                        {
                            "Address": " support@faremakers.com"
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
                                "PassengerType":PassengerType
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
                                "Text": "",
                                "Type": ""
                            }
                        ]
                    }
                },
                "SpecialService": {
                    "SpecialServiceInfo": {
                        "AdvancePassenger": transformedUserData.map((user, index) => ({
                            "Document": {
                                "IssueCountry": user[`countery${index}`]?.code,
                                "NationalityCountry": user[`countery${index}`]?.code,
                                "ExpirationDate": user[`PassportExpiryDate${index}`],
                                "Number": user[`passport${index}`],
                                "Type": "P"
                            },
                            "PersonName": {
                                "NameNumber": `${index + 1}.1`,
                                "GivenName": user[`fname${index}`], 
                                "Surname": user[`lname${index}`], 
                                "DateOfBirth": user[`DateOfBirth${index}`],
                                "Gender": user[`gender${index}`]
                            }
                        })),
                        "Service":serviceArray
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
        console.log("Raw123", raw)
        console.log("PNR SABRE", result)
        return result;
    }
    catch (error) {
        console.error("Sabre PNR Create", error)
    }
}