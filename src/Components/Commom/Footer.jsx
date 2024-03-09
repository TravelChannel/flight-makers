import React, { Fragment ,useState} from "react";
import * as image from "../../Constant/images";
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../Context/FormDataContext";
const Footer = () =>{
    const {isTopNavBar} = useFormData();
    // const [flightID ,setFlightID] = useState('');
const navigate = useNavigate();
// const handleAirLinesData = (id, airlinename) => {
//     console.log("currrentairlinename",airlinename);
//     navigate('/popularairlines', { state: { id: `${id}`, airlinename } });
//     document.title = `${airlinename} - Popular Airlines`;
//   };
// const handleAirLinesData = (id, airlineName) => {
//     navigate('/popularairlines', { state: { id: `${id}`, airlineName } });
//     document.title = `${airlineName} - Popular Airlines`;
//     window.history.replaceState({}, '', `/popularairlines/${airlineName}`);
//   };
const handleAirLinesData = (id, airlineName) => {
  
    navigate(`/airlines/${airlineName}`, { state: { id, airlineName } });
    window.scrollTo(0,0);

  };
    return(
        <Fragment>
        <div className={`footerBox ${!isTopNavBar ? '':'container '}`}>
        <div className="postion_reltive">
            {/* <div className="row my-3">
                <ul className="col col-md-3 col-lg-3 footerLinks">
                    <li className="txtTransUpper">Company</li>
                    <li><Link to="/aboutUs">About Us</Link></li>
                    <li><Link to="/contactUs">Contact Us</Link></li>
                    <li><Link to="/careers">Careers</Link></li>
                    <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                    <li><Link to="/refund-policy">Refund Policy</Link></li>
                </ul>
                <ul className="col  col-md-3 col-lg-3 footerLinks">
                    <li className="txtTransUpper">More links</li>
    
                    <li><Link to="/customer-support">Customer Support</Link></li>
                    <li><Link to="/terms-of-service">Terms of Service</Link></li>
                    <li><Link to="/FaQs">FaQs</Link></li>

                </ul>
                <ul className="col  col-lg-3 col-xl-2 footerLinks">
                    <li className="txtTransUpper">SITE MAP</li>
    
                    <li><Link to="/flights">Flights</Link></li>
                    <li><Link to="/terms-of-service">Arrange a Call</Link></li>
                </ul>
                <ul className="col  col-md-2 col-lg-3 footerLinks">
                    <li className="txtTransUpper">Get Fair Alerts</li>
                    <li>
                        <div className="footer_input">
                             <span className="footer_ph"><LocalPhoneIcon className="ph_size"/></span> <input type="text" placeholder=" Phone Number" className="footer_input_box" />
                        </div>
                   </li>
                   <li className="phone_btn">
                   <button type="button" className="btn btn-primary ph_btn_prop">Subscribe</button>
                   </li>
                </ul>

            </div> */}


            {/* ******************************************************** */}
            <div className="row d-sm-block "> 
              <span className="footer_destination">Popular Airlines </span>
                <div className="row"> 
                        <div className="col-md-12 footerLink_internationl">
                            <span  onClick={() => handleAirLinesData(1, 'Emirates-Airline')}>Emirates Airline</span>
                            <span  onClick={() => handleAirLinesData(2, 'qatar-airways-flights ')}>Qatar Airways</span>
                            <span  onClick={() => handleAirLinesData(3, 'turkish-airlines-flights')}>Turkish Airlines</span>
                            <span  onClick={() => handleAirLinesData(4, 'pakistan-international-airlines-flights')}>PIA</span>
                            <span  onClick={() => handleAirLinesData(5, 'oman-air-flights')}>Oman Air</span>
                            <span  onClick={() => handleAirLinesData(6, 'Fly-with-FlyDubai')}>Fly Dubai</span>
                            <span  onClick={() => handleAirLinesData(7, 'etihad-airways-flights')}>Etihad Airways</span>
                            <span  onClick={() => handleAirLinesData(8, 'shaheen-air-flights')}>Shaheen Air</span>
                            <span  onClick={() => handleAirLinesData(9, 'airblue-flights')}>Air Blue</span>
                            <span  onClick={() => handleAirLinesData(10, 'air-sial-flights')}>Air Sial</span>
                            <span  onClick={() => handleAirLinesData(11, 'virgin-atlantic-flights')}>Virgin Atlantic</span>
                            <span  onClick={() => handleAirLinesData(12, 'thai-airways-flights')}>Thai Airways</span>
                            <span  onClick={() => handleAirLinesData(13, 'serene-air-flights')}>Serene Air</span>
                            <span  onClick={() => handleAirLinesData(14, 'kuwait-airways-flights')}>Kuwait Airways</span>
                            <span  onClick={() => handleAirLinesData(15, 'china-southern-airlines-flights')}>China Southern</span>
                            <span  onClick={() => handleAirLinesData(16, 'saudi-arabian-airline-flights')}>Saudi Arabian</span>
                            <span  onClick={() => handleAirLinesData(17, 'air-arabia-flights')}>Air Arabia</span>
                            <span  onClick={() => handleAirLinesData(18, 'air-china-flights')}>Air China</span>
                            <span  onClick={() => handleAirLinesData(19, 'air-malindo-flights')}>Air Malindo</span>
                            <span  onClick={() => handleAirLinesData(20, 'british-airways-flights')}>British Airways</span>
                        </div>
                    </div>
              <span className="footer_destination">International Destinations</span>
                <div className="row mb-3"> 
                <ul className="col-md-12   footerLink_internationl">
                    <span onClick={() => { window.scrollTo(0, 0); }} ><Link  to="/internationalAirlines/Lahore-London">Lahore - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Dubai">Lahore - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Toronto">Lahore - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-NewYork">Lahore - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Boston">Lahore - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Perth">Lahore - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Manchester">Lahore - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Melbourne">Lahore - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Atlanta">Lahore - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Lahore-Doha">Lahore - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-London">Peshawar - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Dubai">Peshawar - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Toronto">Peshawar - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-New York">Peshawar - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Boston">Peshawar - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Perth">Peshawar - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Manchester">Peshawar - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Melbourne">Peshawar - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Atlanta">Peshawar - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Los Angeles">Faisalabad - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Jeddah">Faisalabad - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Istanbul">Faisalabad - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-London">Karachi - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Dubai">Karachi - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Toronto">Karachi - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-NewYork">Karachi - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Boston">Karachi - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Perth">Karachi - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Manchester">Karachi - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Melbourne">Karachi - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Atlanta">Karachi - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Doha">Karachi - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-LosAngeles">Karachi - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Jeddah">Karachi - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Karachi-Istanbul">Karachi - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Doha">Peshawar - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-LosAngeles">Peshawar - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Jeddah">Peshawar - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Peshawar-Istanbul">Peshawar - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-London">Quetta - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Dubai">Quetta - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Toronto">Quetta - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-NewYork">Quetta - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Boston">Quetta - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-London">Islamabad - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Dubai">Islamabad - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Toronto">Islamabad - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-NewYork">Islamabad - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Boston">Islamabad - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Perth">Islamabad - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Manchester">Islamabad - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Melbourne">Islamabad - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Atlanta">Islamabad - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Doha">Islamabad - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-LosAngeles">Islamabad - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Jeddah">Islamabad - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Islamabad-Istanbul">Islamabad - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Perth">Quetta - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Manchester">Quetta - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Melbourne">Quetta - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Atlanta">Quetta - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Doha">Quetta - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-LosAngeles">Quetta - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Jeddah">Quetta - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Quetta-Istanbul">Quetta - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-London">Faisalabad - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-London">Multan - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Dubai">Multan - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Toronto">Multan - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-NewYork">Multan - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Boston">Multan - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Perth">Multan - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Manchester">Multan - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Melbourne">Multan - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Atlanta">Multan - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Doha">Multan - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-LosAngeles">Multan - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Jeddah">Multan - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Multan-Istanbul">Multan - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Dubai">Faisalabad - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Toronto">Faisalabad - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-NewYork">Faisalabad - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Boston">Faisalabad - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Perth">Faisalabad - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Manchester">Faisalabad - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Melbourne">Faisalabad - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Atlanta">Faisalabad - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link  to="/internationalAirlines/Faisalabad-Doha">Faisalabad - Doha</Link></span>
                    
                </ul>

                </div>
              <span className="footer_destination">Domestic Destinations</span>
              <div className="row mb-3"> 
              <ul className=" col-md-12 footerLink_internationl">
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Lahore-Karachi">Lahore - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Lahore-Islamabad">Lahore - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Lahore-Peshawar">Lahore - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Lahore-Faisalabad">Lahore - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Lahore-Quetta">Lahore - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Lahore-Multan">Lahore - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Faisalabad-Karachi">Faisalabad - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Faisalabad-Islamabad">Faisalabad - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Faisalabad-Peshawar">Faisalabad - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Karachi-Lahore">Karachi - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Karachi-Islamabad">Karachi - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Karachi-Peshawar">Karachi - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Karachi-Faisalabad">Karachi - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Karachi-Quetta">Karachi - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Karachi-Multan">Karachi - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Faisalabad-Lahore">Faisalabad - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Faisalabad-Quetta">Faisalabad - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Faisalabad-Multan">Faisalabad - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Islamabad-Karachi">Islamabad - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Islamabad-Lahore">Islamabad - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Islamabad-Peshawar">Islamabad - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Islamabad-Faisalabad">Islamabad - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Islamabad-Quetta">Islamabad - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Islamabad-Multan">Islamabad - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Quetta-Karachi">Quetta - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Quetta-Islamabad">Quetta - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Quetta-Peshawar">Quetta - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Peshawar-Karachi">Peshawar - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Peshawar-Islamabad">Peshawar - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Peshawar-Lahore">Peshawar - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Peshawar-Faisalabad">Peshawar - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Peshawar-Quetta">Peshawar - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Peshawar-Multan">Peshawar - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Quetta-Faisalabad">Quetta - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Quetta-Lahore">Quetta - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/domesticAirlines/Quetta-Multan">Quetta - Multan</Link></span>
              </ul>
            </div>

            </div>

            {/* ******************************************************** */}

            <div className="row footerAppLinks border">
                <div className="col-xs-12 col-sm-4 col-md-3">
                    <p className="txtTransUpper">Follow Us</p>
                    <div className="custSocialIcons">
                        <Link to="https://www.facebook.com/faremakers" className="fl padR10" title="facebook" rel="nofollow"><img className="icon-facebook" height="30" width="40" src="~/Content/images/Logos/facebook.png w-100" alt="social-icon" /></Link>
                        <Link to="https://www.instagram.com/faremakers/" className="fl padR10" title="instagram" rel="nofollow"><img height="30" width="40" className="icon-instagram" src="~/Content/images/Logos/Instagram_icon.png w-100" alt="social-icon" /></Link>
                        <Link to="https://www.linkedin.com/company/faremakers/" className="fl padR10" title="linkedin" rel="nofollow"><img height="30" width="30" className="icon-linkedin" src="~/Content/images/Logos/linkedin.png w-100" alt="social-icon" /></Link>
                        <Link to="https://twitter.com/FareMakers" className="fl padR10" title="Twitter" rel="nofollow"><img height="30" width="40" className="icon-twitter" src="~/Content/images/Logos/Twitter.png w-100" alt="social-icon" /></Link>
                        <Link to="https://www.youtube.com/channel/UCIhWyyE1xd-4P3kqNP1q5LQ" className="fl padR10" title="youtube" rel="nofollow"><img height="30" width="40" className="icon-youtube" src="~/Content/images/Logos/Youtube.png w-100" alt="social-icon" /></Link>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-7 col-md-5 d-none">
                    <p className="txtTransUpper">Book Tickets faster. Download our mobile Apps</p>
                    <div className="mobheight">
                        <Link target="_blank" className="fthm-mobApp fthm-goog col-xs-6 col-sm-6 col-md-4" to="https://play.google.com/store/apps/details?id=com.faremakers.android" rel="noopener"></Link>
                        <Link target="_blank" className="fthm-mobApp fthm-app col-xs-6 col-sm-6 col-md-4" to="https://itunes.apple.com/us/app/faremaker/id1261857249?mt=8" rel="noopener"></Link>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12  col-md-12 mt-3">
    
                    <div className="custbrandLogos d-flex justify-content-start flex-wrap g-4">
                        <div className="payment_box "><img src={image.hbllogo} alt="Payment logo" /></div>
                        <div className="payment_box "><img src={image.payprologo} alt="Payment logo"/></div>
                        <div className="payment_box "><img src={image.digicertlogo} alt="Payment logo"  /></div>
                        <div className="payment_box "><img src={image.iatalogo} alt="Payment logo" /></div>
                        <div className="payment_box "><img src={image.mastercardlogo} alt="Payment logo"/></div>
                        <div className="payment_box "><img src={image.visacardlogo} alt="Payment logo"  /> </div>
                    </div>
                </div>
            </div>
            <div className="row footerCopyrights border">
                <div className="col-xs-12 col-sm-12 col-md-12 text-end" >
                    <div className="fr padT10">
                        <div itemProp="address" itemScope itemype="http://schema.org/PostalAddress colorGrey2">
                            <p itemProp="streetAddress " className="underText font_size_11 colorGrey2">
                                &copy; 2024 <span itemProp="name colorGrey2">Faremakers</span>  All rights reserved
                                <br /> 53/A-1 , Block E/1 Gulberg 3,
                                <br /><span itemProp="addressLocality colorGrey2">Lahore</span>,
                                <span itemProp="addressCountry colorGrey2">Pakistan</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="whatsapp_chat" >
            <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
        </div> */}
        {/* <div className="whatsapp_chat">
            <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
        </div> */}
        <div className="whatsapp_chat">
            <a href="https://wa.me/923111147111">
                <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
            </a>
        </div>
        <div className="whatsapp_chat">
            <a href="https://wa.me/923111147111">
                <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
            </a>
        </div>
        <Link className="whatsapp_chat" to="tel:+923111147111 bg-white">
                {/* <img className="whatsapp inlineDiv" src="~/Content/images/Logos/call_now_2.png" height="60" width="60" alt="Whatsapp logo" /> */}
        </Link>
    
        </div>
    
        </Fragment>
        );
}

export default Footer;