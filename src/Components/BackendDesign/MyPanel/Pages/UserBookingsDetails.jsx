import React, { useState, useEffect, Fragment } from 'react';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from 'react-router';
import Loader from '../../../../Loader/Loader';
// import { useUserData } from '../../../../Context/UserDataContext';
import { cityNameFunct, formatCompleteDate } from '../../../../helpers/formatdata';
import { dataNotfound } from '../../../../Constant/images';
import { Link } from 'react-router-dom';
import { FindByIdFilter } from '../../../../API/BackendAPI/FiltersAPI/FindByIdFilter';
import { FindByPnrFilter } from '../../../../API/BackendAPI/FiltersAPI/FindByPnrFilter';
import userDetailsBackend from '../../../../API/BackendAPI/BackendAPI_Fun';


const UserBookingsDetails = (props) => {
  const {checkAdmin } = props;
  const [search, setSearch] = useState('');
  const [searchPnr ,setSearchPnr] = useState('');
const [isMobile , setIsMobile] = useState(window.innerWidth < 645);
const [isSmallMobile , setSmallMobile] = useState(window.innerWidth < 485);
const [isLoading , setLoading]=useState(false);
const [userData ,setUser] = useState();
  // const { userDetail, flightDetails, setuserDetail, setFlightDetails } = useUserData();
  const navigate = useNavigate();

  const __handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (!value) {
      fetchBackendData();
    }
  };
  const __handleSearch2 = (event) => {
    const value = event.target.value;
    setSearchPnr(value);
    if (!value) {
      fetchBackendData();
    }
  };

  const ArrangeDateFormat = (JourneyDate) => {
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
  };

  const ArrangeTimeFormat = (JourneyDate) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(JourneyDate).toLocaleTimeString(undefined, options);
  };

  // const UserFurtherDetail = (pnrDetail, flightDetails) => {
  //   setFlightDetails(flightDetails);
  //   setuserDetail(pnrDetail);
  //   navigate('/userDetails');
  // };

  const handleUserId = (userID) =>{
    console.log("sentID",userID);
   localStorage.setItem('userIDforDetails',userID);
  }



  // const userData = userData?.filter((item) =>
  //   item.id?.toLowerCase().includes(search.toLowerCase()) ||
  //   item.userId?.toLowerCase().includes(search.toLowerCase()) ||
  //   item.status?.toLowerCase().includes(search.toLowerCase())||
  //   ArrangeDateFormat(item.createdAt)
  //   .toLowerCase()
  //   .includes(search.toLowerCase())
  // );

  // console.log('userData',filteredUserPayload);



  useEffect(()=>{
		const handleResize = ()=>{
			setIsMobile(window.innerWidth < 645);
      setSmallMobile(window.innerWidth < 485);
		};
		window.addEventListener('resize', handleResize);
		return()=>{
			window.removeEventListener('resize', handleResize);
		}
	},[]);

  // ----------------------------------------------

  const fetchBackendData =async()=>{
    try{
      setLoading(true);
      const userData = await userDetailsBackend();
    //  console.log("ApiCalledData",userData?.data.payload);
      console.log("ApiCalledData",userData);
      setUser(userData?.data.payload);
      setLoading(false);
    }
    catch (error){
      console.error(error);
    }
  } ;
   useEffect(()=>{
    fetchBackendData();
     },[]);


    //  const userPayLoad = userData?.data.payload;
    //  console.log("userPayLoad",userPayLoad);

  const handleSearchForId = async(search) =>{
    if (!search) {
      fetchBackendData();
      return;
    }
  try{
   const filterApiResponce = await FindByIdFilter(search);
   console.log('find-by-id-responce',filterApiResponce);
   setUser(filterApiResponce?.data.payload);
  }catch(error){
    console.error("Error while Getting Api Data");
  }
  }

  
  const handleSearchForPNR = async(searchPnr) =>{
    if (!searchPnr) {
      fetchBackendData();
      return;
    }
    try{
     const filterPNRResponce = await FindByPnrFilter(searchPnr);
     console.log('find-by-PNR-responce',filterPNRResponce);
     setUser(filterPNRResponce?.data.payload);
    }catch(error){
      console.error("Error while Getting Api Data");
    }
    }
  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='m-3'>
        <div className='dashboard-content-header'>
          <h2>Booking Details</h2>
          {
            isSmallMobile ? ('') :(  
            <div>
            <div className='dashboard-content-search mx-2'>
              <input
                type='text'
                value={search}
                placeholder='Search by ID'
                className='dashboard-content-input'
                onChange={(e) => __handleSearch(e)}
              />
              <button className='btn btn-danger btn_setting' onClick={()=>handleSearchForId(search)}>Search</button>
            </div>
            <div className='dashboard-content-search '>
              <input
                type='text'
                value={searchPnr}
                placeholder='Search by PNR'
                className='dashboard-content-input'
                onChange={(e) => __handleSearch2(e)}
              />
              <button className='btn btn-danger btn_setting' onClick={()=>handleSearchForPNR(searchPnr)}>Search</button>
            </div>
            </div>
            
            )
          }
        </div>
        <div className='user_table_details table-responsive '>
          {userData?.length ? (
            <table className='table table-bordered table_custom'>
              <thead className='thead_typo'>
                <tr>
                { isMobile ? '':<th>No</th>}
                  <th>PNRID</th>
                  {checkAdmin ? <th>PNR-No</th>:''}
                  {checkAdmin ?  <th>Name</th>:''}
                  {/* <th>User ID</th> */}
                  <th>Flight Segment</th>
                  <th>Amount</th>
                  {isMobile ? '':<th>CreatedAt</th>}
                  <th>PayMethode</th>
                  {
                    isSmallMobile ? '' :<th>Status</th>
                  }
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='thead_typo'>
                {userData.map((items, index) => (
                  <tr key={index}>
                   {isMobile ? '':<td>{`${index+1}`}</td>}
                    <td className="">{items.id}</td>
                    {checkAdmin ? <td className="">{items.pnr}</td>:''}
                    {checkAdmin ? <td className="">{`${items.pnrDetail[0].firstName} ${items.pnrDetail[0].lastName} `}</td>:''}
                    {/* <td className="">{items.userId}</td> */}
                    <td>
                      {items?.flightDetails?.groupDescription?.map((itms, itmsIndex) => (
                        <Fragment key={itmsIndex}>
                          <div className='d-flex justify-content-center'>
                            <p className="table_flight_font admin_side_font">{cityNameFunct[itms.departureLocation]}</p>
                            <span className="airport_spacing admin_side_font">
                              {itmsIndex === 0 ? <RedoOutlinedIcon /> : <UndoIcon />}
                            </span>
                            <p className="table_flight_font">{cityNameFunct[itms.arrivalLocation]}</p>
                          </div>
                        </Fragment>
                      ))}
                    </td>
                    <td>{`${items.totalTicketPrice.toLocaleString()} PKR`}</td>
                    {isMobile ? '' :  <td className=" align-self-center"> {ArrangeDateFormat(items.createdAt)} <br/>  {ArrangeTimeFormat(items.createdAt)} </td>}
                    <td>
                      {items.sendSmsBranch ? 'PayAtBranch' : (items.sendSmsCod ? 'COD' : 'Online')}
                    </td>
                    {isSmallMobile ? '' :<td>{items.isPaid ? 'Paid' : 'UnPaid'}</td>}
                    <td>
                    {/* <button className='btn btn-primary buttons_typo' onClick={() => UserFurtherDetail(items.pnrDetail, items.flightDetails)}> */}

                    <button
                        className='btn btn-primary buttons_typo'
                        onClick={() => {
                          handleUserId(items.id);
                          window.open('/userDetails', '_blank');
                        }}
                      >
                        View
                      </button>
                    {/* </button> */}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text-center py-5 bg-white'>
              <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
              <h2>No flight bookings found</h2>
              <p>Explore Destinations, Book Your Flight </p>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default UserBookingsDetails;