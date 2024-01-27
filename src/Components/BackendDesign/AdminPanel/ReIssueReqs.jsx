import React, {useState,useEffect,Fragment} from 'react';
import { AdminReIssueReq } from '../../../API/BackendAPI/UserBookingDetails';
import { cityNameFunct } from '../../../helpers/formatdata';
import Loader from '../../../Loader/Loader';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { dataNotfound } from '../../../Constant/images';
import { Navigate, useNavigate } from 'react-router';
import { useUserData } from '../../../Context/UserDataContext';

const ReIssueReqs = () => {
const [userData ,setUserData]=useState([]);
const [isLoading ,setLoading] = useState(true);
const {setFlightDetails ,setuserDetail} = useUserData();
const navigate=useNavigate();
const  ArrangeDateFormat = (JourneyDate) =>{
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
}
const __handleSearch = ()=>{
    console.log('abc');
}
    useEffect(()=>{
        const ReIssueBookingDetails = async()=>{
            try{
                const responce = await AdminReIssueReq();
                setUserData(responce);
                console.log("ReIssueRequestResults",responce);
                setLoading(false);

            }catch(error){
                console.error('ErrorReIssueRequests',error);
            }
        }
        ReIssueBookingDetails()
    },[]);

    const userPayLoad = userData?.data?.payload;
    const FlightShortInfo = userPayLoad?.map((items)=>items.flightDetails);

    const userCountryCode =  userPayLoad?.map((items)=>items.user.countryCode);
    const userPhoneNo = userPayLoad?.map((items)=>items.user.phoneNumber);

    const UserFurtherDetail = (pnrDetail,flightDetails)=>{
        setFlightDetails(flightDetails);
        setuserDetail(pnrDetail);
        navigate('/userDetails');
    }

  return (
    
    isLoading ? (
        <Loader/>
    ):(
        <div className='m-3'>
        <div className='dashboard-content-header'>
              <h2>ReIssue Requests</h2>
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
        {userPayLoad?.length ? (
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
                            {itmsIndex === 0 ? <RedoOutlinedIcon /> : <UndoIcon />}
                            </span>
                            <p className="table_flight_font">{cityNameFunct[itms.arrivalLocation]}</p>
                        </div>
                        </Fragment>
                    ))}
                    </td>
                    <td>{`${userCountryCode[index]} ${userPhoneNo[index]}`}</td>
                    <td className=" align-self-center"> {ArrangeDateFormat(items.createdAt)} </td>
                    <td>UnPaid</td>
                    <td>
                    <button className='btn btn-primary buttons_typo'
                     onClick={() => UserFurtherDetail(items.pnrDetail, items.flightDetails)}
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
                <h2>No ReIssue Requests found</h2>
                <p>Explore Destinations, Book Your Flight </p>
           </div>
        )
        
        }
        </div>
  </div>
    )
  )
}

export default ReIssueReqs;