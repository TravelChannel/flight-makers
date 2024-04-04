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
import { useParams } from 'react-router-dom';
import airport from '../Constant/airport.js';

const SearchFlightResult = () => {
  const location = useLocation();
  const { flightName } = useParams();

  const [searcRes ,setSearchRes] = useState({});

  console.log('flightName',flightName);
  const { searchDataArr } = location.state || {};

  console.log('searchDataArr',searchDataArr);
  // const searchDataArr = location.state?.searchDataArr;
  const {filterDataArr} = useSelector((state) => state.updateFilterReducer);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [alterRates, setAlerRates] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const totalResults = apiData.length;
  // const totalResults = apiData.length > 0 ? apiData.length : 0;
  
  const navigate = useNavigate();
  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const fetchData = async () => {
    try {
        setLoading(true); // Set loading to true before fetching data
        if (flightName && flightName !== '') {
          console.log("hello world" );
            // ---------------------
                  const capitalizeFirstLetter = (str) => {
                    return str.charAt(0).toUpperCase() + str.slice(1);
                  };
                  const parts = flightName.split("-");
                  let departure1 = parts[3]; 
                  let destination1 = parts[5]; 
                  let departure = capitalizeFirstLetter(departure1);
                  let destination = capitalizeFirstLetter(destination1);
                // ----------Iata code---------------------
                  let departureIataCode = '';
                let destinationIataCode = '';
                for (const airports of airport) {
                  if (airports.municipality === departure && !departureIataCode) {
                    departureIataCode = airports.iata_code;
                  }
                  if (airports.municipality === destination && !destinationIataCode) {
                    destinationIataCode = airports.iata_code;
                  }
                }

                const departureLocation = `${departure} (${departureIataCode})`;
                const destinationLocation = `${destination} (${destinationIataCode})`;

                console.log('Departure Location:', departureLocation);
                console.log('Destination Location:', destinationLocation);
                  // ------------------------
                  const currentDate = new Date();
                  // Add 5 days to the current date
                  const futureDate123 = new Date(currentDate);
                  futureDate123.setDate(futureDate123.getDate() + 5);
                  // Format the future date as "YYYY-MM-DD"
                  const futureDateString = futureDate123.toISOString().split('T')[0];
                  console.log(futureDateString);

           let searchData = {
                adults: 1,
                children: 0,
                infants: 0,
                classtype: "Economy",
                tripType: "OneWay",
                departure: [departureLocation],
                arrival:  [destinationLocation],
                date: [futureDateString]
            };
            console.log("searchDataArray",searchData);
            setSearchRes(searchData);
            // searchDataArr = searchData; 
            const futureDate = searchData.date[0] + 'T00:00:00';
            const futureDate1 = searchData.date[1] + 'T00:00:00';
            const fetchedFlightData = await requestFetchSearchResult(searchData);

            if (searchData.tripType === "OneWay" || searchData.tripType === "Round") {
              const alternateRates = await requestFetchAlternateRates(searchData.departure[0], searchData.arrival[0], futureDate, futureDate1, searchData.tripType, searchData.adults, searchData.children, searchData.infants);
              setAlerRates(alternateRates);
          }

          setApiData(fetchedFlightData);
          setLoading(false);
        } else {
            // If flightName is not present in the URL parameters
            const { departure, arrival, date, tripType, adults, children, infants } = searchDataArr;
            
        const futureDate = date[0] + 'T00:00:00';
        const futureDate1 = date[1] + 'T00:00:00';
         console.log('MysearchData',searchDataArr);
        const fetchedFlightData = await requestFetchSearchResult(searchDataArr);

        if (tripType === "OneWay" || tripType === "Round") {
            const alternateRates = await requestFetchAlternateRates(departure[0], arrival[0], futureDate, futureDate1, tripType, adults, children, infants);
            setAlerRates(alternateRates);
        }

        setApiData(fetchedFlightData);
        setLoading(false);
        }


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
  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setShowTimerModal(true);
    }, 4000000);
    return () => clearTimeout(timer);

  },[flightName]);


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
              <ItemsToShowProvider totalResults={totalResults} apiData={getCombinedData} searchDataArr={flightName && flightName !== '' ? searcRes : searchDataArr} filterDataArr={filterDataArr}>
                  <UserTripInfo />
                  <div className="row  m-0 ">
                    <div className="col-md-3 px-0 mt-2 align-self-stretch bg-white">
                      <SideBarFilters />
                    </div>
                    <div className="col-md-9 mt-2 pr-0 mypadding">
                      <ActiveFlight selectedItemIdx={selectedItemIndex} />
                      <DateComparision alternateRates={alterRates} />
                      <AirlinesResults onItemClick={handleItemClick} />
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
