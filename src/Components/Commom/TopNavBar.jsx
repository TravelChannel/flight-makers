import React, { Fragment, useState,useEffect } from "react";
import * as images from '../../Constant/images';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Person2 from '@mui/icons-material/Person2';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

import { useFormData } from "../../Context/FormDataContext";

const TopNavBar = () => {
    const {isLogin , setLogIn,userName} = useFormData();
    const {userVerName , setVarName,profileImg} = useFormData();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);



    return (
        <Fragment>
            {/* <div className="topNav container">
                <div className="row colorBlue m-0">
                    
                    {
                        isLogin ?(
                            <Link to='/UserPanel' className="col-xs-2 col-sm-2 col-md-2 boxelem pull-right">
                        <Person2 className="glyphicon" />
                        {userVerName && userName ? userName :userVerName}
                       </Link>
                        ):(
                            <Link to='/signup' className="col-xs-2 col-sm-2 col-md-2 boxelem pull-right">
                        <Person2 className="glyphicon" />
                        SignUp/Login</Link> 
                        )
                    }
                    <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right" to='/AboutUs'>About Us</Link>
                    <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right" to="ContactUs">Contact Us</Link>
                    <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right" to='/AboutUs'>Blogs</Link>


                    <Link to='/customer-support' className="col-xs-1 col-sm-2 col-md-1 boxelem d-flex justify-content-center" >
                        <div className="support ">
                            <HeadphonesIcon className="glyphicon" />
                        </div>
                        Support
                    </Link>
                    <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right text-center colorRed" to = '/banks'>
                        <div className="inlineDiv support w-19 " >
                            <img className="bank_icon_st" src={images.bankicon} alt="bank icon" />
                        </div>
                        Banks
                    </Link>
                    <div className="col-xs-4 col-sm-4 col-md-2 boxelem pull-right">
                        <div className="inlineDiv support w-9">
                            <img className="whatsappImage" src={images.whatsappicon} alt="whatsappicon icon" />
                        </div>
                        Whatsapp: 03111147111
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-2 boxelem pull-right" id="cautionTextNumber">
                        <div className="text-center cautionDesk">
                            <img src={images.cautionicon} alt="caution icon" />
                            <span>We only call from one number : 03111147111</span></div>
                    </div>
                </div>
            </div> */}
            {/* <div className="container bg-white">
            <div className="d-flex justify-content-between colorBlue2">
                    <div>
                        <div className="  pull-right">
                            <div className="inlineDiv support w-9">
                                <img className="whatsappImage" src={images.whatsappicon} alt="whatsappicon icon" />
                            </div>
                            Whatsapp: 03111147111
                        </div>
                        <div className="  pull-right" id="cautionTextNumber">
                            <div className="text-center cautionDesk">
                                <img src={images.cautionicon} alt="caution icon" />
                                <span>We only call from one number : 03111147111</span></div>
                        </div>
                    </div>
                        <div>
                        <Link className="  pull-right text-center colorRed" to = '/banks'>
                            <div className="inlineDiv support " >
                                <img className="bank_icon_st" src={images.bankicon} alt="bank icon" />
                            </div>
                            Banks
                        </Link>
                        </div>
                    <div>
                        <Link to='/customer-support' className=" d-flex justify-content-center pull-right" >
                            <div className="support ">
                                <HeadphonesIcon className="glyphicon" />
                            </div>
                            Support
                        </Link>
                    </div>
                    <div>
                        <Link className=" pull-right" to='/AboutUs'>About Us</Link>
                    </div>
                    <div>
                        <Link className=" pull-right" to="ContactUs">Contact Us</Link>
                    </div>
                    <div>
                        <Link className=" pull-right" to='/blogCollections'>Blogs</Link>
                    </div>
                    <div>
                        {
                            isLogin ?(
                                <Link to='/UserPanel' className="  pull-right">
                            <Person2 className="glyphicon" />
                            {userVerName && userName ? userName :userVerName}
                        </Link>
                            ):(
                                <Link to='/signup' className="  pull-right">
                            <Person2 className="glyphicon" />
                            SignUp/Login</Link> 
                            )
                        }
                    </div>
                    
            </div>

            </div> */}
            <div className="container bg-white">
      {windowWidth > 767 && (
        <div className="d-flex justify-content-between colorBlue2">
          <div>
          <div className="pull-right">
                <a href="https://wa.me/923111147111" target ='_blank'>
                    <div className="inlineDiv support w-9">
                        <img className="whatsappImage" src={images.whatsappicon} alt="whatsappicon icon" />
                    </div>
                    <span>Whatsapp: 03111147111</span>
                </a>
            </div>
            <div className="pull-right" id="cautionTextNumber">
              <div className="text-center cautionDesk">
                <a href="tel:03111147111">
                  <img src={images.cautionicon} alt="caution icon" />
                  <span>We only call from one number : 03111147111</span>
                </a>
              </div>
            </div>
          </div>
          <div>
            <Link className="pull-right text-center colorRed" to='/banks'>
              <div className="inlineDiv support">
                <img className="bank_icon_st" src={images.bankicon} alt="bank icon" />
              </div>
              Banks
            </Link>
          </div>
          <div>
            <Link to='/customer-support' className="d-flex justify-content-center pull-right" >
              <div className="support">
                <HeadphonesIcon className="glyphicon" />
              </div>
              Support
            </Link>
          </div>
          <div>
            <Link className="pull-right" to='/about-us'>About Us</Link>
          </div>
          <div>
            <Link className="pull-right" to="/contact-us">Contact Us</Link>
          </div>
          <div>
            <Link className="pull-right" to='/blogs' target='_blank'>Blogs</Link>
          </div>
          <div>
            {isLogin ? (
              <Link to='/UserPanel' className="pull-right">
              {profileImg ? <img src={profileImg} className='dashbord-header-avatar-2'/> : <Person2 className="glyphicon" />}
                {userVerName && userName ? userName : userVerName}
              </Link>
            ) : (
              <Link to='/signup' className="pull-right">
                <Person2 className="glyphicon" />
                SignUp/Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
        </Fragment>
    );
}
export default TopNavBar;


