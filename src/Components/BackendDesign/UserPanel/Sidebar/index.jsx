import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBarItem from './sidebar-item';
import './styles.css';
import * as images from '../../../../Constant/images';
import LogoutIcon from '../../../../assets/BackendAssests/icons/logout.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserLogOut } from '../../../../API/BackendAPI/UserBookingDetails';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function SideBar (props) {
    const {menu} =props;
    const location = useLocation();
    const navigate = useNavigate();

    const [active, setActive] = useState(1);
    const [open, setOpen] = useState(false);
    const [isLogOut , setLogout] = useState(false);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }


    // --------------
const userLogout = async()=>{
    const logout  = await UserLogOut();
    setLogout(true);
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
    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                   <Link 
                   to={'/'}
                   className="hdrLogo"
                   >
                   <img
                        src={images.default}
                        className="imgView"
                        alt="logo" />
                   </Link>
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer' onClick={handleClickOpen}>
                        <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon'/>
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
        </nav>
    )
}

export default SideBar;