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
import BlogCollection from './View/BlogCollection';
import BlogContent from './Components/BlogsContent/BlogContent';
import AddBlog from './Components/BackendDesign/AdminPanel/Blogs/AddBlog';
import BlogbyCategory from './Components/BlogsContent/BlogbyCategory';

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<p>Hello</p>} />
        <Route path="/searchflightresult" element={<SearchFlightResult />} />
        <Route path="/flightbooking" element={<FlightTicketBooking />} />
        <Route path ="/bookingDetail" element = {<BookingDetails/>}/>
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/RequestCall" element={<Contact />} />
        <Route path="/job-careers" element={<Careers />} />
        <Route path="/customer-support" element={<Customersupport />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/refund-policy" element={<Refundpolicy />} />
        <Route path="/term-and-condition" element={<Termsconditions />} />
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<SignUp />} />
        <Route path="/bookingpayment" element={<BookingPayment />} />
        <Route path="/previewEticket" element={<GetPNRItinerary />} />
        <Route path="/banks" element={<FMBanks />} />
        <Route path="/FAQs" element={<FAQs/>} />
        <Route path="/updateblog/:id" element={<AddBlog/>} />
        <Route path="/blogs" element={<BlogCollection/>} />
        <Route path="/blogs/:headerUrl" element={<BlogContent />} />
        <Route path="/blogs/category/:modifiedCategoryName" element={<BlogbyCategory/>} />
        <Route path="/blogs/category/:modifiedCategoryName/:headerUrl" element={<BlogContent/>} />


        {/* <Route path="/userPanel" element={<UserPanel/>} /> */}
        <Route path="/userPanel" element={<MyUserPanel/>} />
        <Route path="/userDetails" element={<UserCompleteDetail/>} />
        <Route path="/:airlineName" element={<PopularAirLines/>} />
        {/* <Route path="/flights/:flightName" element={<FlightsSearchEngine/>} /> */}
        <Route path="/flights/:flightName" element={<SearchFlightResult />} />
        <Route path="/flights/:domesticflightName" element={<DomesticFlightsEngine/>} />
        






      
        {/* Catch-all route for unknown routes */}
        
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
