import React, { useEffect, useState ,Fragment} from 'react';
import FlightIcon from '@mui/icons-material/Flight';
import airlinesName from '../../Constant/airlineName';
import { useLocation, useNavigate } from 'react-router';
import SEOAirlinesData from '../../Constant/SEOAirlinesData';
import { useParams } from 'react-router';
// ----------------------------------------------------
import EmiratesFlights from './popAirlinesComponents/EmiratesFlights';
import PiaFlights from './popAirlinesComponents/PiaFlights';
import QatarFlights from './popAirlinesComponents/QatarFlights';
// ------------------------------------------------------------------------------
import { requestFetchSearchResult ,requestFetchAlternateRates } from '../../API/index.js';
import { useSelector } from 'react-redux';
import SideBarFilters from '../Searchflight/SideBarFilters.jsx';
import DateComparision from '../Searchflight/DateComparision.jsx';
import AirlinesResults from '../Searchflight/AirlinesResults.jsx';
import ActiveFlight from '../Searchflight/ActiveFlight.jsx';
import Loader from '../../Loader/Loader.jsx';
import UserTripInfo from '../Searchflight/UserTripInfo.jsx';
import { ItemsToShowProvider } from '../Searchflight/Comman/Context.js';
import { dataNotfound } from '../../Constant/images.js';
import TimerModal from '../Searchflight/Comman/TimerRecall.jsx';
import { saveFlightSearchLogs } from '../../API/BackendAPI/ArmanSirAPIs/UserLogSearch.js';
import Pop_AirLinesData from './popAirlinesComponents/common/AirlinesJason.js';
import AirlineDataComponent from './popAirlinesComponents/common/AirlineDataComponent.jsx';
// ---------------------------------------------------------------------
const airlineComponents = {
  'emirates-airline-flights' : EmiratesFlights,
  'qatar-airways-flights' :QatarFlights,
  'pakistan-international-airlines-flights' :PiaFlights,
};

const PopularAirLines = () => {
  const location = useLocation();
  const { airlineName } = useParams();
  const navigate = useNavigate();
  
  const [flightData, setFlightData] = useState({});
  const [airlineLogoData, setAirLineLogoData] = useState({});
  // -----------------------------------------
   console.log("AirlineDataComponent",Pop_AirLinesData);
  // ---------------date----------------------
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 5);
    const futureDateString = futureDate.toISOString().split('T')[0];
  // ---------------date----------------------
  
    const { searchDataArr: initialSearchDataArr ,FooterFlights = true } = location.state || {};
    const {filterDataArr} = useSelector((state) => state.updateFilterReducer);
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSubLoader ,setSubLoader] = useState(true);
    const [apiData, setApiData] = useState([]);
    const [alterRates, setAlerRates] = useState([]);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [searchDataArr, setSearchDataArr] = useState(initialSearchDataArr || {
      "adults": 1,
      "children": 0,
      "infants": 0,
      "classtype": "Economy",
      "tripType": "OneWay",
      "departure": [],
      "arrival": [],
      "date": [futureDateString]
    });
  
  // -----------------------------

  const currentAirlineData =Pop_AirLinesData.find((flightData)=>flightData.flightname===airlineName);

  console.log("currentAirlineData",currentAirlineData);

  console.log("airlineName",airlineName);
  const formattedAirlineName = airlineName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  const flightID = location.state && location.state.id;
  
  let DynamicAirlineComponent;
  let isDynamicPage;
  if (airlineName === 'pakistan-international-airlines-flights' || 
    airlineName === 'emirates-airline-flights' || 
    airlineName === 'qatar-airways-flights') {
  DynamicAirlineComponent = airlineComponents[airlineName];
  isDynamicPage=false;
   
} else {
  isDynamicPage=true;
}

  // -------------------------------------------
  const totalResults = apiData.length;
  const { from } = useParams();

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
     window.scrollTo(0, 0);
  };

  useEffect(() => {
    const selectedFlight = SEOAirlinesData?.find((flight) => flight.flightname === airlineName);
    const departCity = `${selectedFlight.Departure}`;
    const arrivalCity = `${selectedFlight.Arrival}`;

    setSearchDataArr(prevSearchDataArr => ({
      "adults": 1,
      "children": 0,
      "infants": 0,
      "classtype": "Economy",
      "tripType": "OneWay",
       departure: [departCity],
       arrival: [arrivalCity],
      "date": [futureDateString]
    }));

  },[airlineName]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const selectedFlight = SEOAirlinesData?.find((flight) => flight.flightname === airlineName);
      setFlightData(selectedFlight);
      // setCurrentFlightCode(selectedFlight?.flightCode);
      const airlinesData = airlinesName?.find((airline) => airline.id === selectedFlight?.flightCode);
      setAirLineLogoData(airlinesData);
      document.title = airlineName ? `${airlineName} - Popular Airlines` : 'Popular Airlines';
      

      const { departure, arrival, date, tripType,adults,children,infants } = searchDataArr;
      // const StoreSearchLogs =  await SearchLogs(searchDataArr);
      const StoreSearchLogs =  await  saveFlightSearchLogs(searchDataArr);
      console.log("StoreSearchLogs12",StoreSearchLogs);
      const futureDate = date[0] + 'T00:00:00';
      const futureDate1 = date[1] + 'T00:00:00';
  
      const fetchedFlightData = await requestFetchSearchResult(searchDataArr ,selectedFlight?.flightCode);

      if(tripType === "OneWay" || tripType === "Round")
      {
        const alternateRates = await requestFetchAlternateRates(departure[0], arrival[0], futureDate, futureDate1, tripType,adults,children,infants);
        setAlerRates(alternateRates);
      }

    
      if (FooterFlights && fetchedFlightData.length > 5) {
        setApiData(fetchedFlightData.slice(0, 5));
      }
      else {
        setApiData(fetchedFlightData);
      }

      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   const timer = setTimeout(() => {
  //     setShowTimerModal(true);
  //   }, 4000000);
  //   return () => clearTimeout(timer);

  // },[]);
  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setShowTimerModal(true);
    }, 4000000);
    return () => clearTimeout(timer);

  },[searchDataArr]);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setSubLoader(false)
    },7000);
    return ()=>{
      clearTimeout(timer);
    };
  },[]);

  const getCombinedData = apiData.map((item, index) => ({
    ...item,
    price: alterRates[index]?.price || null,
  }));

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const closeModal = () => {
    setShowTimerModal(false);
  };

  // ------------------------------------------------

