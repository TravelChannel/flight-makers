import React, { useState, Fragment, useEffect, useMemo } from 'react';
import StopFlightDetails from './StopFlightDetails';
import OneWay from './Comman/OneWay';
import Round from './Comman/Round';
import Multi from './Comman/Multi';
import { useItemsToShow } from './Comman/Context';
import airlinesData from '../../Constant/airlineName';
import { useNavigate } from 'react-router';
import { calculateTotalTime } from '../../helpers/formatdata';

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


  // ----------------Totol Amount Calculation------------------------
const flightFare = activeFlightDet?.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount;
const flightTax =  activeFlightDet?.recommendation?.recPriceInfo?.monetaryDetail[1]?.amount
// const totalAmount = Number(flightFare) + Number(flightTax);
const totalAmount = Number(flightFare);

// -------------------------end------------------------------------

const airlineName = activeFlightDet?.groupDescription.map((items)=>items.marketingCarrier);
const matchedAirline = useMemo(()=>{
  return airlineName?.map((id) => airlinesData.find((airline) => airline.id === id));
},[airlineName]);

const totalFlightTime = activeFlightDet?.matchedFlights?.map(it => 
  (Array.isArray(it?.flightDetails) ? it.flightDetails : [it.flightDetails]) 
    .map(i => i?.flightInformation?.attributeDetails?.attributeDescription)
) || [];


console.log("totalFlightTime",totalFlightTime);

  const ShowFltDetails = () => {
    setFdCard(!fdCard);
    setFlightDetailText(fdCard ? "Flight Details" : "Hide Details");
  };

  const bookTicket = () => {
    const { departure, date, arrival, tripType, ...newSearchDataArr } = searchDataArr;
    const mergedFlightDet = {
      ...activeFlightDet,
      ...newSearchDataArr,
      // ...flightStopdetails,  
      // flightSegmentDates: flightSegmentDates

    };
    if (window.fbq) {
      window.fbq('track', 'bookNow', {
        buttonName: 'bookNowButton',
        FlightDetails:searchDataArr
      });
    }

    console.log("mergedFlightDet",mergedFlightDet);
    localStorage.setItem("bookingTicket", JSON.stringify(mergedFlightDet));
    navigate('/flightbooking');
    window.scrollTo(0, 0);
  }
  const renderRoundTrip = () => {
    return (
      <Fragment>
        <div className='flight_details_hero mb-3' >
          <Round
            activeFlightDet={activeFlightDet} bookButton={true} bookTicket={bookTicket} totalAmount = {totalAmount}  totalFlightTime ={totalFlightTime}
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
            imageFlight={matchedAirline? matchedAirline[0].logo : null}
            flightName={activeFlightDet?.groupDescription[0]?.marketingCarrier}
            departureTime={activeFlightDet?.groupDescription[0]?.departTime}
            departureAirport={activeFlightDet?.groupDescription[0]?.departure}
            elapsedTime={calculateTotalTime(totalFlightTime)}
            stops={activeFlightDet?.groupDescription[0]?.stopCounts}
            arrivalTime={activeFlightDet?.groupDescription[0]?.arrivalTime}
            arrivalAirport={activeFlightDet?.groupDescription[0]?.arrival}
            priceTicket={totalAmount}
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
          {activeFlightDet.groupDescription.map((val, indx) => (
           
            <div key={indx}>
              <div className="d-flex justify-content-start w-100 ad_multi_border">
                <Multi
                  index={indx}
                  imageFlight={ matchedAirline.length > 1 ? matchedAirline[indx]?.logo : matchedAirline[0]?.logo}
                  flightName={val?.marketingCarrier}
                  departureTime={val?.departTime}
                  departureAirport={val?.departure}
                  elapsedTime={calculateTotalTime(totalFlightTime)[indx]}
                  stops={`${val?.stopCounts} stops`}
                  arrivalTime={val?.arrivalTime}
                  arrivalAirport={val?.arrival}
                />
                {
                  !smallScreen && (
                    <div className=" text-right align-self-center ad_width_bwteen_left" >
                      {indx === 0 && <span className="ad_total_price_size">{activeFlightDet?.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount.toLocaleString()} PKR</span>}
                      {indx === activeFlightDet.groupDescription.length - 1 && <button className='fd_book_button' type='button' onClick={bookTicket}>Book now</button>}
                    </div>
                  )
                }
              </div>
              {indx !== activeFlightDet.groupDescription.length - 1 && <hr className="hr_style" />}
            </div>
          ))}

          {smallScreen && (
            <div className='d-flex justify-content-end multi_payment_responsive '>
              <span className="ad_total_price_size align-self-center">{activeFlightDet?.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount.toLocaleString()} PKR</span>
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

export default React.memo(ActiveFlight);
