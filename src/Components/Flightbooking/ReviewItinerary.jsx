import { React,useState,useEffect, Fragment } from 'react';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { cityNameFunct, formatCompleteDate,calculateDuration,elapsedTimeFunct,airportNameFunct} from '../../helpers/formatdata';
import airlinesData from '../../Constant/airlineName';
import { requestReviewItinerary } from '../../API/index';
import { requestPNRCreate } from '../../API/index';


const ReviewItinerary = () => {
    const [isMobile , setIsMobile] = useState(window.innerWidth < 912);
    const [isSmallMob ,setSmallMob] = useState(window.innerWidth < 500);
    const [seatAvailable, setSeatAvailable] = useState([]);

    const flightdetails = JSON.parse(localStorage.getItem("bookingTicket"));
    const seatsType = flightdetails.fare.passengerInfoList.flatMap(item => item.passengerInfo.passengerType);
    const conSeatsType = seatsType.join(', ');
    console.log("flightdetails",flightdetails);
    useEffect(()=>{
        const handleResize = ()=>{
            setIsMobile(window.innerWidth < 912);
            setSmallMob(window.innerWidth<500);
        };
        window.addEventListener('resize', handleResize);
        return()=>{
            window.removeEventListener('resize', handleResize);
        }
    },[])

    useEffect(() => {
        async function updateSeatAvailability() {
            try {
                const requestItinerary = await requestReviewItinerary();
                // const PNRRespon = await requestPNRCreate();
                // console.log(PNRRespon);
                const seats = requestItinerary.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary[0].AirItineraryPricingInfo[0].FareInfos.FareInfo.map(item => item.TPA_Extensions.SeatsRemaining.Number);
                setSeatAvailable(seats);
            } catch (error) {
                console.error("Error updating seat availability:", error);
            }
        }
        updateSeatAvailability();
        const intervalId = setInterval(updateSeatAvailability, 60000);
        return () => clearInterval(intervalId);
    }, []);

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
                {flightdetails.schedualDetGet.map((item, index) => (
                    <div key={index}>
                        <div className="iti_flight_details" >
                            {
                                !isSmallMob && (
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex justify-content-start align-self-center w-75">
                                    <h5 className="iti_city_font">{cityNameFunct[flightdetails.groupDescription[index].departureLocation]}</h5> <span className="airport_spacing"><RedoOutlinedIcon /></span> <h5 className="iti_city_font">{cityNameFunct[flightdetails.groupDescription[index].arrivalLocation]}</h5>
                                    <p className=" d-flex align-self-center iti_date_spacing"> {formatCompleteDate(flightdetails.groupDescription[index].departureDate)}</p>
                                </div>
                                <div className="w-25">
                                    <div className='iti_refund_detail'>
                                        <p>{flightdetails.fare.passengerInfoList[0].passengerInfo.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p>
                                    </div>
                                </div>
                            </div>
                                )
                            }
                            {
                                isSmallMob &&(
                            <div className='d-flex justify-content-between w-100'>
                                <div className=" align-self-center w-75">
                                    <div className='d-flex justify-content-start'>
                                        <h5 className="iti_city_font">{cityNameFunct[flightdetails.groupDescription[index].departureLocation]}</h5> 
                                        <span className="airport_spacing"><RedoOutlinedIcon /></span> 
                                        <h5 className="iti_city_font">{cityNameFunct[flightdetails.groupDescription[index].arrivalLocation]}</h5>
                                    </div>
                                    <p className=" d-flex align-self-center iti_date_spacing iti_mob_spacing"> {formatCompleteDate(flightdetails.groupDescription[index].departureDate)}</p>
                                </div>
                                <div className=" align-self-center w-25">
                                    <div className='iti_refund_detail'>
                                        <p>{flightdetails.fare.passengerInfoList[0].passengerInfo.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p>
                                    </div>
                                </div>
                            </div>

                                )
                            }
                            {item.map((itm, idx) => {
                                const airlineName = itm.carrier.marketing;
                                const matchedAirline = airlinesData.find(airline => airline.id === airlineName);
                                return (
                                    <Fragment>
                                        <div className="row">
                                            <div className={` col-md-9 flight_complete_details ${isMobile ? 'col-md-12':'col-md-9'}`}>
                                                <div className='d-flex jusitfy-content-start'>
                                                    <div className='align-self-center text-center'>
                                                        <img src={matchedAirline ? matchedAirline.logo : airlineName} alt="" width="32px" height="32px" />
                                                        <p className="iti_flight_no">{matchedAirline ? matchedAirline.name : airlineName}</p>
                                                        <p className="iti_flight_no">{`${airlineName}-${itm.carrier.marketingFlightNumber}`}</p>
                                                        <p className="iti_flight_no">{flightdetails.classtype}</p>
                                                    </div>
                                                    <div className="seprator">
                                                        <DonutLargeIcon className="donut_size" />
                                                        <div className={`${isSmallMob ? 'iti_mob_line':'vertical-line'}`}></div>
                                                        <DonutLargeIcon className="donut_size" />
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <span className="iti_flight_timing"> {itm.departure.time.slice(0, 5)}</span>
                                                             <span className="iti_city_code">{itm.departure.airport}</span>
                                                            {isSmallMob ? (<div className="iti_airport_name ">{airportNameFunct[itm.departure.airport]}</div>):(<span className="iti_airport_name">{airportNameFunct[itm.departure.airport]}</span>)}
                                                        </div>
                                                        <div className="iti_content_spacing">
                                                            <QueryBuilderOutlinedIcon /> {elapsedTimeFunct(itm.elapsedTime)}
                                                        </div>
                                                        <div>
                                                            <span className="iti_flight_timing">{itm.arrival.time.slice(0, 5)}</span>
                                                             <span className="iti_city_code">{itm.arrival.airport}</span> 
                                                            {
                                                                isSmallMob ?( <div className="iti_airport_name ">{airportNameFunct[itm.arrival.airport]}</div>):( <span className="iti_airport_name">{airportNameFunct[itm.arrival.airport]}</span>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           {
                                           isMobile ? (
                                              <div className="iti_content_spacing">
                                                <div className='iti_mob_border'>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                        <p className="fd_airport_name fd_space_baggages">No of Seats</p>
                                                        <p className="fd_airport_name fd_space_baggages ">{`${flightdetails.adults+flightdetails.children+flightdetails.infants}`}</p>
                                                        </div>
                                                      <div>
                                                        <p className="fd_airport_name fd_space_baggages ">Seats Types</p>
                                                        <p className="fd_airport_name fd_space_baggages ">
                                                                {conSeatsType}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <div>
                                                            {
                                                                flightdetails.baggageAllowance[index].pieceCount ? (
                                                                <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                                                                ) : (
                                                                <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                                                                )
                                                            }
                                                            </div>
                                                            <p className="fd_airport_name fd_space_baggages mob_iti_text">{flightdetails.baggageAllowance[index].pieceCount} {flightdetails.baggageAllowance[index].weight} {flightdetails.baggageAllowance[index].unit}</p>

                                                      </div>
                                                      <div>
                                                        <p className="fd_airport_name fd_space_baggages">
                                                            <span className={seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}>
                                                                Remaining Seats
                                                            </span>
                                                        </p>
                                                        <p className="fd_airport_name fd_space_baggages">{flightdetails.baggageAllowance[index].pieceCount} {flightdetails.baggageAllowance[index].weight} {flightdetails.baggageAllowance[index].unit}</p>
                                                      </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            ):(  
                                            <div className="col-md-3 iti_content_spacing">
                                                <div className='d-flex justify-content-between'>
                                                    <div className="">
                                                        <p className="fd_airport_name fd_space_baggages">No of Seats</p>
                                                        <p className="fd_airport_name fd_space_baggages iti_difference">Seats Types</p>
                                                        {
                                                            flightdetails.baggageAllowance[index].pieceCount ? (
                                                            <p className="fd_airport_name fd_space_baggages">Piece Counts</p>
                                                            ) : (
                                                            <p className="fd_airport_name fd_space_baggages">Check-in baggage</p>
                                                            )
                                                        }
                                                        <p className="fd_airport_name fd_space_baggages">
                                                        <span className={seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}>
                                                            Remaining Seats
                                                        </span>
                                                    </p>
                                                    </div>
                                                    <div className="">
                                                        <p className="fd_airport_name fd_space_baggages">{`${flightdetails.adults+flightdetails.children+flightdetails.infants}`}</p>
                                                        <p className="fd_airport_name fd_space_baggages iti_difference">
                                                            {conSeatsType}
                                                        </p>
                                                        <p className="fd_airport_name fd_space_baggages">{flightdetails.baggageAllowance[index].pieceCount} {flightdetails.baggageAllowance[index].weight} {flightdetails.baggageAllowance[index].unit}</p>
                                                        {seatAvailable && seatAvailable.length > 0 ? (
                                                        <p className={`fd_airport_name fd_space_baggages ${seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}`}>{`${seatAvailable[index]}`}</p>
                                                    ) : (
                                                        <p className='fd_airport_name fd_space_baggages'>...</p>
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                           }
                                        </div>
                                        {idx < item.length - 1 &&
                                            <div className="fd_line_structure">
                                                <div className="fd_line"></div>
                                                <div className="fd_icon_wrapper">
                                                    <p className="fd_middle_border"><DirectionsRunIcon /> {`Short layover ${calculateDuration(itm.arrival.time, item[idx + 1].departure.time)}`}</p>
                                                </div>
                                                <div className="fd_line"></div>
                                            </div>
                                        }
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                )
                )}

            </div>
        </Fragment>
    )
}

export default ReviewItinerary;