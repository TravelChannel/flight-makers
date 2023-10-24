import React, { Fragment } from "react";
import * as Images from '../../Constant/images.js';
import { Link } from 'react-router-dom';


const AppQR = ()=>{
    return(
        <Fragment>
            <div className="component_container hero_booking">
                <div className="row banner_relative">
                    <div className="col-lg-12 p-0">
                      <img src={Images.QRBanner} alt="QRBanner" className="w-100"/>
                    </div>
                   <div className="banner_absolute w-50">
                   <div className="d-flex justify-content-start ">
                           <div className="referalLinkIcon"> <Link to = "https://apps.apple.com/us/app/faremaker/id1666181103" target='_blank'><img src={Images.AppStore} className="w-100 h-100" alt="App Store"/></Link></div>
                           <div className="referalLinkIcon space_google_icon"><Link to = "https://play.google.com/store/apps/details?id=io.ionic.faremakers" target='_blank'> <img src={Images.Googleplay} className="w-100 h-100" alt="Googl eplay" /></Link></div>
                    </div>
                   </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AppQR;