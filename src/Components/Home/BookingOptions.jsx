import React, {Fragment} from "react";
import * as images from '../../Constant/images.js';

const BookingOptions =()=>{
    return(
      <Fragment>
        <div className="component_container hero_booking">
            <div className="row ">
                    <h2 className="heading_color_blue mb-3">Flight Booking Options</h2>
                <div className="col-md-4 d-flex align-items-stretch mt-3">
                    <div className="booking_card">
                        <h3 className="colorOrange book_heading">Book here, Pay Through</h3> 
                        <div className="map_image_min_h">
                            <div className="row align-items-center mt-3">
                                <div className="col-sm-4 text-center col"><img src={images.bikepic} alt="bikepic" className="image_width"/></div>
                                <div className="col-sm-8 text-right col"><p className="bike_content">Faremakers Rider</p></div>
                            </div>
                            <div className="row align-items-center mt-3">
                                <div className="col-sm-4 text-center col"> <img src ={images.bankpic} alt="bankpic" className="image_width"/></div>
                                <div className="col-sm-8 text-right col"><p className="bike_content">HBL & Other Online Banking </p></div>
                            </div>
                        </div>
                        <div className="descrip colorBlue mt-3">Pay Online & Cash On Delivery</div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-stretch mt-3">
                    <div className="booking_card">
                        <h3 className="colorOrange book_heading mb-2">Book here, Pay at Branch</h3>  
                        <div className="map_image_min_h">
                            <div className="d-flex justify-content-between map_image_min_h">
                                <div className="map_image_graph"><img className="w-100 h-100 my-1" alt="pakistanMap" src = {images.pakistanMap}/></div>
                                <div className="map_image_graph"><img className="w-100 h-100 my-1" alt="officeLocation" src = {images.officeLocation}/></div>
                            </div>
                        </div>
                        <p className="descrip colorBlue mt-3">Faremakers Branches Network</p>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-stretch mt-3">
                    <div className="booking_card">
                        <h3 className="colorOrange book_heading mb-2">Be aware Be safe</h3> 
                        <div className="last_bookin_card mobile_image_min px-5"> <img className="w-100 h-100" alt="mobileScaner" src = {images.mobileScaner}/> </div>  
                        <div className="descrip colorBlue lg-mt-lg-3">Payment Confirmation Through QR Code</div>
                    </div>
                </div>
            </div>
        </div>
      </Fragment>  
    );
}

export default BookingOptions;