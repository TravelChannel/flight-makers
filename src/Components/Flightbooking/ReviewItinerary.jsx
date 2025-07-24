import { React, Fragment, useEffect,useState } from 'react';
import UserItineraryDetails from './Comman/UserItineraryDetails';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { FarePricing_withOutPNR } from '../../API/AmadeousAPI';
import Loader from '../../Loader/Loader';

const ReviewItinerary = (props) => {
    const {PassangersDetail ,sequenceNum ,setSequenceNum} = props;
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
                    <div className='d-flex justify-content-end w-100'>
                    <div className='d-flex justify-content-start px-2  summary_detail'>  
                            <p><PermIdentityIcon className='summry_detail_icon'/></p>
                            <div className='d-flex jusitfy-content-start align-self-center summary_content'>
                                <p className='px-1'>{`${PassangersDetail.adults} Adult`}</p>
                                <p className='px-1'>{`,${PassangersDetail.children} Child,`}</p>
                                <p className='px-1'>{`${PassangersDetail.infants} Infants `}</p>
                            </div>
                    </div>
                    </div>
                    <div>
                        <UserItineraryDetails />
                    </div>
                    {/* <div>
                        <FairRulesDisplay sequenceNum= {sequenceNum} setSequenceNum = {setSequenceNum}/>
                    </div> */}
                    
                </div>
        </Fragment>
    )
}

export default ReviewItinerary;