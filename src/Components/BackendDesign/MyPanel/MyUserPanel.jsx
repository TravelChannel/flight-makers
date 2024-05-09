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
import { UserLogOut } from '../../../API/BackendAPI/allAPICalls';
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
import VerifiedBookings from '../panelsCommon/VerifiedBookings';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AddBlog from '../AdminPanel/Blogs/AddBlog';
import BlogLists from '../AdminPanel/Blogs/BlogLists';
import AddCommission from '../AdminPanel/AddCommission';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RateUs from './Pages/RateUs';
import RatingList from '../AdminPanel/RatingList';
import MenuIcon from "@mui/icons-material/Menu";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";
import AdminControl from '../AdminPanel/AdminControl';
import Cookies from 'js-cookie';

const MyUserPanel = ()=>{
	 const [selectedMenuItem, setSelectedMenuItem] = useState(1);
	 const { showHeader, setShowHeader ,roleID,setVarName} = useFormData();
	 const [open, setOpen] = useState(false);
	 const [isLogOut , setLogout] = useState(false);
	 const {isLogin , setLogIn} = useFormData();
	 const [isSubMenu , setSubMenu] = useState(false);
	 const [isBlogMenu ,setBlogMenu] = useState(false);
	 const [selectedSubMenu , setSelectedSubMenu] = useState(1);
	 const [isMobile , setIsMobile] = useState(window.innerWidth < 800);
// ------------------

const [isLoading , setLoading]=useState(false);
 const [backLoading , setBackLoading] =useState(false);
 const [userData ,setUser] = useState();
 const {userName , setUserName} = useFormData();
 const [checkAdmin ,setCheckAdmin] = useState(false);
 const [partialAdmin ,setPartialAdmin] = useState(false);
 const [menu, setMenu] = useState(false);
// ------------------
	 const navigate = useNavigate();
	 const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
	setSubMenu(menuItem===5);
	setBlogMenu(menuItem===7);
	if (isMobile) {
        setMenu(false);
    }
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
	if(logout.data.status==='SUCCESS'){
		setLogout(true);
		setLogIn(false);
		setVarName('');
        Cookies.remove('Access_token');
		// localStorage.removeItem("Access_token");
       }
    // setLogout(true);
    // setLogIn(false);
	// setVarName('');
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
  const displayBlogMenu = ()=>{
	setBlogMenu(!isBlogMenu);
  }
const handleSubMenuClick = (id)=>{
	setSelectedSubMenu(id);
}
//   ------------------------------------------

 // -----------------
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
 useEffect(()=>{
  fetchBackendData();
   },[]);
//    --------------------------
// const userUpdatedName = userData?.data?.payload?.[0]?.user?.firstName;
// setUserName(userUpdatedName);

useEffect(() => {
    // const roleID = userData?.data?.payload?.userData?.roleId;
	console.log("roleIDatPanel",roleID);
    if (roleID === 1) {
        setCheckAdmin(true); // Grant full admin access
    } else if (roleID === 3) {
        setPartialAdmin(true); // Grant partial admin access
    } else {
        setCheckAdmin(false); // No admin access
    }
}, [userData]);
// ------------------------------------------------
	// Mobile Responsive
	useEffect(()=>{
		const handleResize = ()=>{
			setIsMobile(window.innerWidth < 800);
		};
		window.addEventListener('resize', handleResize);
		return()=>{
			window.removeEventListener('resize', handleResize);
		}
	},[]);

	const displayMenu = () => {
		setMenu(!menu);
	  };
	  const closeMenu = () => {
		setMenu(false);
	  };
// ------------------------------------------------




	return(
		<div className='container'>
			<div className={isMobile ? '' : 'd-flex justify-content-start'}>
			 {
				isMobile ?( 
					<Fragment>
					<div className='bg-white'>
						<div className='d-flex justify-content-between'>
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
							<div className="CustMenuIcon inlineDiv pr-3">
							<MenuIcon
							className="mob_menu_color"
							onClick={displayMenu}
							/>
							</div>
						</div>
					</div>

					<CSSTransition in={menu} timeout={1000} classNames="fade" unmountOnExit>
						<div className="disply_mob_menu">
							<div className="d-flex justify-content-between">
								<Link to={'/'} className="hdrLogomob ">
									<img src={images.default} className="imgView" alt="FM-LOGO" width="120px"/>
									<span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span>
								</Link>
								<div className="menu_cross_icon">
										<CloseIcon onClick={closeMenu} />
								</div>
							</div>
							<ul >
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
												<p className='d-flex align-self-center menu_content_typo'>
												{/* Payment Details  */}
												Purchase Bookings
												</p>
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
														<p className='d-flex align-self-center menu_content_typo'>ReIssue/Refund/ <br/>Cancellation</p>
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

									{/* ---------------- */}

									<div className='left_menu_content'>
											<div className='left_menu_content'>
													{checkAdmin || partialAdmin ? (
														<div className={`d-flex justify-content-start menu_complete_content ${selectedMenuItem === 7 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(7)}>
														<BookOutlinedIcon className='menu_content_icon' />
														<p className='d-flex align-self-center menu_content_typo' onClick={displayBlogMenu} >Blogs</p>
														</div>
													) : ('')}

													{isBlogMenu  && (checkAdmin || partialAdmin) && (
														<Fragment>
															<div className='admin_submenu'>
																<p
																className={`admin_reIssue mb-1 ${selectedSubMenu === 1 ? 'user_active_content' : ''}`}
																onClick={() => handleSubMenuClick(1)}
																>
																Add Blog
																{selectedSubMenu === 1 && <KeyboardDoubleArrowRightIcon />}
																</p>
																<p
																className={`admin_refund mb-1 ${selectedSubMenu === 2 ? 'user_active_content' : ''}`}
																onClick={() => handleSubMenuClick(2)}
																>
																Blog Lists
																{selectedSubMenu === 2 && <KeyboardDoubleArrowRightIcon />}
																</p>
															</div>
														</Fragment>
													)}
											</div>

									</div>
									{/* ------------------------ */}
									{checkAdmin || partialAdmin ?
									(
										<div className='left_menu_content'>
											<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 8 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(8)}>
											<ReceiptIcon className='menu_content_icon' />
												<p className='d-flex align-self-center menu_content_typo'>
												{/* Payment Details  */}
												Service Charges
												</p>
											</div>

									</div>
									):('')
											}
											{!checkAdmin && !partialAdmin ?
									(
										<div className='left_menu_content'>
											<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 9 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(9)}>
											<StarHalfIcon className='menu_content_icon' />
												<p className='d-flex align-self-center menu_content_typo'>
												{/* Payment Details  */}
												Rate Us
												</p>
											</div>

									</div>
									):(
										<div className='left_menu_content'>
										<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 9 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(9)}>
											<StarHalfIcon className='menu_content_icon' />
												<p className='d-flex align-self-center menu_content_typo'>
												{/* Payment Details  */}
												Customers Rating
												</p>
											</div>
											</div>
											)
											}

											{
										checkAdmin === true || partialAdmin === true ?
										(
											<div className='left_menu_content'>
											<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 10 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(10)}>
											<RecordVoiceOverIcon className='menu_content_icon' />
												<p className='d-flex align-self-center menu_content_typo'>Admin Controls </p>
											</div>

										</div>
										):('')
									}
									<div className='left_menu_content'>
											<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 11 ? 'user_active_content' : ''}`}  onClick={handleClickOpen} >
											<LogoutIcon className='menu_content_icon' />
												<p className='d-flex align-self-center menu_content_typo'>Logout</p>
											</div>

									</div>
							</ul>
						</div>
					</CSSTransition>
					</Fragment>
				  ):(
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
                  			<p className='d-flex align-self-center menu_content_typo'>
							{/* Payment Details  */}
							Purchase Bookings
							</p>
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
									<p className='d-flex align-self-center menu_content_typo'>ReIssue/Refund/ <br/>Cancellation</p>
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

				  {/* ---------------- */}

				  <div className='left_menu_content'>
						<div className='left_menu_content'>
								{checkAdmin || partialAdmin ? (
									<div className={`d-flex justify-content-start menu_complete_content ${selectedMenuItem === 7 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(7)}>
									<BookOutlinedIcon className='menu_content_icon' />
									<p className='d-flex align-self-center menu_content_typo' onClick={displayBlogMenu} >Blogs</p>
									</div>
								) : ('')}

								{isBlogMenu  && (checkAdmin || partialAdmin) && (
									<Fragment>
										<div className='admin_submenu'>
											<p
											className={`admin_reIssue mb-1 ${selectedSubMenu === 1 ? 'user_active_content' : ''}`}
											onClick={() => handleSubMenuClick(1)}
											>
											Add Blog
											{selectedSubMenu === 1 && <KeyboardDoubleArrowRightIcon />}
											</p>
											<p
											className={`admin_refund mb-1 ${selectedSubMenu === 2 ? 'user_active_content' : ''}`}
											onClick={() => handleSubMenuClick(2)}
											>
											Blog Lists
											{selectedSubMenu === 2 && <KeyboardDoubleArrowRightIcon />}
											</p>
										</div>
									</Fragment>
								)}
						</div>
                  </div>
				  {/* ------------------------ */}
				  {checkAdmin || partialAdmin ?
				  (
					<div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 8 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(8)}>
                  		<ReceiptIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>
							{/* Payment Details  */}
							Service Charges
							</p>
                  		</div>

                  </div>
				  ):('')
				  		}
						  {!checkAdmin && !partialAdmin ?
				  (
					<div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 9 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(9)}>
                  		<StarHalfIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>
							{/* Payment Details  */}
							Rate Us
							</p>
                  		</div>

                  </div>
				  ):(
					<div className='left_menu_content'>
					<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 9 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(9)}>
                  		<StarHalfIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>
							{/* Payment Details  */}
							Customers Rating
							</p>
                  		</div>
                  		</div>
						 )
				  		}
						{
										checkAdmin === true || partialAdmin === true ?
										(
											<div className='left_menu_content'>
											<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 10 ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(10)}>
											<RecordVoiceOverIcon className='menu_content_icon' />
												<p className='d-flex align-self-center menu_content_typo'>Admin Controls </p>
											</div>

										</div>
										):('')
									}
				  <div className='left_menu_content'>
                  		<div className={`d-flex justify-content-start menu_complete_content ${ selectedMenuItem === 11 ? 'user_active_content' : ''}`}  onClick={handleClickOpen} >
                  		<LogoutIcon className='menu_content_icon' />
                  			<p className='d-flex align-self-center menu_content_typo'>Logout</p>
                  		</div>

                  </div>
				 </div>
				)
			 }

				 <div className='right_menu_content'>  
				 		<div>
				 		<UserDashBoard/> 
				 		</div>
				{selectedMenuItem === 1 && (
					<UserBookingsDetails userData={userData} isLoading ={isLoading} checkAdmin = {checkAdmin}/>
						)}
          		{selectedMenuItem === 2 && 
				<UserProfile  isLoading ={isLoading} checkAdmin = {checkAdmin} partialAdmin = {partialAdmin}/>
				}
				{selectedMenuItem === 3 && 
				<h3>
					<UserLists/>
				</h3>
				}
          		
          		{selectedMenuItem === 4 && 
				<VerifiedBookings checkAdmin = {checkAdmin}/>}
				{selectedMenuItem === 5 && (
						<Fragment>
							{checkAdmin || partialAdmin ? (
							<Fragment>
								{selectedSubMenu === 1 && <ReIssueReqs />}
								{selectedSubMenu === 2 && <RefundReqs />}
								{selectedSubMenu === 3 && <CancellationReqs />}
							</Fragment>
							) : (
							<UserCustomerSupport userData={userData} isLoading={isLoading} fetchBackendData ={fetchBackendData} />
							)}
						</Fragment>
						)}
				{selectedMenuItem === 6 && 
				<PromotionsDetail />}

				{selectedMenuItem === 7 && (
						<Fragment>
							{checkAdmin || partialAdmin ? (
							<Fragment>
								{selectedSubMenu === 1 && <AddBlog />}
								{selectedSubMenu === 2 && <BlogLists />}
							</Fragment>
							) : ('')}
						</Fragment>
						)}

						{selectedMenuItem === 8 && 
				<AddCommission />}

				{selectedMenuItem === 9 && ( !checkAdmin && !partialAdmin ? <RateUs /> :<RatingList/>)
				}

				{selectedMenuItem === 10 && 
				<AdminControl />}
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