import React from 'react';

import './styles.css';
import NotificationIcon from '../../../../assets/BackendAssests/icons/notification.svg';
import SettingsIcon from '../../../../assets/BackendAssests/icons/settings.svg';

function DashboardHeader ({ btnText, onClick }) {
    return(
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
                    src='https://reqres.in/img/faces/9-image.jpg' />
            </div>

        </div>
    )
}

export default DashboardHeader;