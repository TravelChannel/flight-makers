import {React,useState,Fragment} from 'react';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import airlinesData from '../../../Constant/airlineName';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShortFlightDetail from '../../Flightbooking/ShortFlightDetail';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition } from "react-transition-group";
import SideBarMenu from '../SideBarMenu';
const MobBooking = () => {
  const [showDetail , setShowDetail]= useState(false);

  const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
    // -----------------------
   const HandleShowDetails = ()=>{
    setShowDetail(!showDetail);
   }
   const handleCloseCard = ()=>{
    setShowDetail(false);
   }
    // -----------------------
    let matchedAirline = '';
    flightData.schedualDetGet.forEach((val) => {
        const airlineName = val[0].carrier.marketing;
        const airline = airlinesData.find(airline => airline.id === airlineName);
        if (airline) {
            matchedAirline = airline;
            return;
        }
    });
    console.log(matchedAirline);
    // const HandleDetail = () => {
    //     props.handleShow()
    // }
  const newLocal = <div>
      <div className='d-flex justify-content-between '>
      {flightData.groupDescription.map((item, index) => (
        <Fragment>
        <div className=''>
          <div key={index} className='mob_typo_sepration mb-3'>
            <div>
              <div className="d-flex justify-content-start">
                <h6 className="short_font_size">{item.departureLocation}</h6>
                <span className="airport_spacing"><RedoOutlinedIcon /></span>
                <h6 className="short_font_size">{item.arrivalLocation}</h6>
              </div>
              <div>
                <p className="short_font_date">{item.departureDate}</p>
              </div>
            </div>
          </div>
        </div>
      
        </Fragment>
      ))}
      <div className="mob_detailed_icon">
          <InfoOutlinedIcon className='banking_info_icon ' onClick={HandleShowDetails}/>
      </div>
    
      </div>
  </div>;
  return (
          <Fragment>
                  <div className='mob_bookin_main'>
                      {newLocal}
                    <div className='pay_mob_line'></div>
                  </div>
                  <div className='kashif'>
                  <CSSTransition
                          in={showDetail}
                          timeout={1000}
                          classNames="slide"
                          unmountOnExit
                        >
                          <div className="overall_filter_search_bc">
                            <div className="mob_filter_bc_relative">
                              <div className=" d-flex justify-content-between filter_mob_top ">
                                <div className="edit_search_mob">
                                  <h4>Flight Detials</h4>
                                </div>
                                <div>
                                  <CloseIcon onClick= {handleCloseCard}  className="mob_cross_border" />
                                </div>
                              </div>
                              <div className='mob_flight_card'>
                                <ShortFlightDetail/>
                              </div>
                            </div>
                          </div>
                        </CSSTransition>
                       
                </div>
               
                <div>
                    <h4 className='mob_pay_methodes'>Payment Methodes</h4>
                </div>
                <div>
                  <SideBarMenu/>
                </div>
                
      </Fragment>
  )
}

export default MobBooking;