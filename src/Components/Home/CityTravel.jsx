import React from "react";
import { Fragment } from "react";
import {cityTravelling} from '../../Constant/homeData';
import { useNavigate } from "react-router";
const RecentTravel = () =>{
    const navigate = useNavigate();

    const handleSabreReq = (from,to ) =>{
        window.scrollTo(0, 0);
      navigate(`/flights/cheap-flights-from-${from.toLowerCase()}-to-${to.toLowerCase()}`, { state: { searchDataArr:{}, FooterFlights:false} });
    }
    return(
        <Fragment>
            <div className="component_container">
                <h2 className="colorBlue ">Popular Destinations</h2>
                <div className="d-flex justify-content-between mt-4">
                    {
                        cityTravelling.map((item,index) => {
                            return (
                              <div key={index} className="cityImagesBox" onClick={()=>handleSabreReq(item.from, item.to)}>
                                <img src={item.imagesCity} alt="" />
                                <div className="imageOverlay">
                                  <h4>{item.cityName}</h4>
                                </div>
                              </div>
                            );
                        })
                    }
                </div>
                
            </div>
        </Fragment>
    );
}

export default RecentTravel;