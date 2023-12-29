import React, {useState, useEffect} from 'react';
import EditModel from '../common/EditModel';

// import '../styles.css';
const BookingDetail = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const openEditModel = ()=>{
    setIsOpen(true);
  }
  return (
    <div className='dashboard-content'>
            {/* <DashboardHeader
                btnText="New Order" /> */}

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Booking Detials</h2>
                    {/* <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div> */}
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

                        <tbody>
                        <tr>
                          <td>1</td>
                          <td>Kashif Hussian</td>
                          <td>+923408922375</td>
                          <td>abc@gmail.com</td>
                          <td>Active</td>
                          <td>PIA</td>
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
                        </tbody>
                </table>

            </div>
        </div>
  )
}

export default BookingDetail;