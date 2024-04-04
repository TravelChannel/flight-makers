import { React, Fragment } from 'react';
import UserItineraryDetails from './Comman/UserItineraryDetails';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
const ReviewItinerary = () => {
    const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
    return (
        <Fragment>
            <div className="iti_review_main">
                <div className="d-flex justify-content_start mt-2 mb-4">
                    <div className="iti_numbering d-flex align-self-center">
                        <p>1</p>
                    </div>
                    <div className="d-flex align-self-center">
                        <h5 className="iti_heading_size">Itinerary Details</h5>
                    </div>
                </div>
                <div className='d-flex justify-content-between w-100'>
                <div className='w-75'></div>
                <div className='d-flex justify-content-start px-2 w-25 summary_detail'>  
                        <p><PermIdentityIcon className='summry_detail_icon'/></p>
                        <div className='d-flex jusitfy-content-start align-self-center summary_content'>
                            <p className='px-1'>{`${flightData.adults} Adult`}</p>
                            <p className='px-1'>{`,${flightData.children} Child,`}</p>
                            <p className='px-1'>{`${flightData.infants} Infants `}</p>
                        </div>
                </div>
                </div>
                <div>
                    <UserItineraryDetails/>
                </div>

            </div>
        </Fragment>
    )
}

export default ReviewItinerary;