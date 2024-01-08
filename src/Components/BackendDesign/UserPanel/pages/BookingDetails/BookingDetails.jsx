import React, {useState, useEffect} from 'react';
import EditModel from '../common/EditModel';
import userDetails from '../../../../../Constant/BackendData/userDetails';
import userDetailsBackend from '../../../../../API/BackendAPI/BackendAPI_Fun';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';

// import '../styles.css';
const BookingDetail = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [getSearch , setSearch] = useState('');
  const [orders ,setOrders] = useState(userDetails);
  const [backLoading , setBackLoading] =useState(false);
  const [userData ,setUser] = useState(null);
  const [showUserDetails , setUserDetails]  = useState(false);


  const [openDetails, setOpenDetails] = useState(null);
 
  const handleButtonClick = (id) => {
    setOpenDetails(openDetails === id ? null : id);
  };


  // const openEditModel = ()=>{
  //   setIsOpen(true);
  // }
  const __handleSearch= (event)=>{
        const value = event.target.value;
          setSearch(value);
          if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.name?.toLowerCase().includes(getSearch.toLowerCase()) ||
                item.phone?.toLowerCase().includes(getSearch.toLowerCase()) ||
                item.airline?.toLowerCase().includes(getSearch.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
          setOrders(userDetails);
        }
 console.log("valuevalievalue",value);
  }

 useEffect(()=>{
  const fetchBackendData =async()=>{
    try{
      const userData = await userDetailsBackend(setBackLoading);
     console.log("ellog",userData?.data.payload);
        setUser(userData);
    }
    catch (error){
        console.error(error);
    }
} ;

fetchBackendData();
 },[]);


//  --------------------------------------

// ------------ALL PNR Detials Start------------
// const allPNRs= userData?.data.payload;
// console.log("allPNR",allPNRs);

// const allPNRuserDetails = allPNRs?.map((user)=>user.pnrDetail);

// const allPNRIDs = allPNRs?.map((items)=>items.pnrUserId);
// console.log("allPNRIDs",allPNRIDs);
// console.log("allPNRuserDetails",allPNRuserDetails);


// ------------fetching SingleUSer all PNR -------------
const loggedInUserId = '1';  //pnrUserID specfiy the login user

const data = userData?.data?.payload ?? [];

const groupedData = data?.reduce((acc, item) => {
  const key = item?.pnrUserId;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(item);
  return acc;
}, {});


const extractedData = groupedData[loggedInUserId];   //Contain the active loginUser all Details

console.log('extractedData',extractedData);
// ------------fetching SingleUSer all PNR  end-------------

const pnrID = extractedData?.map((user) => user.id);
const pnrDetails = extractedData?.map((user) => user.pnrDetail);
console.log('pnrID', pnrID);
console.log('pnrDetails', pnrDetails);



// const pnrBookingIds = pnrDetails?.flatMap(userArray => userArray.map(user => user.pnrBookingId));

// console.log(pnrBookingIds);

// const specificDetails = extractedData?.filter(item => item.id === "3");

// console.log('specificDetails', specificDetails);


