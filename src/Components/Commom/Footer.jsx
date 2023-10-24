import React, { Fragment } from "react";
import * as image from "../../Constant/images";
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const Footer = () =>
{
    
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
    
                    <li><Link to="/customer-support">Flights</Link></li>
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
              <span className="footer_destination">POPULAR DESTINATIONS</span>
                <div className="row"> 
                    <ul className="col-xs-3  col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
                    </ul>
                </div>
              <span className="footer_destination">POPULAR CITIES</span>
                <div className="row mb-3"> 
                    <ul className="col-xs-3  col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
                    </ul>
                    <ul className="col-xs-3 col-sm-3 col-md-3 footerLinks">
                            <li><Link to="#">Flight to London</Link></li>
                            <li><Link to="#">Flight to Qatar</Link></li>
                            <li><Link to="#">Flight to Jeddah</Link></li>
                            <li><Link to="#">Flight to Dubai</Link></li>
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