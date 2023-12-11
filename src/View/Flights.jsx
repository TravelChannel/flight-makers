import React from 'react';
import FlightSearch from '../Components/Home/FlightSearch';
import BookingOptions from '../Components/Home/BookingOptions';
import AirLinesDetails from '../Constant/AirLinesDetails';
import { useNavigate } from 'react-router';
const Flights = () => {
  const navigate = useNavigate();
  const PopularAirLines = ()=>{
    navigate('/index');
  };
  return (
    <div className='container bg-white'>
        <div>
          <FlightSearch/>
        </div>
        <div>
          <BookingOptions/>
        </div>
        <div className='heading_color_blue  footer_flight_details '>
          <p>Get the Popular Airlines Tickets on Faremakers</p>
        </div>
        <div className='popular_airlines_main'>
          {AirLinesDetails.map((items, index) => (
          <>
          <span className='pop_airlines' key={index} onClick = {PopularAirLines}>{`${items.airlinename}`}</span> <span className='popular_seprator'>|</span>
          </>
          ))}
        </div>
    </div>
  )
}

export default Flights;