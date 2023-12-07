import { React, Fragment } from 'react';
import UserItineraryDetails from './Comman/UserItineraryDetails';
const ReviewItinerary = () => {

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
                <div>
                    <UserItineraryDetails/>
                </div>

            </div>
        </Fragment>
    )
}

export default ReviewItinerary;