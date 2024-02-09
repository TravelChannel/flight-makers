import React,{useState,useEffect,Fragment} from 'react';
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
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PromotionsDetail from '../AdminPanel/PromotionsDetail';
import UserLists from '../AdminPanel/UserLists';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReIssueReqs from '../AdminPanel/ReIssueReqs';
import CancellationReqs from '../AdminPanel/CancellationReqs';
import RefundReqs from '../AdminPanel/RefundReqs';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


const MyUserPanel = ()=>{
	 const [selectedMenuItem, setSelectedMenuItem] = useState(1);
	 const { showHeader, setShowHeader } = useFormData();
	 const [open, setOpen] = useState(false);
	 const [isLogOut , setLogout] = useState(false);
	 const {isLogin , setLogIn} = useFormData();
	 const [isSubMenu , setSubMenu] = useState(false);
	 const [selectedSubMenu , setSelectedSubMenu] = useState(1)
// ------------------

const [isLoading , setLoading]=useState(false);
 const [backLoading , setBackLoading] =useState(false);
 const [userData ,setUser] = useState(null);
 const {userName , setUserName} = useFormData();
 const [checkAdmin ,setCheckAdmin] = useState(false);
 const [partialAdmin ,setPartialAdmin] = useState(false);
// ------------------
	 const navigate = useNavigate();
	 const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
	setSubMenu(menuItem===5);
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

  const displaySubMenu = ()=>{
	setSubMenu(!isSubMenu);
  }
const handleSubMenuClick = (id)=>{
	setSelectedSubMenu(id);
}
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

useEffect(() => {
    const roleID = userData?.data?.payload?.[0]?.user?.roleId;
    if (roleID === 1) {
        setCheckAdmin(true); // Grant full admin access
    } else if (roleID === 3) {
        setPartialAdmin(true); // Grant partial admin access
    } else {
        setCheckAdmin(false); // No admin access
    }
}, [userData]);
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
                  			{checkAdmin || partialAdmin?(<p className='d-flex align-self-center menu_content_typo'>Admin Profile</p>):(<p className='d-flex align-self-center menu_content_typo'>User Profile</p>)}
                  		</div>

                  </div>
				  {
					checkAdmin === true ?
					(
				  <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 3 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(3)}>
                  		<PeopleOutlineIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Users List</p>
                  		</div>

                  </div>
				  ):('')
				  }
                   <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 4 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(4)}>
                  		<ReceiptIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Payment Details </p>
                  		</div>

                  </div>
                   <div className='left_menu_content'>
						<div className='left_menu_content'>
								{checkAdmin || partialAdmin ? (
									<div className={`d-flex justify-content-start menu_complete_content ${selectedMenuItem === 5 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(5)}>
									<WalletIcon className='menu_content_icon' />
									<p className='d-flex align-self-center menu_content_typo' onClick={displaySubMenu} >Customer Support</p>
									</div>
								) : (
									<div className={`d-flex justify-content-start menu_complete_content ${selectedMenuItem === 5 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(5)}>
									<WalletIcon className='menu_content_icon' />
									<p className='d-flex align-self-center menu_content_typo'>Customer Support</p>
									</div>
								)}

								{isSubMenu  && (checkAdmin || partialAdmin) && (
									<Fragment>
										<div className='admin_submenu'>
											<p
											className={`admin_reIssue mb-1 ${selectedSubMenu === 1 ? 'user_active_content' : ''}`}
											onClick={() => handleSubMenuClick(1)}
											>
											ReIssue
											{selectedSubMenu === 1 && <KeyboardDoubleArrowRightIcon />}
											</p>
											<p
											className={`admin_refund mb-1 ${selectedSubMenu === 2 ? 'user_active_content' : ''}`}
											onClick={() => handleSubMenuClick(2)}
											>
											Refund
											{selectedSubMenu === 2 && <KeyboardDoubleArrowRightIcon />}
											</p>
											<p
											className={`admin_cancle mb-1 ${selectedSubMenu === 3 ? 'user_active_content' : ''}`}
											onClick={() => handleSubMenuClick(3)}
											>
											Cancellation
											{selectedSubMenu === 3 && <KeyboardDoubleArrowRightIcon />}
											</p>
										</div>
									</Fragment>
								)}
						</div>

                  </div>
				  {
					checkAdmin === true || partialAdmin === true ?
					(
						<div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 6 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(6)}>
                  		<RecordVoiceOverIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Promotions </p>
                  		</div>

                      </div>
					):('')
				  }
				  <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 7 ? 'user_active_content' : ''}`}  onClick={handleClickOpen} >
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
				<UserProfile userData={userData} isLoading ={isLoading} checkAdmin = {checkAdmin} partialAdmin = {partialAdmin}/>
				}
				{selectedMenuItem === 3 && 
				<h3>
					<UserLists/>
				</h3>
				}
          		
          		{selectedMenuItem === 4 && 
				<h3>hello</h3>}
				{selectedMenuItem === 5 && (
						<Fragment>
							{checkAdmin || partialAdmin ? (
							<Fragment>
								{selectedSubMenu === 1 && <ReIssueReqs />}
								{selectedSubMenu === 2 && <RefundReqs />}
								{selectedSubMenu === 3 && <CancellationReqs />}
							</Fragment>
							) : (
							<UserCustomerSupport userData={userData} isLoading={isLoading} />
							)}
						</Fragment>
						)}
				{selectedMenuItem === 6 && 
				<PromotionsDetail />}
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