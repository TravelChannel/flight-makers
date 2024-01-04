import React, {useState, useEffect} from 'react';
import EditModel from '../common/EditModel';
import userDetails from '../../../../../Constant/BackendData/userDetails';
import userDetailsBackend from '../../../../../API/BackendAPI/BackendAPI_Fun';

// import '../styles.css';
const BookingDetail = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [getSearch , setSearch] = useState('');
  const [orders ,setOrders] = useState(userDetails);
  const [backLoading , setBackLoading] =useState(false);
  const [userData ,setUser] = useState(null);
  const openEditModel = ()=>{
    setIsOpen(true);
  }
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
     console.log("ellog",userData);
        setUser(userData);
    }
    catch (error){
        console.error(error);
    }
} ;

fetchBackendData();
 },[]);
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
                        <th>ID</th>
                        <th>PNR </th>
                        <th>createdAt</th>
                        <th>Phone</th>
                        <th>STATUS</th>
                        {/* <th>Flight</th> */}


                        <th></th>
                    </thead>
                    { orders.length !== 0 ?
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
                    : null}
                </table>

            </div>
        </div>
  )
}

export default BookingDetail;