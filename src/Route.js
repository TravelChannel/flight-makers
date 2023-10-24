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

import { Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchflightresult" element={<SearchFlightResult />} />
        <Route path="/flightbooking" element={<FlightTicketBooking />} />
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
        {/* Catch-all route for unknown routes */}
        
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
