import React, { Fragment,useEffect,useState } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route, Outlet  } from 'react-router-dom';
import SideBarMenu from '../../../Constant/BackendData/sidebarMenu';
import Orders from './pages/Orders';
import { useFormData } from '../../../Context/FormDataContext';
import BookingDetails from './pages/BookingDetails/BookingDetails'; 
const UserPanel = () => {

  // const [active, setActive] = useState(1);
  const { showHeader, setShowHeader } = useFormData();


  useEffect(()=>{
    setShowHeader(false);

    return()=>{
      setShowHeader(true);
    }
  },[setShowHeader]);

  console.log("afterContextShowHeader",showHeader)
  return (
    <Fragment>
 <div className='dashboard-container'>
        <Sidebar menu={SideBarMenu}/>
          
          <div className='dashboard-body'>
            <div>
            <DashboardHeader
                      btnText="New Order" />
            </div>
            <BookingDetails/>
              <Routes>
                  {/* <Route path="*" element={<div>404 Not Found</div>} />
                  <Route exact path="/" element={<div>hello world </div>} /> */}
                  <Route exact path="/userPanel/orders" element={<Orders/>} />
                  <Route exact path="/userPanel/bookingdetail" element={<BookingDetails/>} />
                  <Route exact path="/userPanel/profile" element={<div></div>} />
                  <Route exact path="/userPanel/userSupport" element={<div></div>} />

              </Routes>
          </div>
      </div>

       
    </Fragment>
  )
}

export default UserPanel;