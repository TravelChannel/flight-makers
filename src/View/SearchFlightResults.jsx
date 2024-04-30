import { useEffect, useState,Fragment } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import SideBarFilters from "../Components/Searchflight/SideBarFilters";
import DateComparision from "../Components/Searchflight/DateComparision.jsx";
import AirlinesResults from "../Components/Searchflight/AirlinesResults";
import ActiveFlight from "../Components/Searchflight/ActiveFlight.jsx";
import Loader from '../Loader/Loader.jsx';
import UserTripInfo from '../Components/Searchflight/UserTripInfo.jsx';
import { requestFetchSearchResult , requestFetchAlternateRates } from '../API/index.js';
import { ItemsToShowProvider } from '../Components/Searchflight/Comman/Context.js';
import { useSelector } from 'react-redux';
import {dataNotfound} from '../Constant/images';
import TimerModal from '../Components/Searchflight/Comman/TimerRecall';
import StaticFlightSearchData from '../Components/SEOPages/StaticFlightSearchData.jsx';

const SearchFlightResult = () => {
  const location = useLocation();
  const { searchDataArr,FooterFlights } = location.state;
  const {filterDataArr} = useSelector((state) => state.updateFilterReducer);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [alterRates, setAlerRates] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const totalResults = apiData.length;
  
  const navigate = useNavigate();
  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    //  window.scrollTo(0, 0);
  };

 

  

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const { departure, arrival, date, tripType,adults,children,infants } = searchDataArr;
      const futureDate = date[0] + 'T00:00:00';
      const futureDate1 = date[1] + 'T00:00:00';
  
      const fetchedFlightData = await requestFetchSearchResult(searchDataArr);

      if(tripType === "OneWay" || tripType === "Round")
      {
        const alternateRates = await requestFetchAlternateRates(departure[0], arrival[0], futureDate, futureDate1, tripType,adults,children,infants);
        setAlerRates(alternateRates);
      }

    
      if (FooterFlights && fetchedFlightData.length > 10) {
        setApiData(fetchedFlightData.slice(0, 7));
      } else {
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

  // if (FooterFlights===true) {
  //   const currentUrl = window.location.href;
  //   const newUrl = currentUrl.endsWith('/') ? `${currentUrl}kashif` : `${currentUrl}/kashif`;
  
  //   window.history.pushState({ path: newUrl }, '', newUrl);
  // }

  return (
    <div className='container'>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {getCombinedData.length > 0 ? (
            <Fragment>
              <div className="container">
                <ItemsToShowProvider totalResults={totalResults} apiData={getCombinedData} searchDataArr={searchDataArr} filterDataArr={filterDataArr}>
                  <UserTripInfo />
                  <div className="row  m-0 ">
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

export default SearchFlightResult;
