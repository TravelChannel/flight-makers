import React,{useState,useEffect,Fragment} from 'react';
import * as images from '../../../Constant/images';
import UserDashBoard from './UserDashBoard';
import UserProfile from '../../BackendDesign/MyPanel/Pages/userProfile/UserProfile';
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
import PromotionsDetail from '../AdminPanel/PromotionsDetail';
import UserLists from '../AdminPanel/UserLists';
import ReIssueReqs from '../AdminPanel/ReIssueReqs';
import CancellationReqs from '../AdminPanel/CancellationReqs';
import RefundReqs from '../AdminPanel/RefundReqs';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import VerifiedBookings from '../panelsCommon/VerifiedBookings';
import AddBlog from '../AdminPanel/Blogs/AddBlog';
import BlogLists from '../AdminPanel/Blogs/BlogLists';
import AddCommission from '../AdminPanel/AddCommission';
import RateUs from './Pages/RateUs';
import RatingList from '../AdminPanel/RatingList';
import MenuIcon from "@mui/icons-material/Menu";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";
import { UserPanelData } from '../panelsCommon/UserPanelData';


const MyUserPanel = ()=>{
	 const [selectedMenuItem, setSelectedMenuItem] = useState(1);
	 const { showHeader, setShowHeader ,roleID,setVarName} = useFormData();
	 const [open, setOpen] = useState(false);
	 const [isLogOut , setLogout] = useState(false);
	 const {isLogin , setLogIn} = useFormData();
	 const [isSubMenu , setSubMenu] = useState(false);
	 const [isBlogMenu ,setBlogMenu] = useState(false);
	 const [selectedSubMenu , setSelectedSubMenu] = useState(0);
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
    setLogout(true);
    setLogIn(false);
	setVarName('');
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
					<div className='left_menu_content '>
					{UserPanelData.map((item, index) => (
						<div  className='left_menu_content' key={index}>
							<div className={`d-flex justify-content-start  ${selectedMenuItem === index ? 'user_active_content' : ''}`} onClick={() => handleMenuItemClick(index)}>
								{item.icon}
								<p className='d-flex align-self-center menu_content_typo'>{item.title}</p>
							</div>
							{/* Conditionally render submenu based on index */}
							{selectedMenuItem === index && item.subMenu && (
								<ul className="subMenu">
									{item.subMenu.map((subItem, subIndex) => (
										<li key={subIndex} className={`subMenuItem`} onClick={() => handleSubMenuClick(subIndex)}>
											<p className={`admin_reIssue mb-1 ${selectedSubMenu === subIndex ? 'user_active_content' : ''}`}>
												{subItem}
												{selectedSubMenu === subIndex && <KeyboardDoubleArrowRightIcon />}
											</p>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
					</div>
				 </div>

				 <div className='right_menu_content'>  
				 		<div>
				 		<UserDashBoard/> 
				 		</div>
				{selectedMenuItem === 0 && (
					<UserBookingsDetails userData={userData} isLoading ={isLoading} checkAdmin = {checkAdmin}/>
						)}
          		{selectedMenuItem === 1 && 
				<UserProfile  isLoading ={isLoading} checkAdmin = {checkAdmin} partialAdmin = {partialAdmin}/>
				}
				{selectedMenuItem === 2 && 
				<h3>
					<UserLists/>
				</h3>
				}
          		
          		{selectedMenuItem === 3 && 
				<VerifiedBookings checkAdmin = {checkAdmin}/>}
				{selectedMenuItem === 4 && (
						<Fragment>
							{checkAdmin || partialAdmin ? (
							<Fragment>
								{selectedSubMenu === 0 && <ReIssueReqs />}
								{selectedSubMenu === 1 && <RefundReqs />}
								{selectedSubMenu === 2 && <CancellationReqs />}
							</Fragment>
							) : (
							<UserCustomerSupport userData={userData} isLoading={isLoading} />
							)}
						</Fragment>
						)}
				{selectedMenuItem === 5 && 
				<PromotionsDetail />}

				{selectedMenuItem === 6 && (
						<Fragment>
							{checkAdmin || partialAdmin ? (
							<Fragment>
								{selectedSubMenu === 0 && <AddBlog />}
								{selectedSubMenu === 1 && <BlogLists />}
							</Fragment>
							) : ('')}
						</Fragment>
						)}

						{selectedMenuItem === 7 && 
				<AddCommission />}

				{selectedMenuItem === 8 && ( !checkAdmin && !partialAdmin ? <RateUs /> :<RatingList/>)
				}
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