const handleDestinationClick = (destination,DepartCode,ArrivalCode ) =>{
  const cityNameMatch = destination.match(/to\s(.*?)(?=\s\()/);
  const cityName = cityNameMatch ? cityNameMatch[1].trim().replace(/\s+/g, '-') : '';
  // navigate(`/${airlineName}/flights-to-${cityName.toLowerCase()}`, { state: { searchDataArr:{}, FooterFlights:true ,DepartCode,ArrivalCode} });
  navigate(`/${airlineName}/flights-to-${cityName.toLowerCase()}?Departure=${DepartCode}&Arrival=${ArrivalCode}`, { state: { searchDataArr: {}, FooterFlights: true } });
  window.scrollTo(0, 0);

}
  // ----------------------------------------------

  return (
  loading ? (<Loader/>):(
    <div className='container bg-white'>
    <div className='p-2'>
      <h3 className='indexing_heading text-center'>
        <FlightIcon className='seo_flightIcon' />
        {formattedAirlineName}
      </h3>
      <div className='container'>
                <div>
                  {getCombinedData.length > 0 ? (
                    <Fragment>
                      <div className="container">
                        <ItemsToShowProvider totalResults={totalResults} apiData={getCombinedData} searchDataArr={searchDataArr} filterDataArr={filterDataArr} >
                          <UserTripInfo/>
                          <div className="row  m-0">
                            <div className="col-md-3 px-0 mt-2 align-self-stretch bg-white">
                              <SideBarFilters/>
                            </div>
                            <div className="col-md-9 mt-2 pr-0 mypadding">
                              <ActiveFlight selectedItemIdx={selectedItemIndex} />
                              <DateComparision alternateRates={alterRates} />
                              <AirlinesResults onItemClick={handleItemClick}/>
                            </div>
                          </div>
                        </ItemsToShowProvider>
                     
                      </div>
                    </Fragment>
                  ) : (
                        showSubLoader ? (<Loader/> ):
                      (<div className='text-center py-5 bg-white'>
                        <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
                        <h2>No Flights Found For This Search</h2>
                        <p>Please try again, with different airports or dates</p>
                      </div>)
                  )}
                </div>
              {showTimerModal && (
                <TimerModal
                  isOpen={true}
                  onRequestClose={closeModal}
                  onRefresh={handleRefresh}
                  onGoToHome={handleGoToHome}
                />
              )}
            </div>
  
                    <div className='faremakers_indexing_main'>
                              <h3 className='indexing_heading text-center'>{`${flightData?.mainHeading}`}</h3>

                              <div className='row'>
                                <div className='col-md-4 indexing_row_main'>
                                  <h5 className='text-center'>{flightData?.heading1}</h5>
                                  {flightData?.topPicks?.map((item, index) => (
                                    <div className='d-flex justify-content-start indexing_flights_data'
                                     key={index}
                                     onClick={()=>handleDestinationClick(item.destination,item.Departure ,item.Arrival)}
                                     >
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
                                    <div className='d-flex justify-content-start indexing_flights_data'
                                     key={index}
                                     onClick={()=>handleDestinationClick(items.destination,items.Departure ,items.Arrival)}
                                     >
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
                                    <div className='d-flex justify-content-start indexing_flights_data'
                                     key={index}
                                     onClick={()=>handleDestinationClick(items.destination,items.Departure ,items.Arrival)}
                                     >
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

    <div>
    {!isDynamicPage? <DynamicAirlineComponent/> : <AirlineDataComponent currentAirlineData={currentAirlineData}/> }
  </div>
  </div>
  )

   
  );
};

export default PopularAirLines;
