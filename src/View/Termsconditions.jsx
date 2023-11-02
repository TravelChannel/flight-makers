import React, { Fragment } from "react";
import ReuseableTermsAndCondition from "../Components/Commom/ReuseableTermsAndCondition";
import TermsConditionsData from "../Constant/TermsConditionsData";
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
const Termscondition = () =>
{
    return(
       <Fragment>
        
        <div className='container bg-white'>
         <div className="terms_Hero">   
        <div className='about_us_heading d-flex justify-content-center'>
        <GavelRoundedIcon className='about_us_icon align-self-center'/><h3>Terms and Conditions</h3>
        </div>
                <ReuseableTermsAndCondition TermsConditionsData = {TermsConditionsData} />
        </div>
        </div>
       </Fragment>
    );
}

export default Termscondition;