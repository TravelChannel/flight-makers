import React, {useState,Fragment} from 'react';

import './styles.css';
import NotificationIcon from '../../../../assets/BackendAssests/icons/notification.svg';
import SettingsIcon from '../../../../assets/BackendAssests/icons/settings.svg';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { UserLogOut } from '../../../../API/BackendAPI/UserBookingDetails';
import { useNavigate } from 'react-router';
function DashboardHeader ({ btnText, onClick }) {
    const [isModel , setModel] = useState(false);
    const [isLogOut , setLogOut] = useState(false);

    const navigate = useNavigate();
    const openUserModel = ()=>{
        setModel(!isModel);
    }
    const closeModel = () =>{
        setModel(false);
    }

    const UserLogout =async () =>{

        const logout =await UserLogOut();
        setLogOut(true);
    }

    if(isLogOut){
      navigate('/');
    }
    return(
       <Fragment>
         <div className='dashbord-header-container'>
                <button className='dashbord-header-btn' onClick={onClick}>New Order</button>
            <div className='dashbord-header-right'>
                <img 
                    src={NotificationIcon}
                    alt='notification-icon'
                    className='dashbord-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' />
                <img
                    className='dashbord-header-avatar'
                    src='https://reqres.in/img/faces/9-image.jpg' onClick = {openUserModel} />      
            </div>
           
        </div>
        <div className='d-flex justify-content-end '>
            {
                isModel && (
                    <div className='model_styling user_profile_main'>
                        <div className='closeModel_styling'>
                        <CloseTwoToneIcon className='user_close_sign' onClick= {closeModel}/>
                        </div>
                        <ul className="user_model_list">
                            <li>User Profile</li>
                            <li>Ticket Details</li>
                            <li onClick={UserLogout}>Logout</li>
                        </ul>
                    </div>
                )
            }
        </div>
       </Fragment>
    )
}

export default DashboardHeader;