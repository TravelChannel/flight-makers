import React, { Fragment } from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CheckBoxComp = (props) => {
  const { label1, label2, imageFlight, onChange, isChecked } = props;

  const handleChange = (e) => {
    const { checked } = e.target;
    onChange(label1, checked); // Call the parent component's onChange function with label1 and isChecked
  };

  return (
    <Fragment>
      <ul className="d-flex justify-content-between">
        <div className="d-flex justify-content-start">
          <li>
            <span>
              <Checkbox checked={isChecked} onChange={handleChange} {...label} />
            </span>
          </li>
          <li>
            <p className="move_down_para">{label1}</p>
          </li>
        </div>
        {label2 && <li className="flight_timing_color text-right">{label2}</li>}
        {imageFlight && (
          <li className="flight_timing_color text-right">
            <img className="airline-logo-CBox" src={imageFlight} alt="images.AirAsiaFlag" />
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default CheckBoxComp;
