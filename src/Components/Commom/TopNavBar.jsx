import React, { Fragment } from "react";
import * as images from '../../Constant/images';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Person2 from '@mui/icons-material/Person2';
import { Link } from "react-router-dom";

const topNavBar = () => {
    return (
        <Fragment>
            <div className="topNav container">
                <div className="row colorBlue m-0">

                    <Link to='/signup' className="col-xs-2 col-sm-2 col-md-2 boxelem pull-right">
                        <Person2 className="glyphicon" />
                        SignUp/Login</Link>

                    <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right" to='/AboutUs'>About Us</Link>
                    <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right" to="ContactUs">Contact Us</Link>

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
                    <div className="col-xs-4 col-sm-4 col-md-4 boxelem pull-right" onClick="fnOpenWhatsApp();">
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
            </div>
        </Fragment>
    );
}
export default topNavBar;






// import React, { Fragment } from "react";
// import * as images from '../../Constant/images';
// import HeadphonesIcon from '@mui/icons-material/Headphones';
// import Person2 from '@mui/icons-material/Person2';
// import { Link } from "react-router-dom";

// const topNavBar = () => {
//     return (
//         <Fragment>
//             <div className="topNav container">
//                 <div className="row colorBlue m-0">

//                     <Link to='/signup' className="col-xs-2 col-sm-2 col-md-2 boxelem pull-right">
//                         <Person2 className="glyphicon" />
//                         SignUp/Login</Link>

//                     <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right" to='/AboutUs'>About Us</Link>
//                     <Link className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right" to="ContactUs">Contact Us</Link>

//                     <Link to='/customer-support' className="col-xs-1 col-sm-2 col-md-1 boxelem d-flex justify-content-center" >
//                         <div className="support ">
//                             <HeadphonesIcon className="glyphicon" />
//                         </div>
//                         Support
//                     </Link>
//                     <div className="col-xs-1 col-sm-2 col-md-1 boxelem pull-right text-center colorRed">
//                         <div className="inlineDiv support w-19 " >
//                             <img className="bank_icon_st" src={images.bankicon} alt="bank icon" />
//                         </div>
//                         Banks
//                     </div>
//                     <div className="col-xs-4 col-sm-4 col-md-4 boxelem pull-right" onClick="fnOpenWhatsApp();">
//                         <div className="inlineDiv support w-9">
//                             <img className="whatsappImage" src={images.whatsappicon} alt="whatsappicon icon" />
//                         </div>
//                         Whatsapp: 03111147111
//                     </div>
//                     <div className="col-xs-3 col-sm-3 col-md-2 boxelem pull-right" id="cautionTextNumber">
//                         <div className="text-center cautionDesk">
//                             <img src={images.cautionicon} alt="caution icon" />
//                             <span>We only call from one number : 03111147111</span></div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }
// export default topNavBar;
