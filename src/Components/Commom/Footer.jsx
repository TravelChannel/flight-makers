import React, { Fragment ,useState} from "react";
import * as image from "../../Constant/images";
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../Context/FormDataContext";
import { InternationRoutes } from "../../Constant/FooterPagesData/InternationalRoutes";
import { DomesticRoutes } from "../../Constant/FooterPagesData/DomesticRoutes";
import { PopularairlineRoute } from "../../Constant/FooterPagesData/PopularAirLines";
import { useUserData } from "../../Context/UserDataContext";
import { airlinePartners } from "../../Constant/FooterPagesData/PopularAirLines";
const Footer = () =>{
    const {isTopNavBar} = useFormData();
 const [activeTab, setActiveTab] = useState("international");

        const {whtsAppMessage ,gclidID} =useUserData();
        const navigate = useNavigate();

        //  const UserSearchData = JSON.parse(localStorage.getItem('searchDataArr'));
        const lowestFairValue = JSON.parse(localStorage.getItem('LowestFairValue'));

        // console.log("lowestFairValue-ID----Footer",lowestFairValue);                                                                  
        //  console.log("UserSearchData---footer",whtsAppMessage);                                                                                                             

        //  -------------Sectors Detail for whatsapp--------------------
        
        // Check if whtsAppMessage and its properties are defined
        const leavingFrom = whtsAppMessage?.departure?.[0];
        const goingTo = whtsAppMessage?.arrival?.[0];
        const departureCode = leavingFrom?.substring(leavingFrom.indexOf('(') + 1, leavingFrom.indexOf(')'));
        const arrivalCode = goingTo?.substring(goingTo.indexOf('(') + 1, goingTo.indexOf(')'));

        // Helper function to format dates
        const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
        };

        const departDate = whtsAppMessage?.date ? formatDate(whtsAppMessage.date[0]) : '';
        const ArrivalDate = whtsAppMessage?.date ? formatDate(whtsAppMessage.date[1]) :'';

        const fallbackArrivalDate = '01/01/1999';
        const fallbackDate = formatDate(fallbackArrivalDate);

        // Determine the traveling class
        let TravelingClass = whtsAppMessage?.classtype;

        TravelingClass = TravelingClass === 'Economy'
        ? 'Y'
        : TravelingClass === 'Business class'
            ? 'C'
            : TravelingClass === 'First class'
            ? 'C'
            : TravelingClass === 'Premium economy'
                ? 'Y'
                : null;

        // Traveler details
        const Adults = whtsAppMessage?.adults;
        const childs = whtsAppMessage?.children;
        const infants = whtsAppMessage?.infants;

        // Build the message
        const message = departureCode && arrivalCode
        ? whtsAppMessage.date[1]
            ? `Our Website shows you are interested to go from: ${departureCode}-${arrivalCode} with Travelling Dates: ${departDate}-${ArrivalDate} and Class of Travel: ${TravelingClass} ref: ${lowestFairValue}. Please send this message, Our representative will contact you.`
            : `Our Website shows you are interested to go from: ${departureCode}-${arrivalCode} with Travelling Date: ${departDate} and Class of Travel: ${TravelingClass} ref: ${lowestFairValue}. Please send this message, Our representative will contact you.`
        : gclidID ? `Our Website shows you are interested in traveling. Please send this message, Our representative will contact you. ref: ${gclidID}` :'Our Website shows you are interested in traveling. Please send this message, Our representative will contact you.';
    
            // console.log(message);

