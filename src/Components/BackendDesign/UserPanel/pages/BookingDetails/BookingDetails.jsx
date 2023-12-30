import React, {useState, useEffect} from 'react';
import EditModel from '../common/EditModel';
import userDetails from '../../../../../Constant/BackendData/userDetails';
// import '../styles.css';
const BookingDetail = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [getSearch , setSearch] = useState('');
  const [orders ,setOrders] = useState(userDetails);

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

                <table>
                    <thead>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Contact No</th>
                        <th>Email</th>
                        <th>STATUS</th>
                        <th>Flight</th>


                        <th></th>
                    </thead>
                    { orders.length !== 0 ?
                        <tbody>
                      {
                        orders.map((items , index)=>(
                          <tr key={index}>
                          <td>{items.id}</td>
                          <td>{items.name}</td>
                          <td>{items.phone}</td>
                          <td>{items.email}</td>
                          <td>{items.status}</td>
                          <td>{items.airline}</td>
                          <td className='d-flex justify-content-start'> 
                              <button className='btn btn-success buttons_typo' >
                               Print
                              </button>
                              <button className='btn btn-primary buttons_typo' onClick={openEditModel}>
                                Edit
                              </button>
                              <button className='btn btn-danger buttons_typo' >
                                Delete
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