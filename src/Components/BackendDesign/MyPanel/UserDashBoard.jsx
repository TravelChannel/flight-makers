import React,{useState,Fragment} from 'react'
import SettingsIcon from '../../../assets/BackendAssests/icons/settings.svg';
import Notification from '../../../assets/BackendAssests/icons/notification.svg';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { UserLogOut } from '../../../API/BackendAPI/allAPICalls';
import { useNavigate } from 'react-router';
import { useFormData } from '../../../Context/FormDataContext';
import * as images from '../../../Constant/images';
const UserDashBoard = ({ btnText, onClick }) => {
    const [isModel , setModel] = useState(false);
    const [isLogOut , setLogOut] = useState(false);
    const {isLogin , setLogIn} = useFormData();


    const navigate = useNavigate();
    const openUserModel = ()=>{
        setModel(!isModel);
    }
    const closeModel = () =>{
        setModel(false);
    }
    const NavigateHomePage = ()=>{
        navigate('/');
    }

    const UserLogout =async () =>{

        const logout =await UserLogOut();
        setLogOut(true);
        setLogIn(false);
    }

    if(isLogOut){
      navigate('/');
    }
  return (
           <Fragment>
         <div className='dashbord-header-container'>
                <button className='dashbord-header-btn' onClick={NavigateHomePage}>New Booking</button>
            <div className='dashbord-header-right'>
                <img 
                    src={Notification}
                    alt='notification-icon'
                    className='dashbord-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' />
                <img
                    className='dashbord-header-avatar'
                    src={images.userProfile} onClick = {openUserModel} />      
            </div>
           
        </div>
        <div className='d-flex justify-content-end '>
            {
                isModel && (
                    <div className='model_styling user_profile_main'>
                        <div className='user_profile_card'>
                            <div className='closeModel_styling'>
                            <CloseTwoToneIcon className='user_close_sign' onClick= {closeModel}/>
                            </div>
                            <ul className="user_model_list">
                                <li>User Profile</li>
                                <li>Ticket Details</li>
                                <li onClick={UserLogout}>Logout</li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
       </Fragment>
  )
}

export default UserDashBoard;