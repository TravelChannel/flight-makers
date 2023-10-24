import React, { Fragment } from 'react';
import {cityNameFunct} from '../../../helpers/formatdata';
const OneWay = (props) => {
    const {imageFlight,flightName,departureTime,departureAirport,elapsedTime,stops,arrivalTime,arrivalAirport,priceTicket,bookButton,bookTicket} = props;
    return (
        <Fragment>
            <div className="d-flex justify-content-between w-100 ad_border_top_oneway">
                <div className='d-flex justify-content-between w-50'>
                    <div className="fd_content_style">
                        <img className='airline-logo' src={imageFlight} alt="" />
                        <p>{flightName}</p>
                    </div>
                    <div className="fd_timing_detail fd_content_style">
                        <p className="fd_timing_size">{departureTime}</p>
                        <p>{cityNameFunct[departureAirport]}</p>
                    </div>
                    <div className="fd_timing_detail fd_content_style">
                        <p className="fd_expected_time">{elapsedTime} </p>
                        <hr className="fd_line" />
                        <p className="fd_expected_time">{stops}</p>
                    </div>
                    <div className="fd_timing_detail fd_content_style">
                        <p className="fd_timing_size">{arrivalTime}</p>
                        <p>{cityNameFunct[arrivalAirport]}</p>
                    </div>
                </div>
                <div className="w-50 text-right align-self-center">
                    <span className="fd_total_price align-self-center">{priceTicket} PKR </span>
                    {bookButton ? <button className="fd_book_button" type='button' onClick={bookTicket}>Book now</button> : null}
                </div>
            </div>
        </Fragment>
    )
}

export default OneWay;