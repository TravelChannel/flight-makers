import React, { useState, Fragment, useEffect } from 'react';
import StopFlightDetails from './StopFlightDetails';
import { elapsedTimeFunct, checkTimeToNextDate } from '../../helpers/formatdata';
import OneWay from './Comman/OneWay';
import Round from './Comman/Round';
import Multi from './Comman/Multi';
import { useItemsToShow } from './Comman/Context';
import airlinesData from '../../Constant/airlineName';
import { useNavigate } from 'react-router';

const ActiveFlight = (props) => {
  const { apiData, searchDataArr } = useItemsToShow();
  const [fdCard, setFdCard] = useState(false);
  const [flightDetailText, setFlightDetailText] = useState("Flight Details");
  const { selectedItemIdx } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 430);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 467)
  const { [selectedItemIdx]: activeFlightDet } = apiData;
  const { tripType, classtype } = searchDataArr;
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 430);
      setSmallScreen(window.innerWidth < 467);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])


  const allArrivalTimes = activeFlightDet.schedualDetGet.map(flightArray =>
    flightArray.map(flightInfo => flightInfo.arrival.time.slice(0, 5))
  );
  const allDepartureTimes = activeFlightDet.schedualDetGet.map(flightArray =>
    flightArray.map(flightInfo => flightInfo.departure.time.slice(0, 5))
  );
  const allTravelDates = activeFlightDet.groupDescription.map(flightArray =>
    flightArray.departureDate);

  let currentDate = null;

  const generateSegmentsForDate = (departureTimes, arrivalTimes, date) => {
    for (let i = 0; i < departureTimes.length; i++) {
      const segment = {};
      segment.departure = departureTimes[i];
      segment.arrival = arrivalTimes[i];

      // Use the current date for the first segment
      if (i === 0) {
        segment.date = checkTimeToNextDate(date, departureTimes[i], arrivalTimes[i]);
        // Update the currentDate after the first call to checkTimeToNextDate
        currentDate = segment.date;
      } else {
        // For subsequent segments, use the updated date from the previous call
        segment.date = checkTimeToNextDate(currentDate, arrivalTimes[i - 1], departureTimes[i]);
        // Update the currentDate for the next iteration
        currentDate = segment.date;
      }

      flightSegments.push(segment);

      if (i < arrivalTimes.length - 1) {
        const nextSegment = {
          departure: arrivalTimes[i],
          arrival: departureTimes[i + 1],
          date: checkTimeToNextDate(currentDate, arrivalTimes[i], departureTimes[i + 1]),
        };
        flightSegments.push(nextSegment);
        // Update the currentDate for the next iteration
        currentDate = nextSegment.date;
      } else {
        // For the last segment, use the date from the last call
        segment.date = currentDate;
      }
    }
  };
  const flightSegments = [];
  for (let i = 0; i < allTravelDates.length; i++) {
    const startSegment = {
      departure: allDepartureTimes[i][0],
      date: allTravelDates[i]
    };
    flightSegments.push(startSegment);
    generateSegmentsForDate(allDepartureTimes[i], allArrivalTimes[i], allTravelDates[i]);
  }



  const flightStopdetails = { flightSegments };

  const airlineNames = activeFlightDet.schedualDetGet.map(item => item[0].carrier.marketing);
  const matchedAirline = airlineNames.map((airlineName) => {
    const matchedAirline = airlinesData.find((airline) => airline.id === airlineName);
    return matchedAirline;
  }).filter((airline) => !!airline);


  const ShowFltDetails = () => {
    setFdCard(!fdCard);
    setFlightDetailText(fdCard ? "Flight Details" : "Hide Details");
  };

  const bookTicket = () => {
    const { departure, date, arrival, tripType, ...newSearchDataArr } = searchDataArr;
    const mergedFlightDet = {
      ...activeFlightDet,
      ...newSearchDataArr,
      ...flightStopdetails
    };
    localStorage.setItem("bookingTicket", JSON.stringify(mergedFlightDet));
    navigate('/flightbooking');
  }
  const renderRoundTrip = () => {
    return (
      <Fragment>
        <div className='flight_details_hero mb-3' >
          <Round
            activeFlightDet={activeFlightDet} bookButton={true} bookTicket={bookTicket}
          />
          <p className='fd_heading' onClick={ShowFltDetails}>{flightDetailText}</p>
          {fdCard && (
            <StopFlightDetails activeFlightDet={activeFlightDet} refFlag={true} />
          )}
        </div>
      </Fragment>
    );
  };
  const renderOneWay = () => {

    return (
      <Fragment>
        <div className='flight_details_hero mb-3' >
          <OneWay
            imageFlight={matchedAirline[0] ? matchedAirline[0].logo : null}
            flightName={matchedAirline[0] ? matchedAirline[0].name : null}
            departureTime={activeFlightDet.schedualDetGet.map(values => values[0].departure.time.slice(0, 5))}
            departureAirport={activeFlightDet.schedualDetGet.map(values => values[0].departure.airport)}
            elapsedTime={`${elapsedTimeFunct(activeFlightDet.schedualDetGet.map(values => values.reduce((sum, val) => sum + val.elapsedTime, 0)))}`}
            stops={activeFlightDet.schedualDetGet[0].length - 1 === 0 ? "Non Stop" : `${activeFlightDet.schedualDetGet[0].length - 1} Stop`}
            arrivalTime={activeFlightDet.schedualDetGet.map(values => values[values.length - 1].arrival.time.slice(0, 5))}
            arrivalAirport={activeFlightDet.schedualDetGet.map((values) => values[values.length - 1].arrival.airport)}
            priceTicket={activeFlightDet.fare.totalFare.totalPrice.toLocaleString()}
            bookButton={true}
            bookTicket={bookTicket}
          />
          <p className='fd_heading' onClick={ShowFltDetails}>{flightDetailText}</p>
          {fdCard && (
            <StopFlightDetails activeFlightDet={activeFlightDet} selectedItemIdx={selectedItemIdx} classtype={classtype} refFlag={true} />
          )}
        </div>
      </Fragment>
    );
  };
  const renderMultiCity = () => {

    return (
      <Fragment>
        <div className='flight_details_hero border-lighter mb-3' >
          {activeFlightDet.schedualDetGet.map((val, indx) => (
            <div key={indx}>
              <div className="d-flex justify-content-start w-100 ad_multi_border">
                <Multi
                  index={indx}
                  imageFlight={matchedAirline[indx] ? matchedAirline[indx].logo : null}
                  flightName={matchedAirline[indx] ? matchedAirline[indx].name : null}
                  departureTime={val[0].departure.time.slice(0, 5)}
                  departureAirport={val[0].departure.airport}
                  elapsedTime={elapsedTimeFunct(val.map((vale) => vale.elapsedTime).reduce((sum, time) => sum + time, 0))}
                  stops={val.length - 1 === 0 ? "Non Stop" : `${val.length - 1} Stop`}
                  arrivalTime={val[val.length - 1].arrival.time.slice(0, 5)}
                  arrivalAirport={val[val.length - 1].arrival.airport}
                />
                {
                  !smallScreen && (
                    <div className=" text-right align-self-center ad_width_bwteen_left" >
                      {indx === 0 && <span className="ad_total_price_size">{activeFlightDet.fare.totalFare.totalPrice.toLocaleString()} PKR</span>}
                      {indx === activeFlightDet.schedualDetGet.length - 1 && <button className='fd_book_button' type='button' onClick={bookTicket}>Book now</button>}
                    </div>
                  )
                }
              </div>
              {indx !== activeFlightDet.schedualDetGet.length - 1 && <hr className="hr_style" />}
            </div>
          ))}

          {smallScreen && (
            <div className='d-flex justify-content-end multi_payment_responsive '>
              <span className="ad_total_price_size align-self-center">{activeFlightDet.fare.totalFare.totalPrice.toLocaleString()} PKR</span>
              <button className='fd_book_button ' type='button' onClick={bookTicket}>Book now</button>
            </div>
          )}
          <p className='fd_heading' onClick={ShowFltDetails}>{flightDetailText}</p>
          {fdCard && (
            <StopFlightDetails activeFlightDet={activeFlightDet} selectedItemIdx={selectedItemIdx} classtype={classtype} refFlag={true} />
          )}
        </div>
      </Fragment>
    );
  };


  let content;

  if (tripType === "Round") {
    content = renderRoundTrip();
  } else if (tripType === "OneWay") {
    content = renderOneWay();
  } else if (tripType === "MultiCity") {
    content = renderMultiCity();
  } else {
    content = null;
  }

  return (
    <div>
      {content}
    </div>
  );


};

export default ActiveFlight;
