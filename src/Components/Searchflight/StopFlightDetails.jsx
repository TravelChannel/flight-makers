import React, { Fragment, useState, useEffect } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { elapsedTimeFunct, airportNameFunct, cityNameFunct, calculateDuration, formatCompleteDate, addTimeToPreviousDate, formatDateToISO, checkTimeToNextDate } from '../../helpers/formatdata';
import { useItemsToShow } from './Comman/Context';
import airlinesData from '../../Constant/airlineName';

const StopFlightDetails = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 860);
  const { searchDataArr } = useItemsToShow();
  const { classtype } = searchDataArr;
  const { activeFlightDet, refFlag } = props;

  const seatsAvailable = activeFlightDet.seatsAvailables;

  const allArrivalTimes = activeFlightDet.schedualDetGet.map(flightArray =>
    flightArray.map(flightInfo => flightInfo.arrival.time.slice(0, 5))
  );
  const allDepartureTimes = activeFlightDet.schedualDetGet.map(flightArray =>
    flightArray.map(flightInfo => flightInfo.departure.time.slice(0, 5))
  );
  const allTravelDates = activeFlightDet.groupDescription.map(flightArray =>
    flightArray.departureDate);

  // let currentDate = null;  

  const generateSegmentsForDate = (departureTimes, arrivalTimes, date) => {
    let currentDate = date;
    for (let i = 0; i < departureTimes.length; i++) {
      const segment = {};
      segment.departure = departureTimes[i];
      segment.arrival = arrivalTimes[i];
  
      // Check if the arrival is on the next day
      if (segment.arrival < segment.departure) {
        // Arrival is on the next day
        const nextDate = getNextDate(currentDate);
        segment.date = nextDate;
        currentDate = nextDate;  // Update the current date for the next iteration
      } else {
        // Arrival is on the same day
        segment.date = currentDate;
      }
  
      flightSegments.push(segment);
      // If there is a next arrival time, calculate the next date
      if (i < arrivalTimes.length - 1) {
        const nextDate = checkTimeToNextDate(segment.date, arrivalTimes[i], departureTimes[i + 1]);
        if (nextDate !== segment.date) {
          currentDate = nextDate;  // Update the current date for the next iteration
        }
        const nextSegment = {
          departure: arrivalTimes[i],
          arrival: departureTimes[i + 1],
          date: nextDate
        };
        flightSegments.push(nextSegment);
      } else {
        // Reset the current date if it's the last segment for this date
        currentDate = null;
      }
    }
  };
  
  const getNextDate = (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate.toISOString().split('T')[0];
  };
  
  
  const flightSegments = []; // Array to store flight segments
  // Add start segment for each date
  for (let i = 0; i < allTravelDates.length; i++) {
    const startSegment = {
      departure: allDepartureTimes[i][0], // Use the first departure time
      date: allTravelDates[i]
    };
    flightSegments.push(startSegment);
    // Generate segments for the date
    generateSegmentsForDate(allDepartureTimes[i], allArrivalTimes[i], allTravelDates[i]);
  }

  // console.log(flightSegments);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 860)
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])
  return (
    <Fragment>
      {activeFlightDet.schedualDetGet.map((val, idx) => {
        let currentDate = activeFlightDet.groupDescription[idx].departureDate;
        let updatedDate = '', updatenextLevel = '', updatedLastDate = '';
        return (
          <div key={idx} className="fd_more_detail">
            <div className="d-flex justify-content-between text-center bg-lighterBlue p-1">
              <div className="d-flex justify-content-start">
                <p className="fd_more_detail_size">
                  {`${cityNameFunct[val[0].departure.airport]} → ${cityNameFunct[val[val.length - 1].arrival.airport]}`}
                </p>
                <p className="fd_more_detail_date">{formatCompleteDate(currentDate)}</p>
              </div>
              <div className="d-flex justify-content-start">
                <p className="fd_more_detail_date"></p>
                {refFlag ? <p className="fd_more_refund">{activeFlightDet.fare.passengerInfoList[0].passengerInfo.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p> : null}
              </div>
            </div>
            {val.map((info, Idxs) => {
              if (Idxs === 0) {
                const newDate = addTimeToPreviousDate(currentDate, info.departure.time.slice(0, 5), info.arrival.time.slice(0, 5));
                updatedDate = newDate;

                if (Idxs < val.length - 1) {
                  const formattedDate = formatDateToISO(updatedDate);
                  const newDate2 = addTimeToPreviousDate(formattedDate, info.arrival.time.slice(0, 5), val[Idxs + 1].departure.time.slice(0, 5));
                  updatenextLevel = newDate2;
                }
              }
              if (Idxs === 2) {
                updatedLastDate = addTimeToPreviousDate(updatenextLevel, val[Idxs - 1].arrival.time.slice(0, 5), val[Idxs].departure.time.slice(0, 5));
              }

              const airlineName = info.carrier.marketing;
              const matchedAirline = airlinesData.find(airline => airline.id === airlineName);

              return (
                <Fragment key={Idxs}>
                  <div key={Idxs} className="fd_stops_detail d-flex justify-content-between  w-100">
                    <div className="fd_airport_logo align-self-center text-center stop_width_1">
                      <img className='airline-logo' src={matchedAirline ? matchedAirline.logo : airlineName} alt="" />
                      <p className="fd_airport_name">{info.carrier.marketing}</p>
                      <div className="fd_flightNo">
                        <p className="fd_airport_name">{`${airlineName}-${info.carrier.marketingFlightNumber}`}</p>
                      </div>
                    </div>
                    <div className="text-center align-self-center stop_width_2">
                      <span className="fd_airport_size">{info.departure.airport}</span>&nbsp;<span className="fd_airport_size_time">{info.departure.time.slice(0, 5)}</span>
                      {Idxs === 0 ?
                        <p className="fd_flight_date">{formatCompleteDate(currentDate)} </p>
                        :
                        Idxs === 1 ?
                          <p className="fd_flight_date">{addTimeToPreviousDate(updatedDate, val[Idxs - 1].arrival.time.slice(0, 5), info.departure.time.slice(0, 5))} </p>
                          :
                          <p className="fd_flight_date">{addTimeToPreviousDate(updatenextLevel, val[Idxs - 1].arrival.time.slice(0, 5), info.departure.time.slice(0, 5))} </p>
                      }
                      <p className="fd_airport_name">{airportNameFunct[info.departure.airport]}</p>
                    </div>
                    <div className="align-self-center stop_width_3">
                      <AccessTimeIcon className="d-flex align-items-center fd_clock" />
                      <p className="fd_flight_date">{elapsedTimeFunct(info.elapsedTime)}</p>
                    </div>
                    <div className="text-center align-self-center stop_width_4">
                      <span className="fd_airport_size">{info.arrival.airport}</span>&nbsp;<span className="fd_airport_size_time">{info.arrival.time.slice(0, 5)}</span>
                      {Idxs === 0 ?
                        <p className="fd_flight_date">{addTimeToPreviousDate(currentDate, info.departure.time.slice(0, 5), val[Idxs].arrival.time.slice(0, 5))} </p>
                        :
                        Idxs === 1 ?
                          <p className="fd_flight_date">{addTimeToPreviousDate(updatenextLevel, info.departure.time.slice(0, 5), val[Idxs].arrival.time.slice(0, 5))} </p>
                          :
                          <p className="fd_flight_date">{addTimeToPreviousDate(updatedLastDate, info.departure.time.slice(0, 5), val[Idxs].arrival.time.slice(0, 5))} </p>
                      }
                      <p className="fd_airport_name">{airportNameFunct[info.arrival.airport]}</p>
                    </div>
                    {
                      !isMobile && (
                        <Fragment>
                          <div className="align-self-center stop_width_5">
                            <p className="fd_airport_name fd_space_baggages">Seat Availab</p>
                            <p className="fd_airport_name fd_space_baggages">Class Type</p>
                            {
                              activeFlightDet.baggageAllowance[idx].pieceCount ? (
                                <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                              ) : (
                                <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                              )
                            }
                          </div>
                          <div className="align-self-center stop_width_6">
                            <p className="fd_airport_name">{seatsAvailable[Math.min(idx * 2 + Idxs, seatsAvailable.length - 1)]}</p>
                            <p className="fd_airport_name">{classtype}</p>
                            <p className="fd_airport_name fd_space_baggages">{activeFlightDet.baggageAllowance[idx].pieceCount} {activeFlightDet.baggageAllowance[idx].weight} {activeFlightDet.baggageAllowance[idx].unit}</p>
                          </div>
                        </Fragment>
                      )
                    }
                  </div>
                  {isMobile && (
                    <Fragment>
                      <div className="mob_card_detail_main">
                        <div className='d-flex justify-content-around'>
                          <p className="fd_airport_name fd_space_baggages">Seats Availabe</p>
                          <p className="fd_airport_name fd_space_baggages">Class Type</p>
                          {
                            activeFlightDet.baggageAllowance[idx].pieceCount ? (
                              <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                            ) : (
                              <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                            )
                          }
                        </div>
                        <div className='d-flex justify-content-around'>
                          <p className="fd_airport_name ">{seatsAvailable[Math.min(idx * 2 + Idxs, seatsAvailable.length - 1)]}</p>
                          <p className="fd_airport_name">{classtype}</p>
                          <p className="fd_airport_name fd_space_baggages">{activeFlightDet.baggageAllowance[idx].pieceCount} {activeFlightDet.baggageAllowance[idx].weight} {activeFlightDet.baggageAllowance[idx].unit}</p>
                        </div>
                      </div>
                    </Fragment>)}
                  <div>
                    {Idxs < val.length - 1 &&
                      <div className="fd_line_structure">
                        <div className="fd_line"></div>
                        <div className="fd_icon_wrapper">
                          <p className="fd_middle_border"><DirectionsRunIcon /> {`Short layover ${calculateDuration(info.arrival.time, val[Idxs + 1].departure.time)}`}</p>
                        </div>
                        <div className="fd_line"></div>
                      </div>
                    }
                  </div>
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </Fragment>
  );
};

export default StopFlightDetails;
