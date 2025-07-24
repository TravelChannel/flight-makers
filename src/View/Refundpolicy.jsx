import React, {Fragment}from 'react';
import RefundPolicyData from '../Constant/RefundPolicyData';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import ReuseableTermsAndCondition from '../Components/Commom/ReuseableTermsAndCondition';
import * as images from '../Constant/images';
const Refundpolicy = () => {
  return (
    <Fragment>
        
    <div className='container bg-white'>
        <div className="terms_Hero">   
            <div className='about_us_heading d-flex justify-content-center'>
            <PolicyOutlinedIcon className='about_us_icon align-self-center'/><h3>Privacy Policy</h3>
            </div>
             <ReuseableTermsAndCondition TermsConditionsData = {RefundPolicyData} />
        </div>
        {/* <div className=' refund_detail_image text-center'>
            <img src={images.refundPolicy} alt=""  width='60%'/>
        </div> */}
    </div>
   </Fragment>
  )
}

export default Refundpolicy;