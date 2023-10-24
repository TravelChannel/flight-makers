
import {convertTimeToMinutes} from '../helpers/formatdata';

const fetchAirsailData = async (searchDataArr) => {
    const { tripType, departure, arrival, adults, children, infants, date } = searchDataArr;

    const Authtoken = JSON.parse(localStorage.getItem("airsialAuthToken"));

    const departureCode = departure[0].substring(departure[0].indexOf('(') + 1, departure[0].indexOf(')'));
    const arrivalCode = arrival[0].substring(arrival[0].indexOf('(') + 1, arrival[0].indexOf(')'));


    function reverseDateFormat(dateString) {
        const parts = dateString.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    const startDate = reverseDateFormat(date[0]);
    const returnDate = tripType === "Round" ? reverseDateFormat(date[1]) : null;

    // console.log(returnDate);
    const returnFlag = tripType === "Round" ? true : false;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session_frontend=fmvtnkl04cdi69d8a25il999m0mfqn18");

    const raw = JSON.stringify([
        {
            "Caller": "getSingleflight",
            "token": `${Authtoken}`,
            "DepartingOn": startDate,
            "LocationDep": departureCode,
            "LocationArr": arrivalCode,
            "Return": returnFlag,
            "ReturningOn": returnDate,
            "AdultNo": adults,
            "ChildNo": children,
            "InfantNo": infants
        }
    ]);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try {
        const responsePromise = fetch("http://demo.airsial.com.pk/starter/asmis/booking", requestOptions);
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Request timeout'));
            }, 10000); // 30 seconds timeout
        });
    
        const response = await Promise.race([responsePromise, timeoutPromise]);
        
        if (response.ok) {
            const getData = await response.json();
            if (getData.Response.Data.length === 0) {
                return null;
            } else {
                const result = getData.Response.Data;
                const extraBaggages = result.availableFareTypes;
                const startweight = result.outbound[0].BAGGAGE_FARE[0].weight;
                const startFligtNumber = result.outbound[0].FLIGHT_NO;
                const fareType = result.outbound[0].BAGGAGE_FARE[0].sub_class_id
                const JOURNEY_CODE = result.outbound[0].JOURNEY_CODE;
                const CLASS_CODE = result.outbound[0].CLASS_CODE;
                const departurTime = result.outbound[0].DEPARTURE_TIME;
                const arrivalTime = result.outbound[0].ARRIVAL_TIME;
                const durationTime = convertTimeToMinutes(result.outbound[0].DURATION);
                
                let returnweight = 0;
                let ticketPrice = 0;
                let taxPrice = 0;
                let returnFlightNumber = 0;
                let returnDepartureTime = "";
                let returnArrivalTime = "";
                let returnDurationTime = 0;
                let returnJOURNEY_CODE = '';
                let returnCLASS_CODE = '';
                let returnFareType = '';
                
                const calculatePriceAndTax = (fare) => {
                    const adultPrice = fare.FARE_PAX_WISE.ADULT.BASIC_FARE * adults;
                    const childPrice = fare.FARE_PAX_WISE.CHILD.BASIC_FARE * children;
                    const infantsPrice = fare.FARE_PAX_WISE.INFANT.BASIC_FARE * infants;
        
                    ticketPrice += adultPrice + childPrice + infantsPrice;
                    taxPrice += ((fare.FARE_PAX_WISE.ADULT.TOTAL - adultPrice) * adults)
                        + ((fare.FARE_PAX_WISE.CHILD.TOTAL - childPrice) * children)
                        + ((fare.FARE_PAX_WISE.INFANT.TOTAL - infantsPrice) * infants);
                };
        
                calculatePriceAndTax(result.outbound[0].BAGGAGE_FARE[0]);
        
                if (returnFlag) {
                    calculatePriceAndTax(result.inbound[0].BAGGAGE_FARE[0]);
                    returnweight = result.inbound[0].BAGGAGE_FARE[0].weight;
                    returnFlightNumber = result.inbound[0].FLIGHT_NO;
                    returnJOURNEY_CODE = result.inbound[0].JOURNEY_CODE;
                    returnFareType = result.inbound[0].BAGGAGE_FARE[0].sub_class_id;
                    returnCLASS_CODE = result.inbound[0].CLASS_CODE;
                    returnDepartureTime = result.inbound[0].DEPARTURE_TIME;
                    returnArrivalTime = result.inbound[0].ARRIVAL_TIME;
                    returnDurationTime = convertTimeToMinutes(result.inbound[0].DURATION);
                }
                // console.log(durationTime);
        
                const airSialFetchResults = [
                    {
                        extraBaggages: extraBaggages,
                        baggageAllowance: [
                            { id: 1, unit: "kg", weight: startweight },
                        ],

                        bookingFlight: [
                            { id: 1, JOURNEY_CODE: JOURNEY_CODE, CLASS_CODE: CLASS_CODE, FareType: fareType},
                        ],
                        fare: {
                            eTicketable: false,
                            governingCarriers: "PK PK",
                            lastTicketDate: "",
                            lastTicketTime: "",
                            passengerInfoList: [
                                {
                                    passengerInfo: {
                                        nonRefundable: true,
                                        passengerNumber: adults,
                                        passengerType: "ADT",
                                    },
                                },
                            ],
                            totalFare: {
                                baseFareAmount: 96,
                                baseFareCurrency: "",
                                constructionAmount: 96,
                                constructionCurrency: "",
                                currency: "PKR",
                                equivalentAmount: ticketPrice,
                                equivalentCurrency: "PKR",
                                totalPrice: ticketPrice+taxPrice,
                                totalTaxAmount: taxPrice,
                            },
                            validatingCarrierCode: "PF",
                            vita: false
                        },
        
                        groupDescription: [
                            {
                                arrivalLocation: arrivalCode,
                                departureDate: date[0],
                                departureLocation: departureCode,
                            }
                        ],
                        pricingSubsource: "HPIS",
                        schedualDetGet: [
                            [
                                {
                                    arrival: {
                                        airport: arrivalCode,
                                        city: arrivalCode,
                                        country: "",
                                        terminal: "H",
                                        time: arrivalTime,
                                    },
                                    carrier: {
                                        equipment: {
                                            code: "77W",
                                            typeForFirstLeg: "W",
                                            typeForLastLeg: "W",
                                        },
                                        marketing: "PF",
                                        marketingFlightNumber: startFligtNumber.replace("PF", ""),
                                        operating: "PF",
                                        operatingFlightNumber: startFligtNumber.replace("PF", ""),
                                    },
                                    departure: {
                                        airport: departureCode,
                                        city: departureCode,
                                        country: "",
                                        time: departurTime,
                                    },
                                    eTicketable: false,
                                    elapsedTime: durationTime,
                                    frequency: "S******",
                                    id: 47,
                                    stopCount: 0,
                                    totalMilesFlown: 1790,
                                    // Add other properties as needed
                                },
                            ],
                            
                        ],
                        seatsAvailables: ['-'],
                    },
                ];
                if (returnFlag) {
                    airSialFetchResults[0].groupDescription.push({
                        arrivalLocation: departureCode,
                        departureDate: date[1],
                        departureLocation: arrivalCode,
                    });
                    airSialFetchResults[0].baggageAllowance.push({
                        id: 2, unit: "kg", weight: returnweight,
                    });
                    airSialFetchResults[0].bookingFlight.push({
                        id: 2, JOURNEY_CODE: returnJOURNEY_CODE, CLASS_CODE: returnCLASS_CODE, FareType : returnFareType
                    });
                    airSialFetchResults[0].schedualDetGet.push([
                        {
                            arrival: {
                                airport: departureCode,
                                city: departureCode,
                                country: "",
                                time:returnArrivalTime,
                            },
                            carrier: {
                                equipment: {
                                    code: "77W",
                                    typeForFirstLeg: "W",
                                    typeForLastLeg: "W",
                                },
                                marketing: "PF",
                                marketingFlightNumber: returnFlightNumber.replace("PF", ""),
                                operating: "PF",
                                operatingFlightNumber: returnFlightNumber.replace("PF", ""),
                            },
                            departure: {
                                airport: arrivalCode,
                                city: arrivalCode,
                                country: "",
                                time: returnDepartureTime,
                                terminal: "H",
                            },
                            eTicketable: false,
                            elapsedTime: returnDurationTime,
                            frequency: "****T**",
                            id: 19,
                            stopCount: 0,
                            totalMilesFlown: 1790,
                        },
                    ],);
                }
        
                if (children > 0) {
                    airSialFetchResults[0].fare.passengerInfoList.push({
                        passengerInfo: {
                            nonRefundable: false,
                            passengerNumber: children,
                            passengerType: "CNN",
                        },
                    });
                }
        
                if (infants > 0) {
                    airSialFetchResults[0].fare.passengerInfoList.push({
                        passengerInfo: {
                            nonRefundable: false,
                            passengerNumber: infants,
                            passengerType: "INF",
                        },
                    });
                }
                // console.log("airSialFetchResults", result);
                // console.log("airSialFetchResults", airSialFetchResults);
                return airSialFetchResults;
            }
        } else {
            console.log("API request failed with status:", response.status);
            return null;
        }
    } catch (error) {
        console.log("AirSial:", error.message);
        return null;
    }

};

export default fetchAirsailData;