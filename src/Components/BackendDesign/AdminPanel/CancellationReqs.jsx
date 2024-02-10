import React, { useState, useEffect, Fragment } from 'react';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from 'react-router';
import Loader from '../../../Loader/Loader';
import { AdminCancellationReq } from '../../../API/BackendAPI/allAPICalls';
import { cityNameFunct } from '../../../helpers/formatdata';
import { dataNotfound } from '../../../Constant/images';
// import { useUserData } from '../../../Context/UserDataContext';

const CancellationReqs = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const { setFlightDetails, setuserDetail } = useUserData();
  const navigate = useNavigate();

  const ArrangeDateFormat = (JourneyDate) => {
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
  };

  const [search, setSearch] = useState('');

  const __handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  useEffect(() => {
    const CancellationBookingDetails = async () => {
      try {
        const response = await AdminCancellationReq();
        setUserData(response);
        console.log("CancellationRequestResults", response);
        setLoading(false);
      } catch (error) {
        console.error('ErrorCancellationRequests', error);
      }
    };
    CancellationBookingDetails();
  }, []);

  const userPayLoad = userData?.data?.payload;
  const FlightShortInfo = userPayLoad?.map((items) => items.flightDetails);

  const userCountryCode = userPayLoad?.map((items) => items.user.countryCode);
  const userPhoneNo = userPayLoad?.map((items) => items.user.phoneNumber);

  const filteredUserData = userPayLoad?.filter((items) =>
    items.id?.toLowerCase().includes(search.toLowerCase()) ||
    items.userId?.toLowerCase().includes(search.toLowerCase()) ||
    userCountryCode?.[userPayLoad.indexOf(items)]?.toLowerCase().includes(search.toLowerCase()) ||
    userPhoneNo?.[userPayLoad.indexOf(items)]?.toLowerCase().includes(search.toLowerCase()) ||
    ArrangeDateFormat(items.createdAt).toLowerCase().includes(search.toLowerCase())
  );


  // const UserFurtherDetail = (pnrDetail, flightDetails) => {
  //   setFlightDetails(flightDetails);
  //   setuserDetail(pnrDetail);
  //   navigate('/userDetails');
  // };

  const handleUserId = (userID)=>{
    localStorage.setItem('userIDforDetails',userID);
  }

  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='m-3'>
        <div className='dashboard-content-header'>
          <h2>Cancellation Requests</h2>
          <div className='dashboard-content-search'>
            <input
              type='text'
              value={search}
              placeholder='Search..'
              className='dashboard-content-input'
              onChange={e => __handleSearch(e)}
            />
          </div>
        </div>
        <div className='user_table_details'>
          {filteredUserData?.length ? (
            <table className='table table-bordered table_custom'>
              <thead className='thead_typo'>
                <tr>
                  <th>PNR ID</th>
                  <th>User ID</th>
                  <th>Flight Segment</th>
                  <th>Ph No</th>
                  <th>CreatedAt</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUserData.map((items, index) => (
                  <tr key={index}>
                    <td className="">{items.id}</td>
                    <td className="">{items.userId}</td>
                    <td>
                      {items?.flightDetails?.groupDescription?.map((itms, itmsIndex) => (
                        <Fragment key={itmsIndex}>
                          <div className='d-flex justify-content-center'>
                            <p className="table_flight_font">{cityNameFunct[itms.departureLocation]}</p>
                            <span className="airport_spacing">
                              {itmsIndex === 0 ? <RedoOutlinedIcon /> : <UndoIcon />}
                            </span>
                            <p className="table_flight_font">{cityNameFunct[itms.arrivalLocation]}</p>
                          </div>
                        </Fragment>
                      ))}
                    </td>
                    <td>{`${userCountryCode?.[index]} ${userPhoneNo?.[index]}`}</td>
                    <td className=" align-self-center"> {ArrangeDateFormat(items.createdAt)} </td>
                    <td>UnPaid</td>
                    <td>
                      {/* <button className='btn btn-primary buttons_typo'
                        onClick={() => UserFurtherDetail(items.pnrDetail, items.flightDetails)}
                      >
                        View
                      </button> */}
                      <button
                        className='btn btn-primary buttons_typo'
                        onClick={() => {
                          handleUserId(items.id);
                          window.open('/userDetails', '_blank');
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text-center py-5 bg-white'>
              <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
              <h2>No Cancellation Requests found</h2>
              <p>Explore Destinations, Book Your Flight </p>
            </div>
          )
          }
        </div>
      </div>
    )
  )
}

export default CancellationReqs;
