import React from 'react'
import FlightSearch from '../Home/FlightSearch';
import FlightIcon from '@mui/icons-material/Flight';
import { useParams } from 'react-router';
const DomesticFlightsEngine = () => {
  const {domesticflightName} = useParams();
  const cleanedFlightName = domesticflightName.replace('-', ' ');
  return (
    <div className='container bg-white p-2'>
        <h3 className='indexing_heading text-center'><FlightIcon className='seo_flightIcon'/>{cleanedFlightName}</h3>
        {/* {
          <h3>{domesticflightName}</h3>
        } */}
        <div>
            <FlightSearch/>
        </div>
    </div>
  )
}

export default DomesticFlightsEngine;