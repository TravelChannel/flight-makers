import React, { Fragment } from "react";
import recentTravelData from '../../Constant/homeData';
import { Link } from "react-router-dom";


const RecentTravel = () =>
{
    return(
        <Fragment>
            <div className="component_container">
                <h2 className="colorBlue ">Recent Travelling</h2>
                <div className="row">
                    {
                        recentTravelData.map((item,index)=>
                        { 
                            return(
                                <div key={index} className="col-6 col-sm-4 col-md-3 ">
                                    <Link className="d-flex justify-content-between recent_travelling_box">
                                        <div className="heading_recentT">
                                            <h6 className="">{`${item.departure} ⇄ ${item.arrival}`}</h6>
                                            <p className="">{`${item.depDate} - ${item.ariDate}`}</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className=""><path d="M1 9L5 5L1 1" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </div>
                                    </Link>
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