// ------
// const ViewPassangerDetails =()=>{
// setUserDetails(!showUserDetails);
// }
// -----------------------------------------
  return (
    <div className='dashboard-content'>
            {/* <DashboardHeader
                btnText="New Order" /> */}

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Booking Detials</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={getSearch}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>
                {/* <h3>
                  {userData?.data?.message}
                </h3> */}
                <table>
                    <thead>
                        {/* <th>ID</th> */}
                        <th>PNR </th>
                        {/* <th>createdAt</th> */}
                        {/* <th>Phone</th> */}
                        {/* <th>STATUS</th> */}
                        {/* <th>Flight</th> */}
                    </thead>
                    <tbody>
                    {
                      extractedData && extractedData.map((items ,value)=>(
                        <tr key={value}>
                          <td>
                            {items.pnr}
                          </td>
                        </tr>
                      ))
                    }
                    </tbody>
                    {/* { orders.length !== 0 ?
                        <tbody>
                    {
                      userData?.data?.payload?.map((items ,index)=>(
                        <tr key={index} className='rows_typography'>
                          <td>{items.pnrUserId}</td>
                          <td>{items.pnr}</td>
                          <td>{items.createdAt}</td>
                          <td>12/13/20</td>
                          <td>active</td>
                          <td className='d-flex justify-content-start'> 
                              <button className='btn btn-success buttons_typo' >
                                View
                              </button>
                         </td>

                            <EditModel isOpen = {isOpen}  setIsOpen = {setIsOpen}/>
                        </tr> 
                      ))
                    }
                         
                        </tbody>
                    : null} */}
                </table>

            </div>

            {/* <div className="iti_review_main bg-white iti_flight_details m-2">
                                      <div className="d-flex justify-content-between w-100">
                                          <div className="d-flex justify-content-start align-self-center w-75">
                                              <h5 className="iti_city_font">Karachi</h5> <span className="airport_spacing"><RedoOutlinedIcon /></span> <h5 className="iti_city_font">ISB</h5>
                                              <p className=" d-flex align-self-center iti_date_spacing"> Sun, Feb 18, 2024</p>
                                          </div>
                                          <div className="w-25">
                                              <div className='iti_refund_detail'>
                                                  <p>NON REFUNDABLE</p>
                                              </div>
                                          </div>
                                      </div>
                                        <div className="row w-100">
                                            <div className='col-md-9 flight_complete_details w-75'>
                                                <div className='d-flex jusitfy-content-start'>
                                                    <div className='align-self-center text-center'>
                                                        <p className="iti_flight_no">PIA</p>
                                                        <p className="iti_flight_no">PIA-467</p>
                                                        <p className="iti_flight_no">Economy Class</p>
                                                    </div>
                                                    <div className="seprator">
                                                        <DonutLargeIcon className="donut_size" />
                                                        <div className='vertical-line'></div>
                                                        <DonutLargeIcon className="donut_size" />
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <span className="iti_flight_timing"> 10:12</span>
                                                             <span className="iti_city_code">LHE</span>
                                                            <span className="iti_airport_name">IlamaIqbal</span>
                                                        </div>
                                                        <div className="iti_content_spacing">
                                                            <QueryBuilderOutlinedIcon /> 07:12
                                                        </div>
                                                        <div>
                                                            <span className="iti_flight_timing"> 10:12</span>
                                                             <span className="iti_city_code">LHE</span>
                                                             <span className="iti_airport_name">IlamaIqbal</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-end align-self-end w-25'>
                                                    <p className='iti_airport_name'>Order ID#1234</p>
                                                    <button className='btn btn-primary buttons_typo' onClick ={ ViewPassangerDetails}>
                                                      View
                                                    </button>
                                            </div>
                                            
                                      </div>
            </div> */}
            <div className="User_card_detail">
                    {pnrID?.map((id) => {
                      const specificDetails = extractedData?.filter((item) => item.id === id);
                      return (
                        <div key={id} className='bg-white'>
                            <div className="iti_review_main bg-white iti_flight_details m-2">
                                                      <div className="d-flex justify-content-between w-100">
                                                          <div className="d-flex justify-content-start align-self-center w-75">
                                                              <h5 className="iti_city_font">Karachi</h5> <span className="airport_spacing"><RedoOutlinedIcon /></span> <h5 className="iti_city_font">ISB</h5>
                                                              <p className=" d-flex align-self-center iti_date_spacing"> Sun, Feb 18, 2024</p>
                                                          </div>
                                                          <div className="w-25">
                                                              <div className='iti_refund_detail'>
                                                                  <p>NON REFUNDABLE</p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                        <div className="row w-100">
                                                            <div className='col-md-9 flight_complete_details w-75'>
                                                                <div className='d-flex jusitfy-content-start'>
                                                                    <div className='align-self-center text-center'>
                                                                        {/* <img  alt="" width="32px" height="32px" /> */}
                                                                        <p className="iti_flight_no">PIA</p>
                                                                        <p className="iti_flight_no">PIA-467</p>
                                                                        <p className="iti_flight_no">Economy Class</p>
                                                                    </div>
                                                                    <div className="seprator">
                                                                        <DonutLargeIcon className="donut_size" />
                                                                        <div className='vertical-line'></div>
                                                                        <DonutLargeIcon className="donut_size" />
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <span className="iti_flight_timing"> 10:12</span>
                                                                            <span className="iti_city_code">LHE</span>
                                                                            <span className="iti_airport_name">IlamaIqbal</span>
                                                                        </div>
                                                                        <div className="iti_content_spacing">
                                                                            <QueryBuilderOutlinedIcon /> 07:12
                                                                        </div>
                                                                        <div>
                                                                            <span className="iti_flight_timing"> 10:12</span>
                                                                            <span className="iti_city_code">LHE</span>
                                                                            <span className="iti_airport_name">IlamaIqbal</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='text-end align-self-end w-25'>
                                                                    <p className='iti_airport_name'>{`OrderId # ${id}`}</p>
                                                                    <button className='btn btn-primary buttons_typo' onClick={() => handleButtonClick(id)}>
                                                                      View
                                                                    </button>
                                                            </div>
                                                            
                                                      </div>

                                                      
                                                      
                                                      {/* <div className='text-end'>
                                                                    <p>Order ID</p>
                                                                    <button className='btn btn-success buttons_typo' >
                                                                      View
                                                                    </button>
                                                                  </div> */}
                            </div>
                          {/* <button onClick={() => handleButtonClick(id)}>Show Details for ID {id}</button> */}

                          {openDetails === id && (
                            <div>
                              {specificDetails?.map((user, index) => (
                                <div key={index}>
                                  {user.pnrDetail.map((detail, detailIndex) => (
                                    <div key={detailIndex}>
                                      <p>{`ID: ${detail.id}`}</p>
                                      <p>{`FName: ${detail.firstName}`}</p>
                                      <p>{`LName: ${detail.lastName}`}</p>
                                      <p>{`CNIC: ${detail.cnic}`}</p>
                                      <p>{`DOB: ${detail.dateOfBirth}`}</p>
                                      <p>{`Gender: ${detail.gender}`}</p>
                                      <p>{`Passport: ${detail.passportNo}`}</p>
                                      <p>{`Phone: ${detail.phoneNumber}`}</p>
                                      <p>{`Email : ${detail.userEmail}`}</p>
                                      <p>{`PassportExp: ${detail.passportExpiryDate}`}</p>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
        </div>
  )
}

export default BookingDetail;