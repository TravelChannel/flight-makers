import React, { useState, useEffect, Fragment} from 'react';
import { SearchLog } from '../../../API/BackendAPI/SearchesLogCreationAPI/SearchLogApi';
import Loader from '../../../Loader/Loader';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Stack, Pagination } from '@mui/material';
import { PaginatedLogSearches } from '../../../API/BackendAPI/SearchesLogCreationAPI/PaginatedLogSearch';
const LogSearches = () => {
  const [isLoading, setLoading] = useState(false);
  const [LogsResp, setLogsResp] = useState([]);
  const [page, setPage] = useState(1); 
const [pageCount ,setPageCount] = useState();
const [isStartDate, setStartDate] = useState('');
const [isEndDate ,setEndDate] = useState('');

  // useEffect(() => {
  //   const fetchSearchLog = async () => {
  //     try {
  //       setLoading(true);
  //       const apiResp = await SearchLog();
  //       console.log('SearchLog-Resp', apiResp);
  //       const apiRespData = apiResp.data.payload;
  //       console.log('apiRespData', apiRespData);
  //       setLogsResp(apiRespData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching search log:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchSearchLog();
  // }, []);

  const quotient = Math.floor(pageCount / 20);
  const remainder = pageCount % 20;

  const totalPageCount = quotient + (remainder > 0 ? 1 : 0);

  console.log("totalPageCount",totalPageCount)

  const fetchSearchLog = async (isStartDate,isEndDate) => {
    console.log('startDate',isStartDate);
    console.log('isEndDate',isEndDate);
    try {
      setLoading(true);
      const pageSize = 20;
      const obj = {
        page:page,
        pageSize:pageSize,
        startDate:isStartDate || null,
        endDate:isEndDate || null
      }

      // console.log("obj-to-pass",obj);
      const apiResp = await PaginatedLogSearches(obj);
      // console.log('SearchLog-Resp', apiResp);
      const apiRespData = apiResp.data.payload.data;
      console.log('apiRespData', apiRespData);
      setLogsResp(apiRespData);
      setPageCount(apiResp.data.payload.count);
      console.log("PageCount",apiResp.data.payload.count);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search log:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchLog();
  }, [page]);

  const ArrangeDateFormat = (JourneyDate) => {
    if (!JourneyDate) return '-';
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
  };
  const ArrangeTimeFormat = (JourneyDate) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(JourneyDate).toLocaleTimeString(undefined, options);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // -------------------------
  const __handleSearch = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };
  const __handleSearch2 = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='m-3'>
        <div className='dashboard-content-header'>
          <h2>Search Logs</h2>
          <div>
              <div className='dashboard-content-search mx-2'>
                <input
                  type='text'
                  value={isStartDate}
                  placeholder='Enter Start Date'
                  className='dashboard-content-input'
                  onChange={(e) => __handleSearch(e)}
                />
              </div>
                <div className='dashboard-content-search '>
                  <input
                    type='text'
                    value={isEndDate}
                    placeholder='Enter End Date'
                    className='dashboard-content-input'
                    onChange={(e) => __handleSearch2(e)}
                  />
                </div>
                <button className='btn btn-danger btn_setting ml-1' onClick={()=>fetchSearchLog(isStartDate,isEndDate)}>Search</button> 
            </div>
        </div>
        
        <p className='text-end mt-1 date_format_styling'>Enter date as YYYY-MM-DD (e.g., 2024-05-15) </p>
        <div className='promotion_table mt-3 text-center table-responsive'>
          <table className='table table-bordered'>
            <thead>
              <tr className='head_details'>
                <th className='promotion_design'>ID</th>
                <th className='promotion_design'>Sectors</th>
                <th className='promotion_design'>TripType</th>
                <th className='promotion_design'>TravelDates</th>
                <th className='promotion_design'>CreatedAt</th>
              </tr>
            </thead>
            <tbody>
                  {LogsResp.map((item, index) => {
                    const cityRoutes = item.flightSearchesDetail.map((detail, idx) => (
                      <Fragment key={idx}>
                        {detail.cityFrom} <TrendingFlatIcon /> {detail.cityTo}
                        {idx < item.flightSearchesDetail.length - 1 ? <br /> : ''}
                      </Fragment>
                    ));

                    const travelDates = item.flightSearchesDetail.map((detail, idx) => (
                      <Fragment key={idx}>
                        {ArrangeDateFormat(detail.departureDate)}
                        {idx < item.flightSearchesDetail.length - 1 ? <br /> : ''}
                      </Fragment>
                    ));

                    return (
                      <tr className="data_details" key={index}>
                        <td>{item.id}</td>
                        <td>{cityRoutes.length > 0 ? cityRoutes : '-'}</td>
                        <td>{item.tripType || '-'}</td>
                        <td>{travelDates || '-'}</td>
                        <td className="align-self-center">
                          {ArrangeDateFormat(item.createdAt)} <br /> {ArrangeTimeFormat(item.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
          </table>
        </div>
        <div className='d-flex justify-content-center py-3'>
                      <Stack spacing={2}>
                        <Pagination
                        count={totalPageCount} 
                        page={page} 
                        onChange={handleChange}
                          color="primary"
                          size="medium" 
                          //  shape="rounded"
                          //  showFirstButton 
                          //  showLastButton
                          />
                      </Stack>
         </div>
      </div>
    )
  );
};

export default LogSearches;
