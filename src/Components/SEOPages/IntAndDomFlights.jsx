import { useEffect, useState,Fragment } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import SideBarFilters from '../Searchflight/SideBarFilters.jsx';
import DateComparision from '../Searchflight/DateComparision.jsx';
import AirlinesResults from '../Searchflight/AirlinesResults.jsx';
import ActiveFlight from '../Searchflight/ActiveFlight.jsx';
import Loader from '../../Loader/Loader.jsx';
import UserTripInfo from '../Searchflight/UserTripInfo.jsx';
import { requestFetchSearchResult ,requestFetchAlternateRates } from '../../API/index.js';
import { ItemsToShowProvider } from '../Searchflight/Comman/Context.js';
import { useSelector } from 'react-redux';
import { dataNotfound } from '../../Constant/images.js';
import TimerModal from '../Searchflight/Comman/TimerRecall.jsx';
import StaticFlightSearchData from './StaticFlightSearchData.jsx';
import { useParams } from 'react-router-dom';
import { InternationRoutes } from '../../Constant/FooterPagesData/InternationalRoutes.js';
import { DomesticRoutes } from '../../Constant/FooterPagesData/DomesticRoutes.js';
import { SearchLogs } from '../../API/BackendAPI/SearchesLogCreationAPI/SearchLogs.js';

const IntFlights = () => {
  const location = useLocation();

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
  const [depart, setDepart] = useState('');
  const [arrival, setArrival] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
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


  const totalResults = apiData.length;
  const { from } = useParams();
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
     window.scrollTo(0, 0);
  };

  useEffect(() => {
    const parts = from.split('from-')[1].split('-to-');
    const departCity = parts[0].toLowerCase();
    const arrivalCity = parts[1].toLowerCase();

    const allRoutes = [...InternationRoutes ,...DomesticRoutes]

    const matchedRoutes = allRoutes.filter(route => 
      route.from.toLowerCase() === departCity && route.to.toLowerCase() === arrivalCity
    );

    setDepart(departCity);
    setArrival(arrivalCity);
    setFilteredRoutes(matchedRoutes);

    // Update searchDataArr
    let departureString = `${departCity} (${matchedRoutes[0]?.departCode || ''})`;
    let arrivalString = `${arrivalCity} (${matchedRoutes[0]?.ArrivalCode || ''})`;

    setSearchDataArr(prevSearchDataArr => ({
      "adults": 1,
      "children": 0,
      "infants": 0,
      "classtype": "Economy",
      "tripType": "OneWay",
       departure: [departureString],
       arrival: [arrivalString],
      "date": [futureDateString]
    }));

  },[from]);
  
  const fetchData = async () => {
    try {
      setLoading(true); 
      const { departure, arrival, date, tripType,adults,children,infants } = searchDataArr;

    
      const futureDate = date[0] + 'T00:00:00';
      const futureDate1 = date[1] + 'T00:00:00';
      console.log("abbbbbc",searchDataArr);
      const StoreSearchLogs =  await SearchLogs(searchDataArr);
      console.log("StoreSearchLogs12",StoreSearchLogs);
  
      const fetchedFlightData = await requestFetchSearchResult(searchDataArr);

      if(tripType === "OneWay" || tripType === "Round")
      {
        const alternateRates = await requestFetchAlternateRates(departure[0], arrival[0], futureDate, futureDate1, tripType,adults,children,infants);
        setAlerRates(alternateRates);
      }

    
      if (FooterFlights && fetchedFlightData.length > 10) {
        setApiData(fetchedFlightData.slice(0, 7));
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
    },5000);
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

  return (
    <div className='container'>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {getCombinedData.length > 0 ? (
            <Fragment>
              <div className="container">
                <ItemsToShowProvider totalResults={totalResults} apiData={getCombinedData} searchDataArr={searchDataArr} filterDataArr={filterDataArr} >
                  <UserTripInfo/>
                  <div className="row  m-0">
                    <div className="col-md-3 px-0 mt-2 align-self-stretch bg-white">
                      <SideBarFilters />
                    </div>
                    <div className="col-md-9 mt-2 pr-0 mypadding">
                      <ActiveFlight selectedItemIdx={selectedItemIndex} />
                      <DateComparision alternateRates={alterRates} />
                      <AirlinesResults onItemClick={handleItemClick}/>
                      {
                        FooterFlights ? (<StaticFlightSearchData/>):('')
                      }
                    </div>
                  </div>
                </ItemsToShowProvider>
              </div>
            </Fragment>
          ) : (
            showSubLoader ? <Loader/> :
            <div className='text-center py-5 bg-white'>
              <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
              <h2>No Flights Found For This Search</h2>
              <p>Please try again, with different airports or dates</p>
            </div>
            
          )}
        </div>
      )}
      {showTimerModal && (
        <TimerModal
          isOpen={true}
          onRequestClose={closeModal}
          onRefresh={handleRefresh}
          onGoToHome={handleGoToHome}
        />
      )}
    </div>
  );
};

export default IntFlights;