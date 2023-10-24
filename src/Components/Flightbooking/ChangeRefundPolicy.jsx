import React, { useState } from 'react';
import PolicyIcon from '@mui/icons-material/Policy';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import FlightLandIcon from '@mui/icons-material/FlightLand';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ChangeRefundPolicy = () => {
  const [isClicked, setIsClicked] = useState([false, false]);



  const ExpandRefund = (index) => {
    const isUpdated = [...isClicked];
    isUpdated[index] = !isUpdated[index];
    setIsClicked(isUpdated);
  };
  const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
  const { groupDescription } = flightDetails;
  console.log(groupDescription);
  return (
    <div className="fare_policy_main">
      <div className="d-flex align-self-center">
        <span> <PolicyIcon className="policy_main_icon" /></span>
        <span className="policy_main_heading">Returns and Refund</span>
      </div>

      <div className="policy_table_main">
        <div className="d-flex justify-content-around policy_table_heading align-self-center">
          {groupDescription.map((item, index) => (
            <div className="d-flex justify-content-start flight_takeoff">
              <span><FlightTakeoffIcon className="flight_icon_color" /></span>
              <p className="table_heading_content align-self-center"> {item.departureLocation} <ArrowRightAltIcon /> {item.arrivalLocation} </p>
            </div>
          ))}
        </div>
        <div className="refund_policy_main">
          <div className="expendable_heading" onClick={() => ExpandRefund(0)}>
            <p><ChevronRightIcon className={` ${isClicked[0] ? 'rotate_refund' : ''}`} />Refund & Cancellation Policy</p>
          </div>
          {isClicked[0] && (
            <div className="ref_cnlc_heading ">
              <div className="d-flex justify-content-between">
                <div className="bar_width d-flex justify-content-center">
                  <span className="cancelation_heading">Cancle Between</span>
                </div>
                <div className="bar_width d-flex justify-content-between">
                  <p className="refund_p_font"> now</p>
                  <p className="refund_p_font"> 27 Oct</p>
                </div>
                <div className="bar_width d-flex justify-content-between">
                  <p className="refund_p_font"> 28 Oct</p>
                  <p className="refund_p_font"> 29 Oct</p>
                </div>
                <div className="bar_width d-flex justify-content-between">
                  <p className="refund_p_font"> 30 Oct</p>
                  <p className="refund_p_font"> 31 Oct</p>
                </div>
              </div>
              <div className="bars_sepration_line d-flex justify-content-between ">
                <div className="bar_width">
                </div>
                <div className="bar_width refund_bar1  bar1_color">
                </div>
                <div className="bar_width refund_bar2 bar2_color bar_differene_padding">
                </div>
                <div className="bar_width refund_bar3 bar3_color">
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="bar_width d-flex justify-content-center">
                  <span className="cancelation_heading">Amount Refundable</span>
                </div>
                <div className="bar_width d-flex justify-content-center">
                  <p className="refund_p_font">5000 pkr</p>
                </div>
                <div className="bar_width d-flex justify-content-center">
                  <p className="refund_p_font"> 8000pkr</p>
                </div>
                <div className="bar_width d-flex justify-content-center">
                  <p className="refund_p_font"> 10000kpr</p>
                </div>
              </div>
            </div>
          )}

          <div className="expendable_heading sepration_border" onClick={() => ExpandRefund(1)}>
            <p><ChevronRightIcon className={` ${isClicked[1] ? 'rotate_refund' : ''}`} />Date Change Policy</p>
          </div>
          {isClicked[1] && (
            <div className="ref_cnlc_heading bar_main_bottom ">
              <div className="d-flex justify-content-between">
                <div className="bar_width d-flex justify-content-center">
                  <span className="cancelation_heading">Change Between</span>
                </div>
                <div className="change_policy_width d-flex justify-content-between">
                  <p className="refund_p_font"> now</p>
                  <p className="refund_p_font"> 27 Oct</p>
                </div>
                <div className="change_policy_width d-flex justify-content-between">
                  <p className="refund_p_font"> 28 Oct</p>
                  <p className="refund_p_font"> 29 Oct</p>
                </div>
                <div className="change_policy_width d-flex justify-content-between">
                  <p className="refund_p_font"> 30 Oct</p>
                  <p className="refund_p_font"> 31 Oct</p>
                </div>
                <div className="change_policy_width d-flex justify-content-between">
                  <p className="refund_p_font"> 30 Oct</p>
                  <p className="refund_p_font"> 31 Oct</p>
                </div>
              </div>
              <div className="bars_sepration_line d-flex justify-content-between ">
                <div className="bar_width">
                </div>
                <div className="change_policy_width refund_bar1  bar1_color">
                </div>
                <div className="change_policy_width refund_bar2 bar2_color bar_differene_padding">
                </div>
                <div className="change_policy_width refund_bar3 bar3_color">
                </div>
                <div className="change_policy_width refund_bar3 bar4_color">
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="bar_width d-flex justify-content-center">
                  <span className="cancelation_heading">Reshedule Charges</span>
                </div>
                <div className="change_policy_width d-flex justify-content-center">
                  <p className="refund_p_font">5000pkr</p>
                </div>
                <div className="change_policy_width d-flex justify-content-center">
                  <p className="refund_p_font"> 8000pkr</p>
                </div>
                <div className="change_policy_width d-flex justify-content-center">
                  <p className="refund_p_font"> 10000kpr</p>
                </div>
                <div className="change_policy_width d-flex justify-content-center">
                  <p className="refund_p_font"> 10000kpr</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ChangeRefundPolicy;
