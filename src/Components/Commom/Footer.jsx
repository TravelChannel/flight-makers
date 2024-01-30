import React, { Fragment ,useState} from "react";
import * as image from "../../Constant/images";
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from "react-router-dom";
const Footer = () =>{
    const [flightID ,setFlightID] = useState('');
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

  };
    return(
        <Fragment>
        <div className="container footerBox ">
        <div className="postion_reltive">
            <div className="row my-3">
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

            </div>


            {/* ******************************************************** */}
            <div className="row d-none d-sm-block "> 
              <span className="footer_destination">Popular Airlines </span>
                <div className="row"> 
                    <ul className="col-xs-3  col-sm-3 col-md-3 footerLinks">
                            <li  onClick={()=>handleAirLinesData(1,'Emirates-Airline')} ><Link to="#">Emirates Airline</Link></li>
                            <li  onClick={()=>handleAirLinesData(2,'qatar-airways-flights ')}><Link to="#">Qatar Airways </Link></li>
                            <li  onClick={()=>handleAirLinesData(3,'turkish-airlines-flights')}><Link to="#">Turkish Airlines</Link></li>
                            <li  onClick={()=>handleAirLinesData(4,'pakistan-international-airlines-flights')}><Link to="#">PIA</Link></li>
                            <li  onClick={()=>handleAirLinesData(5,'oman-air-flights')}><Link to="#">Oman Air </Link></li>

                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li  onClick={()=>handleAirLinesData(6,'Fly-with-FlyDubai')}><Link to="#">Fly Dubai </Link></li>
                            <li  onClick={()=>handleAirLinesData(7,'etihad-airways-flights')}><Link to="#">Etihad Airways </Link></li>
                            <li  onClick={()=>handleAirLinesData(8,'shaheen-air-flights')}><Link to="#">Shaheen Air</Link></li>
                            <li  onClick={()=>handleAirLinesData(9,'airblue-flights')}><Link to="#"> Air Blue</Link></li>
                            <li  onClick={()=>handleAirLinesData(10,'air-sial-flights')}><Link to="#">Air Sial</Link></li>

                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li  onClick={()=>handleAirLinesData(11,'virgin-atlantic-flights')}><Link to="#">Virgin Atlantic </Link></li>
                            <li  onClick={()=>handleAirLinesData(12,'thai-airways-flights')}><Link to="#"> Thai Airways</Link></li>
                            <li  onClick={()=>handleAirLinesData(13,'serene-air-flights')}><Link to="#">Serene Air</Link></li>
                            <li  onClick={()=>handleAirLinesData(14,'kuwait-airways-flights')}><Link to="#">Kuwait Airways</Link></li>
                            <li  onClick={()=>handleAirLinesData(15,'china-southern-airlines-flights')}><Link to="#">China Southern</Link></li>
                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li  onClick={()=>handleAirLinesData(16,'saudi-arabian-airline-flights')}><Link to="#">Saudi Arabian</Link></li>
                            <li  onClick={()=>handleAirLinesData(17,'air-arabia-flights')}><Link to="#">Air Arabia</Link></li>
                            <li  onClick={()=>handleAirLinesData(18,'air-china-flights')}><Link to="#">Air China</Link></li>
                            <li  onClick={()=>handleAirLinesData(19,'air-malindo-flights')}><Link to="#">Air Malindo</Link></li>
                            <li  onClick={()=>handleAirLinesData(20,'british-airways-flights')}><Link to="#">British Airways</Link></li>
                    </ul>
                </div>
              <span className="footer_destination">International Destinations</span>
                <div className="row mb-3"> 
                <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/internationalAirlines/Lahore-London">Lahore - London</Link></li>
                    <li><Link to="/internationalAirlines/Lahore-Dubai">Lahore - Dubai</Link></li>
                    <li><Link to="/internationalAirlines/Lahore-Toronto">Lahore - Toronto</Link></li>
                    <li><Link to="/internationalAirlines/Lahore-NewYork">Lahore - New York</Link></li>
                    <li><Link to="/internationalAirlines">Lahore - Boston</Link></li>
                    <li><Link to="/internationalAirlines">Lahore - Perth</Link></li>
                    <li><Link to="/internationalAirlines">Lahore - Manchester</Link></li>
                    <li><Link to="/internationalAirlines">Lahore - Melbourne</Link></li>
                    <li><Link to="/internationalAirlines">Lahore - Atlanta</Link></li>
                    <li><Link to="/internationalAirlines">Lahore - Doha</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - London</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Dubai</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Toronto</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - New York</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Boston</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Perth</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Manchester</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Melbourne</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Atlanta</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Los Angeles</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Jeddah</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Istanbul</Link></li>

                    
                </ul>
                <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/internationalAirlines">Karachi - London</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Dubai</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Toronto</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - New York</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Boston</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Perth</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Manchester</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Melbourne</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Atlanta</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Doha</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Los Angeles</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Jeddah</Link></li>
                    <li><Link to="/internationalAirlines">Karachi - Istanbul</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Doha</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Los Angeles</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Jeddah</Link></li>
                    <li><Link to="/internationalAirlines">Peshawar - Istanbul</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - London</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Dubai</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Toronto</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - New York</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Boston</Link></li>
                   

                </ul>
                <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/internationalAirlines">Islamabad - London</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Dubai</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Toronto</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - New York</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Boston</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Perth</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Manchester</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Melbourne</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Atlanta</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Doha</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Los Angeles</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Jeddah</Link></li>
                    <li><Link to="/internationalAirlines">Islamabad - Istanbul</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Perth</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Manchester</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Melbourne</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Atlanta</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Doha</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Los Angeles</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Jeddah</Link></li>
                    <li><Link to="/internationalAirlines">Quetta - Istanbul</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - London</Link></li>


                </ul>
                <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/internationalAirlines">Multan - London</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Dubai</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Toronto</Link></li>
                    <li><Link to="/internationalAirlines">Multan - New York</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Boston</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Perth</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Manchester</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Melbourne</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Atlanta</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Doha</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Los Angeles</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Jeddah</Link></li>
                    <li><Link to="/internationalAirlines">Multan - Istanbul</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Dubai</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Toronto</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - New York</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Boston</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Perth</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Manchester</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Melbourne</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Atlanta</Link></li>
                    <li><Link to="/internationalAirlines">Faisalabad - Doha</Link></li>
                </ul>

                </div>
              <span className="footer_destination">Domestic Destinations</span>
              <div className="row mb-3"> 
              <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/domesticAirlines">Lahore - Karachi</Link></li>
                    <li><Link to="/domesticAirlines">Lahore - Islamabad</Link></li>
                    <li><Link to="/domesticAirlines">Lahore - Peshawar</Link></li>
                    <li><Link to="/domesticAirlines">Lahore - Faisalabad</Link></li>
                    <li><Link to="/domesticAirlines">Lahore - Quetta</Link></li>
                    <li><Link to="/domesticAirlines">Lahore - Multan</Link></li>
                    <li><Link to="/domesticAirlines">Faisalabad - Karachi</Link></li>
                    <li><Link to="/domesticAirlines">Faisalabad - Islamabad</Link></li>
                    <li><Link to="/domesticAirlines">Faisalabad - Peshawar</Link></li>
                </ul>

                {/* Karachi Destinations */}
                <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/domesticAirlines">Karachi - Lahore</Link></li>
                    <li><Link to="/domesticAirlines">Karachi - Islamabad</Link></li>
                    <li><Link to="/domesticAirlines">Karachi - Peshawar</Link></li>
                    <li><Link to="/domesticAirlines">Karachi - Faisalabad</Link></li>
                    <li><Link to="/domesticAirlines">Karachi - Quetta</Link></li>
                    <li><Link to="/domesticAirlines">Karachi - Multan</Link></li>
                    <li><Link to="/domesticAirlines">Faisalabad - Lahore</Link></li>
                    <li><Link to="/domesticAirlines">Faisalabad - Quetta</Link></li>
                    <li><Link to="/domesticAirlines">Faisalabad - Multan</Link></li>
                </ul>

                {/* Islamabad Destinations */}
                <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/domesticAirlines">Islamabad - Karachi</Link></li>
                    <li><Link to="/domesticAirlines">Islamabad - Lahore</Link></li>
                    <li><Link to="/domesticAirlines">Islamabad - Peshawar</Link></li>
                    <li><Link to="/domesticAirlines">Islamabad - Faisalabad</Link></li>
                    <li><Link to="/domesticAirlines">Islamabad - Quetta</Link></li>
                    <li><Link to="/domesticAirlines">Islamabad - Multan</Link></li>
                    <li><Link to="/domesticAirlines">Quetta - Karachi</Link></li>
                    <li><Link to="/domesticAirlines">Quetta - Islamabad</Link></li>
                    <li><Link to="/domesticAirlines">Quetta - Peshawar</Link></li>
                </ul>

                {/* Peshawar Destinations */}
                <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                    <li><Link to="/domesticAirlines">Peshawar - Karachi</Link></li>
                    <li><Link to="/domesticAirlines">Peshawar - Islamabad</Link></li>
                    <li><Link to="/domesticAirlines">Peshawar - Lahore</Link></li>
                    <li><Link to="/domesticAirlines">Peshawar - Faisalabad</Link></li>
                    <li><Link to="/domesticAirlines">Peshawar - Quetta</Link></li>
                    <li><Link to="/domesticAirlines">Peshawar - Multan</Link></li>
                    <li><Link to="/domesticAirlines">Quetta - Faisalabad</Link></li>
                    <li><Link to="/domesticAirlines">Quetta - Lahore</Link></li>
                    <li><Link to="/domesticAirlines">Quetta - Multan</Link></li>
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
                                &copy; 2022 <span itemProp="name colorGrey2">Faremakers</span>  All rights reserved
                                <br /> 53/A-1 , Block E/1 Gulberg 3,
                                <br /><span itemProp="addressLocality colorGrey2">Lahore</span>,
                                <span itemProp="addressCountry colorGrey2">Pakistan</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="whatsapp_chat" >
            <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
        </div>
        <div className="whatsapp_chat">
            <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
        </div>
        <Link className="whatsapp_chat" to="tel:+923111147111 bg-white">
                {/* <img className="whatsapp inlineDiv" src="~/Content/images/Logos/call_now_2.png" height="60" width="60" alt="Whatsapp logo" /> */}
        </Link>
    
        </div>
    
        </Fragment>
        );
}

export default Footer;