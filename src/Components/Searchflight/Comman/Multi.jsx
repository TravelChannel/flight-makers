import React, { Fragment } from 'react';
import {cityNameFunct} from '../../../helpers/formatdata';
const MultiCity = (props) => {
    const {index,imageFlight,flightName,departureTime,departureAirport,elapsedTime,stops,arrivalTime,arrivalAirport} = props;
    return (
        <Fragment>
            <div className="ad_width_bwteen_right">
                <h6 className="ad_header_font">Flight {index + 1}</h6>
            </div>
            <div className="d-flex justify-content-between ad_width_bwteen_left"  >
                <div className="fd_content_style">
                    <img className='airline-logo' src={imageFlight} alt="" />
                    <p>{flightName}</p>
                </div>
                <div className="fd_timing_detail fd_content_style">
                    <p className="fd_timing_size">{departureTime}</p>
                    <p>{cityNameFunct[departureAirport]}</p>
                </div>
                <div className="fd_timing_detail fd_content_style">
                    <p className="fd_expected_time">{elapsedTime}</p>
                    <hr className="fd_line" />
                    <p className="fd_expected_time">{stops}</p>
                </div>
                <div className="fd_timing_detail fd_content_style">
                    <p className="fd_timing_size">{arrivalTime}</p>
                    <p>{cityNameFunct[arrivalAirport]}</p>
                </div>
            </div>
        </Fragment>
    )
}

export default MultiCity;