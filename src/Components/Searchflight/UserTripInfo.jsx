import React, { useState, Fragment, useEffect } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";
import FlightSearch from "../Home/FlightSearch";
import { useItemsToShow } from './Comman/Context';

const UserTripInfo = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isClicked, setIsclicked] = useState(false);
  const {searchDataArr} = useItemsToShow();
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
  return (
    <Fragment>

      {isMobile ? (

        <Fragment>
          <div className="container background_mob_color">
            <div className="trip_detail_hero mobile">
              <div className="mobile_top_search d-flex justify-content-between">
                <div>
                  <div className="d-flex justify-content-start">
                    <p className="SF_mob_city_code">LHE <span className="SF_mob_city_col">(Lahore)</span></p>
                    <span><ArrowRightAltIcon /></span>
                    <p className="SF_mob_city_code">KHI <span className="SF_mob_city_col">(Karachi)</span></p>
                  </div>
                  <div className="mob_top_detail">
                    <p> 08 Dec • 1 traveller • Economy</p>
                  </div>
                </div>
                <div className="d-flex align-self-center">
                  <span className=" mob_icon_size" onClick={handleEditNote}> <BorderColorIcon className="mob_top_icon" /> Change</span>
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
              <FlightSearch resultpage="true" searchDataArr={searchDataArr} />
            </div>
          </div>
        </div>
      </CSSTransition>


    </Fragment>
  );
};

export default UserTripInfo;
