import React,{useState,useEffect,Fragment} from 'react'
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import { useNavigate } from 'react-router';
import Loader from '../../../../Loader/Loader';
import { useUserData } from '../../../../Context/UserDataContext';
import { cityNameFunct, formatCompleteDate,calculateDuration,elapsedTimeFunct,airportNameFunct } from '../../../../helpers/formatdata';
import UndoIcon from '@mui/icons-material/Undo';
const UserBookingsDetails = (props) => {

    const {userData,isLoading} = props;
    // const [isLoading , setLoading]=useState(false);
    // const [backLoading , setBackLoading] =useState(false);
    // const [userData ,setUser] = useState(null);

    // const {userDetail ,setuserDetail}= useUserData();
    // const {flightDetails , setFlightDetails} =useUserData();
    const { userDetail, flightDetails, setuserDetail, setFlightDetails } = useUserData();
    const navigate = useNavigate();

    const __handleSearch = ()=>{
        ''
    }
    const  ArrangeDateFormat = (JourneyDate) =>{
        const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
        return formattedDate;
    }
    const UserFurtherDetail = (pnrDetail,flightDetails)=>{
        setFlightDetails(flightDetails);
        setuserDetail(pnrDetail);
        navigate('/userDetails');
    }
    // ------------------
    // useEffect(()=>{
    //     const fetchBackendData =async()=>{
    //       try{
    //         setLoading(true);
    //         const userData = await userDetailsBackend(setBackLoading);
    //       console.log("ApiCalledData",userData);
    //           setUser(userData);
    //           setLoading(false);
    //       }
    //       catch (error){
    //           console.error(error);
    //       }
    //   } ;
      
    //   fetchBackendData();
    //    },[]);
    //    --------------------------
    const userPayLoad = userData?.data.payload;
    console.log('userPayLoad',userPayLoad);

    const FlightShortInfo = userPayLoad?.map((items)=>items.flightDetails);
    console.log("FlightShortInfo",FlightShortInfo);
  return (
        isLoading ? (
            <Loader/>
        ):(
            <div className='m-3'>
            <div className='dashboard-content-header'>
                  <h2>Booking Details</h2>
                  <div className='dashboard-content-search'>
                      <input
                      type='text'
                      value={''}
                      placeholder='Search..'
                      className='dashboard-content-input'
                      onChange={e => __handleSearch(e)}
                      />
                  </div>  
           </div>
           <div className='user_table_details'>
                  <table className='table table-bordered table_custom'>
                  <thead className='thead_typo'> 
                      <tr>
                          <th> PNR ID</th>
                          <th>User ID</th>
                          <th>Flight Segment</th>
                          <th>CreatedAt</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                        {userPayLoad?.map((items, index) => (
                            <tr key={index}>
                            <td className="">{items.id}</td>
                            <td className="">{items.userId}</td>
                            <td>
                                {items?.flightDetails?.groupDescription?.map((itms, itmsIndex) => (
                                <Fragment key={itmsIndex}>
                                    <div className='d-flex justify-content-center'>
                                    <p className="table_flight_font">{cityNameFunct[itms.departureLocation]}</p>
                                    <span className="airport_spacing">
                                            {/* <RedoOutlinedIcon /> */}
                                            {
                                                itmsIndex===0 ? <RedoOutlinedIcon /> :<UndoIcon/>
                                            }
                                    </span>
                                    <p className="table_flight_font">{cityNameFunct[itms.arrivalLocation]}</p>
                                    </div>
                                </Fragment>
                                ))}
                            </td>
                            <td className=" align-self-center"> {ArrangeDateFormat(items.createdAt)} </td>
                            <td>Paid</td>
                            <td>
                                <button className='btn btn-primary buttons_typo' onClick={() => UserFurtherDetail(items.pnrDetail, items.flightDetails)}>
                                View
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                  </table>
  
           </div>
      </div>
        )
  )
}

export default UserBookingsDetails;