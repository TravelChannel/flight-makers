import React from 'react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const Loader = () => {
  const spans = [];

  for (let i = 1; i <= 20; i++) {
    spans.push(<span style={{'--i': i}} key={i}></span>);
  }

  return (
    <div className='container '>
      <div className='loadingBgSty'>
        <div className="loader">
          {spans}
          <div className="plane">
            <AirplanemodeActiveIcon/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;