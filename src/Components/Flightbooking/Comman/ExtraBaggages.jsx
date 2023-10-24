import React, { useState,useContext  } from 'react';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { extra_baggages } from '../../../Constant/images';
import { TicketPriceContext } from './Context';

const ExtraBaggages = () => {
    const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
    const { extraBaggages } = extra_Bagg;
    const [selectedCard, setSelectedCard] = useState(1);
    const { setExtraBagg } = useContext(TicketPriceContext);

    const handelCardClick = (index) => {
        setSelectedCard(index);
        const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
        flightDetails.bookingFlight = flightDetails.bookingFlight.map(item => {
            return { ...item, FareType: index + 1 };
        });
        const extraBaggage = parseInt(flightDetails.extraBaggages[index].AMOUNT);
        setExtraBagg(extraBaggage);
        localStorage.setItem("bookingTicket", JSON.stringify(flightDetails));
        // console.log(flightDetails);
    }
    // console.log(extraBaggages);
    return (
        <div className="fare_policy_main">
            <div className="d-flex align-self-center">
                <span> <BusinessCenterIcon className="policy_main_icon" /></span>
                <span className="policy_main_heading">Extra Baggages</span>
            </div>
            <div className='row mt-3'>
                {extraBaggages.map((item, index) => (
                    <div key={index} className='col-sm-4 d-flex align-items-stretch' onClick={() => handelCardClick(index)}>
                        <div class={`card ${selectedCard === index ? 'selectd_border' : ''}`}>
                            <img src={extra_baggages[index]} class="card-img-top" alt="..." />
                            <div class="card-body text-center">
                                <h5 class="card-title">{item.SUB_CLASS_DESC}</h5>
                                <p class="card-text ">{item.WEIGHT} Kg</p>
                                <p className='descriptions_baggage'>
                                    {
                                        // index === 0 ? `0 Piece(s) ( 0KG ) If you select Nill-Baggage ${item.AMOUNT} PKR` : `${item.DESCRIPTION} each for Adult & Child`
                                        `${item.PIECE} Piece(s) (not more than ${item.WEIGHT} KG) each for Adult & Child`
                                    }
                                </p>
                                <p>
                                    {
                                        `${parseInt(item.AMOUNT).toLocaleString()} PKR`
                                    }
                                </p>
                                <p class="btn btn-primary mt-3">Select</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExtraBaggages