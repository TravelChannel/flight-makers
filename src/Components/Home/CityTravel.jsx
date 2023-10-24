import React from "react";
import { Fragment } from "react";
import {cityTravelling} from '../../Constant/homeData'
const RecentTravel = () =>
{
    return(
        <Fragment>
            <div className="component_container">
                <h2 className="colorBlue ">Popular Destinations</h2>
                <div className="d-flex justify-content-between mt-4">
                    {
                        cityTravelling.map((item,index) => {
                            return(
                                <div key={index} className="cityImagesBox">
                                        <img src={item.imagesCity} alt=""/>
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