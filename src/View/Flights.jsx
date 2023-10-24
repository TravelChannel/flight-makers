// import React from 'react';
// import { useLocation } from 'react-router';

// const NextPage = () => {
//   const location = useLocation();
//   const searchData = location.state && location.state.searchData;

//   return (
//     <div>
//       <h2>Search Results</h2>
//       {searchData && (
//         <div>
//           {Object.entries(searchData).map(([key, value]) => (
//             <p key={key}>{`${key}: ${value}`}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NextPage;

// import React, { Fragment, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Flag from 'react-world-flags';
// const SearchHistory = () => {
//   const [localStorageData, setLocalStorageData] = useState([]);
//   const countryCode = 'US';
//   useEffect(() => {
//     const localStorageData = localStorage.getItem('searchData');
//     if (localStorageData) {
//       const parsedData = JSON.parse(localStorageData);
//       setLocalStorageData(parsedData);
//     }
//   }, []);


//   return (
//     <div>
//       <Flag code={countryCode} className='flagDesignn'/>
//       <h2>Search History</h2>
//       {localStorageData.length > 0 ? (
//         <ul>
//           {localStorageData.map((search, index) => (
//             <li key={index}>
//               <p>Adults: {search.adults}</p>
//               <p>Children: {search.children}</p>
//               <p>Infants: {search.infants}</p>
//               <p>Class: {search.classtype}</p>

//               {search.dates && search.dates.length > 0 ? (
//                 <Fragment>
//                   {search.dates.map((date, idx) => (
//                     <p key={idx}>Date {idx + 1}: {date}</p>
//                   ))}
//                 </Fragment>
//               ) : (
//                 <Fragment>
//                   {search.startDate && search.endDate ? (
//                     <p>Date Range: {search.startDate} to {search.endDate}</p>
//                   ) : (
//                     <p>Date: {search.date}</p>
//                   )}
//                 </Fragment>
//               )}

//               {Array.isArray(search.departure) ? (
//                 search.departure.map((departure, idx) => (
//                   <p key={idx}>Departure {idx + 1}: {departure}</p>
//                 ))
//               ) : (
//                 <p>Departure: {search.departure}</p>
//               )}

//               {Array.isArray(search.arrival) ? (
//                 search.arrival.map((arrival, idx) => (
//                   <p key={idx}>Arrival {idx + 1}: {arrival}</p>
//                 ))
//               ) : (
//                 <p>Arrival: {search.arrival}</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No search history available.</p>
//       )}
//       <Link to="/flights" state={{ searchData: localStorageData }}>
//         View Flights
//       </Link>
//     </div>
//   );
// };

// export default SearchHistory;

import React, { useState, useRef } from 'react';

const AutotabExample = () => {
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleKeyUp = (e, targetRef, nextRef) => {
    const maxLength = parseInt(targetRef.current.getAttribute('maxlength'), 10);
    const currentLength = e.target.value.length;

    if (currentLength === maxLength && nextRef) {
      nextRef.current.focus();
    }

    // Update the displayed date
    const day = dayRef.current.value || 'DD';
    const month = monthRef.current.value || 'MM';
    const year = yearRef.current.value || 'YYYY';
    setDateOfBirth(`${day}/${month}/${year}`);
  };

  return (
    <div className="col-md-4">
      <fieldset>
        <div className="field-inline-block">
          <label>DD</label>
          <input
            type="text"
            pattern="[0-9]*"
            maxLength="2"
            size="2"
            className="date-field"
            ref={dayRef}
            onKeyUp={(e) => handleKeyUp(e, dayRef, monthRef)}
          />
        </div>
        /
        <div className="field-inline-block">
          <label>MM</label>
          <input
            type="text"
            pattern="[0-9]*"
            maxLength="2"
            size="2"
            className="date-field"
            ref={monthRef}
            onKeyUp={(e) => handleKeyUp(e, monthRef, yearRef)}
          />
        </div>
        /
        <div className="field-inline-block">
          <label>YYYY</label>
          <input
            type="text"
            pattern="[0-9]*"
            maxLength="4"
            size="4"
            className="date-field date-field--year"
            ref={yearRef}
            onKeyUp={(e) => handleKeyUp(e, yearRef, null)}
          />
        </div>
        <p><small>E.g. {dateOfBirth}</small></p>
      </fieldset>
    </div>
  );
};

export default AutotabExample;


// import React, { useState, useEffect } from 'react';
// import { fetchPriceRates } from '../API/AlternatesDates';

// const YourComponent = () => {
//   const [departure, setDeparture] = useState('');
//   const [arrival, setArrival] = useState('');
//   const [priceRates, setPriceRates] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const rates = await fetchPriceRates(departure, arrival);
//         setPriceRates(rates);
//       } catch (error) {
//         // Handle error
//       }
//     };
//     console.log(priceRates)
//     if (departure && arrival) {
//       fetchData();
//     }
//   }, [departure, arrival]);

//   const handleInputChange1 = (event) => {
//     setDeparture(event.target.value);
//   };

//   const handleInputChange2 = (event) => {
//     setArrival(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={departure} onChange={handleInputChange1} />
//       <input type="text" value={arrival} onChange={handleInputChange2} />
//       <div>
//         {priceRates.map((price, index) => (
//           <div key={index}>{price}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default YourComponent;




