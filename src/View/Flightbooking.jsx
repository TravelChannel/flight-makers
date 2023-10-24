import { React, Fragment, useState, useEffect } from 'react'
import ReviewItinerary from '../Components/Flightbooking/ReviewItinerary';
import TotalPriceCalculation from '../Components/Flightbooking/TotalPriceCalculation';
import ChangeRefundPolicy from '../Components/Flightbooking/ChangeRefundPolicy';
import ShortFlightDetail from '../Components/Flightbooking/ShortFlightDetail';
import UserContactDetails from '../Components/Flightbooking/UserContactDetails';
import FlightBookingHeader from '../Components/Flightbooking/Comman/FlightBookingHeader';
// import SeatSelection from '../Components/Flightbooking/SeatSelection';
import HelpLineCard from '../Components/Commom/HelpLineCard';
import ExtraBaggages from '../Components/Flightbooking/Comman/ExtraBaggages';
import { TicketPriceProvider } from '../Components/Flightbooking/Comman/Context';

const ItineraryDetails = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const [isHideDetail, setIsHideDetail] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const HandleButtonClicked = () => {
    setIsButtonClicked(!isButtonClicked);
    setIsHideDetail(!isHideDetail);
  }
  const HandleShowDetail = () => {
    setIsButtonClicked(true);
    setIsHideDetail(true);
  }

  useEffect(() => {
    const handleSideBar = () => {
      setIsMobile(window.innerWidth < 769);
    };
    window.addEventListener('resize', handleSideBar);
    return () => {
      window.removeEventListener("resize", handleSideBar);
    }
  }, []);

  const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
  return (
    <Fragment>
      <div className="container">
        <FlightBookingHeader pageTitle='Review Your Booking' icons="default" setTimer="420" />
        <TicketPriceProvider>
          <div className="Itinerary_main_bc">
            <div className="row mx-0">
              <div className="col-md-9">
                {isButtonClicked &&
                  <Fragment>
                    <ReviewItinerary />
                    {flightDetails.fare.passengerInfoList[0].passengerInfo.nonRefundable ? null : <ChangeRefundPolicy />}
                    {flightDetails.extraBaggages ? <ExtraBaggages /> : null}
                    {/* <SeatSelection/> */}
                  </Fragment>
                }

                {isHideDetail ?
                  (<div className="">
                    {
                      isMobile && (
                        <div>
                          <TotalPriceCalculation />
                          <HelpLineCard help_price_card="help_price_card" />
                        </div>
                      )
                    }
                    <div className='d-flex justify-content-end'>
                      <button type="button" className="btn btn-primary continue_button mt-3" onClick={HandleButtonClicked}>Continue</button>
                    </div>
                  </div>
                  ) : (
                    <div>
                      <ShortFlightDetail handleShow={HandleShowDetail} />
                    </div>

                  )
                }
                <UserContactDetails stateA={isButtonClicked} stateB={isHideDetail} />
              </div>
              <div className='col-md-3'>
                <div className="scrollable_y">
                  <TotalPriceCalculation />
                  <HelpLineCard help_price_card="help_price_card" />
                </div>
              </div>
            </div>
          </div>
        </TicketPriceProvider>
      </div>
    </Fragment>

  )
}

export default ItineraryDetails;