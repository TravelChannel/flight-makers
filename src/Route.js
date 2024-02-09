import React, { Fragment } from 'react';
import Home from './View/Home';
import SearchFlightResult from './View/SearchFlightResults';
import About from './View/About';
import Contact from './View/Contact';
import Careers from './View/Careers';
import Customersupport from './View/CustomerSupport';
import GetPNRItinerary from './View/GetPNRItinerary';
import Flights from './View/Flights';
import Refundpolicy from './View/Refundpolicy';
import Termsconditions from './View/Termsconditions';
import Termsofservice from './View/Termsofservice';
import FlightTicketBooking from './View/Flightbooking';
import BookingPayment from './View/BookingPayment';
import SignUp from './Components/Commom/Signup';
import FMBanks from './View/FMBanks';
import FAQs from './Components/Commom/FAQs';
import BookingDetails from './Components/BookingPayment/Comman/BookingDetails';
import { Routes, Route } from 'react-router-dom';
import PopularAirLines from './Components/SEOPages/PopularAirLines';
import FlightsSearchEngine from './Components/SEOPages/FlightsSearchEngine';
import DomesticFlightsEngine from './Components/SEOPages/DomesticFlightsEngine';
// import UserPanel from './Components/BackendDesign/UserPanel/UserPanel';

// import Orders from './Components/BackendDesign/UserPanel/pages/Orders';

import MyUserPanel from './Components/BackendDesign/MyPanel/MyUserPanel';
import UserCompleteDetail from './Components/BackendDesign/MyPanel/Pages/common/UserCompleteDetail';
const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/searchflightresult" element={<SearchFlightResult />} />
        <Route path="/flightbooking" element={<FlightTicketBooking />} />
        <Route path ="/bookingDetail" element = {<BookingDetails/>}/>
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/customer-support" element={<Customersupport />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/refund-policy" element={<Refundpolicy />} />
        <Route path="/terms-and-conditions" element={<Termsconditions />} />
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bookingpayment" element={<BookingPayment />} />
        <Route path="/GetPNRItinerary" element={<GetPNRItinerary />} />
        <Route path="/banks" element={<FMBanks />} />
        <Route path="/FAQs" element={<FAQs/>} />
        {/* <Route path="/userPanel" element={<UserPanel/>} /> */}
        <Route path="/userPanel" element={<MyUserPanel/>} />
        <Route path="/userDetails" element={<UserCompleteDetail/>} />
        <Route path="/airlines/:airlineName" element={<PopularAirLines/>} />
        {/* <Route path="/popularairlines/:airlineName" element={<Outlet />} /> */}
        <Route path="/internationalAirlines/:flightName" element={<FlightsSearchEngine/>} />
        <Route path="/domesticAirlines/:domesticflightName" element={<DomesticFlightsEngine/>} />






      
        {/* Catch-all route for unknown routes */}
        
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
