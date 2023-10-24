import React, { Fragment, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notification = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [message, setMessage] = useState('');

  const handleCancel = () => {
    setShowNotification(false);
  };

  const handleAllow = () => {
    setMessage('Notification allowed!');
    setShowNotification(false);
  };

  return (
    <Fragment>
      {showNotification && (
        <div className="container notf_position_fixed flex-wrap mt-4">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="banner_hero d-flex justify-content-between">
                <div className="banner_left d-flex align-items-center">
                  <NotificationsIcon className="notf_icon" />
                  <span className="banner_heading">
                    Allow to receive alert notifications about low-fare travel details and more
                  </span>
                  <h4> </h4>
                </div>
                <div className="banner_right">
                  <ul>
                    <li>
                      <button type="button" className="btn btn-outline-primary notf_latter_btn" onClick={handleCancel}>
                        Later
                      </button>
                    </li>
                    <li>
                      <button type="button" className="btn btn-outline-primary notf_allow_btn" onClick={handleAllow}>
                        Allow
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {message && (
        <div>{message}</div>
      )}
    </Fragment>
  );
};

export default Notification;
