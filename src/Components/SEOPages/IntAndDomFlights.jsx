import { useEffect, useState, Fragment, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarFilters from "../Searchflight/SideBarFilters.jsx";
import DateComparision from "../Searchflight/DateComparision.jsx";
import AirlinesResults from "../Searchflight/AirlinesResults.jsx";
import ActiveFlight from "../Searchflight/ActiveFlight.jsx";
import Loader from "../../Loader/Loader.jsx";
import UserTripInfo from "../Searchflight/UserTripInfo.jsx";
import {
  requestFetchSearchResult,
  requestFetchAlternateRates,
} from "../../API/index.js";
import { MasterPriceTravelResults } from "../../API/AmadeousAPI/index.js";
import { ItemsToShowProvider } from "../Searchflight/Comman/Context.js";
import { useSelector } from "react-redux";
import { dataNotfound } from "../../Constant/images.js";
import TimerModal from "../Searchflight/Comman/TimerRecall.jsx";
import StaticFlightSearchData from "./StaticFlightSearchData.jsx";
import InterFlightData from "./IntrFlightData.jsx";
import { useParams } from "react-router-dom";
import { InternationRoutes } from "../../Constant/FooterPagesData/InternationalRoutes.js";
import { DomesticRoutes } from "../../Constant/FooterPagesData/DomesticRoutes.js";
import { SearchLogs } from "../../API/BackendAPI/SearchesLogCreationAPI/SearchLogs.js";
import { saveFlightSearchLogs } from "../../API/BackendAPI/ArmanSirAPIs/UserLogSearch.js";
import DomesticFlightsJason from "./DomesticFlightsJason.js";
import { CityBackgroundImages } from "../../Constant/homeData.js";
import { Typewriter } from "react-simple-typewriter";
import { useUserData } from "../../Context/UserDataContext.jsx";
import airportDetails from "../../Constant/airport.js";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
const IntFlights = () => {
  const location = useLocation();
  const { setCityBanner } = useUserData();

  // ---------------date----------------------
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(futureDate.getDate() + 5);
  const futureDateString = futureDate.toISOString().split("T")[0];
  // ---------------date----------------------

  const { searchDataArr: initialSearchDataArr, FooterFlights = true } =
    location.state || {};

  console.log("FooterFlights-v1", FooterFlights);

  const { filterDataArr } = useSelector((state) => state.updateFilterReducer);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [backgroundBanner, setBackgroundBanner] = useState("");
  const [typedText, setTypedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSubLoader, setSubLoader] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [alterRates, setAlerRates] = useState([]);

  const [weekDates, setWeekDates] = useState([]);
  const [weeklyFare, setWeeklyFare] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [depart, setDepart] = useState("");
  const [arrival, setArrival] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [isMobile, setMobile] = useState(window.innerWidth <= 768);
  const [searchDataArr, setSearchDataArr] = useState(
    initialSearchDataArr || {
      adults: 1,
      children: 0,
      infants: 0,
      classtype: "Economy",
      tripType: "OneWay",
      departure: [],
      arrival: [],
      date: [futureDateString],
    }
  );

  const totalResults = apiData.length;
  const { from } = useParams();
  console.log("from-v1",from);

  // console.log('FlightName V-1',DomesticFlightsJason?.map((items)=>items.flightName));
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let departCity;
    let arrivalCity;
    const parts = from.split("-to-");

    const lastPart = parts[0].split("-").pop();

    departCity = lastPart; //parts[0].toLowerCase();
    arrivalCity = parts[1].toLowerCase();

    const allRoutes = [...InternationRoutes, ...DomesticRoutes];

    const matchedRoutes = allRoutes.filter(
      (route) =>
        route.from.toLowerCase() === departCity &&
        route.to.toLowerCase() === arrivalCity
    );

    console.log('departCity---v1',departCity);
    console.log('departCity---v2',arrivalCity);


    setDepart(departCity);
    setArrival(arrivalCity);
    setFilteredRoutes(matchedRoutes);

    // Update searchDataArr
    let departureString = `${departCity} (${
      matchedRoutes[0]?.departCode || ""
    })`;
    //debugger;
    let arrivalString = `${arrivalCity} (${
      matchedRoutes[0]?.ArrivalCode || ""
    })`;

    setSearchDataArr((prevSearchDataArr) => ({
      adults: 1,
      children: 0,
      infants: 0,
      classtype: "Economy",
      tripType: "OneWay",
      departure: [departureString],
      arrival: [arrivalString],
      date: [futureDateString],
    }));
  }, [from]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { departure, arrival, date, tripType, adults, children, infants } =
        searchDataArr;

    
      const futureDate = date[0] + 'T00:00:00';
      const futureDate1 = date[1] + 'T00:00:00';
      console.log("abbbbbc",searchDataArr);
      // const StoreSearchLogs =  await SearchLogs(searchDataArr);
      const StoreSearchLogs = await saveFlightSearchLogs(searchDataArr);
      console.log("StoreSearchLogs12", StoreSearchLogs);

      const fetchedFlightData = await MasterPriceTravelResults(searchDataArr);
      if (fetchedFlightData === null) {
        setLoading(false);
      } else if (fetchedFlightData.length > 10) {
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

  const getCityName = (cityCode) => {
    const cityName = airportDetails?.find(
      (items) => items.iata_code === cityCode
    );

    // console.log("cityName---v1",cityName);
    return cityName ? cityName?.municipality : "city not Found";
  };

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setShowTimerModal(true);
    }, 4000000);
    if (!FooterFlights) {
      const matchedItem = CityBackgroundImages.find(
        (item) => item.pathName === from
      );
      setBackgroundBanner(matchedItem);
    } else {
      const matchedItem = InternationRoutes.find(
        (item) => item.pathName === from
      );
      setBackgroundBanner(matchedItem);
    }

    return () => clearTimeout(timer);
  }, [searchDataArr]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubLoader(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const getCombinedData = apiData.map((item, index) => ({
    ...item,
    price: alterRates[index]?.price || null,
  }));

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const closeModal = () => {
    setShowTimerModal(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Fragment>
      <div className="container bg-white">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {!(isMobile || !backgroundBanner?.backGroundImg) && (
              <div
                className="backgroundWithBanner"
                style={{
                  backgroundImage: `url(${backgroundBanner.backGroundImg})`,
                }}
              >
                <h3 className="CityBanner_heading">
                  <Typewriter
                    words={[backgroundBanner?.Heading || ""]}
                    loop={1}
                    typeSpeed={120}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </h3>
              </div>
            )}
            {getCombinedData.length > 0 ? (
              <Fragment>
                <div className="container">
                  <ItemsToShowProvider
                    totalResults={totalResults}
                    apiData={getCombinedData}
                    searchDataArr={searchDataArr}
                    filterDataArr={filterDataArr}
                  >
                    <div>
                      <UserTripInfo />
                    </div>
                    <div
                      className={
                        FooterFlights === false
                          ? "row  banner_adjustment m-0"
                          : "row m-0"
                      }
                    >
                      <div className="col-md-3 px-0 mt-2 align-self-stretch bg-white">
                        <SideBarFilters />
                      </div>
                      <div className="col-md-9 mt-2 pr-0 mypadding">
                        <ActiveFlight selectedItemIdx={selectedItemIndex} />
                        <DateComparision alternateRates={alterRates} />
                        <AirlinesResults onItemClick={handleItemClick} />
                        {FooterFlights ? (
                          DomesticFlightsJason.find(
                            (flightData) => flightData.flightName === from
                          ) ? (
                            <StaticFlightSearchData />
                          ) : (
                            <InterFlightData />
                          )
                        ) : (
                          <div className="bg-white p-1">
                            Coming Soon...
                            {/* <table className='table table-bordered'>
                                <thead>
                                  <tr className="airline_table_background">
                                    <th>Sr. NO</th>
                                    <th>Depart Date</th>
                                    <th>Depart Location</th>
                                    <th>Arrival Location</th>
                                    <th>Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {weekDates.map((items, index) => (
                                    <tr key={index} className='p-1 weekly_fare_table'>
                                      <td>{index + 1}</td>
                                      <td>{items?.departureDate}</td>
                                      <td>{`${getCityName(items?.departureLocation)}  (${items?.departureLocation})`}</td>
                                      <td>{`${getCityName(items?.arrivalLocation)}  (${items?.arrivalLocation})`}</td>
                                      <td>{weeklyFare[index]}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </ItemsToShowProvider>
                </div>
              </Fragment>
            ) : showSubLoader ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="text-center py-5 bg-white">
                  <img
                    className="dataNotfound"
                    src={dataNotfound}
                    alt="dataNotfound"
                  />
                  <h2>No Flights Found For This Search</h2>
                  <p>Please try again, with different airports or dates</p>
                </div>
                <div>
                  {/* {
                  FooterFlights ? (<StaticFlightSearchData/>):('')
                  } */}
                  {DomesticFlightsJason.find(
                    (flightData) => flightData.flightName === from
                  ) ? (
                    <StaticFlightSearchData />
                  ) : (
                    <InterFlightData />
                  )}
                </div>
              </Fragment>
            )}
          </Fragment>
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
    </Fragment>
  );
};

export default IntFlights;
