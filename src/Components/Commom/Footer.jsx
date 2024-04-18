import React, { Fragment ,useState} from "react";
import * as image from "../../Constant/images";
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../Context/FormDataContext";
import { InternationRoutes } from "../../Constant/FooterPagesData/InternationalRoutes";
import { DomesticRoutes } from "../../Constant/FooterPagesData/DomesticRoutes";
import { PopularairlineRoute } from "../../Constant/FooterPagesData/PopularAirLines";
import { iataCode } from "../../Constant/FooterPagesData/IATACode";
import IntFlights from "../SEOPages/IntAndDomFlights";
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
    // navigate(`/flights/cheap-flights-from-${from.toLowerCase()}-to-${to.toLowerCase()}`, { state: { searchDataArr:{}, FooterFlights:true} });
    navigate(`/${airlineName}`, { state: { id, airlineName } });
    window.scrollTo(0,0);

  };
  
  
//   const handleLinkClick = (searchDataArr) => {
//     navigate('/searchflightresult', { state: { searchDataArr } });
//   };

    const currentDate = new Date();
    // Add 5 days to the current date
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 5);
    // Format the future date as "YYYY-MM-DD"
    const futureDateString = futureDate.toISOString().split('T')[0];

  const handleInternationalFlights = (from,to ,departCode ,arrivalCode) => {
    // console.log("depart",from);
    // console.log('arrival',to);
    // let searchDataArr = {
    //     "adults": 1,
    //     "children": 0,
    //     "infants": 0,
    //     "classtype": "Economy",
    //     "tripType": "OneWay",
    //     "departure": [], 
    //     "arrival": [], 
    //     "date": [futureDateString]
    //   };

    //   let departureString = `${from} (${departCode})`;
    //   let arrivalString = `${to} (${arrivalCode})`;
    //   searchDataArr.departure.push(departureString);
    //   searchDataArr.arrival.push(arrivalString);

    //   console.log('searchDataArr',searchDataArr);
    window.scrollTo(0, 0);
    // navigate('/searchflightresult', { state: { searchDataArr, FooterFlights:true} });
    navigate(`/flights/cheap-flights-from-${from.toLowerCase()}-to-${to.toLowerCase()}`, { state: { searchDataArr:{}, FooterFlights:true} });
  };
    return(
        <Fragment>
        <div className={`footerBox ${!isTopNavBar ? '':'container '}`}>
        <div className="postion_reltive">
            {/* ******************************************************** */}
            <div className="row d-sm-block "> 
              <span className="footer_destination">Popular Airlines </span>
                <div > 
                    <div className="footerLink_internationl">
                        {PopularairlineRoute.map(({ id, name, displayName }) => (
                        <span key={id} onClick={() => handleAirLinesData(id, name)}>
                            {displayName}
                        </span>
                        ))}
                    </div>
               </div>
              <span className="footer_destination">International Destinations</span>
                <div className=" mb-3"> 
                <ul className="footerLink_internationl">
                    {InternationRoutes.map((route, index) => (
                        <span key={index} onClick={()=>handleInternationalFlights(route.from,route.to ,route.departCode,route.ArrivalCode)}>
                        {/* <Link to={`/flights/cheap-flights-from-${route.from.toLowerCase()}-to-${route.to.toLowerCase()}`}> */}
                            {`${route.from} - ${route.to}`}
                        {/* </Link> */}
                        </span>
                    ))}
                </ul>
                </div>
              <span className="footer_destination">Domestic Destinations</span>
              <div className=" mb-3"> 
              <ul className="footerLink_internationl">
                    {DomesticRoutes.map((route, index) => (
                        <span key={index} onClick={()=>handleInternationalFlights(route.from,route.to ,route.departCode,route.ArrivalCode)}>
                            {/* <Link to={`/flights/cheap-flights-from-${route.from}-to-${route.to}`}> */}
                                {`${route.from} - ${route.to}`}
                            {/* </Link> */}
                        </span>
                    ))}
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









