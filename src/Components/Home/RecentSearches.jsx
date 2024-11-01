import React, { useEffect, useState, Fragment } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { adultincNumber, childincNumber, infantsincNumber,adultdecNumber,childdecNumber,infantsdecNumber } from '../../Store/action/index';

const RecentSearches = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAdults = useSelector((state) => state.adultNumber);
  const currentChildren = useSelector((state) => state.childNumber);
  const currentInfants = useSelector((state) => state.infantsNumber);
  const handleSearchClick = (index) => {
    const { [index]: searchDataArr } = localStorageData;
    const { adults, children, infants } = searchDataArr;
    if (adults > currentAdults) {
      for (let i = 0; i < adults - currentAdults; i++) {
        dispatch(adultincNumber());
      }
    } else if (adults < currentAdults) {
      for (let i = 0; i < currentAdults - adults; i++) {
        dispatch(adultdecNumber());
      }
    }

    if (children > currentChildren) {
      for (let i = 0; i < children - currentChildren; i++) {
        dispatch(childincNumber());
      }
    } else if (children < currentChildren) {
      for (let i = 0; i < currentChildren - children; i++) {
        dispatch(childdecNumber());
      }
    }

    if (infants > currentInfants) {
      for (let i = 0; i < infants - currentInfants; i++) {
        dispatch(infantsincNumber());
      }
    } else if (infants < currentInfants) {
      for (let i = 0; i < currentInfants - infants; i++) {
        dispatch(infantsdecNumber());
      }
    }

    // console.log("hwllooooo-----v1",searchDataArr);
// ---------------------------------------------------
   const  Dates = searchDataArr?.date;

   const currentDate = new Date();

const updatedDates = [];

for (let i = 0; i < Dates.length; i++) {
  let parsedDate = new Date(Dates[i]);

  // If the first date is in the past, set it to 4 days from the current date
  if (i === 0) {
    if (parsedDate < currentDate) {
      parsedDate = new Date(currentDate);
      parsedDate.setDate(parsedDate.getDate() + 4);
    }
  } else {
    // For subsequent dates, ensure they are not before the previous date
    const previousDate = new Date(updatedDates[i - 1]);
    if (parsedDate <= previousDate || parsedDate < currentDate) {
      parsedDate = new Date(previousDate);
      parsedDate.setDate(parsedDate.getDate() + 1);
    }
  }

  // Add the updated date to the array in 'YYYY-MM-DD' format
  updatedDates.push(parsedDate.toISOString().split('T')[0]);
}

// Update the date property in searchDataArr with the updatedDates
searchDataArr.date = updatedDates;

// console.log('Updated searchDataArr:', searchDataArr);

  //  ---------------------------------------------------
    // console.log('Dates-v1',Dates);
    navigate('/searchflightresult', { state: { searchDataArr } });
  };
  useEffect(() => {
    const localStorageData = localStorage.getItem('searchData');

    console.log("localStorageData-v1",localStorageData);
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setLocalStorageData(parsedData.reverse());
    }
  }, []);

  return (
    <Fragment>
     <div className="recent_searches">
  <label> Recent Searches: </label>
</div>
      {localStorageData.length > 0 ? (
        <div className="d-flex justify-content-center flex-wrap">
          {localStorageData.map((search, index) => (
            <div key={index} className="d-flex justify-content-center flex-wrap">
              <li className="searches_inline_div" onClick={() => handleSearchClick(index)}>
                {/* Check if departure is an array and has more than one element */}
                {Array.isArray(search.departure) && search.departure.length > 1 ? (
                  <>
                    {/* Display only the first departure */}
                    {`${search.departure[0]}`}
                    {search.arrival[0] && (
                      <span className='text-white'>
                        <ArrowForwardIcon className="searches_forward_icon" />
                        {/* Display only the first arrival */}
                        {`${search.arrival[0]}`}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {/* If not an array or only one element, display normally */}
                    {`${search.departure}`}
                    {search.arrival && (
                      <span className='text-white'>
                        <ArrowForwardIcon className="searches_forward_icon" />
                        {`${search.arrival}`}
                      </span>
                    )}
                  </>
                )}
              </li>
            </div>
          ))}
        </div>
      ) : (
        <p className='marginStyl'>No search history available.</p>
      )}

    </Fragment>
  )
}

export default RecentSearches;