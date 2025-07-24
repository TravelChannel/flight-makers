import { React, Fragment, useState, useEffect } from 'react'
import ReviewItinerary from '../Components/Flightbooking/ReviewItinerary';
import TotalPriceCalculation from '../Components/Flightbooking/TotalPriceCalculation';
import FlightBookingHeader from '../Components/Flightbooking/Comman/FlightBookingHeader';
// import SeatSelection from '../Components/Flightbooking/SeatSelection';
import HelpLineCard from '../Components/Commom/HelpLineCard';
import ExtraBaggages from '../Components/Flightbooking/Comman/ExtraBaggages';
import { FarePricing_withOutPNR } from '../API/AmadeousAPI';
import Loader from '../Loader/Loader';
import { useAmadeusData } from '../Context/AmadeusContext';
import FlightConfirmationModel from '../Components/Commom/FlightMakerConfirmationModel';
import { useNavigate } from 'react-router';
const ItineraryDetails = () => {
const {setBestPricingData,setSessionHeader,SessionData} = useAmadeusData();
  const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
   const navigate  =useNavigate();
  const PassangersDetail = {
      adults: flightDetails?.adults,
      children:flightDetails?.children,
      infants:flightDetails?.infants
    };

  const [isLoading, setIsLoading] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const [isHideDetail, setIsHideDetail] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [sequenceNum, setSequenceNum] = useState(1);
  const [segmentError ,setSegmentError] = useState();

  const [isOpened,setOpened] = useState(true);
  const [isOpen , setIsOpen] = useState(false);
  const HandleButtonClicked = async () => {
    try{
      setIsOpen(true)
    }catch(error){
      console.error("Error While calling Air Sell Reccomendation API",error);
    }
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

 const farePricingResp = async() =>{
        try{
            const resp =await FarePricing_withOutPNR(flightDetails);

            //getting header of FIBT for Session and set it in context
            const FIBP_Header = resp?.data?.['soapenv:Envelope']?.['soapenv:Header'];
            setSessionHeader(FIBP_Header);

           //getting body of FIBT and set it in state
            const FIBP_Body = resp?.data?.['soapenv:Envelope']?.['soapenv:Body']?.Fare_InformativeBestPricingWithoutPNRReply;

            console.log("FIBP_Body",FIBP_Body);

            let pricingData = '';
            if(FIBP_Body?.errorGroup){
               pricingData = 'NO FARE FOR BOOKING CODE-TRY OTHER PRICING OPTIONS';
              alert("NO FARE FOR BOOKING CODE-TRY OTHER PRICING OPTIONS");
              navigate(-1);
            } else {
               pricingData = FIBP_Body?.mainGroup?.pricingGroupLevelGroup;
              console.log("pricingData",pricingData);
            }
           
            if (pricingData) {
              flightDetails.FIBP_pricingData = pricingData;  
              localStorage.setItem("bookingTicket", JSON.stringify(flightDetails));
              setBestPricingData(Array.isArray(pricingData) ? pricingData : [pricingData]);
            }            
           
        }catch(error){
            console.error("error",error);
        }finally {
            setIsLoading(false); 
        }
    };

    useEffect(()=>{
        farePricingResp();
    },[]);

    const handleCloseModel = () =>{
      setOpened(false);
  }

  
  
  return (
    <Fragment>
    {
      isLoading ?(<Loader/>) :(
       <Fragment>
        <div className="container">
          <FlightBookingHeader pageTitle='Review Your Booking' icons="default" setTimer="420" />
          {/* <TicketPriceProvider> */}
            <div className="Itinerary_main_bc">
              <div className="row mx-0">
                <div className="col-md-9">
                  {isButtonClicked &&
                    <Fragment>
                      <ReviewItinerary PassangersDetail = {PassangersDetail} sequenceNum= {sequenceNum} setSequenceNum = {setSequenceNum} />
                      {flightDetails.extraBaggages ? <ExtraBaggages /> : null}
                    </Fragment>
                  }
                      <div className="">
                      {
                        isMobile && (
                          <div>
                            <TotalPriceCalculation />
                            <HelpLineCard help_price_card="help_price_card" />
                          </div>
                        )
                      }
                      <div className='d-flex justify-content-end'>
                        <button type="button" className="btn btn-primary continue_button mt-3" onClick={HandleButtonClicked}>Submit Request</button>
                      </div>
                    </div>
                  {/* <bookingConfirmation/> */}
                  {/* <UserContactDetails stateA={isButtonClicked} stateB={isHideDetail} /> */}
                </div>
                <div className='col-md-3'>
                  <div className="scrollable_y">
                    <TotalPriceCalculation />
                    <HelpLineCard help_price_card="help_price_card" />
                  </div>
                </div> 
              </div>
            </div>
          {/* </TicketPriceProvider> */}
        </div>
        {isOpen && (
                  <FlightConfirmationModel
                     isOpen={isOpen} setIsOpen ={setIsOpen}
                     setOpened = {setOpened}
                  />
                   )
          }
       </Fragment>

      )
    }
    </Fragment>

  )
}

export default ItineraryDetails;