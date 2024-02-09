import React from 'react';
import FlightSearch from '../Home/FlightSearch';
import FlightIcon from '@mui/icons-material/Flight';
import { useParams } from 'react-router';
const FlightsSearchEngine = () => {
  const {flightName} = useParams();
  return (
    <div className='container bg-white p-2'>
        <h3 className='indexing_heading text-center'><FlightIcon className='seo_flightIcon'/>International Destinations</h3>
        {/* {
          <h3>hello {flightName}</h3>
        } */}
        <div>
            <FlightSearch/>
        </div>
    </div>
  )
}

export default FlightsSearchEngine;
