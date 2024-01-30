import React from 'react'
import FlightSearch from '../Home/FlightSearch';
import FlightIcon from '@mui/icons-material/Flight';
const DomesticFlightsEngine = () => {
  return (
    <div className='container bg-white p-2'>
        <h3 className='indexing_heading text-center'><FlightIcon className='seo_flightIcon'/>Domestic Destinations</h3>
        <div>
            <FlightSearch/>
        </div>
    </div>
  )
}

export default DomesticFlightsEngine;