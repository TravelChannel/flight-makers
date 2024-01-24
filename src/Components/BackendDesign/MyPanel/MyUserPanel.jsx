import React,{useState,useEffect} from 'react';
import * as images from '../../../Constant/images';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WalletIcon from '@mui/icons-material/Wallet';
import UserDashBoard from './UserDashBoard';
import UserProfile from '../../BackendDesign/MyPanel/Pages/userProfile/UserProfile';
import LogoutIcon from '@mui/icons-material/Logout';
import BookingDetail from '../MyPanel/Pages/BookingDetails/BookingDetails';
import { useFormData } from '../../../Context/FormDataContext';
import { useNavigate } from 'react-router';
import { UserLogOut } from '../../../API/BackendAPI/UserBookingDetails';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserBookingsDetails from './Pages/UserBookingsDetails';
import UserCustomerSupport from './Pages/UserCustomerSupport';
import userDetailsBackend from '../../../API/BackendAPI/BackendAPI_Fun';



const MyUserPanel = ()=>{
	 const [selectedMenuItem, setSelectedMenuItem] = useState(1);
	 const { showHeader, setShowHeader } = useFormData();
	 const [open, setOpen] = useState(false);
	 const [isLogOut , setLogout] = useState(false);
	 const {isLogin , setLogIn} = useFormData();
// ------------------

const [isLoading , setLoading]=useState(false);
 const [backLoading , setBackLoading] =useState(false);
 const [userData ,setUser] = useState(null);
 const {userName , setUserName} = useFormData();
// ------------------
	 const navigate = useNavigate();
	 const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
 useEffect(()=>{
    setShowHeader(false);

    return()=>{
      setShowHeader(true);
    }
  },[setShowHeader]);
// --------------
const userLogout = async()=>{
    const logout  = await UserLogOut();
    setLogout(true);
    setLogIn(false);
}
if (isLogOut) {
    navigate('/');
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   ------------------------------------------

 // ------------------
 useEffect(()=>{
	const fetchBackendData =async()=>{
	  try{
		setLoading(true);
		const userData = await userDetailsBackend(setBackLoading);
	  //  console.log("ApiCalledData",userData?.data.payload);
	  console.log("ApiCalledData",userData);
		  setUser(userData);
		  setLoading(false);
	  }
	  catch (error){
		  console.error(error);
	  }
  } ;
  
  fetchBackendData();
   },[]);
//    --------------------------
const userUpdatedName = userData?.data?.payload?.[0]?.user?.firstName;
setUserName(userUpdatedName);

const checkAdmin = userData?.data?.payload?.[0]?.user?.isAdmin;
console.log("checkAdmin",checkAdmin);
// ------------------------------------------------


	return(
		<div className='container'>
			<div className='d-flex justify-content-start'> 
				<div className='left_menu_panel'>
				  <div className='sidebar-logo-container'>
								<Link 
								to={'/'}
								className="hdrLogo"
								>
								<img
										src={images.default}
										className="imgView"
										alt="logo"
										width = '200px' />
								</Link>
                  </div>

                  <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 1 ? 'user_active_content' : ''}`}onClick={() => handleMenuItemClick(1)}>
                  		<DashboardIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Booking Details</p>
                  		</div>

                  </div>
                   <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 2 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(2)}>
                  		<AirplaneTicketIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>User Profile</p>
                  		</div>

                  </div>
                   <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 3 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(3)}>
                  		<ReceiptIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Payment Details </p>
                  		</div>

                  </div>
                   <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 4 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(4)}>
                  		<WalletIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Customer Support</p>
                  		</div>

                  </div>
				  <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 5 ? 'user_active_content' : ''}`}  onClick={handleClickOpen} >
                  		<LogoutIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Logout</p>
                  		</div>

                  </div>

                  
                   {/* <div className='sidebar-footer '>
                      <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={images.default}
                            alt='icon-logout'
                            className='sidebar-item-icon'/>
                    </div> */}
				 </div>

				 <div className='right_menu_content'>  
				 		<div>
				 		<UserDashBoard/> 
				 		</div>
				{selectedMenuItem === 1 && (
					<UserBookingsDetails userData={userData} isLoading ={isLoading}/>
						)}
          		{selectedMenuItem === 2 && 
				<UserProfile userData={userData} isLoading ={isLoading}/>
				}
          		
          		{selectedMenuItem === 3 && 
				<h3>hello</h3>}
				{selectedMenuItem === 4 && 
				<UserCustomerSupport userData={userData} isLoading ={isLoading} checkAdmin = {checkAdmin} />}
				 </div>

				 <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                            {"Are You Sure You Want to Logout?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            If you logout, you will be redirected to our homepage. To make a booking, you will need to log in again.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={userLogout} autoFocus>
                                Agree
                            </Button>
                            </DialogActions>
                        </Dialog>

			</div>
		 </div>
		)
};

export default MyUserPanel;