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
    navigate('/searchflightresult', { state: { searchDataArr } });
  };
  useEffect(() => {
    const localStorageData = localStorage.getItem('searchData');
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
              {Array.isArray(search.departure) && Array.isArray(search.arrival) ? (
                <Fragment>
                  {search.departure.map((departure, idx) => (
                    <li key={idx} className="searches_inline_div" onClick={() => handleSearchClick(index)}>
                      {`${departure}`}
                      {search.arrival[idx] && (
                        <span className='text-white'>
                          <ArrowForwardIcon className="searches_forward_icon" />
                          {`${search.arrival[idx]}`}
                        </span>
                      )}
                    </li>
                  ))}
                </Fragment>
              ) : (
                <li className="searches_inline_div" onClick={() => handleSearchClick(index)}>
                  {search.departure}
                  {search.arrival && (
                    <span className='text-white'>
                      <ArrowForwardIcon className="searches_forward_icon" />
                      {search.arrival}
                    </span>
                  )}
                </li>
              )}
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