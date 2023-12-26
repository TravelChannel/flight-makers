import React, { Fragment } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import SideBarMenu from '../../../Constant/BackendData/sidebarMenu';
import Orders from './pages/Orders';
const UserPanel = () => {
  return (
    <Fragment>
        <div className='container bg-white'>
        <div className=''>
                <DashboardHeader/>
        </div>
        <div className='dashboard-container'>
        <Sidebar menu={SideBarMenu} />
          
          <div className='dashboard-body'>

           <Orders/>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/orders" element={<Orders/>} />
                  {/* <Route exact path="/bookingdetail" element={<BookingDetail/>} /> */}
                  <Route exact path="/profile" element={<div></div>} />
              </Routes>
          </div>

         
      </div>
      {/* <Orders/> */}
        </div>

       
    </Fragment>
  )
}

export default UserPanel;