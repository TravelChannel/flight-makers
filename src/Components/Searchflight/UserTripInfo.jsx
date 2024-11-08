import React, { useState, Fragment, useEffect } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";
import FlightSearch from "../Home/FlightSearch";
import { useItemsToShow } from './Comman/Context';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
const UserTripInfo = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isClicked, setIsclicked] = useState(false);
  const {searchDataArr} = useItemsToShow();


  const travellers = searchDataArr.adults + searchDataArr.children +searchDataArr.infants;
  const handleEditNote = () => {
    setIsclicked(!isClicked);
  }
  const handleCloseCard = () => {
    setIsclicked(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <Fragment>

      {isMobile ? (

        <Fragment>
          <div className="container background_mob_color">
            <div className="trip_detail_hero mobile">
              <div className="mobile_top_search ">
                <div>
                  <div className="d-flex justify-content-between">
                      <div className= 'd-flex justify-content-start'>
                          <p className="SF_mob_city_code">{searchDataArr.departure[0]}  </p>
                                <span>{searchDataArr.date[1] ? <SyncAltIcon/> : <ArrowRightAltIcon/>}</span>
                          <p className="SF_mob_city_code">{searchDataArr.arrival[0]}</p>
                         
                      </div>
                      <div className="d-flex align-self-center">
                        <span className=" mob_icon_size" onClick={handleEditNote}> <BorderColorIcon className="mob_top_icon" /> Change</span>
                      </div>
                  </div>
                  <div className="mob_top_detail d-flex justify-content-start">
                    {/* <p> 08 Dec • 1 traveller • Economy</p> */}
                    <p className="mob_data_typo">•{formatDate(searchDataArr.date[0])}</p>
                    {searchDataArr.date[1] && <p className="mob_data_typo">•{formatDate(searchDataArr.date[1])}</p>} 
                    <p className="mob_data_typo">•{travellers} travellers</p>
                    <p className="mob_data_typo">•{searchDataArr.classtype}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </Fragment>

      ) : (
        <Fragment>
          <div className=" src_button_background">
            <div classame="container">
                <FlightSearch main_flight_rsult="main_flight_rsult" resultpage="true" searchDataArr ={searchDataArr}/>
            </div>
          </div>

        </Fragment>
      )}
      <CSSTransition
        in={isClicked}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <div className="overall_mob_search_bc">
          <div className="disply_mob_search_card overlay">
            <div className="d-flex justify-content-end">
              <CloseIcon onClick={handleCloseCard} className="mob_cross_border" />
            </div>
            <div className="edit_search_mob">
            <FlightSearch main_flight_rsult="main_flight_rsult" resultpage="true" searchDataArr ={searchDataArr}/>
            </div>
          </div>
        </div>
      </CSSTransition>


    </Fragment>
  );
};

export default UserTripInfo;
