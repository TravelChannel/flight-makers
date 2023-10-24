// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { serachFlightData } from '../Store/action';

// const MyComponent = () => {
//   const dispatch = useDispatch();
//   const adultQuant = '1';
//   const childQuant = '1';
//   const infantsQuant = '0';
//   const activeClassTab = 'bussiness';
//   const selectedDates = '22 june';
//   const departure = 'lhr';
//   const arrival = 'isb';

//   const handleClick = () => {
    
//     const searchDataObj = {
//       adults: adultQuant,
//       children: childQuant,
//       infants: infantsQuant,
//       classtype: activeClassTab,
//       date: selectedDates,
//       departure: departure,
//       arrival: arrival,
//     };
//     dispatch(serachFlightData(searchDataObj));
//     console.log(searchDataObj);
//   };

//   const myData = useSelector((state) => state.searchflightdata);
//   // console.log(myData)
//   const myDataArray = Object.values(myData);
//   return (
//     <div>
//       <button onClick={handleClick}>Save Message</button>
     
//       <h2>Search History</h2>
//        {myDataArray && myDataArray.length > 0 ? (
//         <ul>
//           {myDataArray.map((search, index) => (
//             <li key={index}>{search.adults}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No search history available.</p>
//       )}
//     </div>
//   );
// };


// export default MyComponent;