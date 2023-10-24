import React, { Fragment,useEffect,useState} from 'react';
import { elapsedTimeFunct, cityNameFunct } from '../../../helpers/formatdata';
import airlinesData from '../../../Constant/airlineName';
const OneWay = (props) => {
    const {activeFlightDet,bookButton,bookTicket,} = props;
    const [isMobile , setMobile] = useState(window.innerWidth<967);
    const [smallScreen , setSmallScreen] = useState(window.innerWidth < 500);

    useEffect(()=>{
        const handleResize = () =>{
            setMobile(window.innerWidth<967) 
            setSmallScreen(window.innerWidth <500)
        };
      window.addEventListener("resize",handleResize);
      return ()=>{
        window.removeEventListener('resize',handleResize);
      }
    },[]);

    return (
        <Fragment>
            <div className={`fd_border_top_round flex-wrap ${isMobile ? 'd-flex justify-content-around' :'d-flex justify-content-between'}`}>
                {activeFlightDet.schedualDetGet.map((val, idx) => {
                    const airlineName = val[0].carrier.marketing;
                    const matchedAirline = airlinesData.find(airline => airline.id === airlineName);
                    return(
                    <div key={idx} className="fd_left_content_round d-flex justify-content-start align-self-center round_width_detail">
                        <div>
                            <img className='airline-logo' src={matchedAirline ? matchedAirline.logo : airlineName} alt="" />
                            <p>{val[0].carrier.marketing}</p>
                        </div>
                        <div className="fd_timing_detail">
                            <p className="fd_timing_size">{val[0].departure.time.slice(0, 5)}</p>
                            <p>{cityNameFunct[val[0].departure.airport]}</p>
                        </div>
                        <div className="fd_timing_detail">
                            <p className="fd_expected_time">{elapsedTimeFunct(val.map((val) => val.elapsedTime).reduce((sum, time) => sum + time, 0))}</p>
                            <hr className="fd_line" />
                            <p className="fd_expected_time">{val.length - 1 === 0 ? "Non Stop" : `${val.length - 1} Stop`}</p>
                        </div>
                        <div className="fd_timing_detail">
                            <p className="fd_timing_size">{val[val.length - 1].arrival.time.slice(0, 5)}</p>
                            <p>{cityNameFunct[val[val.length - 1].arrival.airport]}</p>
                        </div>
                    </div>
                    );
                })}
                { !isMobile && (
                  <div className='fd_left_content d-flex justify-content-start align-self-center'>
                    <span className="fd_total_price">{activeFlightDet.fare.totalFare.totalPrice.toLocaleString()} PKR</span>
                    {bookButton ? <button className='fd_book_button' onClick={bookTicket} type='button'>Book now</button> : null}
                </div>
                    )
                }
            </div>
            {isMobile && (
                <div className={`fd_left_content active_price_responsive ${smallScreen ? 'd-flex justify-content-end':'d-flex justify-content-end'}`}>
                    <span className="fd_total_price align-self-center">{activeFlightDet.fare.totalFare.totalPrice.toLocaleString()} PKR</span>
                    {bookButton ? <button className='fd_book_button' onClick={bookTicket} type='button'>Book now</button> : null}
                </div>
                        )}     
        </Fragment>
    )
}
export default OneWay;