// ---------------Whatsap URL Built----------------
        // setWhatsAppMessage(message);
    const whatsappUrl = `https://wa.me/923111147111?text=${encodeURIComponent(message)}`;


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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
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

  const handleInternationalFlights = (from,to ,departCode ,arrivalCode,pathName) => {
    console.log("depart",from);
    console.log('arrival',to);
    let searchDataArr = {
        "adults": 1,
        "children": 0,
        "infants": 0,
        "classtype": "Economy",
        "tripType": "OneWay",
        "departure": [], 
        "arrival": [], 
        "date": [futureDateString]
      };

      let departureString = `${from} (${departCode})`;
      let arrivalString = `${to} (${arrivalCode})`;
      searchDataArr.departure.push(departureString);
      searchDataArr.arrival.push(arrivalString);

      console.log('searchDataArr',searchDataArr);
    window.scrollTo(0, 0);
    navigate(`/flights/cheap-flights-from-${from.toLowerCase()}-to-${to.toLowerCase()}`, { state: { searchDataArr:{}, FooterFlights:true} });
    
    // navigate(`/flights/cheap-flights-from-${from.toLowerCase()}-to-${to.toLowerCase()}`, { state: { searchDataArr:{}, FooterFlights:true} });
    // navigate(`/flights/${from.toLowerCase()}-to-${to.toLowerCase()}`, { state: { searchDataArr:{}, FooterFlights:true} });

  };


 
    return(
        <Fragment>
        <div className={`footerBox ${!isTopNavBar ? '':'container '}`}>
        <div className="postion_reltive">
            {/* ******************************************************** */}
            <div className="row d-sm-block d-none">
              <span className="footer_destination">Quick Links </span>
              <div>
                <div className="footerLink_internationl">
                    <Link to='/term-and-condition' onClick={scrollToTop}>
                        <span>Terms and Conditions</span>
                    </Link>
                   <Link to='/customer-support' onClick={scrollToTop}> 
                        <span>Customer Support</span>
                   </Link>
                   <Link to ='/refund-policy' onClick={scrollToTop}>
                         <span>Refund Policy</span>   
                   </Link>
                    <Link to ='/terms-of-service' onClick={scrollToTop}>
                        <span>Terms of Service</span>
                    </Link>
                    <Link to ='/RequestCall' onClick={scrollToTop}>
                        <span>Request Call</span>
                    </Link>
                    <Link to ='/FAQs' onClick={scrollToTop}>
                        <span>FAQs</span>
                    </Link>
                    <Link to ='/job-careers' onClick={scrollToTop}>
                         <span>Careers</span>
                    </Link>
                </div>
              </div>
            </div>
            <div className="row d-sm-block "> 
              <span className="footer_destination">Popular Airlines </span>
                <div > 
                <div className="container mx-auto px-4">
                            {/* Partner Airlines Section */}
                            <div className="mb-5">
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4">
                            {airlinePartners.map((airline, index) => (
                            <div className="col" key={index} onClick={() => handleAirLinesData(airline.id, airline.name) }>
                                <a 
                                rel="noopener noreferrer" 
                                className="d-flex flex-column align-items-center justify-content-center  bg-white rounded shadow-sm text-decoration-none text-dark h-100"
                                aria-label={`Visit ${airline.name} website`}
                                >
                                <img
                                    src={airline.logo}
                                    alt={`${airline.name} logo`}
                                    className="mb-2"
                                    height="24"
                                    />
                                <span className="small text-center">{airline.name}</span>
                                </a>
                            </div>
                            ))}
                        </div>
                    </div>
                    </div>
                {/* <div className="footerLink_internationl">
                    {PopularairlineRoute.map(({ id, name, displayName ,imgPath}) => (
                        <span key={id} onClick={() => handleAirLinesData(id, name)}  >
                        <img 
                            src={imgPath} 
                            alt="" 
                            className="my-3  responsive-logo" 
                            style={{ width: '100px' }} 
                            />
                        </span>
                    ))}
                </div> */}

               </div>
               <div>
                   <ul className="nav nav-tabs mb-3 flex-nowrap ">
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'international' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('international')}
                                    >
                                        USA to Europe
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'domestic' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('domestic')}
                                    >
                                            USA  Domestic 
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'classBased' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('classBased')}
                                    >
                                            Class-Based Flights  
                                    </button>
                                </li>
                     </ul>
               </div>

               <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'international' ? 'show active' : ''}`}>
                <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                    {InternationRoutes.map((route, index) => (
                    <div className="col" key={`int-${index}`}  onClick={()=>handleInternationalFlights(route.from,route.to ,route.departCode,route.ArrivalCode,route.pathName)}>
                        <Link
                        className="text-decoration-none text-secondary destination-link small"
                        >
                        {route.from} - {route.to}
                        </Link>
                    </div>
                    ))}
                </div>
                </div>
                
                <div className={`tab-pane ${activeTab === 'domestic' ? 'show active' : ''}`}>
                <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                    {DomesticRoutes.map((route, index) => (
                    <div className="col" key={`dom-${index}`} onClick={()=>handleInternationalFlights(route.from,route.to ,route.departCode,route.ArrivalCode)}>
                        <Link
                        className="text-decoration-none text-secondary destination-link small"
                        >
                        {route.from} - {route.to}
                        </Link>
                    </div>
                    ))}
                </div>
                </div>
                <div className={`tab-pane ${activeTab === 'classBased' ? 'show active' : ''}`}>
                    <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                    {DomesticRoutes.map((route, index) => (
                        <div className="col" key={`dom-${index}`} onClick={()=>handleInternationalFlights(route.from,route.to ,route.departCode,route.ArrivalCode)}>
                            <Link
                            className="text-decoration-none text-secondary destination-link small"
                            >
                            {route.from} - {route.to}
                            </Link>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
              {/* <span className="footer_destination ">International Destinations</span>
                <div className=" mb-3"> 
                <ul className="footerLink_internationl">
                    {InternationRoutes.map((route, index) => (
                        <span key={index} onClick={()=>handleInternationalFlights(route.from,route.to ,route.departCode,route.ArrivalCode,route.pathName)}>
                            {`${route.from} - ${route.to}`}
                        </span>
                    ))}
                </ul>
                </div>
              <span className="footer_destination ">City to City Destinations</span>
              <div className=" mb-3"> 
              <ul className="footerLink_internationl ">
                    {DomesticRoutes.map((route, index) => (
                        <span key={index} onClick={()=>handleInternationalFlights(route.from,route.to ,route.departCode,route.ArrivalCode)}>
                                {`${route.from} - ${route.to}`}
                        </span>
                    ))}
                    </ul>
            </div> */}

            </div>

            {/* ******************************************************** */}

            <div className="row footerAppLinks border">
                <div className="col-xs-12 col-sm-4 col-md-3">
                    <p className="txtTransUpper">Follow Us</p>
                    <div className="custSocialIcons">
                        <Link to="https://www.facebook.com/flightmakers" className="fl padR10" title="facebook" rel="nofollow"><img className="icon-facebook" height="30" width="40" src="~/Content/images/Logos/facebook.png w-100" alt="social-icon" /></Link>
                        <Link to="https://www.instagram.com/flightmakers/" className="fl padR10" title="instagram" rel="nofollow"><img height="30" width="40" className="icon-instagram" src="~/Content/images/Logos/Instagram_icon.png w-100" alt="social-icon" /></Link>
                        <Link to="https://www.linkedin.com/company/flightmakers/" className="fl padR10" title="linkedin" rel="nofollow"><img height="30" width="30" className="icon-linkedin" src="~/Content/images/Logos/linkedin.png w-100" alt="social-icon" /></Link>
                        <Link to="https://twitter.com/flightmakers" className="fl padR10" title="Twitter" rel="nofollow"><img height="30" width="40" className="icon-twitter" src="~/Content/images/Logos/Twitter.png w-100" alt="social-icon" /></Link>
                        <Link to="https://www.youtube.com/channel/UCIhWyyE1xd-4P3kqNP1q5LQ" className="fl padR10" title="youtube" rel="nofollow"><img height="30" width="40" className="icon-youtube" src="~/Content/images/Logos/Youtube.png w-100" alt="social-icon" /></Link>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-7 col-md-5 d-none">
                    <p className="txtTransUpper">Book Tickets faster. Download our mobile Apps</p>
                    <div className="mobheight">
                        <Link target="_blank" className="fthm-mobApp fthm-goog col-xs-6 col-sm-6 col-md-4" to="https://play.google.com/store/apps/details?id=com.flightmakers.android" rel="noopener"></Link>
                        <Link target="_blank" className="fthm-mobApp fthm-app col-xs-6 col-sm-6 col-md-4" to="https://itunes.apple.com/us/app/faremaker/id1261857249?mt=8" rel="noopener"></Link>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12  col-md-12 mt-3">
    
                    <div className="custbrandLogos d-flex justify-content-start flex-wrap g-4">
                        {/* <div className="payment_box "><img src={image.hbllogo} alt="Payment logo" /></div> */}
                        <div className="payment_box "><img src={image.payprologo} alt="Payment logo"/></div>
                        <div className="payment_box "><img src={image.digicertlogo} alt="Payment logo"/></div>
                        <div className="payment_box "><img src={image.iatalogo} alt="Payment logo"/></div>
                        <div className="payment_box "><img src={image.mastercardlogo} alt="Payment logo"/></div>
                        <div className="payment_box "><img src={image.visacardlogo} alt="Payment logo"/> </div>
                    </div>
                </div>
            </div>
            <div className="row footerCopyrights border">
                <div className="col-xs-12 col-sm-12 col-md-12 text-end" >
                    <div className="fr padT10">
                        <div itemProp="address" itemScope itemype="http://schema.org/PostalAddress colorGrey2">
                            <p itemProp="streetAddress " className="underText font_size_11 colorGrey2">
                                &copy; 2024 <span itemProp="name colorGrey2">flightmakers</span>  All rights reserved
                                {/* <br /> 53/A-1 , Block E/1 Gulberg 3,
                                <br /><span itemProp="addressLocality colorGrey2">Lahore</span>,
                                <span itemProp="addressCountry colorGrey2">Pakistan</span> */}
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
        <div className="whatsapp_chat d-none">
            <a
             href={whatsappUrl}
             >
                <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
            </a>
        </div>
        <div className="whatsapp_chat d-none">
            <a
             href={whatsappUrl}
             >
                <img className="whatsapp inlineDiv" src={image.whatsappicon} height="60" width="60" alt="Whatsapp logo" />
            </a>
        </div>
        <Link className="whatsapp_chat d-none bg-white" to="tel:+14843121100">
                {/* <img className="whatsapp inlineDiv" src="~/Content/images/Logos/call_now_2.png" height="60" width="60" alt="Whatsapp logo" /> */}
        </Link>
    
        </div>
    
        </Fragment>
        );
}

export default Footer;









