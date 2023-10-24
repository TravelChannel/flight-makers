// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import fetchSearchResult  from '../API/SearchFlightResult.js';

// const SearchResult = () => {
//   const location = useLocation();
//   const { searchDataArr } = location.state;
//   const [loading, setLoading] = useState(true);
//   const [apiData, setApiData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const data = await fetchSearchResult(searchDataArr);
//       console.log(data);
//       setApiData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       // Handle the error here
//     }
//   };
  
//   useEffect(() => {
//     fetchData();
//   }, [searchDataArr]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {/* Render the fetched data */}
//           {apiData && (
//             <div>
//               {/* Display the fetched data */}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResult;
