import React,{useState ,useEffect,Fragment} from 'react';
import { allPaidBookings } from '../../../API/BackendAPI/allAPICalls';
import Loader from '../../../Loader/Loader';
import { cityNameFunct } from '../../../helpers/formatdata';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { dataNotfound } from '../../../Constant/images';
const VerifiedBookings = (props) => {
    const {checkAdmin} = props;
 const [isLoading ,setLoading] = useState(true);
 const [search, setSearch] = useState('');
 const [userData ,setuserData] = useState([]);

 const __handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  const ArrangeDateFormat = (JourneyDate) => {
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
  };
  const handleUserId = (userID) =>{
    console.log("sentID",userID);
   localStorage.setItem('userIDforDetails',userID);
  }

    useEffect(()=>{
        const fetchAllPaidBookings =async () =>{
            try{
                const fetchResponce = await allPaidBookings();
                setuserData(fetchResponce);
                setLoading(false);
                console.log('fetchResponce-fetchResponce',fetchResponce);

            }catch(error){
                console.error("error while fetching Boookings",error);
            }

        }
        fetchAllPaidBookings(); 
    },[])

    const userPayLoad = userData?.data?.payload;

  const filteredUserPayload = userPayLoad?.filter((item) =>
    item.id?.toLowerCase().includes(search.toLowerCase()) ||
    item.userId?.toLowerCase().includes(search.toLowerCase()) ||
    item.status?.toLowerCase().includes(search.toLowerCase())||
    ArrangeDateFormat(item.createdAt)
    .toLowerCase()
    .includes(search.toLowerCase())
  );
  
  return (
    isLoading ? (<Loader/>):(
    <div className='m-3'>
        <div className='dashboard-content-header'>
          <h2>Purchase Bookings </h2>
          <div className='dashboard-content-search'>
            <input
              type='text'
              value={search}
              placeholder='Search..'
              className='dashboard-content-input'
              onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>
        <div className='user_table_details'> 
        {filteredUserPayload?.length ? (
          <div className="table-responsive">
            <table className='table table-bordered table_custom'>
                  <thead className='thead_typo'>
                    <tr>
                      <th>Serial No</th>
                      <th>PNR ID</th>
                      {
                        checkAdmin ? <th>PNR No</th>:''
                      }
                      {
                        checkAdmin ? <th>User ID</th>:''
                      }
                      {/* <th>User ID</th> */}
                      <th>Flight Segment</th>
                      <th>CreatedAt</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUserPayload.map((items, index) => (
                      <tr key={index}>
                        <td>{`${index+1}`}</td>
                        <td className="">{items.id}</td>
                        {
                        checkAdmin ? <td className="">{items.pnr}</td>:''
                        }
                        {
                        checkAdmin ? <td className="">{items.userId}</td>:''
                        }
                        {/* <td className="">{items.userId}</td> */}
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
                        <td className=" align-self-center"> {ArrangeDateFormat(items.createdAt)} </td>
                        <td>{items.isPaid ? 'Paid':'Unpaid'}</td>
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
          </div>
        ):(
            <div className='text-center py-5 bg-white'>
              <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
              <h2>No Purchased bookings found</h2>
              <p>Explore Destinations, Book Your Flight </p>
            </div>
        )}
        </div>
    </div>
    )
    
  )
}

export default VerifiedBookings;