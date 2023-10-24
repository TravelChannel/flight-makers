import { React,useState, Fragment,useEffect } from 'react';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import * as flightimg from '../../Constant/flightImages';
import { elapsedTimeFunct } from '../../helpers/formatdata'
import airlinesData from '../../Constant/airlineName';

const ShortFlightDetail = (props) => {
const [isMobile , setIsMobile] = useState(window.innerWidth < 769 && window.innerWidth >= 500);
const [isSmallScreen ,setSmallScreen] = useState(window.innerWidth <500);
    const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
    const flightdepDates = flightData.schedualDetGet.map(values => values[0].departure.time.slice(0, 5));
    const flightarrDates = flightData.schedualDetGet.map(values => values[values.length - 1].arrival.time.slice(0, 5));
    const elapsedTime = flightData.schedualDetGet.map(values => values.reduce((sum, val) => sum + val.elapsedTime, 0));
    const stops = flightData.schedualDetGet.map(item => item.length - 1);

    let matchedAirline = '';
    flightData.schedualDetGet.forEach((val) => {
        const airlineName = val[0].carrier.marketing;
        const airline = airlinesData.find(airline => airline.id === airlineName);
        if (airline) {
            matchedAirline = airline;
            return;
        }
    });
    // console.log(matchedAirline);
    const HandleDetail = () => {
        props.handleShow()
    }
    useEffect(()=>{
        const handleResize = ()=>{
            setIsMobile(window.innerWidth < 769 && window.innerWidth >= 500);
            setSmallScreen(window.innerWidth <500);
        };
        // handleResize();
        window.addEventListener('resize' , handleResize);
        return()=>{
            window.removeEventListener('resize', handleResize);
        }
    });
    return (
        <Fragment>
            <div className='d-flex justify-content-between'>
                {isMobile || isSmallScreen ? (''):(
                        <div className='align-self-center ' onClick={HandleDetail}>
                            <CheckCircleSharpIcon className='expandmore_done' fontSize='large' />
                       </div>)}
                { !isMobile && !isSmallScreen &&(
                    <div className='w-75'>
                    {flightData.groupDescription.map((item, index) => (
                            <div key={index} className='d-flex justify-content-between mb-3'>
                                <div className="d-flex justify-content-start">
                                    <img src={matchedAirline ? matchedAirline.logo : null} alt="" width="32px" height="32px" />
                                    <p className="short_flight_name">{matchedAirline ? matchedAirline.name : null}</p>
                                </div>
                                <div className="">
                                    <div className="d-flex justify-content-start">
                                        <h6 className="short_font_size">{item.departureLocation}</h6>
                                        <span className="airport_spacing"><RedoOutlinedIcon /></span>
                                        <h6 className="short_font_size">{item.arrivalLocation}</h6>
                                    </div>
                                    <div>
                                        <p className="short_font_date">{item.departureDate}</p>
                                    </div>
                                </div>
                                <div className=" flight_time_main">
                                    <span className="short_flight_timing">{flightdepDates[index]}</span> - <span className="short_flight_timing">{flightarrDates[index]}</span>
                                    <div className="flight_timing_content">
                                        <span className='short_font_date'>{elapsedTimeFunct(elapsedTime[index])}</span> <span className='short_font_date'>{stops[index] === 0 ? "Non-Stop" : `${stops[index]}-Stops`}</span>
                                    </div>
                                </div>
                            </div>
                                ))}
                            </div>
                        )}
                    {isMobile && (
                            <div className={`${isMobile ? 'w-100':'w-75'}`}>

                    {flightData.groupDescription.map((item, index) => (
                            <div key={index} className='d-flex justify-content-between mb-3'>
                            <div className="">
                                    <div className="d-flex justify-content-start">
                                        <h6 className="short_font_size">{item.departureLocation}</h6>
                                        <span className="airport_spacing"><RedoOutlinedIcon /></span>
                                        <h6 className="short_font_size">{item.arrivalLocation}</h6>
                                    </div>
                                    <div>
                                        <p className="short_font_date">{item.departureDate}</p>
                                    </div>
                            </div>
                            <div className=" flight_time_main">
                                    <span className="short_flight_timing">{flightdepDates[index]}</span> - <span className="short_flight_timing">{flightarrDates[index]}</span>
                                    <div className="flight_timing_content">
                                        <span className='short_font_date'>{elapsedTimeFunct(elapsedTime[index])}</span> <span className='short_font_date'>{stops[index] === 0 ? "Non-Stop" : `${stops[index]}-Stops`}</span>
                                    </div>
                            </div>
                            <div className="d-flex justify-content-start">
                                    <img src={matchedAirline ? matchedAirline.logo : null} alt="" width="32px" height="32px" />
                                    <p className="short_flight_name">{matchedAirline ? matchedAirline.name : null}</p>
                            </div>
                            </div>
                                ))}
                         </div> 
                        )
                    }
                    { isSmallScreen && !isMobile && (
                        <div className={`${isSmallScreen ? 'w-100':'w-75'}`}>

                    {flightData.groupDescription.map((item, index) => (
                        <div key={index} className='d-flex justify-content-start mb-3'>
                                <div className="d-flex justify-content-start mob_short_padding">
                                        <img src={matchedAirline ? matchedAirline.logo : null} alt="" width="32px" height="32px" className='align-self-center' />
                                        <p className="short_flight_name">{matchedAirline ? matchedAirline.name : null}</p>
                                </div>
                                <div className="mob_short_padding">
                                        <div className="d-flex justify-content-start">
                                            <h6 className="short_font_size">{item.departureLocation}</h6>
                                            <span className="airport_spacing"><RedoOutlinedIcon /></span>
                                            <h6 className="short_font_size">{item.arrivalLocation}</h6>
                                        </div>
                                        <div>
                                            <p className="short_font_date">{item.departureDate}</p>
                                        </div>
                                        <div className=" flight_time_main mob_short_padding">
                                            <span className="short_flight_timing">{flightdepDates[index]}</span> - <span className="short_flight_timing">{flightarrDates[index]}</span>
                                            <div className="flight_timing_content">
                                                <span className='short_font_date'>{elapsedTimeFunct(elapsedTime[index])}</span> <span className='short_font_date'>{stops[index] === 0 ? "Non-Stop" : `${stops[index]}-Stops`}</span>
                                            </div>
                                      </div>
                                </div>
                        </div>
                            ))}
                    </div>  )
                        }
                    {isMobile || isSmallScreen ?(''):(
                        <div className=' d-flex align-self-center ' onClick={HandleDetail}>
                             <ExpandCircleDownOutlinedIcon className='expandmore_round'  fontSize='large' />
                        </div>)}
            </div>
        </Fragment>
    )
}

export default ShortFlightDetail;