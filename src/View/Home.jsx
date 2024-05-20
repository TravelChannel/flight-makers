import React, { Fragment } from "react";
import FlightSearch from "../Components/Home/FlightSearch.jsx";
import RecentTravel from'../Components/Home/RecentTravel.jsx';
import CityTravel from'../Components/Home/CityTravel.jsx';
import Tesimonials from'../Components/Home/Tesimonials.jsx';
import BookingOptions from '../Components/Home/BookingOptions.jsx';
import Notification from '../Components/Commom/Notification.jsx'
import AppQR from '../Components/Home/AppQR.jsx';
import ModelOTP from "../Components/Home/ModelOtp.jsx";
import PromotionsView from "../Components/Home/PromotionsView.jsx";
import { useFormData } from "../Context/FormDataContext.jsx";

const Home = () => {
  const {isLogin , setLogIn} = useFormData();
    return (
    <Fragment>
      <div className="container">
        <FlightSearch resultpage={false} />
        <RecentTravel/>
        <BookingOptions/>
        <AppQR/>
        <CityTravel/>
      </div>
    </Fragment>);
    
}

export default Home;