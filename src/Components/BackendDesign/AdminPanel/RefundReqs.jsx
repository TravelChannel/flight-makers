import React, { useEffect, useState, Fragment } from 'react';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from 'react-router';
import Loader from '../../../Loader/Loader';
import { AdminRefundReq } from '../../../API/BackendAPI/allAPICalls';
import { cityNameFunct } from '../../../helpers/formatdata';
import { dataNotfound } from '../../../Constant/images';
import { RefundApprovedReq } from '../../../API/BackendAPI/CustomerSupportDoneAPI/ApprovedRefund';
// import { useUserData } from '../../../Context/UserDataContext';

const RefundReqs = () => {
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

  const ReFundBookingDetails = async () => {
    try {
      const response = await AdminRefundReq();
      setUserData(response);
      console.log("ReFundRequestResults", response);
      setLoading(false);
    } catch (error) {
      console.error('ErrorReFundRequests', error);
    }
  };

  useEffect(() => {
    ReFundBookingDetails();
  }, []);

  // const userPayLoad = userData?.data?.payload;
  // const userCountryCode = userPayLoad?.map((items) => items.user.countryCode);
  // const userPhoneNo = userPayLoad?.map((items) => items.user.phoneNumber);

  const userPayLoad = Array.isArray(userData?.data?.payload) ? userData?.data?.payload : [];
  const userCountryCode = userPayLoad.map((items) => items.user.countryCode);
  const userPhoneNo = userPayLoad.map((items) => items.user.phoneNumber);

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
  const handleApprovedReqs = async(id) =>{
    try{
      const aprovedReq =await  RefundApprovedReq(id);
      console.log("Result from CancellationReq",aprovedReq);
      ReFundBookingDetails();
    }catch(error){
      console.error("Error while fetching Data",error);
    }
  }
  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='m-3'>
        <div className='dashboard-content-header'>
          <h2>Refunds Requests</h2>
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
                    <td className='d-flex justify-content-between'>
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
                      {
                        items.isCancelled ? (
                          <p>Request Approved</p>
                        ):(
                          <button className='btn btn-secondary buttons_typo' onClick={()=>handleApprovedReqs(items.id)}>
                            Approved
                          </button>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text-center py-5 bg-white'>
              <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
              <h2>No Refund Requests found</h2>
              <p>Explore Destinations, Book Your Flight </p>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default RefundReqs;
