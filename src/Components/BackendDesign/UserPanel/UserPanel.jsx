import React, { Fragment,useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route, Outlet  } from 'react-router-dom';
import SideBarMenu from '../../../Constant/BackendData/sidebarMenu';
import Orders from './pages/Orders';
import { useFormData } from '../../../Context/FormDataContext';
import BookingDetails from './pages/BookingDetails/BookingDetails'; 
const UserPanel = () => {
  const { showHeader, setShowHeader } = useFormData();

  useEffect(()=>{
    setShowHeader(false);

    return()=>{
      setShowHeader(true);
    }
  },[setShowHeader]);
  // setShowHeader(false);

  console.log("afterContextShowHeader",showHeader)
  return (
    <Fragment>
 <div className='dashboard-container'>
        <Sidebar menu={SideBarMenu} />
          
          <div className='dashboard-body'>
          <div>
          <DashboardHeader
                    btnText="New Order" />
          </div>
          <Orders/>
              {/* <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div>hello world </div>} />
                  <Route exact path="/orders" element={< Orders/>} />
                  <Route exact path="/bookingdetail" element={<BookingDetails/>} />
                  <Route exact path="/profile" element={<div></div>} />
              </Routes> */}
          </div>
      </div>

       
    </Fragment>
  )
}

export default UserPanel;