import React from 'react';
import FlightSearch from '../Home/FlightSearch';
import FlightIcon from '@mui/icons-material/Flight';
import { useParams } from 'react-router';
const FlightsSearchEngine = () => {
  const {flightName} = useParams();
  // const cleanedFlightName = flightName.replace(/^cheap-flights-from-/i, '').replace(/-/g, ' ');
  const cleanedFlightName = flightName.replace('-', ' ');
  return (
    <div className='container bg-white p-2'>
        <h3 className='indexing_heading text-center'><FlightIcon className='seo_flightIcon'/>{cleanedFlightName}</h3>
        <div>
            <FlightSearch cleanedFlightName ={cleanedFlightName}/>
        </div>
    </div>
  )
}

export default FlightsSearchEngine;
