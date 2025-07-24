import { React, useState, Fragment, useRef, useEffect } from "react";
import Loader from "../../Loader/Loader";
import {Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import * as images from '../../Constant/images';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import OTPSlider from './OTPSlider';
import PhoneInput from 'react-phone-input-2';
import { useFormData } from '../../Context/FormDataContext';
import { DatePicker } from 'antd';
import { CustomerDetailLead } from '../../API/BackendAPI/LeadCreationAPI/CustomerDetailLead';
import { toast } from 'react-toastify';
import { Select } from "antd";
import cities from "../../Constant/airport.js";
import Flag from 'react-world-flags';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { useLocation } from 'react-router';
// import ArrangeCallSlider from './ArrangeCallSlider.jsx';
const { Option } = Select;
const UserContactDetails = (props) => {
  const { stateA, stateB } = props;

  const [loading, setLoading] = useState(false);
  // ---------------------------------

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {stateA ? (
            ""
          ) : (
            <h3>Please try again Later!</h3>
          )}

          {stateB ? (
            <div className="contact_details_main">
              <div className="d-flex justify-content_start">
                <div className="iti_numbering iti_disabled_col disabled_border d-flex align-self-center">
                  <p>2</p>
                </div>
                <div className="d-flex align-self-center iti_disabled_col">
                  <h5 className="iti_heading_size">Add Traveller Details</h5>
                </div>
              </div>
              {/* )
           } */}
            </div>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserContactDetails;
