import React, { useState } from 'react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const PassangerDetailCard = (props) => {
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [closeUpdate,setCloseUpdate] = useState(false);

  const handleIncrement = (type) => {
    if (type === 'adults') {
      setAdultsCount((prevCount) => Math.min(prevCount + 1, 9));
    } else if (type === 'children') {
      setChildrenCount((prevCount) => Math.min(prevCount + 1, 9));
    } else if (type === 'infants') {
      // Limit the increment of infantsCount based on the number of adults (maximum 4)
      setInfantsCount((prevCount) => Math.min(prevCount + 1, adultsCount));
    }
  };

  const handleDecrement = (type) => {
    if (type === 'adults') {
      setAdultsCount((prevCount) => Math.max(prevCount - 1, 1));
    } else if (type === 'children') {
      setChildrenCount((prevCount) => Math.max(prevCount - 1, 0));
    } else if (type === 'infants') {
      setInfantsCount((prevCount) => Math.max(prevCount - 1, 0));
    }
  };

  const sendData = ()=>{
    let sum=0;
    sum=adultsCount+childrenCount+infantsCount;
    // console.log(sum);
    props.sendDataToParent(sum);
    setCloseUpdate(true);
  }
  if (closeUpdate) {
    return null;
  }
  return (
    <div className="passanger_card">
      <div className="passanger_card_main">
        <p className="passanger_heading">Travellers</p>
        <div className="d-flex justify-content-between w-100 passng_card_width">
          <div className="pc_content_width">
            <p>Adults</p>
          </div>
          <div className="d-flex justify-content-between pc_card_qunt_width">
            <span onClick={() => handleDecrement('adults')}>
              <RemoveCircleOutlineRoundedIcon />
            </span>
            <p>{adultsCount}</p>
            <span onClick={() => handleIncrement('adults')}>
              <AddCircleOutlineRoundedIcon />
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between w-100 passng_card_width">
          <div className="pc_content_width">
            <p>Children <span className="pc_age">(2-12yrs)</span></p>
          </div>
          <div className="d-flex justify-content-between pc_card_qunt_width">
            <span onClick={() => handleDecrement('children')}>
              <RemoveCircleOutlineRoundedIcon />
            </span>
            <p>{childrenCount}</p>
            <span onClick={() => handleIncrement('children')}>
              <AddCircleOutlineRoundedIcon />
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between w-100 passng_card_width">
          <div className="pc_content_width">
            <p>Infants <span className="pc_age">(below 2yrs)</span></p>
          </div>
          <div className="d-flex justify-content-between pc_card_qunt_width">
            <span onClick={() => handleDecrement('infants')}>
              <RemoveCircleOutlineRoundedIcon />
            </span>
            <p>{infantsCount}</p>
            <span onClick={() => handleIncrement('infants')}>
              <AddCircleOutlineRoundedIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="straight_line" />
      <div className="text-right">
        <button className="fd_book_button_pc" onClick={sendData}>Update</button>
      </div>
    </div>
  );
  
};

export default PassangerDetailCard;
