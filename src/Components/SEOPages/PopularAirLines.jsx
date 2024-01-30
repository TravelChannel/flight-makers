import React, { useEffect, useState } from 'react';
import FlightSearch from '../Home/FlightSearch';
import FlightIcon from '@mui/icons-material/Flight';
import airlinesName from '../../Constant/airlineName';
import { useLocation, useNavigate } from 'react-router';
import SEOAirlinesData from '../../Constant/SEOAirlinesData';
import { useParams } from 'react-router';

const PopularAirLines = () => {
  const [flightData, setFlightData] = useState({});
  const [airlineLogoData, setAirLineLogoData] = useState({});

  const { airlineName } = useParams();
  console.log("airlineNameFinal",airlineName);
  const navigate = useNavigate();
  const location = useLocation();
  const flightID = location.state && location.state.id;
  

  console.log("fllightIDCurr",flightID);
  console.log("SEOAirlinesDataCurr",SEOAirlinesData);


  useEffect(() => {
    console.log('SEOAirlinesDatapart2',SEOAirlinesData);
    const selectedFlight = SEOAirlinesData?.find((flight) => flight.flightname === airlineName);
    setFlightData(selectedFlight);
    console.log("selectedFlightCurr",selectedFlight)
    const airlinesData = airlinesName?.find((airline) => airline.id === selectedFlight?.flightCode);
    setAirLineLogoData(airlinesData);

    document.title = airlineName ? `${airlineName} - Popular Airlines` : 'Popular Airlines';
  }, [airlineName, navigate, flightID]);

  return (
    <div className='container bg-white'>
      <div className='p-2'>
        <h3 className='indexing_heading text-center'>
          <FlightIcon className='seo_flightIcon' />
          {`${flightData?.flightname}`}
        </h3>

        <div className='Seo_SearchEngine'>
          <FlightSearch />
        </div>

        <div className='faremakers_indexing_main'>
          <h3 className='indexing_heading text-center'>{`${flightData?.mainHeading}`}</h3>

          <div className='row'>
            <div className='col-md-4 indexing_row_main'>
              <h5 className='text-center'>{flightData?.heading1}</h5>
              {flightData?.topPicks?.map((item, index) => (
                <div className='d-flex justify-content-start indexing_flights_data' key={index}>
                  <div className='d-flex justify-content-between indexing_detail_box'>
                    <p className='align-self-center'>{item.destination}</p>
                    <img src={airlineLogoData?.logo} alt='' width='30px' />
                  </div>
                </div>
              ))}
            </div>

            <div className='col-md-4 indexing_row_main'>
              <h5 className='text-center'>{flightData?.heading2}</h5>
              {flightData?.topCountries?.map((items, index) => (
                <div className='d-flex justify-content-start indexing_flights_data' key={index}>
                  <div className='d-flex justify-content-between indexing_detail_box'>
                    <p className='align-self-center'>{items.destination}</p>
                    <img src={airlineLogoData?.logo} alt='' width='30px' />
                  </div>
                </div>
              ))}
            </div>

            <div className='col-md-4 indexing_row_main'>
              <h5 className='text-center'>{flightData?.heading3}</h5>
              {flightData?.topCities?.map((items, index) => (
                <div className='d-flex justify-content-start indexing_flights_data' key={index}>
                  <div className='d-flex justify-content-between indexing_detail_box'>
                    <p className='align-self-center'>{items.destination}</p>
                    <img src={airlineLogoData?.logo} alt='' width='30px' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar structure for other sections */}
          <div className='row'>
            <div className='col-md-4 indexing_row_main'>
              <h5 className='text-center'>{flightData?.subheading1}</h5>
              {flightData?.subheading1data?.map((item, index) => (
                <div className='d-flex justify-content-start indexing_flights_data' key={index}>
                  <div className='d-flex justify-content-between indexing_detail_box'>
                    <p className='align-self-center'>{item.destination}</p>
                    <img src={airlineLogoData?.logo} alt='' width='30px' />
                  </div>
                </div>
              ))}
            </div>

            <div className='col-md-4 indexing_row_main'>
              <h5 className='text-center'>{flightData?.subheading2}</h5>
              {flightData?.subheading2data?.map((items, index) => (
                <div className='d-flex justify-content-start indexing_flights_data' key={index}>
                  <div className='d-flex justify-content-between indexing_detail_box'>
                    <p className='align-self-center'>{items.destination}</p>
                    <img src={airlineLogoData?.logo} alt='' width='30px' />
                  </div>
                </div>
              ))}
            </div>

            <div className='col-md-4 indexing_row_main'>
              <h5 className='text-center'>{flightData?.subheading3}</h5>
              {flightData?.subheading3data?.map((items, index) => (
                <div className='d-flex justify-content-start indexing_flights_data' key={index}>
                  <div className='d-flex justify-content-between indexing_detail_box'>
                    <p className='align-self-center'>{items.destination}</p>
                    <img src={airlineLogoData?.logo} alt='' width='30px' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularAirLines;
