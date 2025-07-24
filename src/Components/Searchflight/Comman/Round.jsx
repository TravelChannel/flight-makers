import React, { Fragment,useEffect,useState} from 'react';
import { elapsedTimeFunct, cityNameFunct,convertDateFormat, convertTimeFormat,calculateTotalTime , AmadeuselapsedTime } from '../../../helpers/formatdata';
import airlinesData from '../../../Constant/airlineName';
const Round = (props) => {
    const {activeFlightDet,bookButton,bookTicket, totalAmount, totalFlightTime} = props;
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
        <div
          className={`fd_border_top_round flex-wrap ${
            isMobile
              ? "d-flex justify-content-around"
              : "d-flex justify-content-between"
          }`}
        >
          {activeFlightDet.groupDescription.map((val, idx) => {
            const airlineName = val.marketingCarrier;
            const numberOfStops =val.stopCounts;
            const matchedAirline = airlinesData.find(
              (airline) => airline.id === airlineName
            );
            {/* const totalTime = totalFlightTime[idx]; */}
            return (
              <Fragment>
                <div
                  key={idx}
                  className="fd_left_content_round d-flex justify-content-start align-self-center round_width_detail"
                >
                  <div>
                    <img
                      className="airline-logo"
                      src={matchedAirline ? matchedAirline.logo : airlineName}
                      alt=""
                    />
                    <p>{val.marketingCarrier}</p>
                  </div>
                  <div className="fd_timing_detail">
                    <p className="fd_timing_size">
                      {convertTimeFormat(val.departTime)}
                    </p>
                    <p>{cityNameFunct[val.departure]}</p>
                  </div>
                  <div className="fd_timing_detail">
                    <p className="fd_expected_time">{
                        bookButton
                          ? calculateTotalTime([totalFlightTime[idx]])
                          : <p className="fd_expected_time">{totalFlightTime?.[idx]}</p>
                      }
                      </p>
                    <hr className="fd_line" />
                    <p className="fd_expected_time">
                     {numberOfStops === 0 ? 'Non-stop' : `${numberOfStops} stop`}
                    </p>
                  </div>
                  <div className="fd_timing_detail">
                    <p className="fd_timing_size">
                      {convertTimeFormat(val.arrivalTime)}
                    </p>
                    <p>{cityNameFunct[val.arrival]}</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
          {!isMobile && (
            <div className="fd_left_content d-flex justify-content-start align-self-center">
              <span className="fd_total_price">
                {totalAmount.toLocaleString()} PKR
              </span>
              {bookButton ? (
                <button
                  className="fd_book_button"
                  onClick={bookTicket}
                  type="button"
                >
                  Book now
                </button>
              ) : null}
            </div>
          )}
        </div>
        {isMobile && (
          <div
            className={`fd_left_content active_price_responsive ${
              smallScreen
                ? "d-flex justify-content-end"
                : "d-flex justify-content-end"
            }`}
          >
            <span className="fd_total_price align-self-center">
              {totalAmount.toLocaleString()} PKR
            </span>
            {bookButton ? (
              <button
                className="fd_book_button"
                onClick={bookTicket}
                type="button"
              >
                Book now
              </button>
            ) : null}
          </div>
        )}
          
      </Fragment>
    );
}
export default Round;