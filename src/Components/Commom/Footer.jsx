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
  
    navigate(`/${airlineName}`, { state: { id, airlineName } });
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
                <div > 
                        <div className=" footerLink_internationl">
                            <span  onClick={() => handleAirLinesData(1, 'emirates-airline-flights')}>Emirates Airline</span>
                            <span  onClick={() => handleAirLinesData(2, 'qatar-airways-flights ')}>Qatar Airways</span>
                            <span  onClick={() => handleAirLinesData(3, 'turkish-airlines-flights')}>Turkish Airlines</span>
                            <span  onClick={() => handleAirLinesData(4, 'pakistan-international-airlines-flights')}>PIA</span>
                            <span  onClick={() => handleAirLinesData(5, 'oman-air-flights')}>Oman Air</span>
                            <span  onClick={() => handleAirLinesData(6, 'fly-dubai-flights')}>Fly Dubai</span>
                            <span  onClick={() => handleAirLinesData(7, 'etihad-airways-flights')}>Etihad Airways</span>
                            {/* <span  onClick={() => handleAirLinesData(8, 'shaheen-air-flights')}>Shaheen Air</span> */}
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
                <div className=" mb-3"> 
                <ul className="footerLink_internationl">
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-london">Lahore - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-dubai">Lahore - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-toronto">Lahore - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-new-york">Lahore - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-boston">Lahore - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-perth">Lahore - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-manchester">Lahore - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-melbourne">Lahore - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-atlanta">Lahore - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-lahore-to-doha">Lahore - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-london">Peshawar - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-dubai">Peshawar - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-toronto">Peshawar - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-new-york">Peshawar - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-boston">Peshawar - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-perth">Peshawar - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-manchester">Peshawar - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-melbourne">Peshawar - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-atlanta">Peshawar - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-los-angeles">Faisalabad - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-jeddah">Faisalabad - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-istanbul">Faisalabad - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-london">Karachi - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-dubai">Karachi - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-toronto">Karachi - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-new-york">Karachi - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-boston">Karachi - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-perth">Karachi - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-manchester">Karachi - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-melbourne">Karachi - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-atlanta">Karachi - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-doha">Karachi - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-los-angeles">Karachi - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-jeddah">Karachi - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-karachi-to-istanbul">Karachi - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-doha">Peshawar - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-los-angeles">Peshawar - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-jeddah">Peshawar - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-peshawar-to-istanbul">Peshawar - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-london">Quetta - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-dubai">Quetta - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-toronto">Quetta - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-new-york">Quetta - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-boston">Quetta - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-london">Islamabad - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-dubai">Islamabad - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-toronto">Islamabad - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-new-york">Islamabad - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-boston">Islamabad - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-perth">Islamabad - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-manchester">Islamabad - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-melbourne">Islamabad - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-atlanta">Islamabad - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-doha">Islamabad - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-los-angeles">Islamabad - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-jeddah">Islamabad - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-islamabad-to-istanbul">Islamabad - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-perth">Quetta - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-manchester">Quetta - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-melbourne">Quetta - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-atlanta">Quetta - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-doha">Quetta - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-los-angeles">Quetta - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-jeddah">Quetta - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-quetta-to-istanbul">Quetta - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-london">Faisalabad - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-london">Multan - London</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-dubai">Multan - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-toronto">Multan - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-new-york">Multan - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-boston">Multan - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-perth">Multan - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-manchester">Multan - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-melbourne">Multan - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-atlanta">Multan - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-doha">Multan - Doha</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-los-angeles">Multan - Los Angeles</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-jeddah">Multan - Jeddah</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-multan-to-istanbul">Multan - Istanbul</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-dubai">Faisalabad - Dubai</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-toronto">Faisalabad - Toronto</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-new-york">Faisalabad - New York</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-boston">Faisalabad - Boston</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-perth">Faisalabad - Perth</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-manchester">Faisalabad - Manchester</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-melbourne">Faisalabad - Melbourne</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-atlanta">Faisalabad - Atlanta</Link></span>
                    <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-faisalabad-to-doha">Faisalabad - Doha</Link></span>
                </ul>

                </div>
              <span className="footer_destination">Domestic Destinations</span>
              <div className=" mb-3"> 
              <ul className=" footerLink_internationl">
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Lahore-to-Karachi">Lahore - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Lahore-to-Islamabad">Lahore - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Lahore-to-Peshawar">Lahore - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Lahore-to-Faisalabad">Lahore - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Lahore-to-Quetta">Lahore - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Lahore-to-Multan">Lahore - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Faisalabad-to-Karachi">Faisalabad - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Faisalabad-to-Islamabad">Faisalabad - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Faisalabad-to-Peshawar">Faisalabad - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Karachi-to-Lahore">Karachi - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Karachi-to-Islamabad">Karachi - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Karachi-to-Peshawar">Karachi - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Karachi-to-Faisalabad">Karachi - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Karachi-to-Quetta">Karachi - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Karachi-to-Multan">Karachi - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Faisalabad-to-Lahore">Faisalabad - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Faisalabad-to-Quetta">Faisalabad - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Faisalabad-to-Multan">Faisalabad - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Islamabad-to-Karachi">Islamabad - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Islamabad-to-Lahore">Islamabad - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Islamabad-to-Peshawar">Islamabad - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Islamabad-to-Faisalabad">Islamabad - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Islamabad-to-Quetta">Islamabad - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Islamabad-to-Multan">Islamabad - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Quetta-to-Karachi">Quetta - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Quetta-to-Islamabad">Quetta - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Quetta-to-Peshawar">Quetta - Peshawar</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Peshawar-to-Karachi">Peshawar - Karachi</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Peshawar-to-Islamabad">Peshawar - Islamabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Peshawar-to-Lahore">Peshawar - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Peshawar-to-Faisalabad">Peshawar - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Peshawar-to-Quetta">Peshawar - Quetta</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Peshawar-to-Multan">Peshawar - Multan</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Quetta-to-Faisalabad">Quetta - Faisalabad</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Quetta-to-Lahore">Quetta - Lahore</Link></span>
                <span onClick={() => { window.scrollTo(0, 0); }}><Link to="/flights/cheap-flights-from-Quetta-to-Multan">Quetta - Multan</Link></span>
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









