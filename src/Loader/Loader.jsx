// import React from 'react';
// import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

// const Loader = () => {
//   const spans = [];

//   for (let i = 1; i <= 20; i++) {
//     spans.push(<span style={{'--i': i}} key={i}></span>);
//   }

//   return (
//     <div className='container '>
//       <div className='loadingBgSty'>
//         <div className="loader">
//           {spans}
//           <div className="plane">
//             <AirplanemodeActiveIcon/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loader;


import React from 'react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const Loader = () => {
  const spans = [];

  for (let i = 1; i <= 20; i++) {
    spans.push(<span style={{ '--i': i }} key={i}></span>);
  }

  const planeIconStyle = {
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    width: '7em',
    height: '2em',
    color: 'var(--color-blue)',
    display: 'inline-block',
    fill: 'currentColor',
    WebkitFlexShrink: 0,
    MsFlexNegative: 0,
    flexShrink: 0,
    WebkitTransition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transition: 'fill 200ms cubic-bezier(0.5, 0, 0.2, 1) 0ms',
    fontSize: '1.5rem',
    transform: 'rotate(150deg)',
  };

  return (
    <div className="container">
      <div className="loadingBgSty">
        <div className="loader">
          {spans}
          <div className="plane">
            <AirplanemodeActiveIcon style={planeIconStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;