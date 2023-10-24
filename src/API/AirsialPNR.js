export const AirsialPNRCreate = async () => {
    
    
    const Authtoken = JSON.parse(localStorage.getItem("airsialAuthToken"));
    const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
    const {bookingFlight,groupDescription,schedualDetGet,adults,children,infants} = flightData;
    const marketing = schedualDetGet.map(item => item[0].carrier.marketing);
    const marketingFlightNumber = schedualDetGet.map(item => item[0].carrier.marketingFlightNumber);

    const returnFlag = schedualDetGet.length === 2 ? true : false;

    // console.log(flightData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session_frontend=maqm7qje7feq4jql9p2tr2oj9k42nlra");

    var raw = JSON.stringify([
        {
            "Caller": "bookSeat",
            "token": `${Authtoken}`,
            "Return": returnFlag,
            "DepartureJourney": bookingFlight[0].JOURNEY_CODE,
            "DepartureFareType": bookingFlight[0].FareType,
            "DepartureClass": bookingFlight[0].CLASS_CODE,
            "DepartureFlight": `${marketing[0]}${marketingFlightNumber[0]}`,
            "ReturningJourney": bookingFlight[1] ? bookingFlight[1].JOURNEY_CODE : "",
            "ReturningClass": bookingFlight[1] ? bookingFlight[1].CLASS_CODE : "",
            "ReturningFlight": marketing[1] && marketingFlightNumber[1] ? `${marketing[1]}${marketingFlightNumber[1]}` : "",
            "ReturningFareType": bookingFlight[1] ? bookingFlight[1].FareType : "",
            "LocationDep": groupDescription[0].departureLocation,
            "LocationArr": groupDescription[0].arrivalLocation,
            "ftype": "dom",
            "TotalSeats": adults+children+infants,
            "totalInfant": infants,
            "totalAdult": adults,
            "totalChild": children
        }
    ]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try{
        const responce = await fetch("http://demo.airsial.com.pk/starter/asmis/booking", requestOptions);
        const result = await responce.json();
        console.log("PNR", result)
        return result;
    }
    catch (error) {
        console.error("Airsial PNR ERROR", error);
    }
    

}
